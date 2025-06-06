import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid"; // A small library for unique IDs

// Define the shape of the navigation target
type NavigationTarget = {
  line: number;
  char: number;
};

// Define the state shape
type NavigationState = {
  targetPosition: (NavigationTarget & { triggerId: string }) | null;
};

const initialState: NavigationState = {
  targetPosition: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    // This action will be dispatched to set a new navigation target
    setNavigationTarget: (state, action: PayloadAction<NavigationTarget>) => {
      state.targetPosition = {
        ...action.payload,
        // Generate a unique ID for each navigation event
        triggerId: nanoid(),
      };
    },
    clearNavigationTarget: (state) => {
      state.targetPosition = null;
    },
  },
});

export const { setNavigationTarget, clearNavigationTarget } =
  navigationSlice.actions;
export default navigationSlice.reducer;
