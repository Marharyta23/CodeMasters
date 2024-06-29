import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateWater = createAsyncThunk(
  "water/editWater",
  async ({ time, amount, _id }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/edit${_id}`, { time, amount });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
