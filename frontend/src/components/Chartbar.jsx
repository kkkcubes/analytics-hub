import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartBar({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            background: "#020617",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
          animationDuration={800} // ✅ smooth animation
        />
      </BarChart>
    </ResponsiveContainer>
  );
}