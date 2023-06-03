"use client";
import React from "react";
import Support from "@/app/support";

export default function Header2() {

    return (
        /*
        items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none
        BsBalloonHeartFill
         */
        // bg-black shadow-[0_10px_10px_10px_rgba(0,0,0,1.0)]
        <div
            className="fixed flex flex-nowrap top-0 pr-4 min-w-max w-full bg-green-600 min-h-12">
            <div className="relative bottom-0 text-4xl gap-4 text-left h-12">
                <img
                    className="my-auto h-fit"
                    src="/ysky.png"
                    alt="ysky Logo"
                />
            </div>
            <div className="relative bottom-0 text-4xl gap-4 text-right">
                <Support/>
            </div>
        </div>
    )
}