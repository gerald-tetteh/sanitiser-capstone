"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level.js (routes)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controllers/api");
const router = express_1.default.Router();
router.post("/sanitizer-level", api_1.postSanitizerLevel);
router.route("/usage-count").post(api_1.postUsageCount).get(api_1.getUsageCount);
router.post("/notification", api_1.postNotification);
exports.default = router;
