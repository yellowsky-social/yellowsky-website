'use client';

import React, { CSSProperties } from 'react';
import { BoardPost } from '@/src/app/imageboard/types/content-types';
import CommentsBox from '@/src/app/imageboard/components/CommentsBox';

export default function PostBox(props: {
  post: BoardPost,
  style?: CSSProperties | undefined,
  className?: string | undefined
  isMain?: boolean
}) {
  const post = props.post;
  return (
    <div
      className={(props.className ? props.className + ' ' : '')}
      style={{ ...props.style }}>

      <div
        className={'flex bg-red-400' + 'border-dashed ' + (props.isMain ? 'border-b-2' : 'border-b-2') + ' border-indigo-500'}>
        <div className='w-full my-2'>
          <div className='flex-auto'>
            <div>
              <p className='font-mono text-xs'>{new Date(post.when).toLocaleDateString()}</p>
              <p className='font-mono text-xs'>{new Date(post.when).toLocaleTimeString()}</p>
              <a className='hover:text-violet-500 mr-1'
                 href={'https://bsky.app/profile/' + post.senderHandle}
                 target='_blank'>{post.senderName}:</a>
            </div>

            <div className='flex mx-2 mt-auto'>
              <a className='hover:text-violet-500'
                 href={post.postUrl}
                 target='_blank'
              >{post.postString}</a>
            </div>
          </div>
        </div>

        <div className='m-auto'>
          {!props.isMain && post.images && post.images.map((image, index) => {
            return (
              <img
                key={index}
                className='m-auto w-auto h-full mx-auto my-2'
                src={image.thumb}
                alt={post.postString}
                content={'fill'}
                style={{ maxHeight: '120px' }}
              />
            );
          })
          }
        </div>
      </div>

      {!props.isMain && post.comments.length > 0 &&
        <div className='ml-8 pt-2'>
          <CommentsBox posts={post.comments} />
        </div>
      }
    </div>
  );
}