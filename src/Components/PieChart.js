import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";



const size = {
  width: 495,
  height: 355,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2 }>
      {children}
    </StyledText>
  );
}

function getLastDateOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function PieChartWithCenterLabel({ top, left, color, Radius }) {
  const pieStyle = {
    position: 'absolute',
    top: top,
    left: left,
    backgroundColor: color,
    borderRadius: Radius,
    width: 565
  };

  const [data, setdata] = useState([
    { value: 5 }
  ]);

  const loadlinechartdata = (data) => {
    let count = 0;
    var newdatset = []
    // Example usage:
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDateOfMonth = getLastDateOfMonth(year, month);
    console.log("Last date of the month:", lastDateOfMonth);

    for (let i = 0; i < data.length; i++) {
      if (data[i].spoil != null && data[i].spoil == "no") {
        console.log(data[i].expiredatetime)
        const today = new Date(data[i].expiredatetime);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const todayMonthName = months[today.getMonth()];
        const today2 = new Date();
        const months2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const todayMonthName2 = months2[today2.getMonth()];

        if (todayMonthName == todayMonthName2) {
          count++;
        }
      }
    }
    if (count > 0) {
      newdatset.push({ value: count }, { value: lastDateOfMonth },)
    }
    setdata(newdatset);
  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => loadlinechartdata(data))
      .catch(error => console.error('Error fetching homes:', error));
  }, []);

  return (
    <div style={pieStyle}>
      <PieChart series={[{ data, outerRadius: 80, innerRadius: 120 }]} {...size}>
        <PieCenterLabel>Wastage</PieCenterLabel>
      </PieChart>
    </div>
  );
}
