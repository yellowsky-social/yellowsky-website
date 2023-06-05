import { FcDislike, FcLike } from 'react-icons/fc';
import React from 'react';
import { BoardPost } from '@/src/app/imageboard/types/content-types';

export default function ImageOverlay(props: { post: BoardPost }) {
  const post = props.post;
  return (
    <div
      className='absolute bottom-0 bg-yellow-400 w-full h-fit flex flex-col justify-start items-start opacity-0 group-hover:h-fit group-hover:opacity-100'>
      <div className='flex left-0'>
        {post.liked ? <FcDislike className='left-0 text-5xl px-2 hover:opacity-60' /> :
          <FcLike className='left-0 text-5xl px-2 hover:opacity-60' />}
        <p className='font-6xl font-black my-auto'>{post.likes.toLocaleString('en')}</p>
      </div>
    </div>
  );
}