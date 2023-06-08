import React from 'react';
import PostBox from '@/src/app/imageboard/components/PostBox';
import { BoardPost } from '@/src/app/imageboard/types/content-types';

export default function CommentsBox(props: { posts: BoardPost[] }) {
  const posts = props.posts;
  return (
    <>
      {posts.map((comment, index) => {
        return (
          <PostBox key={index}
                   className=''
                   post={comment}
                   isMain={false}
          />
        );
      })}
    </>
  );
}