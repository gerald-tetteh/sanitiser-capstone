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
exports.postNotification = exports.postUsageCount = exports.postSanitizerLevel = void 0;
const sanitizer_level_dao_1 = __importDefault(require("../db/sanitizer-level-dao"));
const daily_usage_dao_1 = __importDefault(require("../db/daily-usage-dao"));
const notification_dao_1 = __importDefault(require("../db/notification-dao"));
const sanitizerLevelDao = new sanitizer_level_dao_1.default();
const dailyUsageDoa = new daily_usage_dao_1.default();
const notificationDao = new notification_dao_1.default();
const postSanitizerLevel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Inserts the sanitizer level into the sanitizer level collection
     */
    try {
        const sanitizerLevel = req.body;
        yield sanitizerLevelDao.insert({
            percentage: sanitizerLevel.percentage,
            date: new Date(sanitizerLevel.date),
        });
        res.status(201).json({ message: "Inserted Item", error: false });
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.postSanitizerLevel = postSanitizerLevel;
const postUsageCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Update or insert daily usage count of the sanitizing machine
     */
    try {
        yield dailyUsageDoa.insertOrUpdate();
        res.status(201).json({ message: "Updated Item", error: false });
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.postUsageCount = postUsageCount;
// TODO: Add socket.io and mail service
const postNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Inserts notification into notification collection and sends
     * an email to the user.
     */
    try {
        const notification = req.body;
        yield notificationDao.insert({
            date: new Date(notification.date),
            percentage: notification.percentage,
            priority: notification.priority,
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
