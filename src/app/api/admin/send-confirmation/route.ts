import { prisma } from '~/lib/prisma';
import { sendConfirmationEmail } from '~/lib/email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { teamId } = await req.json();

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        athletes: {
          include: {
            athlete: true
          }
        }
      }
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Dupla não encontrada' },
        { status: 404 }
      );
    }

    const emails = team.athletes.map((a: any) => a.athlete.email);

    await sendConfirmationEmail({
      emails,
      teamId: team.id,
      tournamentName: 'Nome do Torneio',
      categoryName: 'Categoria'
    });

    await prisma.team.update({
      where: { id: teamId },
      data: { emailSent: true }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}
