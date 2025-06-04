export interface getTokenPayloadTypes {
  user_id: string;
  project_name: string;
  access_token: string;
  api_name: string;
}

export interface WorkRequestPayloadType {
  user_id: string;
  email: string;
  project_name: string;
  api_name: string;
  access_token: string;
  session_key: string;
  token: string;
  job_type: string;
  ticket_type: string;
}

export interface TicketPayload {
  user_id: string;
  email: string;
  work_request_id: string;
  job_type: string;
  ticket_type: string;
}
