import { configureStore } from "@reduxjs/toolkit";
import creditReducer from "./features/creditSlice";

const singletonStore = configureStore({
  reducer: {
    credit: creditReducer,
  },
});

export const getStore = () => {
  return singletonStore;
};

// Infer the type of getStore
export type AppStore = ReturnType<typeof getStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
