import { createSlice } from "@reduxjs/toolkit";

import { addWater, deleteWater, fetchWaterDataDay, fetchWaterDataMonth, updateWater } from "./operations";

const today = new Date();

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
        date: {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWaterDataDay.pending, handlePending)
            .addCase(fetchWaterDataDay.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterDataDay = action.payload.data;
                state.date.day = action.payload.day;
                state.date.month = action.payload.month;
                state.date.year = action.payload.year;
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
                state.waterDataMonth.data[action.payload.day].push(action.payload);
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

                const indexDay = state.waterDataMonth.data[action.payload.day].findIndex((water) => water._id === action.payload._id);

                if (indexDay !== -1) {
                    state.waterDataMonth.data[action.payload.day][indexDay] = {
                        ...state.waterDataMonth.data[action.payload.day][indexDay],
                        amount: action.payload.amount,
                        time: action.payload.time,
                    };
                }
            })
            .addCase(updateWater.rejected, handleRejected)

            .addCase(deleteWater.pending, handlePending)
            .addCase(deleteWater.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.waterDataDay = state.waterDataDay.filter((water) => water._id !== action.payload);

                for (let i in state.waterDataMonth.data) {
                    if (i !== "days") {
                        state.waterDataMonth.data[i] = state.waterDataMonth.data[i].filter((water) => water._id !== action.payload);
                    }
                }
            })
            .addCase(deleteWater.rejected, handlePending);
    },
});

export const waterReducer = waterSlice.reducer;
