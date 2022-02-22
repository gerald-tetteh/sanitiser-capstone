/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardChart.tsx
 */

export type DailyUsage = {
  _id: string;
  date: Date | string;
  useCount: number;
};
export type SanitizerLevel = {
  _id: string;
  percentage: number;
  date: Date | string;
};