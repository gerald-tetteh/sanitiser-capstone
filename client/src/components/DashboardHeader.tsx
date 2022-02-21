/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardHeader.tsx
 */

import { FunctionComponent } from "react";

const DashboardHeader: FunctionComponent = () => {
  const getGreetingAndIcon = () => {
    const hour = new Date().getUTCHours();
    if (hour >= 6 && hour < 18) {
      return "wb_sunny";
    }
    if (hour >= 18 || hour < 6) {
      return "nights_stay";
    }
  };
  return (
    <section className="dashboard__header">
      <div className="dashboard__header__text-box">
        <p className="dashboard__header__heading">Hello There !</p>
        <p className="dashboard__header__sub">Welcome back</p>
      </div>
      <span className="material-icons-round dashboard__header__image">
        {getGreetingAndIcon()}
      </span>
    </section>
  );
};

export default DashboardHeader;
