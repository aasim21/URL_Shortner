import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    update_slice: (state, action) => {
      if (action.payload) {
        state = action.payload;
      } else {
        state = null;
      }
      return state;
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice;
