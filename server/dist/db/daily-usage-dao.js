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
    getUsageHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Returns all tha available sanitizer usage history
             */
            return this.db.find({});
        });
    }
    filterUsageHistory() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    insertOrUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Inserts a new document into the daily usage collection
             * or updates a document if the date already exists
             */
            const today = new Date().toLocaleDateString();
            const usageData = yield this.db.findOne({ date: new Date(today) });
            if (usageData) {
                yield this.db.updateOne({ _id: usageData._id }, { $set: { useCount: usageData.useCount + 1 } });
            }
            else {
                yield this.db.insertOne({
                    date: new Date(today),
                    useCount: 1,
                });
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Delete usage data entry
             */
            yield this.db.deleteOne({ _id: id });
        });
    }
}
exports.default = DailyUsageDAO;
