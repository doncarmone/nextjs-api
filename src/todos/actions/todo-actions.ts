'use server';
import { Todo } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//Si se necesita que esta función se ejecute en el servidor


export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo) throw 'Todo not found';

    const updatedTodo = await prisma.todo.update({ where: { id }, data: { completed } });

    revalidatePath('/dashboard/server-todos');
    return updatedTodo;
};


export const addTodo = async (description: string) => {

    try {

        const todo = await prisma.todo.create({
            data: {
                description
            }
        });

        revalidatePath('/dashboard/server-todos');
        return todo;
    } catch (error) {
        return {
            message: 'Error creating todo',
        }
    }
};

export const deleteCompleted = async (): Promise<void> => {
    try {
        await prisma.todo.deleteMany({ where: { completed: true } });
        revalidatePath('/dashboard/server-todos');
    } catch (error) {
        // return {
        //     message: 'Error deleting completed todos',
        // }
    }
};