'use client';
import React, { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';
import ImageWrapper from '@/src/app/imageboard/components/ImageWrapper';
import { LoadedPostResult } from '@/src/app/imageboard/types/content-types';
import { fetchTimelineImages } from '@/src/app/imageboard/services/bluesky-images';


export default function ImageBoard() {
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  let initialState: LoadedPostResult = {
    posts: [],
  };
  const [loadedPosts, setLoadedPosts] = useState(initialState);

  async function fetchImages() {
    try {
      const fetchedPosts = await fetchTimelineImages(50, loadedPosts.cursor);
      const updatePosts = loadedPosts.posts;
      for (let p1 of fetchedPosts.posts) {
        if (updatePosts.findIndex((p2) => {
          return p1.id === p2.id;
        }) === -1) {
          updatePosts.push(p1);
        } else {
          console.log('Duplicate');
        }
      }
      setLoadedPosts({
        posts: updatePosts,
        cursor: fetchedPosts.cursor,
      });
    } catch (error) {
      setError(error + '');
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchImages().then(() => {
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div
        className='place-items-center flex max-w-screen min-h-screen pt-12 lg:pt-2 p-1 md:pl-4 sm:pr-4 bg-green-200'>
        <LoadingIcons.ThreeDots className='m-auto text-black' fill='#000000' />
      </div>
    );
  }

  return (
    <div
      className='static place-items-center mx-auto max-w-screen min-h-full p-1 pt-12 lg:pt-2 md:pl-4 sm:pr-4 bg-yellow-400 pb-32'>
      {/*

            <div className="max-w-prose w-fit mx-auto">
            </div>
            */}

      <div className='place-items-center mx-auto max-w-screen pl-5 pr-8 pt-2'>
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

        {error !== '' ?
          <div className='mx-auto my-32 w-full text-center'>
            <p className='font-black text-red-600 text-4xl'>{error}</p>
          </div>
          :


          <div className='border-4 border-black p-4'>
            <div
              className='static grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-auto'>
              {loadedPosts.posts.sort((a, b) => {
                return new Date(b.when).getTime() - new Date(a.when).getTime();
              }).map((post, index) => {
                const isSelected = selectedImage === post.id;
                return (
                  /*
                  width={image.imageWidth > 200 ? 200 : image.imageWidth}
                              height={image.imageWidth > 200 ? 200 / image.imageWidth * image.imageHeight : image.imageHeight}
                   */
                  <ImageWrapper key={post.id + '' + index}
                                post={post}
                                isSelected={isSelected}
                                select={() => {
                                  setSelectedImage(isSelected ? '' : post.id);
                                }} />
                );
              })}
            </div>

            {!isLoading &&
              <div className='mx-auto my-4 w-full text-black text-center'>
                {isRefreshing ?
                  <LoadingIcons.ThreeDots className='m-auto' fill='#000000' />
                  :
                  <button onClick={() => {
                    if (!isRefreshing) {
                      setRefreshing(true);
                      fetchImages().then(() => {
                        setRefreshing(false);
                      });
                    }
                  }}>
                    <p className='font-black text-4xl hover:text-amber-100'>More</p>
                  </button>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}