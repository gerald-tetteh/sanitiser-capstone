/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - dashboard.ts (routes)
 */

import express from "express";
import { getLevelHistory, getUsageHistory } from "../controllers/dashboard";

const router = express.Router();

router.get("/level-history", getLevelHistory);
router.get("/usage-history", getUsageHistory);
router.get("/notifications");

export default router;
