'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';

import Favicon from '@/src/components/Favicon';
import Footer from '@/src/app/footer';
import Header from '@/src/app/header';
import { isLoggedIntoBluesky, loginBluesky, logoutBluesky } from '@/src/app/services/bluesky-account';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  let router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIntoBluesky().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    }).catch(reason => {

    });
  }, []);

  async function login(userHandle: string, password: string) {
    return loginBluesky(userHandle, password).then(() => {
      setIsLoggedIn(true);
      setTimeout(args => {
        router.refresh();
      }, 100);
    });
  }

  const logout = () => {
    logoutBluesky();
    setIsLoggedIn(false);
    alert('Logout successfully');
    router.push('/');
  };

  return (
    <html lang='en'>
    <head>
      <title>Yellow Sky - next generation platform</title>
      <Favicon />
    </head>
    <body className={inter.className}>
    <main className='bg-yellow-400 min-h-screen min-w-fit flex-auto'>
      <Header login={login} isLoggedIn={isLoggedIn} logout={logout} />
      {children}
      <Footer />
    </main>
    </body>
    </html>
  );
}
