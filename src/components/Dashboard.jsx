import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../store/slice/authSlice";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../utils/lib";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Dashboard() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const { employees } = useSelector((state) => state.auth.contents);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    setRows(employees);
  }, [employees]);

  if (error) {
    return error;
  }
  console.log(rows);
  return (
    <div
      style={{
        display: "flex",
        padding: "40px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Dashboard</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
