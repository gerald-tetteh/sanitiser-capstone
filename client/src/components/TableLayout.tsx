import React, { Fragment, FunctionComponent } from "react";
import { DailyUsage, SanitizerLevel } from "../utils/types";

interface TableLayoutProps {
  itemList: (SanitizerLevel | DailyUsage)[];
  disableNextButton: boolean;
  hidePreviousButton: boolean;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  isDailyUsage: boolean;
}

const TableLayout: FunctionComponent<TableLayoutProps> = ({
  itemList,
  disableNextButton,
  hidePreviousButton,
  pageNumber,
  setPageNumber,
  isDailyUsage,
}) => {
  const buildTableData = (item: DailyUsage | SanitizerLevel) => {
    if (isDailyUsage) {
      const data = item as DailyUsage;
      return data.useCount;
    } else {
      const data = item as SanitizerLevel;
      return data.percentage;
    }
  };
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>{isDailyUsage ? "UsageCount" : "Percentage"}</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {itemList.length > 0 &&
            itemList.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{(pageNumber - 1) * 20 + index + 1}</td>
                  <td>{new Date(item.date).toDateString()}</td>
                  <td>{buildTableData(item)}</td>
                </tr>
              );
            })}
          {itemList.length < 0 && <p>Loading...</p>}
        </tbody>
      </table>
      <div className="table__pagination-bar">
        <button
          type="button"
          disabled={hidePreviousButton}
          onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
          className={`table__pagination-bar__button ${
            hidePreviousButton ? "table__pagination-bar__button--disabled" : ""
          }`}
        >
          BACK
        </button>
        <button
          type="button"
          disabled={disableNextButton}
          onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
          className={`table__pagination-bar__button ${
            disableNextButton ? "table__pagination-bar__button--disabled" : ""
          }`}
        >
          NEXT
        </button>
      </div>
    </Fragment>
  );
};

export default TableLayout;
