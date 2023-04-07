import { ActiveElement, BubbleDataPoint, Chart, ChartEvent, ChartTypeRegistry, Point } from 'chart.js/dist/types/index';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-plugin-dragdata'

const getDistance = (point1: ISample, point2: ISample): number => {
    const xDiff = point2.x - point1.x;
    const yDiff = point2.y - point1.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

const triangleSideMarkPlugin = {
    id: "triangleSideMarkPlugin",
    afterDraw: (chart: Chart<any>, args: any, options: IOptions['plugins']['triangleSideMarkPlugin']) => {
        if(options.draw == undefined) return;

        const points: ISample[] = chart.getDatasetMeta(0).data.map(datapoint => ({x: datapoint.x, y: datapoint.y}))
        const ctx = chart.ctx;
        
        const oSign = chart.scales.x.getValueForPixel(points[2].x)
        const aSign = chart.scales.y.getValueForPixel(points[1].y)

        const aOffsetX: number = -15 * Math.sign(oSign ? oSign : 0);
        const hOffsetX: number = 15 * Math.sign(oSign ? oSign : 0) * Math.sign(aSign ? aSign : 0);
        const oOffsetY: number = 15 * Math.sign(aSign ? aSign : 0);


        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'rgba(209, 120, 65, 0.8)';
        ctx.font = "25px serif";

        const hypotenuse: ISample = {
            x: (points[1].x + points[2].x) / 2,
            y: (points[1].y + points[2].y) / 2,
        };

        const adjacent: ISample = {
            x: (points[1].x + points[0].x) / 2 + aOffsetX,
            y: (points[1].y + points[0].y) / 2,
        }

        const opposite: ISample = {
            x: (points[0].x + points[2].x) / 2,
            y: (points[0].y + points[2].y) / 2 + oOffsetY,
        }


        const dx: number = points[1].x - points[2].x
        const dy: number = points[1].y - points[2].y

        const hNormal: ISample[] = [
            {
                x: -dy,
                y: dx,
            },
            {
                x: dy,
                y: -dx,
            }
        ]

        const hVector: ISample = {
            x: (hNormal[1].x + hypotenuse.x) - (hNormal[0].x + hypotenuse.x),
            y: (hNormal[1].y + hypotenuse.y) - (hNormal[0].y + hypotenuse.y)
        }

        const magnitude = Math.sqrt(hVector.x ** 2 + hVector.y ** 2)

        const hUnitVector: ISample = {
            x: hVector.x / magnitude,
            y: hVector.y / magnitude
        }

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("a", opposite.x, opposite.y);
        ctx.fillText("b", adjacent.x, adjacent.y);
        ctx.fillText("c", -hUnitVector.x * hOffsetX + hypotenuse.x, -hUnitVector.y * hOffsetX + hypotenuse.y);

        ctx.restore();
    }
  };

ChartJS.register(triangleSideMarkPlugin)

const getAngle = (pointA: ISample, pointB: ISample, pointC: ISample): number => {
  const AB: number = getDistance(pointA, pointB)
  const BC: number = getDistance(pointB, pointC)
  const AC: number = getDistance(pointA, pointC)
  return Math.acos((AB**2 + BC**2 - AC**2) / (2 * AB * BC))
}

const triangleAngleMarkPlugin = {
    id: "triangleAngleMarkPlugin",
    afterDraw: (chart: Chart<any>, args: any, options: IOptions['plugins']['triangleSideMarkPlugin']) => {
        if(options.draw == undefined) return;

        const points: ISample[] = chart.getDatasetMeta(0).data.map(datapoint => ({x: datapoint.x, y: datapoint.y}))
        const ctx = chart.ctx;

        ctx.strokeStyle = 'rgba(209, 120, 65, 0.8)';

        const oValue = chart.scales.x.getValueForPixel(points[2].x)
        const oSign = Math.sign((oValue ? oValue : 0))

        const aValue = chart.scales.y.getValueForPixel(points[1].y)
        const aSign = Math.sign((aValue ? aValue : 0))

        const angle = getAngle(points[0], points[1], points[2])

        if(aSign > 0) {
          var beginAngle: number = Math.PI/2 - (angle * oSign);
          var endAngle: number = Math.PI/2;
        }
        else {
          var beginAngle: number = Math.PI * (3/2)
          var endAngle: number = Math.PI * (3/2) + (angle * oSign);
        }
        
        ctx.beginPath();
        ctx.arc(points[1].x, points[1].y, 50, beginAngle, endAngle, oSign < 0);
        ctx.stroke();
    }
}

ChartJS.register(triangleAngleMarkPlugin)

export interface Dataset {
    data: ISample[];
    borderColor: string;
    borderWidth: number;
    backgroundColor: string;
    pointRadius: number;
    xAxisID: string;
    yAxisID: string;
    showLine: true;
  }

export interface IOptions {
    type: string | undefined;
    animation: {
      duration: number;
    };
    scales: {
      x: {
        min: number;
        max: number;
        grid: {
          color: string;
        };
      };
      y: {
        min: number;
        max: number;
        grid: {
          color: string;
        };
      };
    };
    plugins: {
      legend: {
        display: false;
      };
      dragData: {
        showTooltip: boolean;
        dragX: boolean;
        dragY: boolean;
        onDragStart: (e: MouseEvent, element: IOptions[]) => void;
        onDrag: (e: MouseEvent, datasetIndex: number, index: number, value: ISample) => void;
        onDragEnd: (e: MouseEvent, datasetIndex: number, index: number, value: ISample) => void;
      };
      triangleSideMarkPlugin: {
        draw: boolean | undefined;
      }
      triangleAngleMarkPlugin: {
        draw: boolean | undefined;
      }
    };
    onHover: (event: ChartEvent, elements: ActiveElement[], chart: Chart<keyof ChartTypeRegistry, (number | Point | [number, number] | BubbleDataPoint | null)[], unknown>) => void;
  }
  
  
export interface Data {
    datasets: Dataset[];
}

export interface ISample{
    x: number
    y: number
}

export const data: Data = {
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
