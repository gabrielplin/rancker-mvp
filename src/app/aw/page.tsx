import { AwTag } from '~/presentation/pages/aw';

export default async function AWPage() {
  return <AwTag />;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
