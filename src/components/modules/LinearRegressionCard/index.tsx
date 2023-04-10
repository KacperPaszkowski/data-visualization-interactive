import { use, useEffect, useState } from 'react';
import styles from "./LinearRegressionCard.module.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import LinearRegression from '@/components/elements/LinearRegression';

export default function LinearRegressionCard() {
    const [samples, setSamples] = useState([
        {x: -0.6, y: -0.4},
        {x: 0, y: 0.1},
        {x: 0.7, y: 0.3}
    ]);

  return (
    <Paper 
        elevation={0}
        className={styles.rightContainer}
    >
        <Box className={styles.descriptionContrainer}>
            <Typography variant='h4'>Linear regression</Typography>
            <Paper 
            elevation={1}
            className={styles.description}
            >
            <Typography variant='body1'>
                Linear regression is a simple technique used to find a relationship between a target variable and one or more input variables. 
                It helps us predict the target variable based on the input variables. 
                In simple terms, it's like drawing a straight line that best fits the data points. 
                This method is widely used for forecasting trends and understanding how variables are connected.
            </Typography>
            <Typography 
              variant='body1'
              sx={{
                marginTop: '50px',
                padding: '0 150px 0 150px'
              }}
            >
                Play around with interactive example. 
                Click on chart to add new data point or press the button to reset all data points on chart.
            </Typography>
            <Button 
              onClick={() => setSamples([])}
              sx={{
                marginTop: '75px'
              }}
              variant='contained'
            >
                Reset chart
            </Button>

            </Paper>
        </Box>
        
        <Box>
            <LinearRegression width={500} height={500} samples={samples}/>
        </Box>

    </Paper>
  )
}
