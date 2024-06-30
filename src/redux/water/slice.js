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
        waterDataDay: [],
        waterDataMonth: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWaterDataDay.pending, handlePending)
            .addCase(fetchWaterDataDay.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterDataDay = action.payload;
            })
            .addCase(fetchWaterDataDay.rejected, handleRejected)

            .addCase(fetchWaterDataMonth.pending, handlePending)
            .addCase(fetchWaterDataMonth.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterDataMonth = action.payload;
            })
            .addCase(fetchWaterDataMonth.rejected, handleRejected)

            .addCase(addWater.pending, handlePending)
            .addCase(addWater.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterDataDay.push(action.payload);
            })
            .addCase(addWater.rejected, handleRejected)

            .addCase(updateWater.pending, handlePending)
            .addCase(updateWater.fulfilled, (state, action) => {
                handleFulfilled(state);

                const index = state.waterDataDay.findIndex((water) => water._id === action.payload._id);
                if (index !== -1) {
                    state.waterDataDay[index] = {
                        ...state.waterDataDay[index],
                        amount: action.payload.amount,
                        time: action.payload.time,
                    };
                }
            })
            .addCase(updateWater.rejected, handleRejected)

            .addCase(deleteWater.pending, handlePending)
            .addCase(deleteWater.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterDataDay = state.waterDataDay.filter((water) => water._id !== action.payload._id);
            })
            .addCase(deleteWater.rejected, handlePending);
    },
});

export const waterReducer = waterSlice.reducer;
