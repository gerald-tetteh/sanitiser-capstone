/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Dashboard.tsx
 */

import { FunctionComponent } from "react";
import DashboardPieChart from "../components/DashboardPieChart";
import DashboardChart from "../components/DashboardChart";
import DashboardHeader from "../components/DashboardHeader";
import DashboardNotification from "../components/DashboardNotification";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="dashboard dashboard-grid">
      <DashboardHeader />
      <section className="dashboard__analysis">
        <DashboardChart />
        <DashboardPieChart />
      </section>
      <section className="dashboard__notification">
        <DashboardNotification />
      </section>
    </div>
  );
};

export default Dashboard;
