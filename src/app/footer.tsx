import React from "react";
import {BsGithub, BsTelegram,} from "react-icons/bs";
import {BiSquareRounded} from "react-icons/bi";

export default function Footer() {
    return (
        /*
        items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none
         */
        <div
            className="fixed bottom-0 min-w-max p-4 bg-black w-full shadow-[0_35px_50px_100px_rgba(0,0,0,1.0)]">
            <div className="relative bottom-0 flex text-lg lg:text-xl gap-4 flex-nowrap">
                <a
                    className="relative flex gap-2 w-fit font-black text-amber-50 hover:text-blue-300 pointer-events-auto"
                    href="https://atproto.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="flex-nowrap">POWERED BY</p>
                    <div className="flex">
                        <img className="h-4 m-auto"
                             src="/atproto.png"
                             alt="AT Protocol"
                             height={24}
                        />
                        <p className="">PROTO</p>
                    </div>
                </a>

                <a
                    className="relative flex-col m-auto font-black text-amber-50 hover:text-blue-300 pointer-events-auto"
                    href="https://github.com/yellowsky-social"
                    target="_blank"
                    rel="noopener noreferrer">
                    <p className="text-xl"><BsGithub/></p>
                </a>

                <a
                    className="relative flex-col m-auto font-black text-amber-50 hover:text-blue-300 pointer-events-auto"
                    href="https://t.me/yskyapp"
                    target="_blank"
                    rel="noopener noreferrer">
                    <p className="text-xl"><BsTelegram/></p>
                </a>

                <a
                    className="relative flex-auto m-auto font-black text-amber-50 hover:text-blue-300 pointer-events-auto"
                    href="https://bsky.app/profile/ysky.app"
                    target="_blank"
                    rel="noopener noreferrer">
                    <p className="text-xl"><BiSquareRounded type="solid"/></p>
                </a>

                {
                    /*
                    <a
                    className="pointer-events-auto flex place-items-center gap-2 font-black text-amber-50 hover:text-blue-300"
                    href="https://ysky.app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsAppIndicator className="text-3xl font-black"/>
                    </a>
                     */
                }
            </div>
        </div>
    )
}