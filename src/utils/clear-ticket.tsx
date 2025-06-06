export const handleClearTicket = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("session_key");
  sessionStorage.removeItem("queuename");
  sessionStorage.removeItem("job_type");
  sessionStorage.removeItem("ticket_type");
  sessionStorage.removeItem("work_request_id");
  sessionStorage.removeItem("ticket_start_time");
  sessionStorage.removeItem("ticket_end_time");
  // setTimeout(() => window.location.reload(), 1000);
};
