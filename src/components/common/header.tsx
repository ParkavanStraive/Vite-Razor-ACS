import { Loader, LogOutIcon, TimerIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAppDispatch, useAppSelector } from "@/redux-store/hook";

import { useUserDetails } from "@/auth/straive-auth";
import { JobInfoPopover } from "../custom-ui/job-info-popover";
import { useMutation } from "@tanstack/react-query";
import { getTicket, saveTicket, updateTicket } from "@/apis/api";
import { encode } from "js-base64";
import { toast } from "sonner";
import { handleClearTicket } from "@/utils/clear-ticket";
import { setTicketData } from "@/features/ticket-slice";
import { setIsJobRequestOpen } from "@/features/job-slice";

const Header = () => {
  const ticket = useAppSelector((state) => state.ticket);
  const user = useUserDetails();
  const dispatch = useAppDispatch();

  const { mutate: updateXmlMutate, isPending: isXmlPending } = useMutation({
    mutationFn: updateTicket,
    mutationKey: ["updateXml"],
  });

  const { mutate: saveXmlMutate, isPending } = useMutation({
    mutationFn: saveTicket,
    mutationKey: ["updateXml"],
  });

  const { mutate: ticketMutate } = useMutation({
    mutationFn: getTicket,
    mutationKey: ["getTicket"],
  });

  const work_request_id = sessionStorage.getItem("work_request_id");
  const jobType = sessionStorage.getItem("job_type");
  const ticketType = sessionStorage.getItem("ticket_type");

  // const handleLogout = () => {
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("session_key");
  //   sessionStorage.removeItem("queuename");
  //   sessionStorage.removeItem("job_type");
  //   sessionStorage.removeItem("ticket_type");
  //   sessionStorage.removeItem("work_request_id");
  //   window.location.reload();
  // };

  const xmlContent = useAppSelector((state) => state.xml.xmlContent);

  const onSubmitHandler = () => {
    const xmlBase64 = encode(xmlContent);

    saveXmlMutate(
      {
        fileName: ticket?.job_info?.xml_path,
        content: xmlBase64,
      },
      {
        onSuccess: () => {
          toast("Ticket Status", {
            description: "Ticket has been saved",
          });

          updateXmlMutate(
            {
              ticket_id: ticket.job_info.ticket_id,
              work_request_id: work_request_id,
              ticket_time_extend: "1",
              status: "completed",
              ticket_start_time: "2025-06-04 12:58:32",
              ticket_end_time: "2025-06-04 12:59:32",
              ticket_elapsed_time: "100",
              remarks: "remarks",
              waiting_time: "0",
              conversion_time: "0",
              user_action: "Manual",
              user_id: user.username,
            },
            {
              onSuccess: () => {
                toast("Ticket Status", {
                  description: "Ticket has been submitted",
                });

                ticketMutate(
                  {
                    user_id: user.username,
                    email: user.username,
                    work_request_id: work_request_id ?? "",
                    job_type: jobType ?? "",
                    ticket_type: ticketType ?? "",
                  },
                  {
                    onSuccess: (data) => {
                      console.log("Ticket data:", data);
                      if (data && data.response.request_status === "2") {
                        toast("Ticket Status", {
                          description:
                            "Tickets are not available for this work request",
                        });
                      }

                      dispatch(setTicketData(data.response.data));
                    },
                  }
                );
              },
              onError: (error: any) => {
                console.error(
                  "Error in ticket mutation (getTicket):",
                  error.message
                );
              },
            }
          );
        },
        onError: (error: any) => {
          console.log("Error saving XML content:", error.message);
        },
      }
    );
  };

  const handleSave = () => {
    const xmlBase64 = encode(xmlContent);
    console.log("xmlBase64", xmlBase64);

    saveXmlMutate(
      {
        fileName: ticket.job_info.xml_path,
        content: xmlBase64,
      },
      {
        onSuccess: () => {
          toast("Ticket Status", {
            description: "Ticket has been saved",
          });
        },
        onError: (error: any) => {
          console.log("Error saving XML content:", error.message);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-between h-full p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="w-32 h-12 rounded-md drop-shadow-2xl bg-white border flex items-center justify-center">
          <h1 className="text-2xl font-bold">Razor-ACS</h1>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Validate</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Validate (WIP)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size={"icon"}>
              <TimerIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Extend time (WIP)</p>
          </TooltipContent>
        </Tooltip>

        <Button variant="outline" onClick={handleSave} disabled={isPending}>
          {isPending ? (
            <>
              <Loader /> Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onSubmitHandler}
          disabled={isXmlPending}
        >
          {isXmlPending ? (
            <>
              <Loader /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
        <Button
          size={"icon"}
          variant="destructive"
          onClick={() => {
            handleClearTicket();
            dispatch(setIsJobRequestOpen(true));
            // window.location.reload();
          }}
        >
          <LogOutIcon />
        </Button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserIcon className="text-white" size={20} />
            <p className="text-white font-bold">{user.name}</p>
          </div>
          <div className="flex items-end  justify-end">
            <JobInfoPopover />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
