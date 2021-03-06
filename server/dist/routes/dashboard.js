"use strict";
/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - dashboard.ts (routes)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../controllers/dashboard");
const router = express_1.default.Router();
router.get("/level-history", dashboard_1.getLevelHistory);
router.get("/usage-history", dashboard_1.getUsageHistory);
router
    .route("/notifications")
    .get(dashboard_1.getNotifications)
    .patch(dashboard_1.toggleNotificationComplete);
router.get("/notifications/new", dashboard_1.getNewNotifications);
exports.default = router;
