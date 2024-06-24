import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://codemasters-backend-5m3n.onrender.com";

export const updateWater = createAsyncThunk(
  "water/editWater",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/edit${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
