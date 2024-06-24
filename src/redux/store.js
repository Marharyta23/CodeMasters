// import { configureStore } from "@reduxjs/toolkit";

// import { popoverReducer } from "./popover/slice";
// import waterReducer from "./deleteWater/deleteWaterSlice";
// import authReducer from "./logout/authSlice";

// const store = configureStore({
//   reducer: {
//     popover: popoverReducer,
//     water: waterReducer,
//     auth: authReducer,
//   },
// });

// export default store;

/* Viktory' code*/
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

<<<<<<< HEAD
import { popoverReducer } from "./popover/slice";
import waterReducer from "./deleteWater/deleteWaterSlice";
import authReducer from "./logout/authSlice";
import { addWaterReduser } from "./addWater/addWaterSlice";
import { updateWaterReduser } from "./updateWater/updateWaterSlice";

const store = configureStore({
  reducer: {
    popover: popoverReducer,
    water: waterReducer,
    auth: authReducer,
    addWater: addWaterReduser,
    updateWater: updateWaterReduser,
  },
=======
import { authReducer } from "../redux/auth/slice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
};

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: rootReducer,
  middleware,
>>>>>>> main
});

export const persistor = persistStore(store);
