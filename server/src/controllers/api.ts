/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level.js (controller)
 */

import { RequestHandler } from "express";
import SanitizerLevelDAO from "../db/sanitizer-level-dao";
import DailyUsageDAO from "../db/daily-usage-dao";
import NotificationDAO from "../db/notification-dao";

const sanitizerLevelDao = new SanitizerLevelDAO();
const dailyUsageDoa = new DailyUsageDAO();
const notificationDao = new NotificationDAO();

export const postSanitizerLevel: RequestHandler = async (req, res, next) => {
  /**
   * Inserts the sanitizer level into the sanitizer level collection
   */
  try {
    const sanitizerLevel = req.body as { percentage: number; date: string };
    await sanitizerLevelDao.insert({
      percentage: sanitizerLevel.percentage,
      date: new Date(sanitizerLevel.date),
    });
    res.status(201).json({ message: "Inserted Item", error: false });
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
export const postUsageCount: RequestHandler = async (req, res, next) => {
  /**
   * Update or insert daily usage count of the sanitizing machine
   */
  try {
    await dailyUsageDoa.insertOrUpdate();
    res.status(201).json({ message: "Updated Item", error: false });
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
// TODO: Add socket.io and mail service
export const postNotification: RequestHandler = async (req, res, next) => {
  /**
   * Inserts notification into notification collection and sends
   * an email to the user.
   */
  try {
    const notification = req.body as {
      percentage: number;
      date: string;
      priority: number;
    };
    await notificationDao.insert({
      date: new Date(notification.date),
      percentage: notification.percentage,
      priority: notification.priority,
    });
    // socket.io
    // email
    res.status(201).json({ message: "Inserted Item", error: false });
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
