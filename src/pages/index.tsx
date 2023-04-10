import Head from 'next/head'
import Box from '@mui/material/Box';

import LinearRegressionCard from '@/components/modules/LinearRegressionCard';
import PiMonteCarloCard from '@/components/modules/PiMonteCarloCard';
import TriangleCard from '@/components/modules/TriangleCard';

export default function Home() {

  return (
    <>
      <Head>
        <title>Interactive data visualization</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box 
        sx={{
          padding: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '100px'
        }}
      >
        <LinearRegressionCard/>
        <PiMonteCarloCard/>
        <TriangleCard/>
      </Box>
    </>
  )
}
