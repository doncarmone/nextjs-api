import { Todo } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    };
}

const getTodo = async (id: string): Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({
        where: { id: id }
    });

    return todo;
}

export async function GET(request: Request, { params }: Segments) {
    const { id } = await params;

    if (!id) return NextResponse.json({
        message: 'Missing id parameter',
        flag: false
    }, { status: 400 });

    const todo = await getTodo(id);

    if (!todo) return NextResponse.json({
        message: 'Todo not found',
        flag: false
    }, { status: 404 });

    return NextResponse.json({
        message: 'Fetched todo successfully',
        flag: true,
        data: todo
    });
}


const putSchema = yup.object({
    description: yup.string().max(500).optional(),
    completed: yup.boolean().optional().default(false)
});

export async function PUT(request: Request, { params }: Segments) {


    const { id } = await params;

    if (!id) return NextResponse.json({
        message: 'Missing id parameter',
        flag: false
    }, { status: 400 });

    const todo = await getTodo(id);

    if (!todo) return NextResponse.json({
        message: 'Todo not found',
        flag: false
    }, { status: 404 });
    try {

        const { completed, description } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: {
                description,
                completed
            }
        });

        if (!updatedTodo) return NextResponse.json({
            message: 'Todo not found',
            flag: false
        }, { status: 404 });

        return NextResponse.json({
            message: 'Fetched todo successfully',
            flag: true,
            data: updatedTodo
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Invalid request body',
            flag: false,
            error: error
        }, { status: 400 });
    }
}