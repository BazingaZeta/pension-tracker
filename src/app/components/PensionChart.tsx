"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PensionChartData {
  year: number;
  balance: number;
  desiredIncome: number;
  extraPots?: number;
}

interface PensionChartProps {
  data: PensionChartData[];
  desiredIncome: number;
}

const PensionChart = ({ data, desiredIncome }: PensionChartProps) => {
  return (
    <div className="chart-container mt-6">
      <ResponsiveContainer style={{ padding: 10 }} width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
          <Line
            type="monotone"
            dataKey="desiredIncome"
            stroke="#82ca9d"
            dot={false}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PensionChart;
