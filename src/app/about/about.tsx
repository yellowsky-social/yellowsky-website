import React from 'react';

export default function About() {

  return (
    <div
      className='min-w-full h-auto m-auto max-w-prose pl-8 pr-8 pt-8 bg-black'>
      <div className='m-auto h-full'>
        <div className='flex font-black lg:text-8xl text-6xl w-fit mx-auto'>
          <h1
            className='flex bg-black p-5 pt-3 text-yellow-400 text-center border-8 border-yellow-400 hover:border-yellow-400 hover:text-black hover:bg-yellow-400'>yellow
            is the future</h1>
        </div>

        <div className='flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-16'>
          <h1
            className='flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:border-blue-400 hover:text-black hover:bg-blue-400'>SKY</h1>
        </div>
        <div className='flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-5'>
          <h1
            className='flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:border-red-400 hover:text-black hover:bg-red-400'>IS
            THE</h1>
        </div>
        <div className='flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-5'>
          <h1
            className='flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:border-green-400 hover:text-black hover:bg-green-400'>LIMIT</h1>
        </div>

        {
          /*
          <div className='flex font-black lg:text-6xl text-5xl w-fit mx-auto pt-16'>
          <a
            className='flex bg-black p-5 text-yellow-400 text-center border-8 border-yellow-400 hover:text-black hover:bg-yellow-400 hover:border-yellow-400'
            href='https://ysky.app'
            target='_blank'
          ><BsFillArrowUpRightSquareFill className='pr-3 m-auto' />JOIN NOW</a>
        </div>
           */
        }
      </div>
    </div>
  );
}