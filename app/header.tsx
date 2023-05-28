"use client";
import React, {useState} from "react";
import {BsBalloonHeartFill} from "react-icons/all";

export default function Header() {
    const [showSupport, toggleSupportModal] = useState(false)

    return (
        /*
        items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none
        BsBalloonHeartFill
         */
        <div
            className="container">
            <div className="fixed flex bottom-0 bg-black pb-3 text-2xl gap-4">
                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Button
                    <BsBalloonHeartFill/>
                </button>
                <a
                    className="pointer-events-auto flex place-items-center gap-2 font-black text-amber-50 hover:text-blue-300"
                    href="https://atproto.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="">EMPOWERED BY</p>
                    <div className="flex">
                        <img className="h-8"
                             src="/atproto.png"
                             alt="AT Protocol"
                             height={24}
                        />
                        <p className="">PROTO</p>
                    </div>
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