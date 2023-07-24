import { configureStore } from "@reduxjs/toolkit";

const emptyReducer = (state = null) => state;

export const store = configureStore({
  reducer: { empty: emptyReducer },
});
