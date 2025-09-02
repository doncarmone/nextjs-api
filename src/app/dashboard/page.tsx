import { getServerSession } from 'next-auth';
import { WidgetItem } from '../../components/Widgets/WidgetItem';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2'>
      <WidgetItem title='usuario conectado s-side'>
        <div className='flex flex-col'>
          <span className='font-bold'>Nombre:</span>
          <span>{session.user?.name}</span>
          <span className='font-bold'>Email:</span>
          <span>{session.user?.email}</span>
          <span className='font-bold'>Image:</span>
          <span>{session.user?.image}</span>
        </div>
        {/* {JSON.stringify(session.user)} */}
      </WidgetItem>
    </div>
  );
}
