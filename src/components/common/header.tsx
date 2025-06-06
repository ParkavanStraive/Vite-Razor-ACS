import { Loader, LogOutIcon, TimerIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAppSelector } from "@/redux-store/hook";

import { useUserDetails } from "@/auth/straive-auth";
import { JobInfoPopover } from "../custom-ui/job-info-popover";
import { useMutation } from "@tanstack/react-query";
import {
  saveTicket,
  updateTicket,
  validateParser,
  validateSpix,
} from "@/apis/api";
import { encode } from "js-base64";
import { toast } from "sonner";
import { handleClearTicket } from "@/utils/clear-ticket";
import Razor_Logo from "../../assets/logos/RAZOR_slogo.png";

const Header = () => {
  const ticket = useAppSelector((state) => state.ticket);
  const user = useUserDetails();

  // const xmlPath = ticket?.job_info?.xml_path;

  const { mutate: updateXmlMutate, isPending: isXmlPending } = useMutation({
    mutationFn: updateTicket,
    mutationKey: ["updateXml"],
  });

  const { mutate: saveXmlMutate, isPending } = useMutation({
    mutationFn: saveTicket,
    mutationKey: ["updateXml"],
  });

  const { mutate: parserMutate, isPending: isParserValidatePending } =
    useMutation({
      mutationFn: validateParser,
      mutationKey: ["validateParser"],
    });

  const { mutate: spixMutate, isPending: isSpixValidatePending } = useMutation({
    mutationFn: validateSpix,
    mutationKey: ["validateSpix"],
  });

  const work_request_id = sessionStorage.getItem("work_request_id");
  const ticketType = sessionStorage.getItem("ticket_type");

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

          const endTime = new Date().toISOString();
          sessionStorage.setItem("ticket_end_time", endTime);

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
              },
              onError: () => {
                toast("Ticket Status", {
                  description: `Something wrong, Please try again later`,
                });
              },
            }
          );
        },
        onError: () => {
          toast("Ticket Status", {
            description: `Something wrong, Please try again later`,
          });
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
        onError: () => {
          toast("Ticket Status", {
            description: `Something wrong, Please try again later`,
          });
        },
      }
    );
  };

  const handleValidate = () => {
    const ticketType = sessionStorage.getItem("ticket_type");

    if (ticketType === "parser") {
      parserMutate(
        {
          xml: ticket.job_info.xml_path,
        },
        {
          onSuccess: () => {},
        }
      );
    } else {
      spixMutate(
        {
          xml: ticket.job_info.xml_path,
          clientName: "ACS",
          stage: "ED",
        },
        {
          onSuccess: () => {},
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-between h-full p-2">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="w-[80px] h-[50] rounded-md drop-shadow-2xl bg-white border flex items-center justify-center">
          {/* <h1 className="text-2xl font-bold">Razor-ACS</h1> */}
          <img src={Razor_Logo} alt="#Razor_Logo" width={90} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {(ticketType === "parser" || ticketType === "spix") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={handleValidate}
                disabled={isParserValidatePending || isSpixValidatePending}
              >
                {isParserValidatePending || isSpixValidatePending ? (
                  <>
                    <Loader className="animate-spin" /> Validating...
                  </>
                ) : (
                  "Validate"
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Validate (WIP)</p>
            </TooltipContent>
          </Tooltip>
        )}

        {ticket?.job_info?.job_id && ticket?.job_info?.ticket_id && (
          <>
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
                  <Loader className="animate-spin" /> Saving...
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
                  <Loader className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </>
        )}
        <Button
          size={"icon"}
          variant="destructive"
          onClick={() => {
            handleClearTicket();
            // dispatch(updateXmlContent(""));
            // dispatch(setIsJobRequestOpen(true));
            window.location.reload();
          }}
        >
          <LogOutIcon />
        </Button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserIcon className="text-white" size={20} />
            <p className="text-white font-bold">{user.name}</p>
          </div>
          {ticket?.job_info?.job_id && (
            <div className="flex items-end  justify-end">
              <JobInfoPopover />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
