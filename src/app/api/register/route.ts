import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { email, object, string } from 'zod';

import { prisma } from '@/core/lib/prisma';

const schema = object({
  password: string().min(3),
  email: email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: validation.data.email },
    });
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: validation.data.email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
