'use client';

import React, { useState } from 'react';
import { loginBluesky } from '@/src/app/services/bluesky-account';
import LoadingIcons from 'react-loading-icons';

type LoginBoxProps = {
  onLogin: Function
}

export default function LoginBox({ onLogin }: LoginBoxProps) {

  const [userHandle, setUserHandle] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'username') {
      let v = e.currentTarget.value.replace('@', '');
      setUserHandle(v);
      return {
        ...e.currentTarget,
        value: v,
      };
    } else if (e.currentTarget.name === 'password') {
      setPassword(e.currentTarget.value);
      return {
        ...e.currentTarget,
        v: password,
      };
    }
  };

  const callLogin = () => {
    if (userHandle === '') {
      setError('Missing handle');
      return;
    }

    if (password === '') {
      setError('Missing password');
      return;
    }

    // alert('Login is not possible right now. Keep patient!');

    setError('');
    setLoading(true);
    loginBluesky(userHandle, password).then(() => {
      setUserHandle('');
      setPassword('');
      setLoading(false);
      setError('');
      onLogin();
    }).catch((error) => {
      setLoading(false);
      setError(error);
    });

  };

  const isValid = (properties: string[]): boolean => {
    return properties.filter(value => {
      return value === '';
    }).length === 0;
  };

  const determineValidityColor = (...properties: string[]): string => {
    return isValid(properties) ? 'green-500' : 'red-500';
  };

  return (
    <div
      className='w-full flex flex-wrap h-fit mt-2 pb-2 items-center text-black font-black'>
      <div className='flex flex-col w-full sm:w-3/5 md:w-2/5 lg:w-2/5 mx-auto mt-4'>
        <p className='font-black'>User Handle</p>
        <input className={'border-solid border-' + determineValidityColor(userHandle, password) + ' border-4'}
               type='text'
               name='username'
               value={'@' + userHandle}
               onChange={handleChange} />
      </div>
      <div className='flex flex-col w-full sm:w-3/5 md:w-2/5 lg:w-2/5 mx-auto mt-4'>
        <p className='font-black'>Password</p>
        <input className={'border-solid border-' + determineValidityColor(password) + ' border-4'}
               type='password'
               name='password'
               value={password}
               onChange={handleChange} />
      </div>

      <div
        className={'flex flex-col w-full sm:w-3/5 md:w-2/5 lg:w-2/5 mx-auto mt-8'}>
        {error !== '' &&
          <div className={'w-full text-red-600 my-4 text-center'}>
            {error}
          </div>
        }

        <div
          className={'p-2 text-center border-black border-4 border-solid active:bg-' + determineValidityColor(userHandle, password)}>
          {isLoading && <LoadingIcons.ThreeDots className='w-full pb-2' />}
          <button
            type='submit'
            onClick={() => callLogin()}>Login
          </button>
        </div>
      </div>

    </div>
  );
}