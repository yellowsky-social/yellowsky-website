import React from "react";
import {BlueskyPost} from "@/app/utils/mock-image-fetcher";
import ImageOverlay from "@/app/imageboard/ImageOverlay";
import ImageDetails from "@/app/imageboard/ImageDetails";

export default function ImageWrapper(props: { post: BlueskyPost, isSelected: boolean, select: Function }) {
    const post = props.post;
    return (
        <>
            <div className="group relative col-span flex bg-yellow-400 z-0 m-1"
                 style={{backgroundImage: post.postImage!.imageUrl}}>
                <img
                    className="m-auto w-auto h-full"
                    src={post.postImage!.imageUrl}
                    alt={post.postString}
                    content={"fill"}
                    style={{}}
                    onClick={() => {
                        props.select()
                    }}
                />
                <ImageOverlay post={post}/>
            </div>
            {props.isSelected &&
                <div
                    className="bg-yellow-400 w-full col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-8 min-w-200">
                    <ImageDetails post={post} close={() => {
                        props.select("")
                    }}/>
                </div>
            }
        </>
    );
}