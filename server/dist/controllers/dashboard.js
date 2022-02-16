"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - dashboard.ts (controller)
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
exports.getUsageHistory = exports.getLevelHistory = void 0;
const daily_usage_dao_1 = __importDefault(require("../db/daily-usage-dao"));
const sanitizer_level_dao_1 = __importDefault(require("../db/sanitizer-level-dao"));
const sanitizerLevelDao = new sanitizer_level_dao_1.default();
const dailyUsageDao = new daily_usage_dao_1.default();
/**
 * Parse the query parameters from the request object
 *
 * @param req - Request object
 * @returns the parsed parameters
 */
const parseQuery = (req) => {
    let page;
    let resultsCount;
    let startDate;
    let endDate;
    if (req.query.page) {
        page = Number(req.query.page);
    }
    if (req.query.resultsCount) {
        resultsCount = Number(req.query.resultsCount);
    }
    if (req.query.startDate) {
        startDate = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
        endDate = new Date(req.query.endDate);
    }
    return { page, resultsCount, startDate, endDate };
};
/**
 * Sends a json response of the level history available
 * based on the query parameters.
 */
const getLevelHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, resultsCount, startDate, endDate } = parseQuery(req);
        const levelHistory = yield sanitizerLevelDao.getLevelHistory(page, resultsCount, startDate, endDate);
        res.status(200).json(levelHistory);
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.getLevelHistory = getLevelHistory;
/**
 * Sends json response of available usage history based on
 * query parameters
 */
const getUsageHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, resultsCount, startDate, endDate } = parseQuery(req);
        const usageHistory = yield dailyUsageDao.getUsageHistory(page, resultsCount, startDate, endDate);
        res.status(200).json(usageHistory);
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.getUsageHistory = getUsageHistory;
