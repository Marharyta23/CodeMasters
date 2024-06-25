import { configureStore } from "@reduxjs/toolkit";

import { popoverReducer } from "./popover/slice";
import waterReducer from "./deleteWater/deleteWaterSlice";
import authReducerLogout from "./logout/authSlice";

const store = configureStore({
  reducer: {
    popover: popoverReducer,
    water: waterReducer,
    auth: authReducerLogout,
  },
});

export default store;
