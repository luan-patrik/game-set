import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import authConfig from './auth.config'
import prisma from './db'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  pages: { signIn: '/entrar', signOut: '/' },
  session: { strategy: 'jwt' },
  cookies: { sessionToken: { options: { httpOnly: true } } },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
      }

      const db = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (db) {
        token.id = db.id as string
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
})
