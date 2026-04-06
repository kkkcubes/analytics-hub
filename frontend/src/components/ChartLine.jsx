import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartLine({ data }) {
  // ✅ fallback if no data
  const safeData = data || [
    { name: "1", value: 200 },
    { name: "2", value: 300 },
    { name: "3", value: 250 },
    { name: "4", value: 400 },
    { name: "5", value: 350 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={safeData}>
        <XAxis dataKey="name" stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            background: "#020617",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}