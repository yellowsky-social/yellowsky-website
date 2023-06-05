import React from 'react';
import { BoardPost } from '@/src/app/imageboard/types/content-types';
import PostBox from '@/src/app/imageboard/components/PostBox';
import CommentsBox from '@/src/app/imageboard/components/CommentsBox';

export default function ImageDetails(props: { post: BoardPost, close: Function }) {
  const post = props.post;
  return (
    <div className='font-mono text-black font-bold p-2 px-6 border-2 border-black mb-4 '>
      <div key={post.id}>
        <div>
          <img
            className='m-auto w-fit h-auto'
            src={post.postImage!.imageUrl}
            alt={post.postString}
            onClick={() => {
              props.close();
            }}
          />
          {/* Initial Post box */}
          <PostBox className='text-2xl' post={post} isMain={true} />
        </div>

        <div className='pl-8 pr-8'>
          {/* Replied Posts Box */}
          <CommentsBox posts={post.comments} />
        </div>

        <div>
          {/* Reply Input Box */}

        </div>
      </div>
    </div>
  );
};
