import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LoginBox from '@/src/app/login-box';
import { useRouter } from 'next/navigation';

type LogoHeaderState = {
  isLoggedIn: boolean
  login: (userHandle: string, password: string) => Promise<void>
  logout: Function
}

export default function Header({ isLoggedIn, login, logout }: LogoHeaderState) {
  const [showLogin, toggleShowLogin] = useState(false);
  let router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      toggleShowLogin(false);
    }
  }, [isLoggedIn]);

  // bg-teal-500 p-6
  return (
    <nav
      className='top-0 flex w-full items-center h-fit justify-between flex-wrap bg-yellow-400 px-6 py-2 z-10 border-b-4 border-black border-solid'>
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
      <div className='w-auto flex items-center text-black font-black'>
        <div className='text-sm lg:flex-grow'>
          <a href='/about'
             className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 border-solid border-l-4 border-black pl-1 pr-3'>
            About
          </a>
        </div>

        {isLoggedIn ?
          <>
            <div className='text-sm lg:flex-grow'>
              <Link href='/imageboard'
                    className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 border-solid border-l-4 border-black pl-1 pr-3'>
                Imageboard
              </Link>
            </div>
            <div className='text-sm lg:flex-grow'>
              <button onClick={() => {
                logout();
              }}
                      className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4 border-solid border-l-4 border-black pl-1 pr-3'>
                Logout
              </button>
            </div>
          </>
          :
          <div className='text-sm lg:flex-grow'>
            <button onClick={() => {
              toggleShowLogin(!showLogin);
            }}
                    className='block mt-4 lg:inline-block lg:mt-0 hover:text-white border-solid border-l-4 border-black pl-1'>
              Login
            </button>
          </div>
        }

        <div>

        </div>
      </div>

      {showLogin &&
        <LoginBox login={login} />
      }
    </nav>
  );
}