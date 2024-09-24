import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  handleFetchContentFulfilled,
  handleFetchContentPending,
  handleFetchContentRejected,
} from "../extraReducer/fetchingContent";
import {
  handleLoginFulfilled,
  handleLoginPending,
  handlLoginRejected,
} from "../extraReducer/login";
import {
  handleSignupPending,
  handleSingupFulfilled,
  handleSingupRejected,
} from "../extraReducer/signup";

const url = "https://mern-admin-backend-jxw3.onrender.com/general/employee";

const initialState = {
  contents: [],
  isAuthenticated: false,
  user: null,
  userToken: null,
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "userAuth/fetchContent",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios(`${url}s`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "error occurred");
    }
  }
);

export const loginUser = createAsyncThunk(
  "userAuth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${url}/login`,
        data,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "error occurred");
    }
  }
);

export const createUser = createAsyncThunk(
  "userAuth/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${url}/add`,
        data: data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "error occurred");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userAuth/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${url}/delete/${id}`,
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "error occurred");
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, handleFetchContentPending);
    builder.addCase(fetchContent.fulfilled, handleFetchContentFulfilled);
    builder.addCase(fetchContent.rejected, handleFetchContentRejected);

    builder.addCase(loginUser.pending, handleLoginPending);
    builder.addCase(loginUser.fulfilled, handleLoginFulfilled);
    builder.addCase(loginUser.rejected, handlLoginRejected);

    builder.addCase(createUser.pending, handleSignupPending);
    builder.addCase(createUser.fulfilled, handleSingupFulfilled);
    builder.addCase(createUser.rejected, handleSingupRejected);
  },
});

// export const {} = userAuthSlice.actions;
export default userAuthSlice.reducer;
