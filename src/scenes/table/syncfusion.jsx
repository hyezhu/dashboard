import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
} from "@syncfusion/ej2-react-grids";
import { Inject, Page, Sort } from "@syncfusion/ej2-react-grids";
import * as React from "react";
import { mockDataTable } from "../../data/mockData";

function SyncTable() {
  const pageSettings = { pageSize: 6 };
  const sortSettings = {
    columns: [{ field: "EmployeeID", direction: "Ascending" }],
  };

  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);

  const numberColumns = [
    "AD_REQUESTS",
    "CLICKS",
    "IMPRESSIONS",
    "MATCHED_REQUESTS",
  ];

  const symbolColumns = [
    "ESTIMATED_EARNINGS",
    "IMPRESSION_CTR",
    "MATCH_RATE",
    "SHOW_RATE",
    "OBSERVED_ECPM",
  ];

  const numberComparator = (v1, v2) => Number(v1) - Number(v2);
  const symbolComparator = (a, b) =>
    Number(a.substring(0, a.length - 1)) - Number(b.substring(0, b.length - 1));

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const parseCountryCode = (code) => {
    try {
      return regionNames.of(code);
    } catch (e) {
      console.error("Couldn't parse country code");
      return code;
    }
  };

  const listAnalytics = [];

  const columnsAnalytics = [];

  for (let i = 0; i < mockDataTable.body.values[0].length; i++) {
    //ROWS
    let tableEntry = {};
    for (let j = 0; j < mockDataTable.body.titles.length; j++) {
      //COLUMNS
      let name = mockDataTable.body.titles[j];
      let value = mockDataTable.body.values[j][i];
      if (name.toLowerCase() === "country") {
        value = parseCountryCode(value);
      }
      tableEntry[name] = value;
    }
    tableEntry.id = i;
    listAnalytics.push(tableEntry);
  }

  // push last row
  let summaryRow = {};

  for (let j = 0; j < mockDataTable.body.titles.length; j++) {
    //COLUMNS
    let name = mockDataTable.body.titles[j];
    let value = mockDataTable.body.summary[j];
    summaryRow[name] = value;
  }
  summaryRow.id = mockDataTable.body.values[0].length;
  listAnalytics.push(summaryRow);

  for (let j = 0; j < mockDataTable.body.titles.length; j++) {
    //COLUMNS
    let header = mockDataTable.body.titles[j];
    if (numberColumns.includes(header)) {
      columnsAnalytics.push({
        field: header,
        headerName: header.replace("_", " "),
        sortComparator: numberComparator,
      });
    } else if (symbolColumns.includes(header)) {
      columnsAnalytics.push({
        field: header,
        headerName: header.replace("_", " "),
        sortComparator: symbolComparator,
      });
    } else {
      columnsAnalytics.push({
        field: header,
        headerName: header.replace("_", " "),
      });
    }
  }

  return (
    <GridComponent
      dataSource={listAnalytics}
      allowPaging={true}
      pageSettings={pageSettings}
      allowSorting={true}
      sortSettings={sortSettings}
    >
      <ColumnsDirective>
        <ColumnDirective field="COUNTRY" width="100" textAlign="Right" />
        <ColumnDirective field="AD_UNIT" width="100" />
        <ColumnDirective field="FORMAT" width="100" textAlign="Right" />
        <ColumnDirective
          field="AD_REQUEST"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="CLICKS"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="ESTIMATED_EARNINGS"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="IMPRESSIONS"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="IMPRESSIONS"
          width="100"
          format="C2"
          textAlign="Right"
        />{" "}
        <ColumnDirective
          field="IMPRESSION_CTR"
          width="100"
          format="C2"
          textAlign="Right"
        />{" "}
        <ColumnDirective
          field="MATCHED_REQUESTS"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="MATCH_RATE"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="SHOW_RATE"
          width="100"
          format="C2"
          textAlign="Right"
        />
        <ColumnDirective
          field="OBSERVED_ECPM"
          width="100"
          format="C2"
          textAlign="Right"
        />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Filter, Group]} />
    </GridComponent>
  );
}

export default SyncTable;
