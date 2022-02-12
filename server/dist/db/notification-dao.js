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
    getAllNotifications() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    insert(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Inserts a new document into the notification collection
             *
             * @param notification - notification object to insert
             */
            yield this.db.insertOne(notification);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Deletes notification entry from collection
             *
             * @param id - ID of document to delete
             */
            yield this.db.deleteOne({ _id: id });
        });
    }
}
exports.default = NotificationDAO;
