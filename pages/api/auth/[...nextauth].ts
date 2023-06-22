import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from './../../../lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    })
  ],
  callbacks: {
    session({ session, token, user }) {
      return session
    },
    //async redirect({ url, baseUrl }) { { return baseUrl } },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (isNewUser) {
        const accounts = await prisma.tenant.findFirst({
          where: {
            userId: user.id
          }
        })
        if (!accounts) {
          await prisma.tenant.create({
            data: {
              name: 'Meu tenant',
              slug: 'meutenant',
              plan: 'free',
              userId: user.id,
              image: '',
            }
          })
        }
        return token
      }
    }
  },
  debug: false
});
