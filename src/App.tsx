import "./App.css";
import XmlEditor from "./components/code-editor-area/xml-editor";

import { useUserDetails } from "./auth/straive-auth";
import { updateXmlContent } from "./features/xml-slice";
import { useAppDispatch, useAppSelector } from "./redux-store/hook";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTicket, getXml } from "./apis/api";
import { XmlSkeleton } from "./components/custom-ui/skeleton/xml-skeleton";
import { setTicketData } from "./features/ticket-slice";
import { toast } from "sonner";
import { handleClearTicket } from "./utils/clear-ticket";
import { setIsJobRequestOpen } from "./features/job-slice";
import { useGetXml } from "./hooks/api-hooks/xml-hooks";

function App() {
  const user = useUserDetails();

  const dispatch = useAppDispatch();

  const ticket = useAppSelector((state) => state.ticket);
  const xmlPath = ticket?.job_info?.xml_path ?? undefined;

  const work_request_id = sessionStorage.getItem("work_request_id");
  const jobType = sessionStorage.getItem("job_type");
  const ticketType = sessionStorage.getItem("ticket_type");

  const { mutate: ticketMutate } = useMutation({
    mutationFn: getTicket,
    mutationKey: ["getTicket"],
  });

  useEffect(() => {
    if (user && work_request_id) {
      // Fetch ticket data
      ticketMutate(
        {
          user_id: user?.username,
          email: user?.username,
          work_request_id: work_request_id,
          job_type: jobType ?? "",
          ticket_type: ticketType ?? "",
        },
        {
          onSuccess: (data) => {
            if (data) {
              if (data.response.request_status === "2") {
                toast("Ticket Status", {
                  description:
                    "Tickets are not available for this work request",
                });
                handleClearTicket();
                dispatch(setIsJobRequestOpen(true));
              }
              dispatch(setTicketData(data.response.data));
            }
          },
        }
      );
    }
  }, [user, work_request_id]);

  const {
    data: xmlData,
    isPending: xmlIsPending,
    isSuccess: xmlIsSuccess,
    error: xmlError,
    isError: xmlIsError,
  } = useGetXml(xmlPath, ticket, work_request_id ?? "");

  useEffect(() => {
    if (xmlIsSuccess && xmlData) {
      dispatch(updateXmlContent(xmlData));
    }
  }, [xmlIsSuccess, xmlData, dispatch]);

  useEffect(() => {
    if (xmlIsError && xmlError) {
      console.log("Error fetching XML:", (xmlError as Error).message);
    }
  }, [xmlIsError, xmlError]);

  return (
    <div className="h-full overflow-auto rounded-2xl">
      {xmlIsPending ? (
        <div className="p-6">
          <XmlSkeleton />
        </div>
      ) : (
        <XmlEditor />
      )}
    </div>
  );
}

export default App;
