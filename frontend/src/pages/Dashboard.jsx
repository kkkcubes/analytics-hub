import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";
import Filters from "../components/Filters";

import ChartBar from "../components/ChartBar";
import ChartLine from "../components/ChartLine";
import TrafficPie from "../components/TrafficPie";
import SearchBar from "../components/SearchBar";

import "../styles/dashboard.css";
import "react-tooltip/dist/react-tooltip.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔐 TOKEN
  const token = localStorage.getItem("token");

  // 📊 STATE
  const [data, setData] = useState(null);
  const [month, setMonth] = useState("all");
  const [region, setRegion] = useState("all");

  // 🔐 ROLE DETECTION
  let role = "";
  if (token) {
    try {
      role = JSON.parse(atob(token.split(".")[1])).role;
    } catch {
      console.log("Invalid token");
    }
  }

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  // 📡 FETCH DASHBOARD DATA
  useEffect(() => {
    if (!token) return;

    fetch(
      `http://localhost:5000/dashboard?month=${month}&region=${region}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [month, region, token]);

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header />

        {/* 🎛 FILTERS */}
        <Filters setMonth={setMonth} setRegion={setRegion} />

        {/* 🔐 ADMIN PANEL */}
        {role === "admin" && (
          <div
            style={{
              background: "green",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              color: "white",
            }}
          >
            ⚙ Admin Panel
          </div>
        )}

        <div className="grid">
          {/* 📊 SALES */}
          <Card title="Monthly Sales Revenue">
            <span
              data-tooltip-id="salesTip"
              data-tooltip-content="This chart shows monthly revenue growth"
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                cursor: "pointer",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              ℹ Hover for info
            </span>

            {data && data.sales?.length > 0 ? (
              <ChartBar data={data.sales} />
            ) : (
              <p>No data</p>
            )}
          </Card>

          {/* 📈 TRAFFIC */}
          <Card title="Website Traffic">
            {data && data.traffic?.length > 0 ? (
              <ChartLine data={data.traffic} />
            ) : (
              <p>No data</p>
            )}
          </Card>

          {/* 🥧 SOURCES */}
          <Card title="Traffic Sources">
            {data ? <TrafficPie data={data.sources} /> : <p>Loading...</p>}
          </Card>

          {/* 💰 TOTAL REVENUE */}
          <Card title="Total Revenue">
            <h2 className="kpi">{data?.kpi || 0}</h2>
          </Card>

          {/* 📈 PROFIT */}
          <Card title="Profit">
            <h2 className="kpi">{data?.profit || 0}</h2>
          </Card>
        </div>
      </div>

      <SearchBar />

      {/* ✅ TOOLTIP */}
      <ReactTooltip id="salesTip" />
    </div>
  );
}