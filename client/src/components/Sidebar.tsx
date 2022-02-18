/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Sidebar.tsx
 */

import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const Sidebar: FunctionComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandSidebar = () => {};
  const handleShrinkSidebar = () => {};

  return (
    <aside className="sidebar">
      <Link to={"/"}>
        <img src={logo} alt="AHSM Logo" className="sidebar__icon" />
      </Link>
      <nav className="sidebar__nav">
        <Link className="sidebar__nav__link" to={"/"}>
          <span className="material-icons-round">dashboard</span>
          <span className="sidebar__nav__link__text">Dashboard</span>
        </Link>
        <Link className="sidebar__nav__link" to={"/daily-usage"}>
          <span className="material-icons-round">clean_hands</span>
          <span className="sidebar__nav__link__text">Daily Usage</span>
        </Link>
        <Link className="sidebar__nav__link" to={"/sanitizer-level"}>
          <span className="material-icons-round">gas_meter</span>
          <span className="sidebar__nav__link__text">Sanitizer Level</span>
        </Link>
      </nav>
      <span className="material-icons-round sidebar__nav__expand">
        navigate_next
      </span>
    </aside>
  );
};

export default Sidebar;
