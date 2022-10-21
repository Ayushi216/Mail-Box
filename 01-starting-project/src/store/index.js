import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import emailSlice from "./email-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    email: emailSlice.reducer,
  },
});

export default store;
