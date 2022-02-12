/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level.js (routes)
 */

import express from "express";
import {
  postNotification,
  postSanitizerLevel,
  postUsageCount,
} from "../controllers/api";

const router = express.Router();

router.post("/sanitizer-level", postSanitizerLevel);
router.post("/usage-count", postUsageCount);
router.post("/notification", postNotification);

export default router;
