import prisma from '@/app/libs/prismadb'; 
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/pages/api/auth/[...nextauth]';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    const email = session?.user?.email;

    if (!email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (err: any) {
    return null;
  }
}
