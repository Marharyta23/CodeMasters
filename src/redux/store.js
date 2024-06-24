import { configureStore } from "@reduxjs/toolkit";

import { popoverReducer } from "./popover/slice";
import waterReducer from "./deleteWater/deleteWaterSlice";
import authReducer from "./logout/authSlice";

const store = configureStore({
  reducer: {
    popover: popoverReducer,
    water: waterReducer,
    auth: authReducer,
  },
});

export default store;
