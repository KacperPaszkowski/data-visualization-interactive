import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './Triangle.module.css'
import { Scatter } from 'react-chartjs-2';
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
    onChange: (pointA: ISample, pointB: ISample, pointC: ISample) => void
}

const defaultProps: Partial<TriangleProps> = {
    width: 300,
    height: 300,
    onChange: () => {}
}

function Triangle(props: TriangleProps) {
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

    const handleChange = () => {
        if(!chartRef.current) return;

        const data = (chartRef.current.data.datasets[0].data as ISample[])
        props.onChange(data[0], data[1], data[2])
    }

    useEffect(() => {
        if(!chartRef.current) return;

        let previousOptions: unknown = chartRef.current.options;
        (previousOptions as IOptions).onHover = handleMouseMove;
        (previousOptions as IOptions).plugins.dragData.onDrag = handleChange
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
        </div>
      </>
     );
}

Triangle.defaultProps = defaultProps;

export default Triangle;