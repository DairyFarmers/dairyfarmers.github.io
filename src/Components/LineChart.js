import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState, useEffect } from "react";

export default function SimpleLineChart({
  top, left, color, Radius, width, height
}) {

  const [homes, setHomes] = useState([]);
  const chartStyle = {
    position: 'relative',
    top: top,
    left: left,
    backgroundColor: color,
    borderRadius: Radius,
    width: width,
    height: height
  };
  const [uData, setudata] = useState([5, 10, 15, 7, 16, 20, 25]);

  const [xLabels, setxLabels] = useState([
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);

  const loadlinechartdata = (data) => {
    let count = 0;
    var checkdayOfWeek =0
    var newxlables = []
    var newcountlabels =[]
    for (let i = 0; i < data.length; i++) {
      if(data[i].spoil != null && data[i].spoil == "no"){
        console.log(data[i].expiredatetime)
        const today = new Date(data[i].expiredatetime);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];        
        const todayMonthName = months[today.getMonth()];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[today.getDay()];
        console.log(todayMonthName,dayOfWeek)
        if(checkdayOfWeek != dayOfWeek){
          checkdayOfWeek = dayOfWeek
          newxlables.push(dayOfWeek)
          if(count > 0){
            newcountlabels.push(count)
          }
          count =0;    
        }
        else{
          count++;
        }
      }
    }
    if(count > 0){
      newcountlabels.push(count+1)
    }
    setudata(newcountlabels);
    setxLabels(newxlables);
  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => loadlinechartdata(data))
      .catch(error => console.error('Error fetching homes:', error));
  }, []);



  return (
    <div style={chartStyle}>
      <LineChart

        series={[
          { data: uData },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
}



