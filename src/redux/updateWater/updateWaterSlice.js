import { createSlice } from "@reduxjs/toolkit";
import { updateWater } from "./updateWaterOperations";

const INITIAL_STATE = {
  waterCards: [],
  isLoading: false,
  isError: false,
};

export const updateWaterSlice = createSlice({
  name: "updateWater",
  initialState: INITIAL_STATE,

  extraReducers: (builder) =>
    builder
      .addCase(updateWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        const index = state.waterCards.findIndex(
          (waterCard) => waterCard.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateWater.rejected, () => {
        state.isLoading = false;
        state.isError = action.payload;
      }),
});

export const updateWaterReduser = updateWaterSlice.reducer;
