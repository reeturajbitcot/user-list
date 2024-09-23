import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://mern-admin-backend-jxw3.onrender.com/general/employee";

const initialState = {
  contents: [],
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "userAuth/fetchContent",
  async () => {
    try {
      const res = await axios(`${url}s`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "userAuth/createUser",
  async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${url}/add`,
        data: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "userAuth/loginUser",
  async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${url}/login`,
        data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userAuth/deleteUser",
  async (id) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${url}/delete/${id}`,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userAuth/updateUser",
  async (data, id) => {
    try {
      const res = await axios({
        method: "put",
        url: `${url}/update/${id}`,
        data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { login, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
