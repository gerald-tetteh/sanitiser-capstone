/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Types.ts
 */

export enum Priority {
  HIGH = 1,
  LOW = 0,
}

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
export type UserNotification = {
  _id: string;
  date: Date | string;
  priority: Priority;
  percentage: number;
  handled: boolean;
};
export type DailyUsagePagination = [DailyUsage[], number];
export type SanitizerLevelPagination = [SanitizerLevel[], number];
