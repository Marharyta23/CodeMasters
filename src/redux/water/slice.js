import { createSlice } from "@reduxjs/toolkit";

import { addWater, deleteWater, fetchWaterDataDay, fetchWaterDataMonth, updateWater } from "./operations";

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
};

const handleFulfilled = (state) => {
    state.loading = false;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

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
            .addCase(fetchWaterDataDay.pending, handlePending)
            .addCase(fetchWaterDataDay.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterData = action.payload;
            })
            .addCase(fetchWaterDataDay.rejected, handleRejected)

            .addCase(fetchWaterDataMonth.pending, handlePending)
            .addCase(fetchWaterDataMonth.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterData = action.payload;
            })
            .addCase(fetchWaterDataMonth.rejected, handleRejected)

            .addCase(addWater.pending, handlePending)
            .addCase(addWater.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterData.push(action.payload);
            })
            .addCase(addWater.rejected, handleRejected)

            .addCase(updateWater.pending, handlePending)
            .addCase(updateWater.fulfilled, (state, action) => {
                handleFulfilled(state);
                const index = state.waterData.findIndex((water) => water.id === action.payload.id);
                if (index !== -1) {
                    state.waterData[index] = action.payload;
                }
            })
            .addCase(updateWater.rejected, handleRejected)

            .addCase(deleteWater.pending, handlePending)
            .addCase(deleteWater.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterData = state.waterData.filter((water) => water.id !== action.payload);
            })
            .addCase(deleteWater.rejected, handlePending);
    },
});

export const waterReducer = waterSlice.reducer;
