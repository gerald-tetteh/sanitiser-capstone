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
        <article className="dashboard__analysis__level">
          <h3 className="dashboard__analysis__level__percentage">30%</h3>
          <div className="dashboard__analysis__level__container"></div>
        </article>
      </section>
      <section className="dashboard__notification">
        Notification Section
      </section>
    </div>
  );
};

export default Dashboard;
