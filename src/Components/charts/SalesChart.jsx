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

  data = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 2000 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 1890 },
    { month: "Jun", sales: 2390 },
    { month: "Jul", sales: 3490 },
    { month: "Aug", sales: 2000 },
    { month: "Sep", sales: 2780 },
    { month: "Oct", sales: 1890 },
    { month: "Nov", sales: 2390 },
    { month: "Dec", sales: 3490 }
  ];

  return (
    <div className="chart">
      <h5 className="text-center">Sales Over Time</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={400} height={250} data={data}>
          <XAxis dataKey="month" />
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