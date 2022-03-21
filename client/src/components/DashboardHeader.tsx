/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardHeader.tsx
 */

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { DataContext } from "../providers/DataProvider";
import {
  NEW_NOTIFICATIONS_URL,
  S_LEVEL_URL,
  USAGE_API_URL,
} from "../utils/constants";
import { SanitizerLevel } from "../utils/types";

type HeaderTileProps = {
  title: string;
  date: string | null;
  value: string | null;
};

const DashboardHeaderTile: FunctionComponent<HeaderTileProps> = ({
  title,
  date,
  value,
}) => {
  return (
    <div className="dashboard__header__tile">
      <div className="dashboard__header__tile__text">
        <h3 className="dashboard__header__tile__text__main">{title}</h3>
        <time className="dashboard__header__tile__text__date">{date}</time>
      </div>
      <h4 className="dashboard__header__tile__value">{value}</h4>
    </div>
  );
};

const DashboardHeader: FunctionComponent = () => {
  const dataProvider = useContext(DataContext);
  const [sanitizerLevel, setSanitizerLevel] = useState<SanitizerLevel | null>(
    null
  );
  const [usageCount, setUsageCount] = useState<number | null>(null);
  const [notificationCount, setNotificationCount] = useState<number | null>(
    null
  );
  useEffect(() => {
    fetch(`${S_LEVEL_URL}?resultsCount=1`)
      .then((response) => response.json())
      .then((data: SanitizerLevel[]) => {
        setSanitizerLevel(data[0]);
      })
      .catch((err) => console.error(err));
    fetch(`${USAGE_API_URL}`)
      .then((response) => response.json())
      .then((data: { dailyUsage: number }) => {
        setUsageCount(data.dailyUsage);
      })
      .catch((err) => console.error(err));
    fetch(`${NEW_NOTIFICATIONS_URL}`)
      .then((response) => response.json())
      .then((notifications: Notification[]) => {
        dataProvider!.notifications = notifications;
        setNotificationCount(notifications.length);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className="dashboard__header">
      <DashboardHeaderTile
        title="Sanitizer Level"
        date={
          sanitizerLevel != null
            ? new Date(sanitizerLevel.date).toLocaleTimeString()
            : "Loading..."
        }
        value={sanitizerLevel != null ? `${sanitizerLevel.percentage}%` : "..."}
      />
      <DashboardHeaderTile
        title="Usage Count"
        date={`${new Date().toLocaleDateString()}`}
        value={usageCount != null ? `${usageCount}` : "..."}
      />
      <DashboardHeaderTile
        title="Notifications"
        date=""
        value={notificationCount != null ? `${notificationCount}` : "..."}
      />
    </section>
  );
};

export default DashboardHeader;
