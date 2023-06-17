import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/api/apiSlice";
const store = configureStore({
  reducer: {
    api: apiReducer,
    // other reducers...
  },
});

export default store;
