import React from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// --- Data
const dashboardData = {
  octoberOrders: {
    total: 6714,
    diff: 184,
    note:
      "يوجد فرق 184 اوردر بين الاوردرات المطلوبة وبين الاوردرات المرسلة فعليا الي شركات الشحن بسبب ان بعض العملاء تقوم بتكرار الاوردرات",
  },
  shippingCompanies: [
    {
      name: "BOSTA",
      totalOrders: 5240,
      delivered: 4845,
      inProgress: 0,
      delayedByCustomer: 0,
      canceledLostDamaged: 395,
      problems: {
        total: 113,
        fakeUpdate: 56,
        damaged: 57,
        delayOver5Days: 55,
        delayComment:
          "تاخيرات اكثر من 5 ايام بسبب ان العملاء قامت بتسجيل المناطق خطأ وتم رفع تيكيت بهم وتعديل العناوين وتحرك الشحنه اليهم مره اخري وتفادي شحن الاوردر مره اخري وتحمل تكلفة اكثر ",
        tickets: {
          compensated: 33,
          denied: 69,
          pending: 7,
        },
      },
    },
    {
      name: "ZAGEL Alex+BH & Cairo",
      totalOrders: 913,
      regions: [
        {
          name: "القاهرة",
          delivered: 191,
          outForDelivery: 3,
          delayed: 0,
          canceled: 44,
        },
        {
          name: "الاسكندرية و البحيرة",
          delivered: 611,
          outForDelivery: 4,
          delayed: 0,
          canceled: 60,
        },
      ],
    },
    {
      name: "Magdy",
      totalOrders: 891,
      delivered_0_5: 382,
      delivered_6_10: 233,
      delivered_10: 10,
      canceledByCustomer: 15,
      transferred: 251,
      noAnswer: 0,
      inDelivery: 0,
    },
    {
      name: "Zagel Alex",
      totalOrders: 1731,
      delivered_0_5: 1078,
      delivered_6_10: 183,
      delivered_10: 5,
      canceledByCustomer: 69,
      transferred: 270,
      noAnswer: 8,
      inDelivery: 118,
    },
    {
      name: "Bosta (Aggregate)",
      totalOrders: 12784,
      delivered_0_5: 12629,
      delivered_6_10: 68,
      delivered_10: 2,
      canceled: 85,
      transferred: 0,
      noAnswer: 0,
      inDelivery: 0,
    },
    {
      name: "Ramp",
      totalOrders: 1171,
      delivered_0_5: 677,
      delivered_6_10: 175,
      delivered_10: 25,
      canceled: 81,
      transferred: 0,
      noAnswer: 0,
      inDelivery: 213,
    },
  ],
};

// --- Chart configs
const colors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#7C4DFF", "#009688", "#F44336", "#E91E63", "#00BCD4"
];

// --- Components

const StatCard = ({ label, value, note }) => (
  <div
    style={{
      background: "#232946",
      color: "#fff",
      borderRadius: "16px",
      boxShadow: "0 2px 8px #23294622",
      padding: "20px",
      margin: "10px",
      minWidth: "250px",
      flex: "1",
    }}
  >
    <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{label}</div>
    <div style={{ fontSize: "2.3rem", margin: "8px 0" }}>{value}</div>
    {note && <div style={{ color: "#FFC750", fontSize: "1rem" }}>{note}</div>}
  </div>
);

const BarChart = ({ labels, data, title }) => (
  <div style={{ background: "#232946", padding: "20px", borderRadius: "16px" }}>
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: colors,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: title,
            color: "#fff",
            font: { size: 18 },
          },
        },
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff" } },
        },
      }}
    />
  </div>
);

const PieChart = ({ labels, data, title }) => (
  <div style={{ background: "#232946", padding: "20px", borderRadius: "16px" }}>
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: colors,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff", font: { size: 15 } } },
          title: {
            display: !!title,
            text: title,
            color: "#fff",
            font: { size: 18 },
          },
        },
      }}
    />
  </div>
);

const InsightsBox = ({ text }) => (
  <div
    style={{
      background: "#FFC750",
      color: "#232946",
      padding: "10px 16px",
      borderRadius: "12px",
      marginBottom: "16px",
      fontWeight: "bold",
      boxShadow: "0 1px 3px #23294622",
    }}
  >
    {text}
  </div>
);

