import { Box, Typography, useTheme, AppBar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTable } from "../../data/mockData";
import Header from "../../components/Header";
// import SyncTable from "./syncfusion";

const AdsData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  //   const dateFormat = (date) => {
  //     const year = date.getFullYear();
  //     const month = date.getMonth().pad(2);
  //     const day = date.getDate().pad(2);
  //     const hour = date.getHours().pad(2);
  //     const minute = date.getMinutes().pad(2);
  //     const second = date.getSeconds().pad(2);

  //     const dayFormatted = `${year} - ${month} - ${day}`;

  //     const timeFormatted = `${hour}:${minute}:${second}`;

  //     return (
  //       <span>
  //         `${dayFormatted}` <strong>`${timeFormatted}`</strong>
  //       </span>
  //     );
  //   };
  //   console.log(dateFormat(new Date()));

  return (
    <Box m="20px">
      <Header title="DATA TABLE" subtitle="Ad campaign data" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          columns={columnsAnalytics}
          rows={listAnalytics}
          sort
        />
      </Box>
      {/* <SyncTable /> */}
    </Box>
  );
};

export default AdsData;
