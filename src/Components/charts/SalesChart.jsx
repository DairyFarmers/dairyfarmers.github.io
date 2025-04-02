import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import "./Chart.scss";

const SalesChart = ({ data }) => {
  return (
    <div className="chart">
      <h5 className="text-center">Sales Over Time</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={400} height={250} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#4CAF50" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;