import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import styles from './PiMonteCarlo.module.css'
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { data, options, ISample } from './chartData';

interface PiMonteCarloProps{
    width: number;
    height: number;
    maxSamples: number;
    onChange: (insideCircle: number, all: number) => void;
}

const defaultProps: Partial<PiMonteCarloProps> = {
    width: 300,
    height: 300,
    maxSamples: 1000,
    onChange: () => {},
}

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

const isInsideCircle = (sample: ISample): boolean => (
    sample.x ** 2 + sample.y ** 2 < 1
)

function PiMonteCarlo(props: PiMonteCarloProps) {
    const maxSamples: number = props.maxSamples;
    const [numberOfSamples, setNumberOfSamples] = useState<number>(Math.round(maxSamples / 2));
    const [samples, setSamples] = useState<ISample[]>([]);
    const chartRef = useRef<Chart<"scatter"> | null>(null);

    data.datasets[0].data = samples.slice(0, numberOfSamples).filter((sample) => !isInsideCircle(sample))
    data.datasets[1].data = samples.slice(0, numberOfSamples).filter(isInsideCircle)

    useEffect(() => {
        setSamples(generateNewSamples(maxSamples))
    }, [])

    useEffect(() => {
        data.datasets[0].data = samples.slice(0, numberOfSamples).filter((sample) => !isInsideCircle(sample))
        data.datasets[1].data = samples.slice(0, numberOfSamples).filter(isInsideCircle)
        chartRef.current ? chartRef.current.data = data : {}
        chartRef.current?.update()

        var insideCircle = samples.slice(0, numberOfSamples).filter(isInsideCircle).length
        props.onChange(insideCircle, numberOfSamples)
    }, [numberOfSamples, samples])

    return ( 
        <>
        <div 
          className={styles.container}
          style={{
            width: props.width
          }}
          >
            <Scatter
              data={data}
              options={options}
              width={props.width}
              height={props.height}
              style={{ display: 'inline-block'}}
              ref={chartRef}
            />

            <Typography>Number of samples</Typography>

            <Slider 
              defaultValue={numberOfSamples} 
              min={1}
              step={1}
              max={maxSamples} 
              sx={{
                  width: props.width - 20,
              }} 
              onChange={(event, value) => {
                  if (typeof value === 'number') {
                      setNumberOfSamples(value);
                  }
              }} 
              aria-label="Default" 
              valueLabelDisplay="auto" />

            <Button 
              variant='contained' 
              color='primary' 
              onClick={() => 
                setSamples(generateNewSamples(maxSamples))
              }> 
                Generate new samples
            </Button>
        </div>
      </>
     );
}

PiMonteCarlo.defaultProps = defaultProps;

export default PiMonteCarlo;