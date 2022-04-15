/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardAnalysis.tsx
 */

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { USAGE_URL } from "../utils/constants";
import { DailyUsage, DailyUsagePagination } from "../utils/types";
import { DataContext } from "../providers/DataProvider";

Chart.register(...registerables);

const DashboardPieChart: FunctionComponent = () => {
  const dataProvider = useContext(DataContext);
  const [weekDayUsage, setWeekDayUsage] = useState<number[]>([]);
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const endDate = new Date().toLocaleDateString("af-ZA");
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const startDateString = startDate.toLocaleDateString("af-ZA");
  const handleParseUsageData = (usageData: DailyUsage[]) => {
    const weekDayCount = [0, 0, 0, 0, 0, 0, 0];
    for (let dailyUsage of usageData) {
      const date = new Date(dailyUsage.date);
      const dayOfWeek = date.getDay();
      weekDayCount[dayOfWeek] += dailyUsage.useCount;
    }
    return weekDayCount;
  };
  const fetchData = () => {
    fetch(
      `${USAGE_URL}?startDate=${startDateString}&endDate=${endDate}&resultsCount=30`
    )
      .then((response) => response.json())
      .then((data: DailyUsagePagination) => {
        setWeekDayUsage(handleParseUsageData(data[0] as DailyUsage[]));
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData();
    dataProvider?.socket?.on("usageCount", (_) => {
      fetchData();
    });
  }, []);
  // TODO: check for errors
  return (
    <article className="dashboard__analysis__pie-chart">
      <Pie
        data={{
          labels: daysOfTheWeek,
          datasets: [
            {
              label: "Daily usage for past month",
              data: weekDayUsage,
              backgroundColor: [
                "#2196f3",
                "#428edd",
                "#5287c7",
                "#5c80b1",
                "#62799c",
                "#667287",
                "#676b73",
              ],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Daily Usage",
              color: "#f7f7f7",
              align: "start",
              font: {
                size: 20,
                family: "monospace",
              },
            },
            subtitle: {
              display: true,
              text: "Past Month",
              color: "#ededed",
              align: "start",
            },
          },
          borderColor: "#212121",
          color: "#f7f7f7",
          font: {
            family: "monospace",
          },
        }}
      />
    </article>
  );
};

export default DashboardPieChart;
