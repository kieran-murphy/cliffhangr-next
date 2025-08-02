import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prisma from '@/lib/prisma/index';

import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Custom user type
interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('No account found with this email.');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password.');
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    // Add user ID to JWT
    async jwt({ token, user }) {
      // On sign-in, persist the user ID
      if (user) {
        token.id = (user as AuthUser).id;
        return token;
      }
      // On subsequent requests, re-fetch the user
      const dbUser = await prisma.user.findUnique({
        where: { id: token.id as string },
      });
      if (!dbUser) {
        // User was deleted – clear the token so session() returns null
        return {} as typeof token;
      }
      return token;
    },
    // Add user ID to session
    async session({ session, token }: { session: Session; token: JWT }) {
      // Attach user ID if present
      if (token.id) {
        session.user = { ...session.user!, id: token.id as string } as AuthUser;
      }
      return session;
    },
  },
};

// NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
