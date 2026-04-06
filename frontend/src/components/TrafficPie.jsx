import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Organic", value: 60 },
  { name: "Direct", value: 25 },
  { name: "Referral", value: 15 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

export default function TrafficPie() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}