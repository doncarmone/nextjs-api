'use client';
import { Todo } from '@/generated/prisma';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from '@/app/TodoItem.module.css';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justift-start items-center gap-4'>
        <div
          onClick={() => toggleTodo(todo.id, !todo.completed)}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todo.completed ? 'bg-blue-100}' : 'bg-red-100'
          }`}
        >
          {todo.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className='text-center sm:text-left'>{todo.description}</div>
      </div>
    </div>
  );
};
