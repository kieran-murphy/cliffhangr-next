// lib/prisma/index.ts
import { PrismaClient } from '@prisma/client';

// Extend the NodeJS global type so TS knows about `global.prisma`
declare global {
  /* eslint-disable no-var */
  var prisma: PrismaClient | undefined;
}

// In production, always create a new client.
// In development, reuse the client across module reloads.
const prisma: PrismaClient =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : (global.prisma ?? new PrismaClient());

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
