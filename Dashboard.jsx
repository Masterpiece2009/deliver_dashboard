import React from "react";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import html2canvas from "html2canvas";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip);

// DATA: Edit these for your actual analytics!
const tableData = {
  headers: ["TITLE 1", "TITLE 2", "TITLE 3"],
  rows: [
    { label: "DATA 1", values: [100, 110, 120] },
    { label: "DATA 2", values: [80, 90, 95] },
    { label: "DATA 3", values: [60, 70, 75] },
    { label: "DATA 4", values: [40, 70, 60] },
    { label: "DATA 5", values: [30, 40, 50] },
  ],
};

const donutDataArr = [
  { value: 50, color: "#A259F7", label: "Purple 50%" },
  { value: 25, color: "#1FB5FB", label: "Blue 25%" },
  { value: 75, color: "#FF4D90", label: "Pink 75%" },
  { value: 15, color: "#13C5B4", label: "Teal 15%" },
];

const progressData = [
  { label: "JAN", value: 70, color: "#A259F7" },
  { label: "FEB", value: 55, color: "#FF4D90" },
  { label: "MAR", value: 30, color: "#1FB5FB" },
  { label: "APR", value: 40, color: "#4479F7" },
  { label: "MAY", value: 60, color: "#13C5B4" },
];

const multiDonutData = {
  labels: ["Layer 1", "Layer 2", "Layer 3"],
  datasets: [
    {
      label: "Layer 1",
      data: [90, 80, 70],
      backgroundColor: ["#A259F7", "#FF4D90", "#1FB5FB"],
      borderWidth: 8,
    },
    {
      label: "Layer 2",
      data: [80, 70, 60],
      backgroundColor: ["#7259F7", "#FD4D90", "#19B5FB"],
      borderWidth: 8,
    },
    {
      label: "Layer 3",
      data: [70, 60, 50],
      backgroundColor: ["#5259F7", "#FDA090", "#19B9FB"],
      borderWidth: 8,
    },
  ],
};

function handleDownloadDashboard() {
  html2canvas(document.getElementById("dashboard-root")).then((canvas) => {
    const link = document.createElement("a");
    link.download = "dashboard.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

export default function Dashboard() {
  return (
    <div style={{ background: "#F7FAFC", minHeight: "100vh", fontFamily: "Arial,sans-serif", padding: "32px" }}>
      <h1 style={{ textAlign: "center", fontWeight: "700", color: "#444", marginBottom: "30px", fontSize: "2rem" }}>
        Dynamic Logistics Dashboard
      </h1>
      <div id="dashboard-root">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          <div style={{ flex: "1", minWidth: "340px", background: "#fff", padding: 24, borderRadius: 15, boxShadow: "0 2px 16px #ececec" }}>
            <h3 style={{ color: "#A259F7", fontWeight: 700 }}>Summary Table</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12, fontSize: "1rem" }}>
              <thead>
                <tr>
                  <th></th>
                  {tableData.headers.map((h, i) => (
                    <th key={i} style={{ background: "#1FB5FB", color: "#fff", padding: "6px", borderRadius: 8 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color: "#13C5B4", padding: "6px", fontWeight: "bold" }}>{row.label}</td>
                    {row.values.map((v, vi) => (
                      <td key={vi} style={{ textAlign: "center", borderBottom: "1px solid #f4f4f4", padding: "6px" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flex: "1", minWidth: "340px", background: "#fff", padding: 24, borderRadius: 15, boxShadow: "0 2px 16px #ececec", display: "flex", gap: "24px", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ color: "#FF4D90", fontWeight: 700, marginBottom: 8 }}>Radial Breakdown</h3>
            <div style={{ display: "flex", gap: "32px" }}>
              {donutDataArr.map((d, i) => (
                <div key={i} style={{ width: 90, textAlign: "center" }}>
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [d.value, 100 - d.value],
                          backgroundColor: [d.color, "#eee"],
                          borderWidth: 3,
                        },
                      ],
                    }}
                    options={{
                      cutout: "70%",
                      plugins: { legend: { display: false } },
                    }}
                  />
                  <div style={{ color: d.color, fontWeight: 600 }}>{d.value}%</div>
                  <div style={{ fontSize: "0.95em" }}>{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", marginTop: 38, padding: 24, borderRadius: 15, boxShadow: "0 2px 16px #ececec" }}>
          <h3 style={{ color: "#4479F7", fontWeight: 700 }}>Budget Infographic</h3>
          {progressData.map((item, i) => (
            <div key={i} style={{ marginTop: 19 }}>
              <span style={{ fontWeight: 600, color: item.color, marginRight: 10 }}>{item.label}</span>
              <div style={{ display: "inline-block", verticalAlign: "middle", width: "60%", marginRight: 10, background: "#f1f1f1", borderRadius: 8, height: 28 }}>
                <div
                  style={{
                    width: `${item.value}%`,
                    background: item.color,
                    height: "100%",
                    borderRadius: 8,
                    color: "#fff",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  {item.value}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", marginTop: 38, padding: 24, borderRadius: 15, boxShadow: "0 2px 16px #ececec", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "410px" }}>
            <h3 style={{ textAlign: "center", fontWeight: "700", color: "#19B5FB", marginBottom: "12px" }}>Multi-Layer Infographic</h3>
            <Doughnut
              data={{
                labels: multiDonutData.labels,
                datasets: multiDonutData.datasets,
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true },
                },
                cutout: "40%",
              }}
            />
            <div style={{ textAlign: "center", fontSize: "0.96em", marginTop: 14, color: "#555" }}>
              Titles and explanations can go here.
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "1rem",
            background: "#A259F7",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 1px 6px #e0e0e0",
          }}
          onClick={handleDownloadDashboard}
        >
          Download Dashboard as Image (PNG)
        </button>
      </div>
    </div>
  );
}
