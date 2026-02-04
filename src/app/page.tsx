'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogoutLayoutTag } from '~/presentation/layouts/logout-layout';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/torneios');
  }, []);
  return (
    <LogoutLayoutTag>
      {/* <TournamentListTag tournament={tournaments} /> */}
    </LogoutLayoutTag>
  );
}
