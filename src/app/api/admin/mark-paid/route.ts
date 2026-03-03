import { prisma } from '~/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { teamId } = await req.json();

  await prisma.team.update({
    where: { id: teamId },
    data: { status: 'paid' }
  });

  return NextResponse.json({ success: true });
}
