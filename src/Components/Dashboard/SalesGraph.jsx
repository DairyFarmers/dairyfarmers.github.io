import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SalesGraph = () => {
  //const { reports } = useSelector((state) => state.reports);

  const reports = [
    { date: "2021-01-01", revenue: 1000 },
    { date: "2021-01-02", revenue: 1500 },
    { date: "2021-01-03", revenue: 1200 },
    { date: "2021-01-04", revenue: 1800 },
    { date: "2021-01-05", revenue: 2000 },
    { date: "2021-01-06", revenue: 2500 },
    { date: "2021-01-07", revenue: 2200 },
    { date: "2021-01-08", revenue: 2800 },
    { date: "2021-01-09", revenue: 3000 },
    { date: "2021-01-10", revenue: 3500 },
  ]

  const data = {
    labels: reports.map((report) => report.date),
    datasets: [
      {
        label: "Sales Revenue",
        data: reports.map((report) => report.revenue),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Sales Graph</h2>
      <Line data={data} />
    </div>
  );
};

export default SalesGraph;