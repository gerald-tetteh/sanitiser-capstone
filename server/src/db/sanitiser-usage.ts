import { Collection, ObjectId } from "mongodb";
import mongoClient from "./db_connect";

export interface SanitizerLevel {
  /**
   * Sanitizer level collection interface
   *
   * @param id - ID of document
   * @param percentage - Percentage of the sanitizer in the container.
   * @param date - Date the data was collected
   */
  id: number;
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
        .db("sanitizer-usage")
        .collection<SanitizerLevel>("sanitizer-level");
    }
  }

  getLevelHistory(this: SanitizerLevelDAO) {
    /**
     * Returns all available sanitizer level entries
     */
    return this.db.find({});
  }
  filterByData(this: SanitizerLevelDAO, date: Date) {
    /**
     * Returns all sanitizer level reading for a particular day
     *
     * @param date - The date the data was collected
     */
    const endDate = date;
    endDate.setDate(date.getDate() + 1);
    return this.db.find({ date: { $gte: date, $lt: endDate } });
  }
  insert(this: SanitizerLevelDAO, sanitizerLevel: SanitizerLevel) {
    /**
     * Insert sanitizer level into collection
     *
     * @param sanitizerLevel - Sanitizer level object
     */
    this.db.insertOne(sanitizerLevel);
  }
  deleteById(this: SanitizerLevelDAO, id: number) {
    /**
     * Deletes sanitizer level entry from collection
     *
     * @param id - ID of document to delete
     */
    this.db.deleteOne({ _id: new ObjectId(id) });
  }
}

export default SanitizerLevelDAO;
