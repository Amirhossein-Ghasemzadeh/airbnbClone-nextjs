import prisma from '@/app/libs/prismadb';
import {hashPassword} from '@/utils/auth';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const {email, name, password} = body;
console.log(email)
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
