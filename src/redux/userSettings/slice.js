import { createSlice } from "@reduxjs/toolkit";
import { currentUser} from "./operations";
// import { currentUser, updateUserInfo } from "./operations";

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
    accessToken: null,
    isLoggedIn: false,
  },
  extraReducers: (builder) => {
    builder

      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
  },
});

export const userReducer = userSlice.reducer;
