/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - App.tsx
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DailyUsage from "./pages/DailyUsage";
import Dashboard from "./pages/Dashboard";
import SanitizerLevel from "./pages/SanitizerLevel";

const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Sidebar />
        <section className="main__content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/daily-usage" element={<DailyUsage />} />
            <Route path="/sanitizer-level" element={<SanitizerLevel />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
};

export default App;
