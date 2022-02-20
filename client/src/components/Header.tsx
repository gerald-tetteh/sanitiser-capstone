/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - Header.tsx
 */

import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

const Header: FunctionComponent = () => {
  const location = useLocation().pathname;
  type pageType = {
    [key: string]: string;
  };
  const page: pageType = {
    "/": "Dashboard",
    "/daily-usage": "Daily Usage",
    "/sanitizer-level": "Sanitizer Level",
  };
  return (
    <header className="header">
      <p className="header__app-name">AHSM</p>
      <p className="header__page">{page[location]}</p>
      <hr className="header__divider" />
    </header>
  );
};

export default Header;
