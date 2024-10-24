import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface CreditState {
  userId: number;
  balance: number;
}

// Define the initial state using that type
const initialState: CreditState = {
  userId: 1,
  balance: -1,
};

export const creditSlice = createSlice({
  name: "credit",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initializeCredit: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    increment: (state) => {
      state.balance += 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
  },
});

export const { initializeCredit, increment, decrementByAmount } =
  creditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.credit.balance;

export default creditSlice.reducer;
