/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Dashboard.tsx
 */

import { FunctionComponent } from "react";
import DashboardAnalysis from "../components/DashboardAnalysis";
import DashboardChart from "../components/DashboardChart";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="dashboard dashboard-grid">
      <DashboardHeader />
      <section className="dashboard__analysis">
        <DashboardChart />
        <DashboardAnalysis />
      </section>
      <section className="dashboard__notification">
        Notification Section
      </section>
    </div>
  );
};

export default Dashboard;
