"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - daily-usage-dao.ts
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
const constants_1 = require("../utils/constants");
const db_connect_1 = __importDefault(require("./db-connect"));
let dailyUsageDB;
/**
 * Daily usage DAO
 * Contains functions used to query the daily usage collection.
 */
class DailyUsageDAO {
    constructor() {
        if (dailyUsageDB) {
            this.db = dailyUsageDB;
        }
        else {
            this.db = db_connect_1.default
                .db(constants_1.DATABASE_NAME)
                .collection(constants_1.DU_COLLECTION);
        }
    }
    /**
     * Gets the current date.
     * @returns the current date.
     */
    getTodayDate() {
        const today = new Date().toLocaleDateString("en-GB").split("/").map(Number);
        return new Date(today[2], today[1] - 1, today[0]);
    }
    /**
     * Returns all tha available sanitizer usage history
     *
     * @param page - the current page of data to return defaults to 1
     * @param resultsCount - the number of results to show per page defaults to 20
     * @param startDate - The starting date of the filter
     * @param endDate - The end date of the filter
     * @returns A promise - An array of the usage data
     */
    getUsageHistory(page = 1, resultsCount = 20, startDate, endDate = new Date()) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (startDate && endDate) {
                if (startDate > endDate) {
                    throw new Error("End date must be greater than or equal to start date");
                }
                // increase end date if equal to start date
                if (startDate.toString() === endDate.toString()) {
                    endDate.setDate(endDate.getDate() + 1);
                }
                filter = { date: { $gte: startDate, $lte: endDate } };
            }
            const cursor = this.db
                .find(filter)
                .skip(resultsCount * (page - 1))
                .limit(resultsCount);
            return cursor.toArray();
        });
    }
    /**
     * Gets the usage data fro the current day
     * @returns Date for current day
     */
    getTodayUsage() {
        return __awaiter(this, void 0, void 0, function* () {
            const todayDate = this.getTodayDate();
            return this.db.findOne({ date: todayDate });
        });
    }
    /**
     * Inserts a new document into the daily usage collection
     * or updates a document if the date already exists
     */
    insertOrUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            const todayDate = this.getTodayDate();
            const usageData = yield this.db.findOne({ date: todayDate });
            if (usageData) {
                yield this.db.updateOne({ _id: usageData._id }, { $set: { useCount: usageData.useCount + 1 } });
            }
            else {
                yield this.db.insertOne({
                    date: todayDate,
                    useCount: 1,
                });
            }
        });
    }
    /**
     * Delete usage data entry
     *
     * @param id - ID of document to delete
     */
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.deleteOne({ _id: id });
        });
    }
}
exports.default = DailyUsageDAO;
