import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import { prisma } from '../lib/prisma';

const limiter = new RateLimiterMemory({
  points: 5, // Allow 5 attempts
  duration: 60, // Per 60 seconds
});

const rateLimit = async (key: string) => {
  try {
    await limiter.consume(key);
    return { success: true };
  } catch (error) {
    return {
      success: !!error,
      response: NextResponse.json(
        { error: 'Too many requests, please try again later' },
        { status: 429 },
      ),
    };
  }
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) return null;

        // Limit: 5 login attempts per minute per email
        const limitResult = await rateLimit(credentials.email);
        if (!limitResult.success) {
          throw new Error('Too many login attempts, please try again later');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword!);
        return isValid ? user : null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log('Redirect Callback - URL:', url, 'Base URL:', baseUrl);
      return baseUrl;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
        console.log('Session Callback - Session data:', {
          id: session.user.id,
          email: session.user.email,
        });
        return session;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
