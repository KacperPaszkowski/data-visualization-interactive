import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './PiMonteCarlo.module.css'
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { data, options, ISample } from './chartData';

interface PiMonteCarloProps{
    width: number;
    height: number;
    maxSamples: number;
    numberOfSamples: number;
    samples: ISample[];
    onChange: (insideCircle: number, all: number) => void;
}

const defaultProps: Partial<PiMonteCarloProps> = {
    width: 300,
    height: 300,
    maxSamples: 1000,
    onChange: () => {},
}


const isInsideCircle = (sample: ISample): boolean => (
    sample.x ** 2 + sample.y ** 2 < 1
)

function PiMonteCarlo(props: PiMonteCarloProps) {
    const maxSamples: number = props.maxSamples;
    const [numberOfSamples, setNumberOfSamples] = useState<number>(props.numberOfSamples ? props.numberOfSamples : Math.round(maxSamples / 2));
    const [samples, setSamples] = useState<ISample[]>(props.samples ? props.samples : []);
    const chartRef = useRef<Chart<"scatter"> | null>(null);

    data.datasets[0].data = samples.slice(0, numberOfSamples).filter((sample) => !isInsideCircle(sample))
    data.datasets[1].data = samples.slice(0, numberOfSamples).filter(isInsideCircle)

    useEffect(() => {
        data.datasets[0].data = samples.slice(0, numberOfSamples).filter((sample) => !isInsideCircle(sample))
        data.datasets[1].data = samples.slice(0, numberOfSamples).filter(isInsideCircle)
        chartRef.current ? chartRef.current.data = data : {}
        chartRef.current?.update()

        var insideCircle = samples.slice(0, numberOfSamples).filter(isInsideCircle).length
        props.onChange(insideCircle, numberOfSamples)
    }, [numberOfSamples, samples])

    useEffect(() => {
      setSamples(props.samples ? props.samples : [])
    }, [props.samples])

    useEffect(() => {
      setNumberOfSamples(props.numberOfSamples ? props.numberOfSamples : Math.round(maxSamples / 2))
    }, [props.numberOfSamples])

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
        </div>
      </>
     );
}

PiMonteCarlo.defaultProps = defaultProps;

export default PiMonteCarlo;