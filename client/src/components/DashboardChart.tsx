/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardChart.tsx
 */

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FunctionComponent, useEffect, useState } from "react";
import { DailyUsage } from "../utils/types";

Chart.register(...registerables);

const DashboardChart: FunctionComponent = () => {
  const [showDaily, setShowDaily] = useState<boolean>(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [dailyUsage, setDailyUsage] = useState<number[]>([]);

  const dailyUsageChartData = {
    labels: labels,
    datasets: [
      {
        label: "Usage Count",
        data: dailyUsage,
        backgroundColor: ["#ecdbba"],
      },
    ],
  };
  const dailyUsageOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          text: "# of uses",
          display: true,
          color: "#fefefe",
          font: {
            size: 19,
          },
        },
        ticks: {
          color: "#fefefe",
        },
      },
      x: {
        ticks: {
          color: "#fefefe",
        },
      },
    },
  };

  useEffect(() => {
    fetch("/dashboard/usage-history")
      .then((response) => {
        return response.json();
      })
      .then((data: DailyUsage[]) => {
        const labels = data.map((usage) => {
          return new Date(usage.date).toLocaleDateString();
        });
        const dailyUsage = data.map((usage) => usage.useCount);
        setLabels(labels);
        setDailyUsage(dailyUsage);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <article className="dashboard__analysis__chart">
      <div className="dashboard__analysis__heading-box">
        <h3 className="dashboard__analysis__heading">
          {showDaily ? "Daily Usage" : "Sanitizer Level"}
        </h3>
        <nav className="dashboard__analysis__tabs">
          <button className="dashboard__analysis__tab">D.Usage</button>
          <button className="dashboard__analysis__tab">S.Level</button>
        </nav>
      </div>
      {showDaily ? (
        <Bar data={dailyUsageChartData} options={dailyUsageOptions} />
      ) : (
        <canvas></canvas>
      )}
    </article>
  );
};

export default DashboardChart;
