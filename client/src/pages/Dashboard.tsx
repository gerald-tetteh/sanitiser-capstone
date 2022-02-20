/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Dashboard.tsx
 */

import { FunctionComponent } from "react";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="dashboard dashboard-grid">
      <header className="dashboard__header">header</header>
      <section className="dashboard__analysis">Analysis Section</section>
      <section className="dashboard__notification">
        Notification Section
      </section>
    </div>
  );
};

export default Dashboard;
