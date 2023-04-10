export interface Dataset {
    type: string;
    data: ISample[] | number[];
    borderColor: string;
    borderWidth: number;
    backgroundColor: string;
    pointRadius: number;
    xAxisID: string;
    yAxisID: string;
  }
  
export interface Data {
    labels: number[];
    datasets: Dataset[];
}

export interface ISample{
    x: number
    y: number
}

export const data: Data = {
    labels: [-1, 1],
    datasets: [
        {
            type: 'scatter',
            data: [],
            borderColor: 'rgba(65, 166, 209, 0.8)',
            borderWidth: 1,
            backgroundColor: 'rgba(65, 166, 209, 0.8)',
            pointRadius: 3,
            xAxisID: 'x',
            yAxisID: 'y',
        },
        {
            type: 'scatter',
            data: [],
            borderColor: 'rgba(65, 166, 209, 0.8)',
            borderWidth: 1,
            backgroundColor: 'rgba(65, 166, 209, 0.8)',
            pointRadius: 3,
            xAxisID: 'x',
            yAxisID: 'y',
        },
        {
            type: 'line',
            data: [0.1, 0.3],
            borderColor: 'rgba(209, 120, 65, 0.8)',
            borderWidth: 3,
            backgroundColor: 'rgba(209, 120, 65, 0.8)',
            pointRadius: 0,
            xAxisID: 'x',
            yAxisID: 'y',
        },
    ],
};

export const options = {
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
        tooltip: {
            callbacks: {
                title: () => ("")
            }
        }
    },

};