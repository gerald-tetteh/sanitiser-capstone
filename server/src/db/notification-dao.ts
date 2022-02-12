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

export interface Notification {
  /**
   * Notification collection interface
   *
   * @param _id - ID of document
   * @param date - Date (day) document was recorded
   * @param priority - The urgency of this notification
   * @param percentage - The percentage level of the sanitizer
   */
  date: Date;
  priority: Priority;
  percentage: number;
}

let notificationDB: Collection<Notification>;

class NotificationDAO {
  /**
   * Notification DAO
   * Contains functions used to query the Notification collection.
   */
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
  async insert(this: NotificationDAO, notification: Notification) {
    /**
     * Inserts a new document into the notification collection
     *
     * @param notification - notification object to insert
     */
    await this.db.insertOne(notification);
  }
  async deleteById(this: NotificationDAO, id: ObjectId) {
    /**
     * Deletes notification entry from collection
     *
     * @param id - ID of document to delete
     */
    await this.db.deleteOne({ _id: id });
  }
}

export default NotificationDAO;
