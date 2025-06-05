export const handleClearTicket = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("session_key");
  sessionStorage.removeItem("queuename");
  sessionStorage.removeItem("job_type");
  sessionStorage.removeItem("ticket_type");
  sessionStorage.removeItem("work_request_id");
  // setTimeout(() => window.location.reload(), 1000);
};
