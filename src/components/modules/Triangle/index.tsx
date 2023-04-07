import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import styles from './Triangle.module.css'
import { Line, Scatter } from 'react-chartjs-2';
import { data, options } from './chartData';
import { ISample, IOptions } from './types';
// @ts-ignore
import ChartJSdragDataPlugin from 'chartjs-plugin-dragdata'
import { Chart, registerables } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
Chart.register(...registerables);
Chart.register(ChartJSdragDataPlugin)

interface TriangleProps{
    width: number;
    height: number;
}

const defaultProps: Partial<TriangleProps> = {
    width: 300,
    height: 300,
}

function Triangle(props: TriangleProps) {
    const [samples, setSamples] = useState<ISample[]>([]);
    const chartRef = useRef<Chart<"scatter"> | null>(null);

    const handleMouseMove = (event: ChartEvent, elements: any, chart: any) => {
        if(!chartRef.current) return
        if(!elements.length) return

        let index: number = elements[0].index
        let previousOptions: unknown = chartRef.current.options;

        if(index == 0 || index == 3) {
            (previousOptions as IOptions).plugins.dragData.dragX = false;
            (previousOptions as IOptions).plugins.dragData.dragY = false;
            return
        }

        if(index == 1) {
            (previousOptions as IOptions).plugins.dragData.dragX = false;
            (previousOptions as IOptions).plugins.dragData.dragY = true;
            return
        }
        
        (previousOptions as IOptions).plugins.dragData.dragX = true;
        (previousOptions as IOptions).plugins.dragData.dragY = false;
        
    }

    useEffect(() => {
        if(!chartRef.current) return;

        let previousOptions: unknown = chartRef.current.options;
        (previousOptions as IOptions).onHover = handleMouseMove;

    }, [chartRef.current])

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

            <Typography>Triangle</Typography>

           
            <Button 
              variant='contained' 
              color='primary'
            > 
                Generate new samples
            </Button>
        </div>
      </>
     );
}

Triangle.defaultProps = defaultProps;

export default Triangle;