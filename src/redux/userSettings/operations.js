import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = ` Bearer ${token}`;
};
export const updateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.user.accessToken;
    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token available");
    }
    setAuthHeader(accessToken);
    try {
      const res = await axios.patch("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const currentUser = createAsyncThunk(
  "user/current",
  async (_, thunkAPI) => {
    const accessToken = thunkAPI.getState().user.accessToken;

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token available");
    }
    setAuthHeader(accessToken);
    try {
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
