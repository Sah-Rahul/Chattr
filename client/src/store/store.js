import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
