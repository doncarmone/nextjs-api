export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Listado de todos',
  description: 'Rest Todos',
};

import prisma from '@/lib/prisma';
import { TodosGrid } from '../../../todos/components/TodosGrid';
import { NewTodo } from '../../../todos/components/NewTodo';
import { getUserSessionServer } from '@/app/auth/actions/auth-actions';
import { redirect } from 'next/navigation';

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();

  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <>
      <span className='text-3xl mb-10'>Server Actions</span>
      <div className='w-full px-5 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
