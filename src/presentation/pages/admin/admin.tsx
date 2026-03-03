'use client';

import { useEffect, useState } from 'react';

export default function AdminComponent() {
  const [data, setData] = useState<any>(null);

  async function fetchData() {
    const res = await fetch('/api/admin/teams');
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function markPaid(teamId: string) {
    await fetch('/api/admin/mark-paid', {
      method: 'POST',
      body: JSON.stringify({ teamId })
    });
    fetchData();
  }

  async function sendEmail(teamId: string) {
    await fetch('/api/admin/send-confirmation', {
      method: 'POST',
      body: JSON.stringify({ teamId })
    });
    fetchData();
  }

  if (!data) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Pendentes</h2>
      {data.pending.map((team: any) => (
        <div key={team.id}>
          <p>ID: {team.id}</p>
          <button onClick={() => markPaid(team.id)}>Marcar como Pago</button>
        </div>
      ))}

      <h2>Pagos</h2>
      {data.paid.map((team: any) => (
        <div key={team.id}>
          <p>ID: {team.id}</p>
          <button onClick={() => sendEmail(team.id)}>Enviar confirmação</button>
        </div>
      ))}
    </div>
  );
}
