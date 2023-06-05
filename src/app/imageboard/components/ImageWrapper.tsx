import React from 'react';
import ImageOverlay from '@/src/app/imageboard/components/ImageOverlay';
import ImageDetails from '@/src/app/imageboard/components/ImageDetails';
import { BoardPost } from '@/src/app/imageboard/types/content-types';

export default function ImageWrapper(props: { post: BoardPost, isSelected: boolean, select: Function }) {
  const post = props.post;
  return (
    <>
      <div className='group relative aspect-square col-span flex bg-yellow-400 z-0 m-1'
           style={{ backgroundImage: post.postImage!.imageUrl }}>
        <img
          className='w-fit h-full'
          src={post.postImage!.imageUrl}
          onClick={() => {
            props.select();
          }}
          alt={post.postString || ''} />
        <ImageOverlay post={post} />
      </div>
      {props.isSelected &&
        <div
          className='bg-yellow-400 w-full col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-8 min-w-200'>
          <ImageDetails post={post} close={() => {
            props.select('');
          }} />
        </div>
      }
    </>
  );
}