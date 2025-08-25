'use client';
import { startTransition, useOptimistic } from 'react';
('react');
import { Todo } from '@/generated/prisma';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from '@/app/TodoItem.module.css';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [optimisticTodo, setOptimisticToggleTodo] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      completed: newCompletedValue,
    })
  );

  const onTogglerTodo = async () => {
    try {
      startTransition(() => setOptimisticToggleTodo(!optimisticTodo.completed));

      await toggleTodo(optimisticTodo.id, !optimisticTodo.completed);
    } catch (error) {
      startTransition(() => setOptimisticToggleTodo(!optimisticTodo.completed));
    }
  };

  return (
    <div
      className={
        optimisticTodo.completed ? styles.todoDone : styles.todoPending
      }
    >
      <div className='flex flex-col sm:flex-row justift-start items-center gap-4'>
        <div
          onClick={() => onTogglerTodo()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            optimisticTodo.completed ? 'bg-blue-100}' : 'bg-red-100'
          }`}
        >
          {optimisticTodo.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className='text-center sm:text-left'>
          {optimisticTodo.description}
        </div>
      </div>
    </div>
  );
};
