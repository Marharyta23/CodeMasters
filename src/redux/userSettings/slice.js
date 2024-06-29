import { createSlice } from "@reduxjs/toolkit";
import { currentUser, updateUserInfo } from "./operations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: null,
      email: null,
      avatarURL: null,
      dailyWaterRate: 0,
      activeTimeSport: 0,
      gender: null,
      weight: 0,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const updatedFields = action.payload;
        Object.keys(updatedFields).forEach((key) => {
          state.user[key] = updatedFields[key];
        });
      });
  },
});

export const userReducer = userSlice.reducer;
