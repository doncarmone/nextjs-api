import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test@gmail.com',
            password: await bcrypt.hash('root', 10),
            name: 'John Smith',
            image: 'https://images.unsplash.com/photo-1609151354448-c4a53450c6e9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
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
            }
        }
    });



    return NextResponse.json({
        message: 'Seed Exectuted'
    });
}