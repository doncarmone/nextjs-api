import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            {
                description: 'Piedra del alma',
                completed: true
            },
            {
                description: 'Idolo del tiempo',
            }
            ,
            {
                description: 'Idolo del espacio',
            }
            ,
            {
                description: 'Idolo del poder',

            }
            ,
            {
                description: 'Idolo de la vanidad',
            }
        ]
    });

    return NextResponse.json({
        message: 'Seed Exectuted'
    });
}