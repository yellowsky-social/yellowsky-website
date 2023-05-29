"use client";
import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {BsBalloonHeartFill} from "react-icons/bs";
import {MdOutlineAlternateEmail} from "react-icons/md";

const color = '#fddf19';
export default function Support() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <button type="button" className="text-red-600" onClick={() => {
            openModal()
        }}>
            <BsBalloonHeartFill/>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold font-mono leading-6 text-yellow-400"
                                    >
                                        Hey there,
                                    </Dialog.Title>
                                    <div className="mt-6">
                                        <p className="text-sm text-yellow-400 font-semibold font-mono">
                                            I am fullstack developer, working at a small start-up.
                                            <br/>
                                            Currently working on my thesis and I will shortly graduate from university.
                                            <br/>
                                            Recently I`&apos;ve discovered Bluesky and especially the AT Protocol and I
                                            was extremely impressed and curious about the future. Such a platform and
                                            standard, I was looking for a long time, to build software for.
                                            <br/>
                                            The last years I had various ideas for social platforms and devised around
                                            that ideas. I also had started a small blockchain project to learn more
                                            about that technology and I am fascinated by an open future without such
                                            centralized power.
                                            Now I really would like to use the AT Protocol to build a project around
                                            that.
                                            <br/>
                                            <br/>
                                            I plan to build some smaller projects using the Bluesky app to get some
                                            experience with AT Proto while planning an own platform.
                                            Right now, I cannot tell what future brings but you might enjoy it and maybe
                                            some of you like to follow me and my projects over the next years.
                                            <br/>
                                            <br/>
                                            Sadly it is still invitation only and as it seems I`&apos; kind of late to
                                            the pary I guess I will need to wait a long time to get my hands on the blue
                                            sky.
                                            <br/>
                                            If anyone would like to support this, not yet existing, project, I will be
                                            eternally grateful if one would share me an invitation.
                                            <br/>
                                            <p className="flex">Feel free to send me a code to
                                                invite<MdOutlineAlternateEmail/>ysky.app</p>
                                            <br/>
                                            All other people, I would like to ask to have a visit from time to time to
                                            see when this project starts.
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md bg-black border-yellow-400 border-4 px-4 py-2 text-sm text-yellow-400 font-semibold font-mono hover:bg-yellow-400 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </button>
    )
}
