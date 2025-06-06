import { createSlice } from "@reduxjs/toolkit";

export interface IErrorSlice {
  conversionLogError: string;
  spixLogError: string;
  parserLogError: string;
}

const initialState: IErrorSlice = {
  conversionLogError: "",
  spixLogError: "",
  parserLogError: "",
};

export const ErrorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setConversionLog: (state, action) => {
      state.conversionLogError = action.payload;
    },
    setSpixLogError: (state, action) => {
      state.spixLogError = action.payload;
    },
    setParserLogError: (state, action) => {
      state.parserLogError = action.payload;
    },
  },
});

export const { setConversionLog, setSpixLogError, setParserLogError } =
  ErrorSlice.actions;

export default ErrorSlice.reducer;
