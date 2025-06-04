import "./App.css";
import XmlEditor from "./components/code-editor-area/xml-editor";

import { useUserDetails } from "./auth/straive-auth";
import { updateXmlContent } from "./features/xml-slice";
import { useAppDispatch, useAppSelector } from "./redux-store/hook";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getTicket, getWorkRequest, getXml } from "./apis/api";
import { XmlSkeleton } from "./components/skeleton/xml-skeleton";
import { setTicketData } from "./features/ticket-slice";

function App() {
  const user = useUserDetails();

  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.ticket);
  console.log("ticket", ticket?.job_info?.xml_path);

  const work_request_id = sessionStorage.getItem("work_request_id");
  const jobType = sessionStorage.getItem("job_type");
  const ticketType = sessionStorage.getItem("ticket_type");

  const { mutate: xmlMutate, isPending: xmlIsPending } = useMutation({
    mutationFn: getXml,
    mutationKey: ["getXml"],
  });

  const { mutate: ticketMutate, isPending: isTicketPending } = useMutation({
    mutationFn: getTicket,
    mutationKey: ["getTicket"],
  });

  useEffect(() => {
    if (user && work_request_id) {
      // Fetch ticket data
      ticketMutate(
        {
          user_id: user.username,
          email: user.username,
          work_request_id: work_request_id,
          job_type: jobType ?? "",
          ticket_type: ticketType ?? "",
        },
        {
          onSuccess: (data) => {
            dispatch(setTicketData(data.response.data));
          },
        }
      );
    }
  }, [user, work_request_id]);

  useEffect(() => {
    if (ticket?.job_info?.xml_path) {
      xmlMutate(ticket.job_info.xml_path, {
        onSuccess: (data) => {
          dispatch(updateXmlContent(data));
        },
        onError: (error: any) => {
          console.log(error.message);
        },
      });
    }
  }, [ticket.job_info.xml_path]);

  // const handleXMLContentChange = (value: string) => {
  //   dispatch(updateXmlContent(value));
  // };

  return (
    <div className="h-full overflow-auto rounded-2xl">
      {xmlIsPending ? (
        <div className="p-6">
          <XmlSkeleton />
        </div>
      ) : (
        <XmlEditor
        // onChange={handleXMLContentChange}
        />
      )}
    </div>
  );
}

export default App;
