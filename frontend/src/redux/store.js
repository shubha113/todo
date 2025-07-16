import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import taskReducer from "./slices/taskSlice.js";

// Create and configure the Redux store
const store = configureStore({
  // Combine reducers (auth & tasks slice)
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export default store;
