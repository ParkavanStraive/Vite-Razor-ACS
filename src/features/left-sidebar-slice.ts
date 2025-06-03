import { RootState } from "@/redux-store/store";
import { createSlice } from "@reduxjs/toolkit";

export interface ILeftStateSlice {
  isLeftBarHide: boolean;
}

const initialState: ILeftStateSlice = {
  isLeftBarHide: true,
};

export const LeftSidebarSlice = createSlice({
  name: "leftSidebar",
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.isLeftBarHide = !state.isLeftBarHide;
    },
  },
});

export const { toggleLeftSidebar } = LeftSidebarSlice.actions;

export const isLeftBarHide = (state: RootState) => state.leftSide.isLeftBarHide;

export default LeftSidebarSlice.reducer;
