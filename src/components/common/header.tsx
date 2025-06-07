import { Loader, LogOutIcon, TimerIcon, UserIcon } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAppDispatch, useAppSelector } from "@/redux-store/hook";

import { useUserDetails } from "@/auth/straive-auth";
import { JobInfoPopover } from "../custom-ui/job-info-popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getTicket,
  getXml,
  saveTicket,
  updateTicket,
  validateParser,
  validateSpix,
} from "@/apis/api";
import { encode } from "js-base64";
import { toast } from "sonner";
import { handleClearTicket } from "@/utils/clear-ticket";
import Razor_Logo from "../../assets/logos/RAZOR_slogo.png";
import { setIsJobRequestOpen } from "@/features/job-slice";
import { setTicketData } from "@/features/ticket-slice";
import { updateXmlContent } from "@/features/xml-slice";
import { useGetXml } from "@/hooks/xml-hooks";
import { useValidateParser, useValidateSpix } from "@/hooks/errors-hook";
import { useGetLogFile } from "@/hooks/log-hooks";
import { setParserLogError, setSpixLogError } from "@/features/error-slice";

const Header = () => {
  const dispatch = useAppDispatch();

  const ticket = useAppSelector((state) => state.ticket);
  const xmlContent = useAppSelector((state) => state.xml.xmlContent);
  const xmlPath = ticket?.job_info?.xml_path;

  const user = useUserDetails();

  const jobType = sessionStorage.getItem("job_type");
  const work_request_id = sessionStorage.getItem("work_request_id");
  const ticketType = sessionStorage.getItem("ticket_type");

  // const {
  //   data: xmlData,
  //   isPending: xmlIsPending,
  //   isSuccess: xmlIsSuccess,
  //   error: xmlError,
  //   isError: xmlIsError,
  // } = useGetXml(xmlPath, ticket, work_request_id ?? "");

  const { mutate: logFileMutate, isPending: isLogFilePending } =
    useGetLogFile();

  const { mutate: updateXmlMutate, isPending: isXmlPending } = useMutation({
    mutationFn: updateTicket,
    mutationKey: ["updateXml"],
  });

  const { mutate: saveXmlMutate, isPending } = useMutation({
    mutationFn: saveTicket,
    mutationKey: ["saveXml"],
  });

  const { mutate: parserMutate, isPending: isParserValidatePending } =
    useValidateParser();
  //   {
  //   mutationFn: validateParser,
  //   mutationKey: ["validateParser"],
  //   onSuccess: (data) => {
  //     if (data.status === "0") {
  //       toast("Parser Validation", {
  //         description: "Error still persists, please fix the XML",
  //       });
  //     } else {
  //       toast("Parser Validation", {
  //         description: "The XML file has been validated successfully",
  //       });
  //     }
  //   },
  // }

  const { mutate: spixMutate, isPending: isSpixValidatePending } =
    useValidateSpix();

  const { mutate: ticketMutate } = useMutation({
    mutationFn: getTicket,
    mutationKey: ["getTicket"],
  });

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

          const startTimeString = sessionStorage.getItem("ticket_start_time");
          const startTime = moment(startTimeString);

          const endTime = moment();

          sessionStorage.setItem("ticket_end_time", endTime.toISOString());

          const elapsedTimeInSeconds = endTime.diff(startTime, "seconds");

          updateXmlMutate(
            {
              ticket_id: ticket.job_info.ticket_id,
              work_request_id: work_request_id,
              ticket_time_extend: "1",
              status: "completed",
              ticket_start_time: startTime.format("YYYY-MM-DD HH:mm:ss"),
              ticket_end_time: endTime.format("YYYY-MM-DD HH:mm:ss"),
              ticket_elapsed_time: elapsedTimeInSeconds.toString(),
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
                    user_id: user?.username,
                    email: user?.username,
                    work_request_id: work_request_id ?? "",
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
                          return;
                        }
                        dispatch(setTicketData(data.response.data));
                      }
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
    const xmlPath = ticket.job_info.xml_path;

    const handleMutationSuccess = (data: { status: string }) => {
      const isSuccess = data.status !== "0";
      const toastDescription = isSuccess
        ? "The XML file has been validated successfully"
        : "Error still persists, please fix the XML";

      toast("Parser Validation", { description: toastDescription });

      logFileMutate(
        { xml: xmlPath, logType: ticketType },
        {
          onSuccess: (logData) => {
            const action =
              ticketType === "spix"
                ? setSpixLogError(logData)
                : setParserLogError(logData);
            dispatch(action);
          },
        }
      );
    };

    // 4. Define the mutation to call and its specific payload.
    const isParser = ticketType === "parser";
    const mutationFn = isParser ? parserMutate : spixMutate;
    const payload = isParser
      ? { xml: xmlPath }
      : { xml: xmlPath, clientName: "ACSCM", stage: "ED" };

    // 5. Execute the mutation with the payload and the shared success handler.
    mutationFn(payload, { onSuccess: (data) => handleMutationSuccess(data) });
  };

  return (
    <div className="flex items-center justify-between h-full p-2">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="w-[80px] h-[50] rounded-md drop-shadow-2xl bg-white border flex items-center justify-center">
          <img src={Razor_Logo} alt="#Razor_Logo" width={90} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {(ticketType === "parser" || ticketType === "spix") && (
          <>
            {/* <Tooltip>
              <TooltipTrigger asChild> */}
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
                <p>Validate</p>
              )}
            </Button>
            {/* </TooltipTrigger>
              <TooltipContent>
                <p>Validate</p>
              </TooltipContent>
            </Tooltip> */}
          </>
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
