import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./urlSlice";
import errorSlice from "./errorSlice";

const store = configureStore({
  reducer: {
    shortURL: urlSlice.reducer,
    errors:errorSlice.reducer,
  },
});

export default store;
