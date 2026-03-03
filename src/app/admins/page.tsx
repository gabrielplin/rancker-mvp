import { LogoutLayoutTag } from '~/presentation/layouts/logout-layout';
import { AdminTag } from '~/presentation/pages';

export default async function AdminsPage() {
  return (
    <LogoutLayoutTag>
      <AdminTag />
    </LogoutLayoutTag>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
