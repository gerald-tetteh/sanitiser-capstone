/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DailyUsage.tsx
 */

import { FunctionComponent, useEffect, useState } from "react";
import { USAGE_URL } from "../utils/constants";
import { DailyUsage, DailyUsagePagination } from "../utils/types";

const DailyUsagePage: FunctionComponent = () => {
  const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  useEffect(() => {
    fetch(`${USAGE_URL}?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data: DailyUsagePagination) => {
        setDailyUsage(data[0] as DailyUsage[]);
        setTotalResults(data[1] as number);
      });
  }, []);
  return (
    <div className="daily-usage">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Usage Count</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {dailyUsage.length > 0 &&
            dailyUsage.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(item.date).toDateString()}</td>
                  <td>{item.useCount}</td>
                </tr>
              );
            })}
          {dailyUsage.length < 0 && <p>Loading...</p>}
        </tbody>
      </table>
      {totalResults - pageNumber * 20 > 20 && (
        <div className="table__pagination-bar">
          <button
            onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
            className="table__pagination-bar__button"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyUsagePage;
