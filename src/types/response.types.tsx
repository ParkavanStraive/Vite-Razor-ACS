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
  queuename: string;
  status: string;
  errormsg: string;
}
