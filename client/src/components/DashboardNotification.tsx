/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardNotification.tsx
 */

import { FunctionComponent, useContext } from "react";
import { DataContext } from "../providers/DataProvider";

const DashboardNotification: FunctionComponent = () => {
  const dataProvider = useContext(DataContext);
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
                  value={`${notification.handled}`}
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
