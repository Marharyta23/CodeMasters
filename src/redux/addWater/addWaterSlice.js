import { createSlice } from "@reduxjs/toolkit";

import { addWater } from "./addWaterOperations";

const INITIAL_STATE = {
  waterData: null,
  isLoading: false,
  isError: false,
};

export const addWaterSlice = createSlice({
  name: "addWater",
  initialState: INITIAL_STATE,

  extraReducers: (builder) =>
    builder
      .addCase(addWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.waterData = [...state.waterData, action.payload];
      })
      .addCase(addWater.rejected, () => {
        state.isLoading = false;
        state.isError = action.payload;
      }),
});

export const addWaterReduser = addWaterSlice.reducer;
