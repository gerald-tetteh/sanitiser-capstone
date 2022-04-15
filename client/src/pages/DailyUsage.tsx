/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - DailyUsage.tsx
 */

import { FunctionComponent, useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";
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
        setDailyUsage(data[0]);
        setTotalResults(data[1]);
      });
  }, [pageNumber]);
  const disableNextButton = !(totalResults - pageNumber * 20 > 0);
  const hidePreviousButton = pageNumber < 2;
  return (
    <div className="daily-usage">
      <TableLayout
        disableNextButton={disableNextButton}
        hidePreviousButton={hidePreviousButton}
        itemList={dailyUsage}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isDailyUsage={true}
      />
    </div>
  );
};

export default DailyUsagePage;
