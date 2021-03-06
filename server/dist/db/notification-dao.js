"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - notification-dao.ts
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
exports.Priority = void 0;
const constants_1 = require("../utils/constants");
const db_connect_1 = __importDefault(require("./db-connect"));
var Priority;
(function (Priority) {
    Priority[Priority["HIGH"] = 1] = "HIGH";
    Priority[Priority["LOW"] = 0] = "LOW";
})(Priority = exports.Priority || (exports.Priority = {}));
let notificationDB;
/**
 * Notification DAO
 * Contains functions used to query the Notification collection.
 */
class NotificationDAO {
    constructor() {
        if (notificationDB) {
            this.db = notificationDB;
        }
        else {
            this.db = db_connect_1.default
                .db(constants_1.DATABASE_NAME)
                .collection(constants_1.NT_COLLECTION);
        }
    }
    /**
     * Returns all available notifications
     *
     * @param page - the current page of data to return defaults to 1
     * @param resultsCount - the number of results to show per page defaults to 20
     * @param startDate - The starting date of the filter
     * @param endDate - The end date of the filter
     * @returns A promise for the notifications array
     */
    getAllNotifications(page = 1, resultsCount = 20, startDate, endDate) {
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
     * Returns all notifications that have handled = false
     *
     * @returns Array of notifications
     */
    getNewNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.find({ handled: false }).toArray();
        });
    }
    /**
     * Inserts a new document into the notification collection
     *
     * @param notification - notification object to insert
     */
    insert(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.insertOne(notification);
        });
    }
    /**
     * Deletes notification entry from collection
     *
     * @param id - ID of document to delete
     */
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.deleteOne({ _id: id });
        });
    }
    toggleHandled(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield this.db.findOne({ _id: id });
            if (notification) {
                yield this.db.updateOne({ _id: id }, {
                    $set: { handled: !notification.handled },
                });
            }
            else {
                throw new Error("Notification does not exist");
            }
        });
    }
}
exports.default = NotificationDAO;
