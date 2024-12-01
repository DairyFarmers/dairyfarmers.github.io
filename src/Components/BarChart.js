import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";



const valueFormatter = (value) => `${value}`;

export default function BarsDataset({ top, left, color, Radius, width, height }) {

  const [dataset, setdataset] =  useState([
    {
      newYork: 36,
      seoul: 21,
      month: 'Jan',
    },
    {
      newYork: 28,
      seoul: 28,
      month: 'Feb',
    },
    {
      newYork: 56,
      seoul: 41,
      month: 'Mar',
    },
    {
      newYork: 42,
      seoul: 23,
      month: 'Apr',
    },
    {
      newYork: 52,
      seoul: 59,
      month: 'May',
    },
    {
      newYork: 53,
      seoul: 94,
      month: 'June',
    },
    {
      newYork: 55,
      seoul: 89,
      month: 'July',
    },
    {
      newYork: 56,
      seoul: 89,
      month: 'Aug',
    },
    {
      newYork: 45,
      seoul: 51,
      month: 'Sept',
    },
    {
      newYork: 47,
      seoul: 45,
      month: 'Oct',
    },
    {
      newYork: 56,
      seoul: 38,
      month: 'Nov',
    },
    {
      newYork: 53,
      seoul: 25,
      month: 'Dec',
    },
  ]);
  

  const barStyle = {
    position: 'absolute',
    top: top,
    left: left,
    backgroundColor: color,
    borderRadius: Radius,
    width: width,
    height: height,
  };


  const loadlinechartdata = (data) => {
    let count = 0;
    var checkdtodayMonthName =0
    var newdatset = []
    for (let i = 0; i < data.length; i++) {
      if(data[i].spoil != null && data[i].spoil == "no"){
        console.log(data[i].expiredatetime)
        const today = new Date(data[i].expiredatetime);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];        
        const todayMonthName = months[today.getMonth()];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[today.getDay()];
        console.log(todayMonthName,dayOfWeek)
        if(checkdtodayMonthName != todayMonthName){
          
          if(count > 0 && checkdtodayMonthName != 0){
            newdatset.push({
              seoul: count,
              month: checkdtodayMonthName,
            })
          }
          checkdtodayMonthName = todayMonthName
          count =0;    
        }
        else{
          count++;
        }
      }
    }
    if(count > 0){
      newdatset.push({
        seoul: count+1,
        month: checkdtodayMonthName,
      })
    }
    setdataset(newdatset);
  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => loadlinechartdata(data))
      .catch(error => console.error('Error fetching homes:', error));
  }, []);

  return (
    <div style={barStyle}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'seoul', valueFormatter },
        ]}

      />
    </div>
  );
}
