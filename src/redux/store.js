import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { popoverReducer } from "./popover/slice";
import waterReducer from "./deleteWater/deleteWaterSlice";
import { authReducer } from "../redux/auth/slice";
import { modalReducer } from "./modal/slice";

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

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"],
};

const rootReducer = {
    auth: persistReducer(authPersistConfig, authReducer),
    water: waterReducer,
    popover: popoverReducer,
    modal: modalReducer,
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
});

export const persistor = persistStore(store);
