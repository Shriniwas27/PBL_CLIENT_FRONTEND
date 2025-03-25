
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PartyResult {
  party: string;
  votes: number;
  seats: number;
}

interface ElectionResultsChartProps {
  data: PartyResult[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded p-2 shadow-md">
        <p className="font-medium">{payload[0].name}</p>
        <p>Votes: {payload[0].value.toLocaleString()}</p>
        <p>Seats: {payload[0].payload.seats}</p>
      </div>
    );
  }
  return null;
};

const ElectionResultsChart = ({ data }: ElectionResultsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="votes"
          nameKey="party"
          label={({ party, percent }) => `${party}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ElectionResultsChart;
