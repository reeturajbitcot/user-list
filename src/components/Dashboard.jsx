import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchContent, updateUser } from "../store/slice/authSlice";
import { DataGrid } from "@mui/x-data-grid";
import { createColumns } from "../utils/lib";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar";
import Modal from "@mui/material/Modal";
import EditModal from "./EditModal";
import Swal from "sweetalert2";

function Dashboard() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const { employees } = useSelector((state) => state.auth.contents);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 5,
  });

  // modal
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState(null);

  const handleOpen = (id) => {
    let [data] = rows.filter((item) => item._id === id);
    setEmail(data.email);
    setName(data.name);
    setCity(data.city);
    setPhoneNo(data.phoneNumber);
    setEditId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    try {
      const resultAction = await dispatch(deleteUser(id));
      if (deleteUser.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Successful",
          text: "User Info deleted successfully",
          icon: "success",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              fetchContent({
                pageNo: paginationModel.page,
                limit: paginationModel.pageSize,
              })
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);

    let userData = {
      name,
      email,
      city,
      phoneNumber: phoneNo,
    };
    try {
      const resultAction = await dispatch(
        updateUser({ data: userData, id: editId })
      );
      if (updateUser.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Successful",
          text: "User Info updated successfully",
          icon: "success",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              fetchContent({
                pageNo: paginationModel.page,
                limit: paginationModel.pageSize,
              })
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(
      fetchContent({
        pageNo: paginationModel.page,
        limit: paginationModel.pageSize,
      })
    );
  }, [dispatch, paginationModel]);

  useEffect(() => {
    setRows(employees);
  }, [employees]);

  if (error) {
    return error;
  }

  const columns = createColumns(handleOpen, handleDelete);

  return (
    <>
      <Navbar />
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
                    pageSize: paginationModel.pageSize,
                  },
                },
              }}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 15, 20]}
              onPaginationModelChange={setPaginationModel}
            />
          </Box>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditModal
          handleClose={handleClose}
          email={email}
          city={city}
          phoneNo={phoneNo}
          name={name}
          handleSubmit={handleSubmit}
          setName={setName}
          setEmail={setEmail}
          setCity={setCity}
          setPhoneNo={setPhoneNo}
        />
      </Modal>
    </>
  );
}

export default Dashboard;
