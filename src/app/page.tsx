"use client";
import React from "react";
import Content from "@/src/app/content";
import Footer from "@/src/app/footer";
import Details from "@/src/app/details";
import Header from "@/src/app/header";

const color = '#fddf19';
export default function Home() {

    return (
        <main className="min-h-screen bg-yellow-400 w-full min-w-fit">
            {
                /*
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Get started by editing&nbsp;
              <code className="font-mono font-bold">app/page.tsx</code>
            </p>
          </div>
                 */
            }

            <Header/>

            <Content/>
            <Details/>

            <Footer/>
        </main>
    )
}
