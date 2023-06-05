'use client';
import React from 'react';
import Content from '@/src/app/splash';
import Header from '@/src/app/header';

const color = '#fddf19';
export default function Page() {

  return (
    <div className='flex-auto min-h-screen w-full min-w-fit'>
      <Header />
      <Content />
    </div>
  );
}
