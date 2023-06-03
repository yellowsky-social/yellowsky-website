"use client";
import React, {useEffect, useState} from "react";
import {fetchImages, ImageBoardItem} from "@/app/utils/mock-image-fetcher";
import LoadingIcons from 'react-loading-icons'
import ImageWrapper from "@/app/imageboard/ImageWrapper";


export default function ImageBoard() {
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setLoading] = useState(true);

    let initialState: ImageBoardItem[] = [];
    const [images, setImages] = useState(initialState);
    useEffect(() => {
        setLoading(true);
        fetchImages().then(fetchedImages => {
            setImages(fetchedImages);
            setLoading(false);
        });
    }, [])

    if (isLoading) {
        return (
            <div
                className="place-items-center flex max-w-screen min-h-screen pt-12 lg:pt-2 p-1 md:pl-4 sm:pr-4 bg-green-200">
                <LoadingIcons.ThreeDots className="m-auto text-black" fill="#000000"/>
            </div>
        )
    }

    return (
        <div
            className="static place-items-center mx-auto max-w-screen min-h-screen p-1 pt-12 lg:pt-2 lg:pb-48 md:pl-4 sm:pr-4">
            {/*

            <div className="max-w-prose w-fit mx-auto">
            </div>
            */}

            <div className="place-items-center mx-auto max-w-screen pl-5 pr-8 pt-2">
                {
                    /*
                    <Gallery images={images.map(image => {
                    return {
                        key: image.id,
                        src: image.imageUrl,
                        width: image.imageWidth,
                        height: image.imageHeight,
                        thumbnailCaption: (
                            selectedImage === image.id
                                ? <ImageDetails image={image}/>
                                :
                                <p className="bg-yellow-400 text-sm text-black font-black font-mono">{image.description}</p>)
                    }
                })} enableImageSelection={false}
                         onClick={(key, image) => {
                             setSelectedImage(image.key)
                         }}
                />
                     */
                }
                <div className="border-4 border-black p-4">
                    <div
                        className="static grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-auto">
                        {images.map((item) => {
                            const isSelected = selectedImage === item.post.id;
                            return (
                                /*
                                width={image.imageWidth > 200 ? 200 : image.imageWidth}
                                            height={image.imageWidth > 200 ? 200 / image.imageWidth * image.imageHeight : image.imageHeight}
                                 */
                                <ImageWrapper key={item.post.id}
                                              post={item.post}
                                              isSelected={isSelected}
                                              select={() => {
                                                  setSelectedImage(isSelected ? "" : item.post.id)
                                              }}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}