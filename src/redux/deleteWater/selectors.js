import { createSelector } from "@reduxjs/toolkit";

const selectWaterState = (state) => state.water;

export const selectWaterData = createSelector(
  [selectWaterState],
  (waterState) => waterState.waterData
);

export const selectWaterLoading = createSelector(
  [selectWaterState],
  (waterState) => waterState.loading
);

export const selectWaterError = createSelector(
  [selectWaterState],
  (waterState) => waterState.error
);
