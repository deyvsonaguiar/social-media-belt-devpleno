import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from './../../../lib/prisma';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log({ user, isNewUser, token })
      if (isNewUser) {
        //TODO- create a new tenant
        const accounts = await prisma.tenant.findFirst({
          where: {
            userId: user.id
          }
        })
        if (!accounts) {
          await prisma.tenant.create({
            data: {
              name: 'Meu tenant',
              userId: user.id,
              image: '',
              slug: 'meutenant',
              plan: 'free'
            }
          })
        }
      }
      return token
    },
    session({ session, token, user }) {
      return session
    }
  },
}

export default NextAuth(authOptions)