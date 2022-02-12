/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - sanitizer-level-dao.ts
 */

import { Collection, ObjectId } from "mongodb";
import { DATABASE_NAME, SL_COLLECTION } from "../utils/constants";
import mongoClient from "./db-connect";

export interface SanitizerLevel {
  /**
   * Sanitizer level collection interface
   *
   * @param _id - ID of document (optional)
   * @param percentage - Percentage of the sanitizer in the container.
   * @param date - Date the data was collected
   */
  percentage: number;
  date: Date;
}

let sanitizerLevelDB: Collection<SanitizerLevel>;

class SanitizerLevelDAO {
  /**
   * Sanitizer level DAO
   * Contains functions used to query the sanitizer level collection.
   */
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

  async getLevelHistory(this: SanitizerLevelDAO) {
    /**
     * Returns all available sanitizer level entries
     */
    return this.db.find({});
  }
  async filterByData(this: SanitizerLevelDAO, date: Date) {
    /**
     * Returns all sanitizer level reading for a particular day
     *
     * @param date - The date the data was collected
     */
    const endDate = date;
    endDate.setDate(date.getDate() + 1);
    return this.db.find({ date: { $gte: date, $lt: endDate } });
  }
  async insert(this: SanitizerLevelDAO, sanitizerLevel: SanitizerLevel) {
    /**
     * Insert sanitizer level into collection
     *
     * @param sanitizerLevel - Sanitizer level object
     */
    await this.db.insertOne(sanitizerLevel);
  }
  async deleteById(this: SanitizerLevelDAO, id: ObjectId) {
    /**
     * Deletes sanitizer level entry from collection
     *
     * @param id - ID of document to delete
     */
    await this.db.deleteOne({ _id: id });
  }
}

export default SanitizerLevelDAO;
