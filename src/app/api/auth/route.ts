import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

import type { Session } from 'next-auth';

export async function GET(_request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
