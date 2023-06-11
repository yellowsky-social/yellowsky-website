'use client';
import React, { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';
import ImageWrapper from '@/src/app/imageboard/components/ImageWrapper';
import { BoardPost } from '@/src/app/imageboard/types/content-types';
import { BoardType, fetchImages } from '@/src/app/imageboard/services/bluesky-images';


export default function ImageBoard() {
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isLoadingMorePosts, setMorePostLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(BoardType.FEED);

  let initialState: BoardPost[] = [];
  const [loadedPosts, setLoadedPosts] = useState(initialState);
  let initialCursor: string | undefined;
  const [cursor, setCursor] = useState(initialCursor);
  let initialRefreshInterval: NodeJS.Timer | undefined;
  const [refreshInterval, setRefreshInterval] = useState(initialRefreshInterval);

  useEffect(() => {
    initialLoadImages(selectedBoard);

    return () => {
      if (refreshInterval) {
        console.log('Clear refreshing');
        clearInterval(refreshInterval);
      }
    };
  }, []);

  const addBoardPosts = (posts: BoardPost[], override?: boolean) => {
    let updatePosts = override ? [] : loadedPosts;
    for (let p1 of posts) {
      if (updatePosts.findIndex((p2) => {
        return p1.cid === p2.cid;
      }) === -1) {
        updatePosts.push(p1);
      } else {
        console.log('Duplicate');
      }
    }
    updatePosts = updatePosts.sort((a, b) => {
      return new Date(b.when).getTime() - new Date(a.when).getTime();
    });
    console.log('Total Posts: ' + updatePosts.length);
    setLoadedPosts(updatePosts);
  };

  async function loadLatestImages(boardType: BoardType, imageCount: number, override?: boolean) {
    try {
      const fetchedPosts = await fetchImages(boardType, imageCount);
      console.log('Should fetch ' + imageCount + ' images. Got ' + fetchedPosts.posts.length);
      addBoardPosts(fetchedPosts.posts, override);
      if (override) {
        setCursor(fetchedPosts.cursor);
      }
    } catch (error) {
      setError(error + '');
      return Promise.reject(error);
    }
  }

  async function loadOlderImages() {
    try {
      const fetchedPosts = await fetchImages(selectedBoard, 50, cursor);
      addBoardPosts(fetchedPosts.posts);
      setCursor(fetchedPosts.cursor);
    } catch (error) {
      setError(error + '');
      return Promise.reject(error);
    }
  }

  async function initialLoadImages(boardType: BoardType): Promise<void> {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    setLoading(true);
    return loadLatestImages(boardType, boardType !== selectedBoard ? 50 : 15, boardType !== selectedBoard).then(() => {
      setSelectedBoard(boardType);
      setLoading(false);
      setRefreshInterval(setInterval(() => {
        loadLatestImages(boardType, 15);
      }, 5000));
    }).catch(reason => {
      setLoading(false);
      setError(reason);
    });
  }

  const getSelectedBoardCSS = (type: BoardType) => {
    let css = '';
    if (type === selectedBoard) {
      css += 'bg-green-500';
    } else {
      css += 'bg-red-500';
    }
    if (type === selectedBoard) {
      // css += ' ring-4 ring-green-500';
    } else {
      // css += ' ring-4 ring-red-500';
    }
    return css;
  };

  return (
    <div
      className='static place-items-center mx-auto max-w-screen min-h-full p-1 pt-12 lg:pt-2 md:pl-4 sm:pr-4 bg-yellow-400 pb-32'>

      <div className='place-items-center mx-auto max-w-screen md:pl-5 md:pr-5 pt-2'>

        <div className='border-4 border-black p-4'>

          <div className='flex-col my-4 w-full text-black text-center'>
            <p className='font-bold text-2xl'>Select board:</p>
            <div className=''>
              <button className={'squared-md px-8 py-3' + ' ' + getSelectedBoardCSS(BoardType.FEED)}
                      disabled={isLoading || selectedBoard === BoardType.FEED}
                      onClick={() => {
                        initialLoadImages(BoardType.FEED);
                      }}>
                <p className='font-bold text-xl'>Global</p>
              </button>
              <button className={'squared-md px-8 py-3' + ' ' + getSelectedBoardCSS(BoardType.TIMELINE)}
                      disabled={isLoading || selectedBoard === BoardType.TIMELINE}
                      onClick={() => {
                        initialLoadImages(BoardType.TIMELINE);
                      }}>
                <p className='font-bold text-xl'>Own</p>
              </button>
            </div>
          </div>

          {error !== '' &&
            <div className='mx-auto my-32 text-center border-3 border-solid bg-red-400 py-16 lg:mx-32'>
              <p className='font-black text-red-600 text-4xl'>{error}</p>
            </div>
          }

          {isLoading &&
            <div
              className='place-items-center flex max-w-screen min-h-screen pt-12 lg:pt-2 p-1 md:pl-4 sm:pr-4 bg-green-200'>
              <LoadingIcons.ThreeDots className='m-auto text-black' fill='#000000' />
            </div>
          }

          {!isLoading && loadedPosts && loadedPosts.length > 0 && <div
            className='static grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-auto'>
            {loadedPosts.map((post, index) => {
              const isSelected = selectedImage === post.cid;
              return (
                /*
                width={image.imageWidth > 200 ? 200 : image.imageWidth}
                            height={image.imageWidth > 200 ? 200 / image.imageWidth * image.imageHeight : image.imageHeight}
                 */
                <ImageWrapper key={post.cid + '' + index}
                              post={post}
                              isSelected={isSelected}
                              select={() => {
                                setSelectedImage(isSelected ? '' : post.cid);
                              }} />
              );
            })}
          </div>
          }

          {!isLoading &&
            <div className='mx-auto my-4 w-full text-black text-center'>
              {isLoadingMorePosts ?
                <LoadingIcons.ThreeDots className='m-auto' fill='#000000' />
                :
                <button onClick={() => {
                  if (!isLoadingMorePosts) {
                    setMorePostLoading(true);
                    loadOlderImages().then(() => {
                      setMorePostLoading(false);
                    });
                  }
                }}>
                  <p className='font-black text-4xl hover:text-amber-100'>More</p>
                </button>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}