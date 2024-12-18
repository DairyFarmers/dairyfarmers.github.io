import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "./CalenderOne.css";
import 'react-datepicker/dist/react-datepicker.css';
const MyCalendar = ({calLeft, calTop, calHeight, calWidth, index, selectedDate, handleDateChange}) => {
    const calendarStyle = {
        position: "absolute",
        marginTop: calTop,
        marginLeft: calLeft,
        width: calWidth,
        height: calHeight,
        zIndex: index

      };

  return (
    <div style={calendarStyle} >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};
export default MyCalendar;