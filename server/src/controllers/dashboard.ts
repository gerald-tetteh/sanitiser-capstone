/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - dashboard.ts (controller)
 */

import { RequestHandler } from "express";
import SanitizerLevelDAO from "../db/sanitizer-level-dao";

const sanitizerLevelDao = new SanitizerLevelDAO();

/**
 * Sends a json response of the level history available
 * based on the query parameters.
 */
export const getLevelHistory: RequestHandler = async (req, res, next) => {
  let page: number | undefined;
  let resultsCount: number | undefined;
  let startDate: Date | undefined;
  let endDate: Date | undefined;
  try {
    if (req.query.page) {
      page = Number(req.query.page as string);
    }
    if (req.query.resultsCount) {
      resultsCount = Number(req.query.resultsCount as string);
    }
    if (req.query.startDate) {
      startDate = new Date(req.query.startDate as string);
    }
    if (req.query.endDate) {
      endDate = new Date(req.query.endDate as string);
    }
    const levelHistory = await sanitizerLevelDao.getLevelHistory(
      page,
      resultsCount,
      startDate,
      endDate
    );
    res.status(200).json(levelHistory);
  } catch (e: any) {
    const error = new Error(e.message as string);
    next(error);
  }
};
