import React from "react";
import {BlueskyPost} from "@/app/utils/mock-image-fetcher";
import PostBox from "@/app/imageboard/PostBox";

export default function CommentsBox(props: { posts: BlueskyPost[] }) {
    const posts = props.posts;
    return (
        <>
            {posts.map((comment, index) => {
                return (
                    <PostBox key={index}
                             className=""
                             post={comment}
                             isMain={false}
                    />
                );
            })}
        </>
    );
}