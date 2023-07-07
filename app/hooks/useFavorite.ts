import {useMemo, useCallback} from 'react';
import {useRouter} from 'next/navigation';

import {SafeUser} from '@/app/types';
import useLoginModal from './useLoginModal';
import axios from 'axios';
import {toast} from 'react-hot-toast';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        const reqUrl = `/api/favorites/${listingId}`;

        if (hasFavorited) {
          request = () => axios.delete(reqUrl);
        } else {
          request = () => axios.post(reqUrl);
        }

        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('something went Wrong.');
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
