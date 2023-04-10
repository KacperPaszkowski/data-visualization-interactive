import { ISample, IOptions, IData } from './types';
import { triangleAngleMarkPlugin, triangleSideMarkPlugin } from './plugins';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-plugin-dragdata'

ChartJS.register(triangleAngleMarkPlugin)
ChartJS.register(triangleSideMarkPlugin)

export const data: IData = {
    datasets: [
      {
        data: [
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0.6,
            },
            {
                x: 0.6,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            }
        ],
        borderColor: 'rgba(65, 166, 209, 0.8)',
        borderWidth: 3,
        backgroundColor: 'rgba(65, 166, 209, 0.8)',
        pointRadius: 3,
        xAxisID: 'x',
        yAxisID: 'y',
        showLine: true,
      },
    ],
  };

export const options: IOptions = {
    type: "scatter",
    animation: {
        duration: 0
    },
    scales: {
      x: {
        min: -1,
        max: 1,
        grid: {
            color: "gray"
        }
      },
      y: {
        min: -1,
        max: 1,
        grid: {
            color: "gray"
        }
      },
    },
    plugins: {
        legend: {
          display: false,
        },
        dragData: {
            showTooltip: true,
            dragX: false,
            dragY: true,
            onDragStart: () => {},
              onDrag: () => {},
              onDragEnd: () => {}
          },
        triangleSideMarkPlugin: {
            draw: true,
        },
        triangleAngleMarkPlugin: {
            draw: true,
        }
    },
    onHover: () => {},
  };
