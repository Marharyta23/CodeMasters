import { createSlice } from "@reduxjs/toolkit";

import { addWater } from "./addWaterOperations";

const INITIAL_STATE = {
  waterCards: [],
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
        state.waterCards = [...state.waterCards, action.payload];
      })
      .addCase(addWater.rejected, () => {
        state.isLoading = false;
        state.isError = action.payload;
      }),
});

export const addWaterReduser = addWaterSlice.reducer;
