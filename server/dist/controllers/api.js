"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level.js (controller)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotification = exports.getUsageCount = exports.postUsageCount = exports.postSanitizerLevel = void 0;
const sanitizer_level_dao_1 = __importDefault(require("../db/sanitizer-level-dao"));
const daily_usage_dao_1 = __importDefault(require("../db/daily-usage-dao"));
const notification_dao_1 = __importDefault(require("../db/notification-dao"));
const socket_1 = __importDefault(require("../utils/socket"));
const nodemailer_1 = require("nodemailer");
const sanitizerLevelDao = new sanitizer_level_dao_1.default();
const dailyUsageDoa = new daily_usage_dao_1.default();
const notificationDao = new notification_dao_1.default();
const transporter = (0, nodemailer_1.createTransport)({
    service: "SendinBlue",
    auth: {
        user: "addodevelop@gmail.com",
        pass: process.env.MAIL_PASS,
    },
});
/**
 * Inserts the sanitizer level into the sanitizer level collection
 */
const postSanitizerLevel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sanitizerLevel = req.body;
        const date = new Date();
        yield sanitizerLevelDao.insert({
            percentage: sanitizerLevel.percentage,
            date: date,
        });
        socket_1.default.getIo().emit("sanitizerLevel", {
            percentage: sanitizerLevel.percentage,
            date: date,
        });
        res.status(201).json({ message: "Inserted Item", error: false });
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.postSanitizerLevel = postSanitizerLevel;
/**
 * Update or insert daily usage count of the sanitizing machine
 */
const postUsageCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyUsage = yield dailyUsageDoa.insertOrUpdate();
        socket_1.default.getIo().emit("usageCount", dailyUsage);
        res.status(201).json({ message: "Updated Item", error: false });
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.postUsageCount = postUsageCount;
/**
 * Get the usage count for the current day
 */
const getUsageCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usageToday = yield dailyUsageDoa.getTodayUsage();
        if (usageToday) {
            res
                .status(200)
                .json({ dailyUsage: usageToday.useCount, date: Date.now() });
        }
        else {
            res.status(200).json({ dailyUsage: 0 });
        }
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.getUsageCount = getUsageCount;
/**
 * Inserts notification into notification collection and sends
 * an email to the user.
 */
const postNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = req.body;
        const completeNotification = {
            date: new Date(),
            percentage: notification.percentage,
            priority: notification.priority,
            handled: false,
        };
        yield notificationDao.insert(completeNotification);
        socket_1.default.getIo().emit("notification", completeNotification);
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
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.postNotification = postNotification;
