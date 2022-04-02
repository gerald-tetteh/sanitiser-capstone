/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - dashboard.ts (routes)
 */

import express from "express";
import {
  getLevelHistory,
  getNewNotifications,
  getNotifications,
  getUsageHistory,
  toggleNotificationComplete,
} from "../controllers/dashboard";

const router = express.Router();

router.get("/level-history", getLevelHistory);
router.get("/usage-history", getUsageHistory);
router
  .route("/notifications")
  .get(getNotifications)
  .patch(toggleNotificationComplete);
router.get("/notifications/new", getNewNotifications);

export default router;
