import React, { useState } from 'react';

type LoginBoxProps = {
  login: (handle: string, password: string) => boolean
  isLoading: boolean
}

export default function LoginBox({ login, isLoading }: LoginBoxProps) {

  const [userHandle, setUserHandle] = useState('');
  const [password, setPassword] = useState('');

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
    if (userHandle === '' || password === '') {
      return;
    }

    // alert('Login is not possible right now. Keep patient!');

    let isSuccessful = login(userHandle, password);
    if (isSuccessful) {
      setUserHandle('');
      setPassword('');
    }
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
      className='w-full flex flex-wrap h-fit mt-2 pb-2 items-center text-black font-black border-t-2 border-black border-solid'>
      <div className='flex flex-col w-full sm:w-3/5 md:w-2/5 lg:w-2/5 mx-auto mt-4'>
        <p className='font-black'>User Handle</p>
        <input type='text'
               name='username'
               value={'@' + userHandle}
               onChange={handleChange}
               className={'border-solid border-' + determineValidityColor(userHandle, password) + ' border-4'} />
      </div>
      <div className='flex flex-col w-full sm:w-3/5 md:w-2/5 lg:w-2/5 mx-auto mt-4'>
        <p className='font-black'>Password</p>
        <input type='password'
               name='password'
               value={password}
               onChange={handleChange}
               className={'border-solid border-' + determineValidityColor(password) + ' border-4'} />
      </div>
      <div
        className={'flex flex-col w-full sm:w-3/5 md:w-2/5 lg:w-2/5 mx-auto mt-8 p-2 border-black border-4 border-solid active:bg-' + determineValidityColor(userHandle, password)}>
        <button type='submit' onClick={() => callLogin()}>Login
        </button>
      </div>

    </div>
  );
}