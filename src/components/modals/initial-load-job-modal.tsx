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
import { getWorkRequest } from "@/apis/api";
import { error } from "console";

export function InitialLoadJobModal() {
  const user = useUserDetails();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const queueNameFromStorage = sessionStorage.getItem("queuename");
    if (queueNameFromStorage === null || queueNameFromStorage === "undefined") {
      setIsOpen(true);
    }
  }, []);

  const token = sessionStorage.getItem("token") ?? "";
  const session_key = sessionStorage.getItem("session_key") ?? "";

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: getWorkRequest,
    mutationKey: ["getWorkRequest"],
  });

  const [jobType, setJobType] = useState<string | undefined>(undefined);
  const [JobSubtype, setJobSubtype] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your save logic here
    if (isPending) return;

    const queuenam = sessionStorage.getItem("queuename");

    if (!queuenam) {
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
          job_subtype: JobSubtype ?? "",
        },
        {
          onSuccess: (data) => {
            if (data) {
              sessionStorage.setItem("queuename", data.queuename);
            }
          },
          onError: (error) => {
            console.log("Error fetching work request:", error);
          },
        }
      );
    }

    console.log("Changes saved!", jobType, JobSubtype);
    handleClose();
  };

  if (!isOpen) return null;

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
  };

  const handleJobSubtypeChange = (value: string) => {
    setJobSubtype(value);
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
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {jobType === "journal" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Job Subtype
                </Label>
                <Select
                  onValueChange={handleJobSubtypeChange}
                  value={JobSubtype}
                  // disabled={jobType !== "journal"}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Job Sub Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="issue">Issue</SelectItem>
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
