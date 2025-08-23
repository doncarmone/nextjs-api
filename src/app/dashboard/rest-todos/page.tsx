// export const metadata = {
//   title: 'Listado de todos',
//   description: 'Rest Todos',
// };

import prisma from '@/lib/prisma';
import { TodosGrid } from '../../../todos/components/TodosGrid';
import { NewTodo } from '../../../todos/components/NewTodo';

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className='w-full px-5 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
