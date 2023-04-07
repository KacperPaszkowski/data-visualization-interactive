import { ActiveElement, BubbleDataPoint, Chart, ChartEvent, ChartTypeRegistry, Point } from 'chart.js/dist/types/index';


export interface IDataset {
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
  
  
export interface IData {
    datasets: IDataset[];
}

export interface ISample{
    x: number
    y: number
}