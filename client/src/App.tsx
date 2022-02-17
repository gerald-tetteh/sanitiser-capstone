/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - App.tsx
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import logo from "./assets/icons/logo.svg";

const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <aside className="sidebar">
          <img src={logo} alt="App Logo" className="sidebar__icon" />
        </aside>
        <section className="main__content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
};

export default App;
