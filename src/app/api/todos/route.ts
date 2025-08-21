import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if (isNaN(take)) return NextResponse.json({
        message: 'Invalid take parameter',
        flag: false
    }, { status: 400 });

    if (isNaN(skip)) return NextResponse.json({
        message: 'Invalid take parameter',
        flag: false
    }, { status: 400 });

    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip
    });

    return NextResponse.json({
        message: 'Fetched todos successfully',
        flag: true,
        data: todos
    });
}

const postSchema = yup.object({
    description: yup.string().max(500).required(),
    completed: yup.boolean().optional().default(false)
});

export async function POST(request: Request) {

    try {
        const { completed, description } = await postSchema.validate(await request.json());

        const todo = await prisma.todo.create({
            data: {
                description,
                completed
            }
        });
        return NextResponse.json({
            message: 'Created todo successfully',
            flag: true,
            data: todo
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Invalid request body',
            flag: false,
            error: error
        }, { status: 400 });
    }


}