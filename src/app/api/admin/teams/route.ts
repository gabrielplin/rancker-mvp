import { prisma } from '~/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pending = await prisma.team.findMany({
      where: { status: 'pending' },
      include: { athletes: { include: { athlete: true } } }
    });

    const paid = await prisma.team.findMany({
      where: { status: 'paid' },
      include: { athletes: { include: { athlete: true } } }
    });

    return NextResponse.json({ pending, paid });
  } catch (err) {
    console.log(err);
  }
}
