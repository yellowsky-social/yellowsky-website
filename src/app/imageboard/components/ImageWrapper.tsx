import React, { useEffect, useState } from 'react';
import ImageOverlay from '@/src/app/imageboard/components/ImageOverlay';
import ImageDetails from '@/src/app/imageboard/components/ImageDetails';
import { BoardPost } from '@/src/app/imageboard/types/content-types';
import { fetchPostWithComments } from '@/src/app/imageboard/services/bluesky-posts';

type ImageWrapperProps = {
  post: BoardPost
  isSelected: boolean
  select: Function
}

export default function ImageWrapper({ post, isSelected, select }: ImageWrapperProps) {

  const [detailedPost, setDetailedPost] = useState(post);

  useEffect(() => {
    if (isSelected) {
      fetchPostWithComments(post.uri).then((p) => {
        setDetailedPost(p);
        console.log(p);
      });
    }
  }, [isSelected]);

  return (
    <>
      <div className='group relative aspect-square col-span flex bg-yellow-400 z-0 m-1'>
        <img
          className={'w-fit p-auto ' + (isSelected ? 'cursor-zoom-out' : 'cursor-zoom-in')}
          src={post.images[0].thumb}
          onClick={() => {
            select();
          }}
          alt={post.postString || ''} />
        <ImageOverlay post={post} />
      </div>
      {isSelected &&
        <div
          className='bg-yellow-400 w-full col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-8 min-w-200'>
          <ImageDetails post={detailedPost} close={() => {
            select('');
          }} />
        </div>
      }
    </>
  );
}