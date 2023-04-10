import { use, useEffect, useState } from 'react';
import styles from "./PiMonteCarloCard.module.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'

import { ISample } from '@/components/elements/PiMonteCarlo/chartData';

import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

import PiMonteCarlo from '@/components/elements/PiMonteCarlo';

const generateNewSamples = (maxSamples: number): ISample[] => {
  var newSamples = []
  for(var i = 0; i < maxSamples; i++)
  {
    newSamples.push({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    })
  }
  return newSamples
}

const MAX_SAMPLES = 1000;

export default function PiMonteCarloCard() {
    const [samples, setSamples] = useState(generateNewSamples(MAX_SAMPLES));
    const [numberOfSamples, setNumberOfSamples] = useState(Math.round(MAX_SAMPLES/2));
    const [insideCircle, setInsideCircle] = useState(0);
    const [allSamples, setAllSamples] = useState(1);

  return (
    <Paper 
        elevation={0}
        className={styles.rightContainer}
    >
        <Box className={styles.descriptionContrainer}>
            <Typography variant='h4'>π approximation</Typography>
            <Paper 
            elevation={1}
            className={styles.description}
            >
              <Typography variant='body1'>
                Monte Carlo method is a technique that uses random sampling to approximate numerical solutions to complex problems. 
                In the case of approximating the value of pi, 
                we use this method by simulating random points within a square, 
                and analyzing how many of these points fall within a circle inscribed in the square.
              </Typography>
              <Typography 
                variant='body1'
                sx={{
                  marginTop: '50px',
                  padding: '0 150px 0 150px'
                }}
              >
                  Try increasing or decreasing number of samples using slider below.
                  You can also generate completely new set of samples.
              </Typography>

              <Typography 
                variant='h5'
                sx={{
                  marginTop: '30px'
                }}
              >
                <Latex>{String.raw`$\pi \approx 4 * \frac{inside}{all} = 4 * \frac{${insideCircle}}{${allSamples}} \approx ${(Math.round(4*insideCircle/allSamples * 1000)/1000).toFixed(3)}$`}</Latex>
              </Typography>

              <Slider 
                defaultValue={numberOfSamples} 
                min={1}
                step={1}
                max={MAX_SAMPLES}
                sx={{
                  marginTop: '30px'
                }}
                onChange={(event, value) => {
                    if (typeof value === 'number') {
                        setNumberOfSamples(value);
                    }
                }} 
                aria-label="Default" 
                valueLabelDisplay="auto" />

              <Button 
                onClick={() => setSamples(generateNewSamples(MAX_SAMPLES))}
                sx={{
                  marginTop: '25px'
                }}
                variant='contained'
              >
                  Reset chart
              </Button>
            </Paper>
        </Box>
        
        <Box>
            <PiMonteCarlo 
              width={500} 
              height={500} 
              samples={samples} 
              numberOfSamples={numberOfSamples} 
              onChange={(insideCircle, all) => {
                setInsideCircle(insideCircle);
                setAllSamples(all);
              }}
            />
        </Box>

    </Paper>
  )
}
