/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level.js (routes)
 */

import express from "express";
import {
  getUsageCount,
  postNotification,
  postSanitizerLevel,
  postUsageCount,
} from "../controllers/api";

const router = express.Router();

router.post("/sanitizer-level", postSanitizerLevel);
router.route("/usage-count").post(postUsageCount).get(getUsageCount);
router.post("/notification", postNotification);

export default router;
