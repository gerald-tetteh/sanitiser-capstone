/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Server - notification-dao.ts
 */

import { Collection, ObjectId } from "mongodb";
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
 */
export interface Notification {
  date: Date;
  priority: Priority;
  percentage: number;
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

  async getAllNotifications(this: NotificationDAO) {}
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
}

export default NotificationDAO;
