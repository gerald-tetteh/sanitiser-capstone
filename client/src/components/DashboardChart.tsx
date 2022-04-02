/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardChart.tsx
 */

import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DailyUsage, SanitizerLevel } from "../utils/types";
import { S_LEVEL_URL, USAGE_URL } from "../utils/constants";
import { DataContext } from "../providers/DataProvider";

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
  const dataProvider = useContext(DataContext);

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
            color: "#191919",
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
            color: "#191919",
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
    fetch(`${USAGE_URL}`)
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
    fetch(`${S_LEVEL_URL}?resultsCount=15`)
      .then((response) => {
        return response.json();
      })
      .then((data: SanitizerLevel[]) => {
        const sanitizerLevelLabels = data.map((level) => {
          return new Date(level.date).toLocaleDateString();
        });
        const sanitizerLevel = data.reverse().map((level) => level.percentage);
        setSanitizerLevel(sanitizerLevel);
        setSanitizerLevelLabels(sanitizerLevelLabels);
      })
      .catch((err) => console.error(err));
    dataProvider?.socket?.on("sanitizerLevel", (data: SanitizerLevel) => {
      setSanitizerLevel((levels) => {
        const updatedLevels = [...levels];
        if (updatedLevels.length >= 10) {
          updatedLevels.shift();
          updatedLevels.push(data.percentage);
        } else {
          updatedLevels.push(data.percentage);
        }
        return updatedLevels;
      });
      setSanitizerLevelLabels((labels) => {
        const updatedLabels = [...labels];
        const date = new Date(data.date).toLocaleDateString();
        if (updatedLabels.length >= 10) {
          updatedLabels.shift();
          updatedLabels.push(date);
        } else {
          updatedLabels.push(date);
        }
        return updatedLabels;
      });
    });
    dataProvider?.socket?.on("usageCount", (data: DailyUsage) => {
      const date = new Date(data.date).toLocaleDateString();
      setDailyUsageLabels((labels) => {
        const updatedLabels = [...labels];
        setDailyUsage((usage) => {
          const updatedUsage = [...usage];
          if (date !== updatedLabels[updatedLabels.length - 1]) {
            if (updatedLabels.length === 11) {
              updatedLabels.shift();
              updatedUsage.shift();
            }
            updatedLabels.push(date);
            updatedUsage.push(data.useCount);
          } else {
            updatedLabels[updatedLabels.length - 1] += 1;
            updatedUsage[updatedUsage.length - 1] += 1;
          }
          return updatedUsage;
        });
        return updatedLabels;
      });
    });
  }, [dataProvider?.socket]);

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
