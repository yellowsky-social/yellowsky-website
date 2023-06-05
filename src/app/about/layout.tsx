import { Inter } from 'next/font/google';
import React from 'react';
import LogoHeader from '@/src/app/logo-header';

const inter = Inter({ subsets: ['latin'] });
export default function AboutLayout({
                                      children, // will be a page or nested layout
                                    }: {
  children: React.ReactNode;
}) {
  return (
    <section className='w-full min-w-fit bg-black'>
      <LogoHeader />

      {children}
    </section>
  );
}
