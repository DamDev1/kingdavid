import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
