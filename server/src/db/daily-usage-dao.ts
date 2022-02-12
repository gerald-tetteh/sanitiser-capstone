/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - daily-usage-dao.ts
 */

import { Collection, ObjectId } from "mongodb";
import { DATABASE_NAME, DU_COLLECTION } from "../utils/constants";
import mongoClient from "./db-connect";

export interface DailyUsage {
  /**
   * DailyUsage collection interface
   *
   * @param _id - ID of document
   * @param date - Date (day) document was recorded
   * @param useCount - The number of times the sanitizing machine was used in a day
   */
  date: Date;
  useCount: number;
}

let dailyUsageDB: Collection<DailyUsage>;

class DailyUsageDAO {
  /**
   * Daily usage DAO
   * Contains functions used to query the daily usage collection.
   */
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

  async getUsageHistory(this: DailyUsageDAO) {
    /**
     * Returns all tha available sanitizer usage history
     */
    return this.db.find({});
  }
  async filterUsageHistory(this: DailyUsageDAO) {}
  async insertOrUpdate(this: DailyUsageDAO) {
    /**
     * Inserts a new document into the daily usage collection
     * or updates a document if the date already exists
     */
    const today = new Date().toLocaleDateString();
    const usageData = await this.db.findOne({ date: new Date(today) });
    if (usageData) {
      await this.db.updateOne(
        { _id: usageData._id },
        { $set: { useCount: usageData.useCount + 1 } }
      );
    } else {
      await this.db.insertOne({
        date: new Date(today),
        useCount: 1,
      });
    }
  }
  async deleteById(this: DailyUsageDAO, id: ObjectId) {
    /**
     * Delete usage data entry
     */
    await this.db.deleteOne({ _id: id });
  }
}

export default DailyUsageDAO;
