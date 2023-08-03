import {NextResponse} from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listingId?: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
  const currentUser = await getCurrentUser();

  const {listingId} = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('invalid ID');
  }

  const listing = await prisma?.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
