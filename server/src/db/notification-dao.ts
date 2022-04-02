/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - notification-dao.ts
 */

import { Collection, Filter, ObjectId } from "mongodb";
import { DATABASE_NAME, NT_COLLECTION } from "../utils/constants";
import mongoClient from "./db-connect";

export enum Priority {
  HIGH = 1,
  LOW = 0,
}

/**
 * Notification collection interface
 *
 * @param _id - ID of document
 * @param date - Date (day) document was recorded
 * @param priority - The urgency of this notification
 * @param percentage - The percentage level of the sanitizer
 * @param handled - True is notification has been handled
 */
export interface Notification {
  date: Date;
  priority: Priority;
  percentage: number;
  handled: boolean;
}

let notificationDB: Collection<Notification>;

/**
 * Notification DAO
 * Contains functions used to query the Notification collection.
 */
class NotificationDAO {
  private db: Collection<Notification>;
  constructor() {
    if (notificationDB) {
      this.db = notificationDB;
    } else {
      this.db = mongoClient
        .db(DATABASE_NAME)
        .collection<Notification>(NT_COLLECTION);
    }
  }

  /**
   * Returns all available notifications
   *
   * @param page - the current page of data to return defaults to 1
   * @param resultsCount - the number of results to show per page defaults to 20
   * @param startDate - The starting date of the filter
   * @param endDate - The end date of the filter
   * @returns A promise for the notifications array
   */
  async getAllNotifications(
    this: NotificationDAO,
    page = 1,
    resultsCount = 20,
    startDate?: Date,
    endDate?: Date
  ) {
    let filter: Filter<Notification> = {};
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
      .limit(resultsCount);
    return cursor.toArray();
  }
  /**
   * Returns all notifications that have handled = false
   *
   * @returns Array of notifications
   */
  async getNewNotifications(this: NotificationDAO) {
    return this.db.find({ handled: false }).toArray();
  }
  /**
   * Inserts a new document into the notification collection
   *
   * @param notification - notification object to insert
   */
  async insert(this: NotificationDAO, notification: Notification) {
    await this.db.insertOne(notification);
  }
  /**
   * Deletes notification entry from collection
   *
   * @param id - ID of document to delete
   */
  async deleteById(this: NotificationDAO, id: ObjectId) {
    await this.db.deleteOne({ _id: id });
  }
  async toggleHandled(this: NotificationDAO, id: ObjectId) {
    const notification = await this.db.findOne({ _id: id });
    if (notification) {
      await this.db.updateOne(
        { _id: id },
        {
          $set: { handled: !notification.handled },
        }
      );
    } else {
      throw new Error("Notification does not exist");
    }
  }
}

export default NotificationDAO;
