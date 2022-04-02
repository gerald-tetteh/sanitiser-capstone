/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardNotification.tsx
 */

import { FunctionComponent, useContext } from "react";
import { DataContext } from "../providers/DataProvider";
import { NOTIFICATIONS_URL } from "../utils/constants";
import { UserNotification } from "../utils/types";

const DashboardNotification: FunctionComponent = () => {
  const dataProvider = useContext(DataContext);
  const toggleNotifications = (
    notifications: UserNotification[],
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    return notifications.map((notification) => {
      if (notification._id === e.target.id) {
        notification.handled = !notification.handled;
      }
      return notification;
    });
  };
  const handleCompleteNotification = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.type === "checkbox") {
      dataProvider?.setNotifications((notifications) =>
        toggleNotifications(notifications, e)
      );
      fetch(`${NOTIFICATIONS_URL}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: e.target.id,
        }),
      }).then((response) => {
        if (response.status !== 201) {
          dataProvider?.setNotifications((notifications) =>
            toggleNotifications(notifications, e)
          );
        } else {
          setTimeout(() => {
            dataProvider?.setNotifications((notifications) => {
              return notifications.filter(
                (notification) => !notification.handled
              );
            });
          }, 2000);
        }
      });
    }
  };
  return (
    <table className="dashboard__notification-panel">
      <thead>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Title</th>
          <th>Priority</th>
          <th>Complete</th>
        </tr>
      </thead>
      <tbody>
        {dataProvider!.notifications.map((notification, idx) => {
          return (
            <tr className="dashboard__notification-panel__row" key={idx}>
              <td>{idx + 1}</td>
              <td>{new Date(notification.date).toLocaleDateString()}</td>
              <td>Sanitizer Level at {notification.percentage}%</td>
              <td>{notification.priority}</td>
              <td>
                <input
                  type="checkbox"
                  name="completed"
                  checked={notification.handled}
                  onChange={handleCompleteNotification}
                  id={notification._id}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashboardNotification;
