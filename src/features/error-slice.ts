import { createSlice } from "@reduxjs/toolkit";

export interface IErrorSlice {
  conversionLogError: string;
}

const initialState: IErrorSlice = {
  conversionLogError: "",
};

export const ErrorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setConversionLog: (state, action) => {
      state.conversionLogError = action.payload;
    },
  },
});

export const { setConversionLog } = ErrorSlice.actions;

export default ErrorSlice.reducer;
