import { RootState } from "@/redux-store/store";
import { createSlice } from "@reduxjs/toolkit";

interface ITicketType {
  job_info: {
    job_id: string;
    job_type: string;
    ticket_id: string;
    ticket_type: string;
    ticket_timeout: string;
    filename: string;
    base_path: string;
    xml_path: string;
    conversion_log_path: string;
    query_list: unknown[]; // You can replace 'unknown' with a more specific type if the elements of query_list have a known structure, e.g., string[] or an array of specific objects.
  };
}

const initialState: ITicketType = {
  job_info: {
    job_id: "",
    job_type: "",
    ticket_id: "",
    ticket_type: "",
    ticket_timeout: "",
    filename: "",
    base_path: "",
    xml_path: "",
    conversion_log_path: "",
    query_list: [],
  },
};

export const TicketSlice = createSlice({
  name: "ticketInfo",
  initialState,
  reducers: {
    setTicketData: (state, action) => {
      state.job_info = action.payload;
    },
  },
});

export const { setTicketData } = TicketSlice.actions;

export default TicketSlice.reducer;
