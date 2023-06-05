'use client';
import React from 'react';

export default function Header() {
  // bg-teal-500 p-6
  return (
    <nav
      className='relative top-0 flex w-full items-center justify-between flex-wrap bg-yellow-400 px-6 py-2 border-dashed border-b-1 border-indigo-600 z-10'>
      <a className='flex items-center flex-shrink-0 text-white mr-6' href='/'>
        <img
          className='relative my-auto mr-4 h-12'
          src='/ysky.png'
          alt='ysky Logo'
        />
        <span className='text-3xl font-black text-black tracking-tight'>YellowSky</span>
      </a>
      {
        /*
<div className="block lg:hidden">
<button
    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
    </svg>
</button>
</div>
*/}
      <div className='w-auto flex items-center text-black'>
        <div className='text-sm lg:flex-grow'>
          <a href='/about'
             className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
            About
          </a>
          {
            /*
            <a href="#responsive-header"
           className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Docs
        </a>
        <a href="#responsive-header"
           className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Examples
        </a>
        <a href="#responsive-header"
           className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Blog
        </a>
             */
          }
        </div>
        <div>

        </div>
      </div>
    </nav>
  );
}