import { configureStore } from "@reduxjs/toolkit";

import { popoverReducer } from "./popover/slice";

const store = configureStore({
    reducer: {
        popover: popoverReducer,
    },
});

export default store;
