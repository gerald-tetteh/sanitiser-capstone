/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Dashboard.tsx
 */

import { FunctionComponent } from "react";

const Dashboard: FunctionComponent = () => {
  const getGreetingAndIcon = () => {
    const hour = new Date().getUTCHours();
    console.log(hour);
    if (hour >= 6 && hour < 18) {
      return "wb_sunny";
    }
    if (hour >= 18 || hour < 6) {
      return "nights_stay";
    }
  };

  return (
    <div className="dashboard dashboard-grid">
      <section className="dashboard__header">
        <div className="dashboard__header__text-box">
          <p className="dashboard__header__heading">Hello There !</p>
          <p className="dashboard__header__sub">Welcome back</p>
        </div>
        <span className="material-icons-round dashboard__header__image">
          {getGreetingAndIcon()}
        </span>
      </section>
      <section className="dashboard__analysis">Analysis Section</section>
      <section className="dashboard__notification">
        Notification Section
      </section>
    </div>
  );
};

export default Dashboard;
