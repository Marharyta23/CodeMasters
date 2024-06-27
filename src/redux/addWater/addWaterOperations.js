import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addWater = createAsyncThunk(
  "water/addWater",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/water/add", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
