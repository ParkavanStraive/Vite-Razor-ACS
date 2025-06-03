import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IXmlStateSlice {
  xmlContent: string;
}

const initialState: IXmlStateSlice = {
  xmlContent: "",
};

export const xmlSlice = createSlice({
  name: "xml",
  initialState,
  reducers: {
    updateXmlContent: (state, action: PayloadAction<string>) => {
      state.xmlContent = action.payload;
    },
  },
});

export const { updateXmlContent } = xmlSlice.actions;

export default xmlSlice.reducer;
