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
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async session({ session, token, user }) {
      session.user.id = token.sub
      console.log('session', { session, token, user })
      return session
    },
    async jwt({ token, user, isNewUser }) {
      if (isNewUser) {
        const accounts = await prisma.tenant.findFirst({
          where: {
            users: {
              some: {
                userId: user.i
              }
            }
          }
        })
        if (!accounts) {
          const tenant = await prisma.tenant.create({
            data: {
              name: 'Meu tenant',
              image: '',
              slug: 'meutenant',
              plan: 'free'
            }
          })
          if (!accounts) {
            const userOnTenant = await prisma.usersOnTenants.create({
              data: {
                userId: user.id,
                tenantId: tenant.id,
                role: 'owner'
              }
            })
          }
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