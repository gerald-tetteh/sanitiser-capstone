/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - dashboard.ts (controller)
 */

import { Request, RequestHandler } from "express";
import DailyUsageDAO from "../db/daily-usage-dao";
import NotificationDAO from "../db/notification-dao";
import SanitizerLevelDAO from "../db/sanitizer-level-dao";

const sanitizerLevelDao = new SanitizerLevelDAO();
const dailyUsageDao = new DailyUsageDAO();
const notificationsDao = new NotificationDAO();

/**
 * Parse the query parameters from the request object
 *
 * @param req - Request object
 * @returns the parsed parameters
 */
const parseQuery = (req: Request) => {
  let page: number | undefined;
  let resultsCount: number | undefined;
  let startDate: Date | undefined;
  let endDate: Date | undefined;
  if (req.query.page) {
    page = Number(req.query.page as string);
  }
  if (req.query.resultsCount) {
    resultsCount = Number(req.query.resultsCount as string);
  }
  if (req.query.startDate) {
    startDate = new Date(req.query.startDate as string);
  }
  if (req.query.endDate) {
    endDate = new Date(req.query.endDate as string);
  }
  return { page, resultsCount, startDate, endDate };
};

/**
 * Sends a json response of the level history available
 * based on the query parameters.
 */
export const getLevelHistory: RequestHandler = async (req, res, next) => {
  try {
    const { page, resultsCount, startDate, endDate } = parseQuery(req);
    const levelHistory = await sanitizerLevelDao.getLevelHistory(
      page,
      resultsCount,
      startDate,
      endDate
    );
    res.status(200).json(levelHistory);
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
/**
 * Sends json response of available usage history based on
 * query parameters
 */
export const getUsageHistory: RequestHandler = async (req, res, next) => {
  try {
    const { page, resultsCount, startDate, endDate } = parseQuery(req);
    const usageHistory = await dailyUsageDao.getUsageHistory(
      page,
      resultsCount,
      startDate,
      endDate
    );
    res.status(200).json(usageHistory);
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
/**
 * Sends json response of available notifications
 */
export const getNotifications: RequestHandler = async (req, res, next) => {
  try {
    const notifications = await notificationsDao.getAllNotifications();
    res.status(200).json(notifications);
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
