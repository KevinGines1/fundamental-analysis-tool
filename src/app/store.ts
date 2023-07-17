import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../features/company/company";

const store = configureStore({
    reducer: {
        companyState: companyReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;