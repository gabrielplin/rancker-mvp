import { LogoutLayoutTag } from '~/presentation/layouts/logout-layout';

export default async function Home() {
  // console.log('bateu aqui');
  // useEffect(() => {
  //   router.push('/torneios');
  // }, []);
  return (
    <LogoutLayoutTag>
      {/* <TournamentListTag tournament={tournaments} /> */}
    </LogoutLayoutTag>
  );
}
