import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import Favicon from '@/src/components/Favicon';
import Footer from '@/src/app/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Yellow Sky',
  description: 'Next generation local networking',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
    <head>
      <title>Yellow Sky - next generation platform</title>
      <Favicon />
    </head>
    <body className={inter.className}>
    <main className='bg-yellow-400 min-h-full min-w-fit flex-auto'>

      {children}

      <Footer />
    </main>
    </body>
    </html>
  );
}
