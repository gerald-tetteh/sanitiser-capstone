/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DashboardAnalysis.tsx
 */

import { FunctionComponent, useEffect, useState } from "react";
import { S_LEVEL_URL } from "../utils/constants";
import { SanitizerLevel } from "../utils/types";

const DashboardAnalysis: FunctionComponent = () => {
  const [sanitizerLevel, setSanitizerLevel] = useState<number>(0);
  useEffect(() => {
    fetch(`${S_LEVEL_URL}?resultsCount=1`)
      .then((response) => response.json())
      .then((data: SanitizerLevel[]) => {
        setSanitizerLevel(data[0].percentage);
      })
      .catch((err) => console.error(err));
  }, []);
  // TODO: check for errors
  return (
    <article className="dashboard__analysis__level">
      <h3 className="dashboard__analysis__level__percentage">
        {sanitizerLevel ? sanitizerLevel : "..."}%
      </h3>
      <div className="dashboard__analysis__level__container"></div>
    </article>
  );
};

export default DashboardAnalysis;
