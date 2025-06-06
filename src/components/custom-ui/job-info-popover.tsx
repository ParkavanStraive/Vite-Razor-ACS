import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/redux-store/hook";
import { InfoIcon } from "lucide-react";

export function JobInfoPopover() {
  // const [isOpen, setIsOpen] = useState(false);

  const ticket = useAppSelector((state) => state.ticket);

  const jobInfo = ticket?.job_info;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <InfoIcon
          className="text-white cursor-pointer"
          size={20}
          aria-label="Job Information" // Added for accessibility
        />
      </PopoverTrigger>
      <PopoverContent className="w-60 p-4">
        {" "}
        <div className="grid">
          {" "}
          <div className="grid grid-cols-2 items-center gap-x-2">
            {" "}
            <Label className="text-sm font-semibold whitespace-nowrap">
              Job ID:
            </Label>
            <span>{jobInfo?.job_id ?? "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-x-2">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Job Type:
            </Label>
            <span>{jobInfo?.job_type ?? "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-x-2">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Ticket ID:
            </Label>
            <span className="break-all">{jobInfo?.ticket_id ?? "N/A"}</span>{" "}
          </div>
          <div className="grid grid-cols-2 items-center gap-x-2">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Ticket Type:
            </Label>
            <span>{jobInfo?.ticket_type ?? "N/A"}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
