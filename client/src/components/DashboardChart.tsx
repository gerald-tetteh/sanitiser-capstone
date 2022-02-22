/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardChart.tsx
 */

import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { DailyUsage, SanitizerLevel } from "../utils/types";

Chart.register(...registerables);
type linChartDataT = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

const DashboardChart: FunctionComponent = () => {
  const [showDaily, setShowDaily] = useState<boolean>(true);
  const [dailyUsageLabels, setDailyUsageLabels] = useState<string[]>([]);
  const [sanitizerLevelLabels, setSanitizerLevelLabels] = useState<string[]>(
    []
  );
  const [dailyUsage, setDailyUsage] = useState<number[]>([]);
  const [sanitizerLevel, setSanitizerLevel] = useState<number[]>([]);
  const dailyButtonRef = useRef<HTMLButtonElement>(null);
  const sanitizerButtonRef = useRef<HTMLButtonElement>(null);

  const buildChartData = (
    labels: string[],
    label: string,
    data: number[],
    line = false
  ) => {
    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: line ? "#ecdbba" : ["#ecdbba"],
          borderColor: line ? "#c84b31" : "",
        },
      ],
    };
  };
  const buildChartOptions = (title: string) => {
    return {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            text: title,
            display: true,
            color: "#fefefe",
            font: {
              size: 19,
            },
          },
          ticks: {
            color: "#fefefe",
            padding: 15,
          },
          grid: {
            display: true,
            color: "#fefefe",
            borderColor: "#fefefe",
            borderWidth: 5,
            drawTicks: false,
          },
        },
        x: {
          ticks: {
            color: "#fefefe",
          },
          grid: {
            borderColor: "#fefefe",
            borderWidth: 5,
          },
        },
      },
    };
  };

  const dailyUsageChartData = buildChartData(
    dailyUsageLabels,
    "Usage Count",
    dailyUsage
  );
  const sanitizerLevelChartData = buildChartData(
    sanitizerLevelLabels,
    "Sanitizer Level",
    sanitizerLevel,
    true
  ) as linChartDataT;
  const sanitizerLevelOptions = buildChartOptions("% LEVEL");
  const dailyUsageOptions = buildChartOptions("# OF USERS");

  const handleShowDaily = () => {
    sanitizerButtonRef.current?.classList.remove("dashboard__analysis__active");
    dailyButtonRef.current?.classList.add("dashboard__analysis__active");
    setShowDaily(true);
  };
  const handleShowSanitizerLevel = () => {
    sanitizerButtonRef.current?.classList.add("dashboard__analysis__active");
    dailyButtonRef.current?.classList.remove("dashboard__analysis__active");
    setShowDaily(false);
  };

  useEffect(() => {
    fetch("/dashboard/usage-history")
      .then((response) => {
        return response.json();
      })
      .then((data: DailyUsage[]) => {
        const dailyUsageLabels = data.map((usage) => {
          return new Date(usage.date).toLocaleDateString();
        });
        const dailyUsage = data.map((usage) => usage.useCount);
        setDailyUsageLabels(dailyUsageLabels);
        setDailyUsage(dailyUsage);
      })
      .catch((err) => console.error(err));
    fetch("/dashboard/level-history")
      .then((response) => {
        return response.json();
      })
      .then((data: SanitizerLevel[]) => {
        const sanitizerLevelLabels = data.map((level) => {
          return new Date(level.date).toLocaleDateString();
        });
        const sanitizerLevel = data.map((level) => level.percentage);
        setSanitizerLevel(sanitizerLevel);
        setSanitizerLevelLabels(sanitizerLevelLabels);
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
          <button
            ref={dailyButtonRef}
            onClick={handleShowDaily}
            className="dashboard__analysis__tab dashboard__analysis__active"
          >
            D.Usage
          </button>
          <button
            ref={sanitizerButtonRef}
            onClick={handleShowSanitizerLevel}
            className="dashboard__analysis__tab"
          >
            S.Level
          </button>
        </nav>
      </div>
      {showDaily ? (
        <Bar data={dailyUsageChartData} options={dailyUsageOptions} />
      ) : (
        <Line data={sanitizerLevelChartData} options={sanitizerLevelOptions} />
      )}
    </article>
  );
};

export default DashboardChart;
