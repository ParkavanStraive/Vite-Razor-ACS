import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUserDetails } from "@/auth/straive-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTicket, getWorkRequest, getXml } from "@/apis/api";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import { updateXmlContent } from "@/features/xml-slice";
import { setTicketData } from "@/features/ticket-slice";
import { setIsJobRequestOpen } from "@/features/job-slice";

export function InitialLoadJobModal() {
  const { isJobRequestOpen } = useAppSelector((state) => state.jobRequest);
  const user = useUserDetails();
  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.ticket);
  const xmlPath = ticket?.job_info?.xml_path;

  useEffect(() => {
    const work_request_id = sessionStorage.getItem("work_request_id");
    if (work_request_id === null || work_request_id === "work_request_id") {
      dispatch(setIsJobRequestOpen(true));
    }
  }, []);

  const token = sessionStorage.getItem("token") ?? "";
  const session_key = sessionStorage.getItem("session_key") ?? "";

  const { mutate, isPending } = useMutation({
    mutationFn: getWorkRequest,
    mutationKey: ["getWorkRequest"],
  });

  const { mutate: ticketMutate } = useMutation({
    mutationFn: getTicket,
    mutationKey: ["getTicket"],
  });

  const {
    data: xmlData,
    // isPending: xmlIsPending,
    isSuccess: xmlIsSuccess,
    error: xmlError,
    isError: xmlIsError,
  } = useQuery({
    queryKey: ["getXml", xmlPath],
    queryFn: () => getXml(xmlPath),
    enabled: !!(ticket?.job_info && xmlPath),
  });

  useEffect(() => {
    if (xmlIsSuccess && xmlData) {
      dispatch(updateXmlContent(xmlData));
    }
  }, [xmlIsSuccess, xmlData, dispatch]);

  // Side effect for XML error
  useEffect(() => {
    if (xmlIsError && xmlError) {
      console.log("Error fetching XML:", (xmlError as Error).message);
    }
  }, [xmlIsError, xmlError]);

  const [jobType, setJobType] = useState<string | undefined>(undefined);
  const [ticketType, setTicketType] = useState<string | undefined>(undefined);

  const handleClose = () => {
    dispatch(setIsJobRequestOpen(false));
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const work_request_id = sessionStorage.getItem("work_request_id");

    if (!work_request_id) {
      mutate(
        {
          user_id: user.username,
          email: user.username,
          project_name: "acs_razor",
          api_name: "workrequest",
          access_token: "EMG9WDUvV2JrCi49fklVjx54T",
          session_key,
          token,
          job_type: jobType ?? "",
          ticket_type: ticketType ?? "",
        },
        {
          onSuccess: (data) => {
            if (data) {
              sessionStorage.setItem("job_type", jobType ?? "");
              sessionStorage.setItem("ticket_type", ticketType ?? "");
              sessionStorage.setItem("work_request_id", data.work_request_id);

              const ticketPayload = {
                user_id: user.username,
                email: user.username,
                work_request_id: data.work_request_id,
                job_type: jobType ?? "",
                ticket_type: ticketType ?? "",
              };

              ticketMutate(ticketPayload, {
                onSuccess: (ticketData) => {
                  dispatch(setTicketData(ticketData.response.data));
                },
                onError: (ticketError) => {
                  console.error(
                    "Error in ticket mutation (getTicket):",
                    ticketError
                  );
                },
              });

              setJobType("");
              setTicketType("");
            }
          },
          onError: (error) => {
            console.log("Error fetching work request:", error);
          },
        }
      );
    }

    handleClose();
  };

  if (!isJobRequestOpen) return null;

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
  };

  const handleTicketTypeChange = (value: string) => {
    setTicketType(value);
  };

  return (
    <Dialog open={isJobRequestOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Get Job</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSave}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Job Type
              </Label>
              <Select
                onValueChange={handleJobTypeChange}
                value={jobType}
                disabled={false}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="journals">Journals</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {jobType === "journals" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Ticket Type
                </Label>
                <Select
                  onValueChange={handleTicketTypeChange}
                  value={ticketType}
                  // disabled={jobType !== "journal"}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Ticket Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="xml_conversion">
                        Xml Conversion
                      </SelectItem>
                      <SelectItem value="parser">Parser</SelectItem>
                      <SelectItem value="spix">Spix</SelectItem>
                      <SelectItem value="package_validation">
                        Package Validationssue
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
