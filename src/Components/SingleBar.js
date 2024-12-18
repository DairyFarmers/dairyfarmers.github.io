import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  {
   Money: 36,
    Month: 'Jan',
  },
  {
   Money: 28,
    Month: 'Fab',
  },
  {
   Money: 41,
    Month: 'Mar',
  },
  {
   Money: 42,
    Month: 'Apr',
  },
  {
   Money: 52,
    seoul: 59,
    Month: 'May',
  },
];



export default function SingleBarsDataset({top, left, color, Radius, width, height}) {

        const barStyle = {
        position: 'absolute',
        top: top,
        left: left,
        backgroundColor: color,
        borderRadius: Radius,
        width: width,
        height: height 
    };

  return (
    <div style={barStyle}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'Month' }]}
          series={[
            { dataKey: 'Money'},
          ]}
        />
    </div>
  );
}
