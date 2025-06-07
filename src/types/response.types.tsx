export interface getTokenResponseType {
  result: {
    status: string;
    data: {
      token: string;
      session_key: string;
      token_created_time: string; // Or Date, if you plan to parse it into a Date object
    };
  };
}

export interface WorkRequestResponseType {
  work_request_id: string;
  status: string;
  errormsg: string;
}

interface ResponseData {
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
}

interface ApiResponse {
  request_status: string;
  data: ResponseData;
  request_error: string;
}

export interface TicketResponseType {
  response: ApiResponse;
}

export interface ParserResponseType {
  status: string;
  remarks: string;
  current_process: string;
}
