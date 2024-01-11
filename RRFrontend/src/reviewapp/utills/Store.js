
import CompanySlice from "../features/company/CompanySlice";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import reviewSlice from "../features/review/reviewSlice";
import thunk from "redux-thunk";
const store =configureStore(
    {
        reducer:{
            user:authSlice,
            company:CompanySlice,
            review:reviewSlice,
        },
    },
    applyMiddleware(thunk)
);
export default store;
