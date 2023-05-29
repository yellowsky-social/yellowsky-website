"use client";
import React from "react";
import {FaHourglassStart} from "react-icons/all";
import Image from "next/image";

export default function Content() {

    return (
        <div className="relative place-items-center mx-auto max-w-screen h-screen pt-12 p-1 md:pl-4 sm:pr-4">
            <div className="max-w-prose w-fit mx-auto">
                <Image
                    className="relative mx-auto dark:drop-shadow-[0_0_0.3rem_#ffffff70 w-full sm:mt-32 lg:mt-8"
                    src="/ysky.png"
                    alt="ysky Logo"
                    width={300}
                    height={100}
                    priority
                />

                <div className="flex font-black lg:text-8xl text-6xl w-fit mx-auto">
                    <h1 className="flex bg-black text-yellow-400 pl-5 pr-5 pb-3 hover:text-blue-300">yellow</h1>
                    <h1 className="flex text-black pl-3 pb-3 hover:bg-blue-300">sky</h1>
                </div>
                <div className="text-black font-bold text-2xl lg:text-4xl w-fit mx-auto text-center">
                    <h1 className="font-black pl-3 pr-3 pb-3">Next generation platform</h1>
                </div>
            </div>

            {
                /*
                <div className="flex font-black lg:text-6xl sm:text-6xl w-fit mx-auto pt-48">
                <a className="flex bg-black p-5 text-yellow-400 text-center border-8 border-black hover:text-black hover:bg-yellow-400 hover:border-black"
                href="https://ysky.app"
                   target="_blank"
                >JOIN NOW</a>
            </div>
                 */
            }

            <div className="flex font-black lg:text-6xl text-4xl w-fit mx-auto p-8">
                <h1 className="flex text-black text-center border-8 border-black p-4"><FaHourglassStart
                    className="m-auto"/> Work
                    in progress</h1>
            </div>
        </div>
    )
}