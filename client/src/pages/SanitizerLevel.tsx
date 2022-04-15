/**
 * Author: Gerald Addo-Tetteh
 * Ashesi Final Year Capstone
 * AHSM Client - SanitizerLevel.tsx
 */

import { FunctionComponent, useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";
import { S_LEVEL_URL } from "../utils/constants";
import { SanitizerLevel, SanitizerLevelPagination } from "../utils/types";

const SanitizerLevelPage: FunctionComponent = () => {
  const [sanitizerLevel, setSanitizerLevel] = useState<SanitizerLevel[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  useEffect(() => {
    fetch(`${S_LEVEL_URL}?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data: SanitizerLevelPagination) => {
        setSanitizerLevel(data[0]);
        setTotalResults(data[1]);
      });
  }, [pageNumber]);
  const disableNextButton = !(totalResults - pageNumber * 20 > 0);
  const hidePreviousButton = pageNumber < 2;
  return (
    <div className="sanitizer-level">
      <TableLayout
        disableNextButton={disableNextButton}
        hidePreviousButton={hidePreviousButton}
        itemList={sanitizerLevel}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isDailyUsage={false}
      />
    </div>
  );
};

export default SanitizerLevelPage;
