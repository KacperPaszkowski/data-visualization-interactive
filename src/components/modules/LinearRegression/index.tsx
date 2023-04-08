import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import styles from './LinearRegression.module.css'
import regression from 'regression'
import { data, options } from './chartData';
import { Chart as ChartReact, Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ISample{
    x: number | any
    y: number | any
}

interface LinearRegressionProps{
    width: number;
    height: number;
    samples: ISample[];
}

const defaultProps: Partial<LinearRegressionProps> = {
    width: 300,
    height: 300,
    samples: [
      {x: -0.6, y: -0.4},
      {x: 0, y: 0.1},
      {x: 0.7, y: 0.3}
    ],
}

function LinearRegression(props: LinearRegressionProps) {
    const [samplePreview, setSamplePreview] = useState<ISample | undefined>(undefined);
    const [samples, setSamples] = useState<ISample[] | undefined>(props.samples);
    const [fittedLine, setFittedLine] = useState<number[]>([]);
    const chartRef = useRef<Chart<"scatter"> | null>(null);

    const handleChartMove = (event: React.MouseEvent) => {
        var rect = event.currentTarget.getBoundingClientRect()
        var x = event.clientX - rect.left
        var y = event.clientY - rect.top
        const dataX = chartRef.current?.scales.x.getValueForPixel(x);
        const dataY = chartRef.current?.scales.y.getValueForPixel(y);
        setSamplePreview({x: dataX, y: dataY})
    }

    const handleChartClick = (event: React.MouseEvent) => {
        if(!samples) return
        if(!samplePreview) return
        setSamples((oldSamples) => [...(oldSamples ? oldSamples : []), samplePreview])
    }

    const fitLine = () => {
      if(!samples) return
      if(!(samples.length >= 2)) return

      const result = regression.linear(samples.map((sample) => ([sample.x, sample.y])))
      setFittedLine([-result.equation[0] + result.equation[1], result.equation[0] + result.equation[1]])
    }

    useEffect(() => {
      if(!samples) return
      if(samplePreview) data.datasets[1].data = [samplePreview]
    
      data.datasets[0].data = samples
      data.datasets[2].data = fittedLine
      // @ts-ignore ( scatter/line mismatch )
      chartRef.current ? chartRef.current.data = data : {}
      chartRef.current?.update()

    }, [samplePreview, samples, fittedLine])

    useEffect(() => {
        fitLine()
    }, [samples])

    return ( 
        <>
        <div 
          className={styles.container}
          style={{
            width: props.width
          }}
          >
            <Scatter
              type="line"
              ref={chartRef}
              onMouseMove={(event) => handleChartMove(event)}
              onMouseLeave={() => setSamplePreview(undefined)}
              onClick={(event) => handleChartClick(event)}
              // @ts-ignore ( scatter/line mismatch )
              data={data}
              options={options}
              width={props.width}
              height={props.height}
              style={{ display: 'inline-block' }}
            />

            {/* <Button 
              variant='contained' 
              color='primary'
              onClick={() => {
                setSamples([])
                setFittedLine([])
            }} 
              > 
                Reset
            </Button> */}
        </div>
      </>
     );
}

LinearRegression.defaultProps = defaultProps;

export default LinearRegression;