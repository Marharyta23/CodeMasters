import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWaterData = createAsyncThunk(
  "water/fetchWaterData",
  async () => {
    const response = await axios.get("/api/water");
    return response.data;
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/water/${waterId}`);
      return waterId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.waterData = action.payload;
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.waterData = state.waterData.filter(
          (water) => water.id !== action.payload
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default waterSlice.reducer;
