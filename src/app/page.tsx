'use client';
import React from 'react';
import Content from '@/src/app/splash';
import LogoHeader from '@/src/app/logo-header';

const color = '#fddf19';
export default function Page() {

  return (
    <div className='flex-auto min-h-screen w-full min-w-fit'>
      <LogoHeader />
      <Content />
    </div>
  );
}
