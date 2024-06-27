import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const logOut = createAsyncThunk("auth/logout", async () => {
  await axios.post("/users/logout");
  clearAuthHeader();
});

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
