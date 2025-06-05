import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IJobSlice {
  isJobRequestOpen: boolean;
}

const initialState: IJobSlice = {
  isJobRequestOpen: true,
};

export const jobRequestSlice = createSlice({
  name: "jobRequest",
  initialState,
  reducers: {
    setIsJobRequestOpen: (state, action: PayloadAction<boolean>) => {
      state.isJobRequestOpen = action.payload;
    },
    toggleJobRequestOpen: (state) => {
      state.isJobRequestOpen = !state.isJobRequestOpen;
    },
  },
});

export const { setIsJobRequestOpen, toggleJobRequestOpen } =
  jobRequestSlice.actions;

export default jobRequestSlice.reducer;
