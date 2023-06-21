import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTable } from "../../data/mockData";
import Header from "../../components/Header";

const AdsData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const parseCountryCode = (code) => {
        try {
           return regionNames.of(code);
        } catch (e) {
            console.error("Couldn't parse country code");
            return code;
        }
  }

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

  for (let j = 0; j < mockDataTable.body.titles.length; j++) {
    //COLUMNS
    let header = mockDataTable.body.titles[j];
    columnsAnalytics.push({
      field: header,
      headerName: header.replace("_", " "),
    });
  }

  // const columnsAnalytics = [
  //   { field: "COUNTRY", headerName: "COUNTRY" },
  //   { field: "AD_UNIT", headerName: "COUNTRY" },
  //   { field: "FORMAT", headerName: "COUNTRY" },
  //   { field: "AD_REQUESTS", headerName: "COUNTRY" },
  //   { field: "CLICKS", headerName: "COUNTRY" },
  //   { field: "ESTIMATED_EARNINGS", headerName: "COUNTRY" },
  //   { field: "IMPRESSIONS", headerName: "COUNTRY" },
  //   { field: "IMPRESSION_CTR", headerName: "COUNTRY" },
  //   { field: "MATCHED_REQUESTS", headerName: "COUNTRY" },
  //   { field: "MATCH_RATE", headerName: "COUNTRY" },
  //   { field: "SHOW_RATE", headerName: "COUNTRY" },
  //   { field: "OBSERVED_ECPM", headerName: "COUNTRY" },
  // ];

  const columns = [
    { field: "name", headerName: "COUNTRY" },
    {
      field: "value",
      headerName: "AD UNIT",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ad format",
      headerName: "AD FORMAT",
      flex: 1,
    },
    {
      field: "requests",
      headerName: "AD REQUESTS",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

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
        {/* <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} /> */}
        <DataGrid
          checkboxSelection
          rows={listAnalytics}
          columns={columnsAnalytics}
        />
      </Box>
    </Box>
  );
};

export default AdsData;
