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
exports.getLevelHistory = void 0;
const sanitizer_level_dao_1 = __importDefault(require("../db/sanitizer-level-dao"));
const sanitizerLevelDao = new sanitizer_level_dao_1.default();
/**
 * Sends a json response of the level history available
 * based on the query parameters.
 */
const getLevelHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let page = undefined;
    let resultsCount = undefined;
    try {
        if (req.query.page) {
            page = Number(req.query.page);
        }
        if (req.query.resultsCount) {
            resultsCount = Number(req.query.resultsCount);
        }
        const levelHistory = yield sanitizerLevelDao.getLevelHistory(page, resultsCount);
        res.status(200).json(levelHistory);
    }
    catch (e) {
        const error = new Error(e.message);
        next(error);
    }
});
exports.getLevelHistory = getLevelHistory;
