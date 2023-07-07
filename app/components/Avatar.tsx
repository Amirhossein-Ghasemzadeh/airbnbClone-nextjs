'use client';
import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
      src={src || '/images/placeholder.jpg'}
      className='rounded-full'
      alt='avatar'
      height='30'
      width='30'
    />
  );
};

export default Avatar;
