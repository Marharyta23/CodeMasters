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
import { waterReducer } from "./water/slice";
import { authReducer } from "./auth/slice";
import { modalReducer } from "./modal/slice";
import { userReducer } from "./userSettings/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    water: waterReducer,
    popover: popoverReducer,
    modal: modalReducer,
    user: userReducer,
  },
  middleware,
});

export const persistor = persistStore(store);
