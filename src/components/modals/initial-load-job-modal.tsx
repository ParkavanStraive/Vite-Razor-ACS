import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUserDetails } from "@/auth/straive-auth";
import { useMutation } from "@tanstack/react-query";
import { getTicket, getWorkRequest } from "@/apis/api";
import { error } from "console";
import { useAppDispatch } from "@/redux-store/hook";
import axios from "axios";
import { appConfig } from "@/config/app-config";
import { updateXmlContent } from "@/features/xml-slice";

export function InitialLoadJobModal() {
  const user = useUserDetails();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const localURL = appConfig.localURL;

  useEffect(() => {
    const work_request_id = sessionStorage.getItem("work_request_id");
    if (work_request_id === null || work_request_id === "work_request_id") {
      setIsOpen(true);
    }
  }, []);

  const token = sessionStorage.getItem("token") ?? "";
  const session_key = sessionStorage.getItem("session_key") ?? "";

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: getWorkRequest,
    mutationKey: ["getWorkRequest"],
  });

  const { mutate: ticketMutate, isPending: isTicketPending } = useMutation({
    mutationFn: getTicket,
    mutationKey: ["getTicket"],
  });

  const [jobType, setJobType] = useState<string | undefined>(undefined);
  const [ticketType, setTicketType] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    try {
      // const response = await axios.get(`${baseUrl}/xml?jobid=${jobId}`);
      const response = await axios.get(
        `${localURL}/xml/getxml?fileName=sample.xml`
      );

      dispatch(updateXmlContent(response.data));
      // setXmlContent(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error during setup:", error.message);
      }
    }
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your save logic here
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
              sessionStorage.setItem("work_request_id", data.work_request_id);
              // fetchData();

              const ticketPayload = {
                user_id: user.username,
                email: user.username,
                work_request_id: data.work_request_id,
                job_type: jobType ?? "",
                ticket_type: ticketType ?? "",
              };

              ticketMutate(ticketPayload, {
                onSuccess: (ticketData) => {
                  console.log("Ticket mutation successful:", ticketData);
                  sessionStorage.setItem(
                    "ticket_id",
                    ticketData.response.data.ticket_id
                  );
                },
                onError: (ticketError) => {
                  console.error(
                    "Error in ticket mutation (getTicket):",
                    ticketError
                  );
                },
              });
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

  if (!isOpen) return null;

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
  };

  const handleTicketTypeChange = (value: string) => {
    setTicketType(value);
  };

  return (
    <Dialog open={isOpen}>
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
