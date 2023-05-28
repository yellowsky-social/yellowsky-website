"use client";
import React from "react";
import {BsFillArrowUpRightSquareFill} from "react-icons/all";

export default function Details() {

    return (
        <div
            className="min-w-full min-h-screen max-w-prose bg-black shadow-[0_35px_80px_150px_rgba(0,0,0,1.0)] pt-16 pl-8 pr-8">
            <div className="flex font-black lg:text-8xl text-6xl w-fit mx-auto">
                <h1 className="flex bg-black p-5 pt-3 text-yellow-400 text-center border-8 border-yellow-400 hover:border-yellow-400 hover:text-black hover:bg-yellow-400">yellow
                    is the future</h1>
            </div>

            <div className="flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-16">
                <h1 className="flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:border-blue-400 hover:text-black hover:bg-blue-400">SKY</h1>
            </div>
            <div className="flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-5">
                <h1 className="flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:border-red-400 hover:text-black hover:bg-red-400">IS
                    THE</h1>
            </div>
            <div className="flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-5">
                <h1 className="flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:border-green-400 hover:text-black hover:bg-green-400">LIMIT</h1>
            </div>

            <div className="flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-16 pb-32">
                <a className="flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:text-black hover:bg-yellow-400 hover:border-yellow-400"
                   href="https://ysky.app"
                   target="_blank"
                ><BsFillArrowUpRightSquareFill className="pr-3"/>JOIN NOW</a>
            </div>
        </div>
    )
}