const DynamicTable = ({ title, headers, rows }) => (
  <div style={{ background: "#232946", color: "#fff", padding: "20px", borderRadius: "16px", marginTop: 20 }}>
    <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 10 }}>{title}</div>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>{headers.map((h) => (
          <th key={h} style={{
            fontWeight: "bold", background: "#232946", color: "#FFC750", padding: "8px", borderBottom: "2px solid #FFC750"
          }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 ? "#1A1A2E" : "#232946" }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "8px 0" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Main Page

export default function Dashboard() {
  // Pie for overall delivery status (BOSTA)
  const bosta = dashboardData.shippingCompanies[0];
  const bostaDeliveryPieLabels = ["تم التسليم", "ملغى/مفقود/تالف"];
  const bostaDeliveryPieData = [bosta.delivered, bosta.canceledLostDamaged];

  // Table: BOSTA Problem breakdown
  const bostaProblemRows = [
    ["تحديث مزيف", bosta.problems.fakeUpdate],
    ["تالف", bosta.problems.damaged],
    ["تأخيرات اكثر من 5 ايام", bosta.problems.delayOver5Days],
    ["ملاحظات التأخير", bosta.problems.delayComment],
    ["عدد التيكتات (تعويض)", bosta.problems.tickets.compensated],
    ["عدد التيكتات (رفض)", bosta.problems.tickets.denied],
    ["عدد التيكتات (انتظار رد)", bosta.problems.tickets.pending],
  ];

  // Table: Zagel-Alex+BH & Cairo
  const zagelRegions = dashboardData.shippingCompanies[1].regions;
  const zagelRows = zagelRegions.map((region) => [
    region.name,
    region.delivered,
    region.outForDelivery,
    region.delayed,
    region.canceled,
  ]);
  const zagelTableHeaders = ["المنطقة", "تم التسليم", "خرج للتوصيل", "مؤجل", "ملغي"];

  // Bar chart for Magdy, Zagel Alex, Bosta (Agg), Ramp
  const serviceBarLabels = [
    "Magdy",
    "Zagel Alex",
    "Bosta (Agg)",
    "Ramp",
  ];
  const delivered0_5 = dashboardData.shippingCompanies.slice(2, 6).map((c) => c.delivered_0_5);
  const delivered6_10 = dashboardData.shippingCompanies.slice(2, 6).map((c) => c.delivered_6_10);
  const delivered10 = dashboardData.shippingCompanies.slice(2, 6).map((c) => c.delivered_10);

  // Status breakdown for Ramp
  const ramp = dashboardData.shippingCompanies[5];
  const rampPieLabels = ["تم التسليم (0-5)", "تم التسليم (6-10)", "تم التسليم (>10)", "ملغي", "قيد التوصيل"];
  const rampPieData = [
    ramp.delivered_0_5,
    ramp.delivered_6_10,
    ramp.delivered_10,
    ramp.canceled,
    ramp.inDelivery,
  ];

  // Insights
  const orderDiffNote = dashboardData.octoberOrders.note;

  return (
    <div
      style={{
        fontFamily: "Tajawal, Arial, sans-serif",
        background: "#121629",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
        <StatCard label="إجمالي عدد الاوردرات في أكتوبر" value={dashboardData.octoberOrders.total} />
        <StatCard label="فرق الاوردرات" value={dashboardData.octoberOrders.diff} note={orderDiffNote} />
      </div>

      <InsightsBox text={orderDiffNote} />

      {/* BOSTA Delivery Pie */}
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: 24 }}>
        <PieChart labels={bostaDeliveryPieLabels} data={bostaDeliveryPieData} title="توزيع الأوردرات: بوسطة" />
        <DynamicTable title="تفاصيل المشاكل في بوسطة" headers={["نوع المشكلة", "العدد"]} rows={bostaProblemRows} />
      </div>

      {/* ZAGEL Table */}
      <DynamicTable title="تفصيل أوردرات زاجل (الإسكندرية/البحيرة/القاهرة)" headers={zagelTableHeaders} rows={zagelRows} />

      {/* Service Bar Chart */}
      <BarChart
        labels={serviceBarLabels}
        data={delivered0_5}
        title="الاوردرات المسلمة (من 0 إلى 5 أيام) حسب الشركة"
      />
      <BarChart
        labels={serviceBarLabels}
        data={delivered6_10}
        title="الاوردرات المسلمة (من 6 إلى 10 أيام) حسب الشركة"
      />
      <BarChart
        labels={serviceBarLabels}
        data={delivered10}
        title="الاوردرات المسلمة (أكثر من 10 أيام) حسب الشركة"
      />

      {/* RAMP Pie */}
      <div style={{ display: "flex", gap: "20px", marginTop: 30, flexWrap: "wrap" }}>
        <PieChart labels={rampPieLabels} data={rampPieData} title="تفصيل حالات الأوردرات: رامب" />
      </div>

      {/* Footer / Insights */}
      <div style={{ marginTop: 40, color: "#bebebe", fontSize: "1.1rem" }}>
        <div>جميع البيانات ديناميكية وتظهر بشكل تفاعلي وحسب أحدث الأرقام المدخلة</div>
        <div>تم توضيح الفروقات في الأرقام والمشاكل والمعالجات حسب كل شركة، مع تقسيم واضح لجميع الحالات.</div>
      </div>
    </div>
  );
}
