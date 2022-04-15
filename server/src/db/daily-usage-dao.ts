/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - daily-usage-dao.ts
 */

import { Collection, ObjectId, Filter } from "mongodb";
import { DATABASE_NAME, DU_COLLECTION } from "../utils/constants";
import mongoClient from "./db-connect";

/**
 * DailyUsage collection interface
 *
 * @param _id - ID of document
 * @param date - Date (day) document was recorded
 * @param useCount - The number of times the sanitizing machine was used in a day
 */
export interface DailyUsage {
  date: Date;
  useCount: number;
}

let dailyUsageDB: Collection<DailyUsage>;

/**
 * Daily usage DAO
 * Contains functions used to query the daily usage collection.
 */
class DailyUsageDAO {
  private db: Collection<DailyUsage>;
  constructor() {
    if (dailyUsageDB) {
      this.db = dailyUsageDB;
    } else {
      this.db = mongoClient
        .db(DATABASE_NAME)
        .collection<DailyUsage>(DU_COLLECTION);
    }
  }

  /**
   * Gets the current date.
   * @returns the current date.
   */
  private getTodayDate() {
    const today = new Date().toLocaleDateString("en-GB").split("/").map(Number);
    return new Date(today[2], today[1] - 1, today[0]);
  }
  /**
   * Returns all tha available sanitizer usage history
   *
   * @param page - the current page of data to return defaults to 1
   * @param resultsCount - the number of results to show per page defaults to 20
   * @param startDate - The starting date of the filter
   * @param endDate - The end date of the filter
   * @returns A promise - An array of the usage data and total number of results
   */
  async getUsageHistory(
    this: DailyUsageDAO,
    page = 1,
    resultsCount = 20,
    startDate?: Date,
    endDate: Date = new Date()
  ) {
    let filter: Filter<DailyUsage> = {};
    if (startDate && endDate) {
      if (startDate > endDate) {
        throw new Error("End date must be greater than or equal to start date");
      }
      // increase end date if equal to start date
      if (startDate.toString() === endDate.toString()) {
        endDate.setDate(endDate.getDate() + 1);
      }
      filter = { date: { $gte: startDate, $lte: endDate } };
    }
    const cursor = this.db
      .find(filter)
      .skip(resultsCount * (page - 1))
      .sort({ date: 1 })
      .limit(resultsCount);
    const totalQueryResults = await this.db.countDocuments(filter);
    return [await cursor.toArray(), totalQueryResults];
  }
  /**
   * Gets the usage data fro the current day
   * @returns Date for current day
   */
  async getTodayUsage() {
    const todayDate = this.getTodayDate();
    return this.db.findOne({ date: todayDate });
  }
  /**
   * Inserts a new document into the daily usage collection
   * or updates a document if the date already exists
   */
  async insertOrUpdate(this: DailyUsageDAO) {
    const todayDate = this.getTodayDate();
    const usageData = await this.db.findOne({ date: todayDate });
    if (usageData) {
      await this.db.findOneAndUpdate(
        { _id: usageData._id },
        { $set: { useCount: usageData.useCount + 1 } }
      );
      return {
        date: usageData.date,
        useCount: usageData.useCount + 1,
      };
    } else {
      await this.db.insertOne({
        date: todayDate,
        useCount: 1,
      });
    }
    return {
      date: todayDate,
      useCount: 1,
    };
  }
  /**
   * Delete usage data entry
   *
   * @param id - ID of document to delete
   */
  async deleteById(this: DailyUsageDAO, id: ObjectId) {
    await this.db.deleteOne({ _id: id });
  }
}

export default DailyUsageDAO;
