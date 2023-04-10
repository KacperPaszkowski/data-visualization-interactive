export interface Dataset {
    data: ISample[];
    borderColor: string;
    borderWidth: number;
    backgroundColor: string;
    pointRadius: number;
    xAxisID: string;
    yAxisID: string;
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
        data: [],
        borderColor: 'rgba(65, 166, 209, 0.8)',
        borderWidth: 1,
        backgroundColor: 'rgba(65, 166, 209, 0.8)',
        pointRadius: 3,
        xAxisID: 'x',
        yAxisID: 'y',
      },
      {
        data: [],
        borderColor: 'rgba(209, 120, 65, 0.8)',
        borderWidth: 1,
        backgroundColor: 'rgba(209, 120, 65, 0.8)',
        pointRadius: 3,
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
          display: false, // hide legend
        },
    },
  };
