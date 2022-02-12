"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level-dao.ts
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
let sanitizerLevelDB;
class SanitizerLevelDAO {
    constructor() {
        if (sanitizerLevelDB) {
            this.db = sanitizerLevelDB;
        }
        else {
            this.db = db_connect_1.default
                .db(constants_1.DATABASE_NAME)
                .collection(constants_1.SL_COLLECTION);
        }
    }
    getLevelHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Returns all available sanitizer level entries
             */
            return this.db.find({});
        });
    }
    filterByData(date) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Returns all sanitizer level reading for a particular day
             *
             * @param date - The date the data was collected
             */
            const endDate = date;
            endDate.setDate(date.getDate() + 1);
            return this.db.find({ date: { $gte: date, $lt: endDate } });
        });
    }
    insert(sanitizerLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Insert sanitizer level into collection
             *
             * @param sanitizerLevel - Sanitizer level object
             */
            yield this.db.insertOne(sanitizerLevel);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Deletes sanitizer level entry from collection
             *
             * @param id - ID of document to delete
             */
            yield this.db.deleteOne({ _id: id });
        });
    }
}
exports.default = SanitizerLevelDAO;
