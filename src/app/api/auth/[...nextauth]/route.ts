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

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

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
      if (user) {
        token.id = (user as AuthUser).id;
      }
      return token;
    },
    // Add user ID to session
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as AuthUser).id = token.id as string;
      }
      return session;
    },
  },
};

// NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
