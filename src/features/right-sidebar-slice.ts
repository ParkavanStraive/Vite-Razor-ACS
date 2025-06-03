import { RootState } from "@/redux-store/store";
import { createSlice } from "@reduxjs/toolkit";

export interface ILeftStateSlice {
  isRightBarHide: boolean;
}

const initialState: ILeftStateSlice = {
  isRightBarHide: true,
};

export const RightSidebarSlice = createSlice({
  name: "rightSidebar",
  initialState,
  reducers: {
    toggleRightSidebar: (state) => {
      state.isRightBarHide = !state.isRightBarHide;
    },
  },
});

export const { toggleRightSidebar } = RightSidebarSlice.actions;

export const isRightBarHide = (state: RootState) =>
  state.rightSide.isRightBarHide;

export default RightSidebarSlice.reducer;
