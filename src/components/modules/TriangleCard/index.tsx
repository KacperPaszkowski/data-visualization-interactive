import { use, useEffect, useState } from 'react';
import styles from "./TriangleCard.module.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

import { ISample } from '@/components/elements/PiMonteCarlo/chartData';

import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

import PiMonteCarlo from '@/components/elements/Triangle';

export default function TriangleCard() {
  const [aSide, setASide] = useState(0.6);
  const [bSide, setBSide] = useState(0.6);
  const [cSide, setCSide] = useState(0);

  const getDistance = (point1: ISample, point2: ISample): number => {
    const xDiff = point2.x - point1.x;
    const yDiff = point2.y - point1.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  const handleTriangleChange = (pointA: ISample, pointB: ISample, pointC: ISample) => {
    setASide(pointC.x)
    setBSide(pointB.y)
    setCSide(getDistance(pointB, pointC))
  }

  const round = (number: number, decimal: number) => {
    return (Math.round(number * 10**decimal) / 10**decimal).toFixed(decimal)
  }

  useEffect(() => {
    setCSide(
      getDistance({x: 0.6, y: 0}, {x: 0, y: 0.6})
    )
  }, [])

  return (
    <Paper 
        elevation={0}
        className={styles.rightContainer}
    >
        <Box className={styles.descriptionContrainer}>
            <Typography variant='h4'>Trigonometry</Typography>
            <Paper 
            elevation={1}
            className={styles.description}
            >
              <Typography variant='body1'>
              Trigonometry is a branch of mathematics that deals with the relationships between the angles and sides of triangles. 
              In right triangles, trigonometry focuses on the ratios between the lengths of the sides and the angles.
              </Typography>
              <Typography 
                variant='body1'
                sx={{
                  marginTop: '50px',
                  padding: '0 150px 0 150px'
                }}
              >
                  Try moving triangle verticies to see how this affects different trigonometric functions.
              </Typography>

              <Typography 
                variant='h5'
                sx={{
                  marginTop: '30px'
                }}
              >
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  paddingTop: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '30px'
                }}
              >
                <Box>
                  <Typography variant='h6'>
                    <Latex>
                      {String.raw`$\sin \alpha = \frac{b}{c} = \frac{${round(bSide, 3)}}{${round(cSide, 3)}} \approx ${round(bSide/cSide, 3)}$`}
                    </Latex>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h6'>
                    <Latex>
                      {String.raw`$\cos \alpha = \frac{a}{c} = \frac{${round(aSide, 3)}}{${round(cSide, 3)}} \approx ${round(aSide/cSide, 3)}$`}
                    </Latex>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h6'>
                    <Latex>
                      {String.raw`$\tan \alpha = \frac{a}{b} = \frac{${round(aSide, 3)}}{${round(bSide, 3)}} \approx ${round(aSide/bSide, 3)}$`}
                    </Latex>
                  </Typography>
                </Box>
              </Box>
            </Paper>
        </Box>
        
        <Box>
            <PiMonteCarlo 
              width={500} 
              height={500}
              onChange={handleTriangleChange}
            />
        </Box>

    </Paper>
  )
}
