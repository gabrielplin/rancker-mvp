import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({
  categoryName,
  emails,
  teamId,
  tournamentName
}: {
  emails: string[];
  teamId: string;
  tournamentName: string;
  categoryName: string;
}) {
  return resend.emails.send({
    from: 'Rancker <ranckersports@gmail.com>',
    to: emails,
    subject: 'Confirmação de inscrição - Rancker',
    html: `
            <div style="font-family: Arial; padding: 20px;">
                <h2>Inscrição Confirmada 🎉</h2>
                <p>Sua dupla foi confirmada no torneio:</p>
                <p><strong>${tournamentName}</strong></p>
                <p>Categoria: <strong>${categoryName}</strong></p>
                <br />
                <p>ID da inscrição: ${teamId}</p>
                <br />
                <p>Nos vemos em quadra! 🏆</p>
                <hr />
                <small>Equipe Rancker</small>
            </div>
            `
  });
}
