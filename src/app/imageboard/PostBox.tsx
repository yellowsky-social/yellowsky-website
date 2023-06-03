import {BlueskyPost} from "@/app/utils/mock-image-fetcher";
import React, {CSSProperties} from "react";

export default function PostBox(props: {
    post: BlueskyPost,
    style?: CSSProperties | undefined,
    className?: string | undefined
    isReply?: boolean
}) {
    const post = props.post;
    return (
        <div
            className={(props.className ? props.className + " " : "") + "border-dashed border-b-2 border-indigo-500 pb-2"}
            style={{...props.style}}>
            <div>
                <p className="font-mono text-xs">{new Date(post.when).toLocaleString("en")}</p>
            </div>
            <div className="flex">
                <a href={"#"} className="hover:text-violet-500">{post.senderHandle}</a>
                <p>{': '}{props.isReply ? "-> " : ""}</p>
                <a href={"#"} className="hover:text-violet-500">{post.postString}</a>
                {props.isReply && post.postImage &&
                    <img
                        className="m-auto w-auto h-full"
                        src={post.postImage!.imageUrl}
                        alt={post.postString}
                        content={"fill"}
                        style={{maxHeight: "120px"}}
                    />
                }
            </div>
        </div>
    )
}