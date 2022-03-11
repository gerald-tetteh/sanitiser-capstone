/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level-dao.ts
 */

import { Collection, Filter, ObjectId, Sort } from "mongodb";
import { DATABASE_NAME, SL_COLLECTION } from "../utils/constants";
import mongoClient from "./db-connect";

/**
 * Sanitizer level collection interface
 *
 * @param _id - ID of document (optional)
 * @param percentage - Percentage of the sanitizer in the container.
 * @param date - Date the data was collected
 */
export interface SanitizerLevel {
  percentage: number;
  date: Date;
}

let sanitizerLevelDB: Collection<SanitizerLevel>;

/**
 * Sanitizer level DAO
 * Contains functions used to query the sanitizer level collection.
 */
class SanitizerLevelDAO {
  private db: Collection<SanitizerLevel>;
  constructor() {
    if (sanitizerLevelDB) {
      this.db = sanitizerLevelDB;
    } else {
      this.db = mongoClient
        .db(DATABASE_NAME)
        .collection<SanitizerLevel>(SL_COLLECTION);
    }
  }

  /**
   * Returns a promise of all available level history based on the page
   * number and number of results desired.
   *
   * @param page - the current page of data to return defaults to 1
   * @param resultsCount - the number of results to show per page defaults to 20
   * @param startDate - The starting date of the filter
   * @param endDate - The end date of the filter
   */
  async getLevelHistory(
    this: SanitizerLevelDAO,
    page = 1,
    resultsCount = 20,
    startDate?: Date,
    endDate?: Date
  ) {
    let filter: Filter<SanitizerLevel> = {};
    let sort: Sort = { date: 1 };
    if (startDate && endDate) {
      if (startDate > endDate) {
        throw new Error("End date must be greater than or equal to start date");
      }
      // increase end date if equal to start date
      if (startDate.toString() === endDate.toString()) {
        endDate.setDate(endDate.getDate() + 1);
      }
      filter = { date: { $gte: startDate, $lte: endDate } };
    } else {
      if (resultsCount == 1) {
        sort = { date: -1 };
      }
    }
    const cursor = this.db
      .find(filter)
      .skip(resultsCount * (page - 1))
      .sort(sort)
      .limit(resultsCount);
    return cursor.toArray();
  }
  /**
   * Insert sanitizer level into collection
   *
   * @param sanitizerLevel - Sanitizer level object
   */
  async insert(this: SanitizerLevelDAO, sanitizerLevel: SanitizerLevel) {
    await this.db.insertOne(sanitizerLevel);
  }
  /**
   * Deletes sanitizer level entry from collection
   *
   * @param id - ID of document to delete
   */
  async deleteById(this: SanitizerLevelDAO, id: ObjectId) {
    await this.db.deleteOne({ _id: id });
  }
}

export default SanitizerLevelDAO;
