export default function Filters({ setMonth, setRegion }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      {/* 📅 Month Filter */}
      <select
        className="filter"
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="this">This Month</option>
        <option value="last">Last Month</option>
      </select>

      {/* 🌍 Region Filter */}
      <select
        className="filter"
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="all">All Regions</option>
        <option value="usa">USA</option>
        <option value="india">INDIA</option>
        <option value="eu">EU</option>
      </select>
    </div>
  );
}