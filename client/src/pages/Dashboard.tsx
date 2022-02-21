/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Dashboard.tsx
 */

import { FunctionComponent } from "react";
import DashboardChart from "../components/DashboardChart";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="dashboard dashboard-grid">
      <DashboardHeader />
      <section className="dashboard__analysis">
        <DashboardChart />
        <article className="dashboard__analysis__level"></article>
      </section>
      <section className="dashboard__notification">
        Notification Section
      </section>
    </div>
  );
};

export default Dashboard;
