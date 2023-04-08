import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Inter } from 'next/font/google'
import PiMonteCarlo from '@/components/modules/PiMonteCarlo';
import LinearRegression from '@/components/modules/LinearRegression';
import Triangle from '@/components/modules/Triangle';

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <PiMonteCarlo width={500} height={500} maxSamples={2000} onChange={() => {}}/>
      <LinearRegression width={500} height={500}/>
      <Triangle width={500} height={500} onChange={console.log}/>
    </>
  )
}
