import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async (formData, thunkAPI) => {
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
    try {
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
