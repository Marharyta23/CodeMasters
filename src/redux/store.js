import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { popoverReducer } from "./popover/slice";
import waterReducer from "./deleteWater/deleteWaterSlice";
import { authReducer } from "../redux/auth/slice";
import authReducerLogout from "./logout/authSlice";

const store = configureStore({
  reducer: {
    popover: popoverReducer,
};

const middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]Logout,
        },
    });

export const persistor = persistStore(store);
