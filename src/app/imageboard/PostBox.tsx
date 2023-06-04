import {BlueskyPost} from "@/app/utils/mock-image-fetcher";
import React, {CSSProperties} from "react";
import CommentsBox from "@/app/imageboard/CommentsBox";

export default function PostBox(props: {
    post: BlueskyPost,
    style?: CSSProperties | undefined,
    className?: string | undefined
    isMain?: boolean
}) {
    const post = props.post;
    return (
        <div
            className={(props.className ? props.className + " " : "")}
            style={{...props.style}}>

            <div
                className={"flex bg-red-400" + "border-dashed " + (props.isMain ? "border-b-2" : "border-b-2") + " border-indigo-500"}>
                <div className="w-full my-2">
                    <div className="flex">
                        <div>
                            <p className="font-mono text-xs">{new Date(post.when).toLocaleDateString()}</p>
                            <p className="font-mono text-xs">{new Date(post.when).toLocaleTimeString()}</p>
                            <a href={"#"} className="hover:text-violet-500 mr-1">{post.senderHandle}:</a>
                        </div>

                        <div className="flex mx-2 mt-auto">
                            <a href={"#"} className="hover:text-violet-500">{post.postString}</a>
                        </div>
                    </div>
                </div>

                <div className="m-auto">
                    {!props.isMain && post.postImage &&
                        <img
                            className="m-auto w-auto h-full mr-56 my-2"
                            src={post.postImage!.imageUrl}
                            alt={post.postString}
                            content={"fill"}
                            style={{maxHeight: "120px"}}
                        />
                    }
                </div>
            </div>

            {!props.isMain && post.comments.length > 0 &&
                <div className="ml-8 pt-2">
                    <CommentsBox posts={post.comments}/>
                </div>
            }
        </div>
    )
}