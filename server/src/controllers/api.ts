/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level.js (controller)
 */

import { RequestHandler } from "express";
import SanitizerLevelDAO from "../db/sanitizer-level-dao";
import DailyUsageDAO from "../db/daily-usage-dao";
import NotificationDAO from "../db/notification-dao";
import socket from "../utils/socket";
import { createTransport } from "nodemailer";

const sanitizerLevelDao = new SanitizerLevelDAO();
const dailyUsageDoa = new DailyUsageDAO();
const notificationDao = new NotificationDAO();

const transporter = createTransport({
  service: "SendinBlue",
  auth: {
    user: "addodevelop@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Inserts the sanitizer level into the sanitizer level collection
 */
export const postSanitizerLevel: RequestHandler = async (req, res, next) => {
  try {
    const sanitizerLevel = req.body as { percentage: number };
    const date = new Date();
    await sanitizerLevelDao.insert({
      percentage: sanitizerLevel.percentage,
      date: date,
    });
    socket.getIo().emit("sanitizerLevel", {
      percentage: sanitizerLevel.percentage,
      date: date,
    });
    res.status(201).json({ message: "Inserted Item", error: false });
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
/**
 * Update or insert daily usage count of the sanitizing machine
 */
export const postUsageCount: RequestHandler = async (req, res, next) => {
  try {
    const dailyUsage = await dailyUsageDoa.insertOrUpdate();
    socket.getIo().emit("usageCount", dailyUsage);
    res.status(201).json({ message: "Updated Item", error: false });
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
/**
 * Get the usage count for the current day
 */
export const getUsageCount: RequestHandler = async (req, res, next) => {
  try {
    const usageToday = await dailyUsageDoa.getTodayUsage();
    if (usageToday) {
      res
        .status(200)
        .json({ dailyUsage: usageToday.useCount, date: Date.now() });
    } else {
      res.status(200).json({ dailyUsage: 0 });
    }
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
/**
 * Inserts notification into notification collection and sends
 * an email to the user.
 */
export const postNotification: RequestHandler = async (req, res, next) => {
  try {
    const notification = req.body as {
      percentage: number;
      priority: number;
    };
    const completeNotification = {
      date: new Date(),
      percentage: notification.percentage,
      priority: notification.priority,
      handled: false,
    };
    await notificationDao.insert(completeNotification);
    socket.getIo().emit("notification", completeNotification);
    transporter.sendMail({
      subject: "Refill Sanitiser!",
      from: "AHSM@Capstone",
      to: "geraldadt@outlook.com",
      html: `
      <p>Hello There,</p>
      <p>The sanitiser level is low and needs to refilled</p>
      <p>Sanitiser Level: <strong>${notification.percentage}%</strong></p>
      <p>
        Regards,<br />
        AHSM@Capstone.
      </p>
      <p>This is an automated notification.</p>
      `,
      replyTo: "no-reply@AHSM",
    });
    // socket.io
    // email
    res.status(201).json({ message: "Inserted Item", error: false });
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
