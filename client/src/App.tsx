/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - App.tsx
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Sidebar />
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
