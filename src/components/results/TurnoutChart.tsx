
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Constituency {
  name: string;
  turnout: number;
  candidates: any[];
}

interface TurnoutChartProps {
  constituencies: Constituency[];
}

const TurnoutChart = ({ constituencies }: TurnoutChartProps) => {
  const data = constituencies.map(c => ({
    name: c.name,
    turnout: c.turnout
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} label={{ value: 'Turnout %', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => [`${value}%`, 'Turnout']} />
        <Bar dataKey="turnout" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TurnoutChart;
