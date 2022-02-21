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
  // const dailyUsageCanvas = useRef<HTMLCanvasElement>(null);
  // const sanitizerLevelCanvas = useRef<HTMLCanvasElement>(null);
  const [showDaily, setShowDaily] = useState<boolean>(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [dailyUsage, setDailyUsage] = useState<number[]>([]);

  const dailyUsageChartData = {
    labels: labels,
    datasets: [
      {
        label: "Usage Count",
        data: dailyUsage,
      },
    ],
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
      {showDaily ? <Bar data={dailyUsageChartData} /> : <canvas></canvas>}
    </article>
  );
};

export default DashboardChart;
