import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/redux-store/hook";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

export function JobInfoPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const ticket = useAppSelector((state) => state.ticket);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <InfoIcon
          className="text-white cursor-pointer"
          size={20}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-70">
        <div className="grid grid-cols-1">
          <div className="flex items-center gap-4">
            <Label className="text-sm font-semibold">Job Id : </Label>
            <span>{ticket?.job_info?.job_id}</span>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-semibold">Job Type : </Label>
            <span>{ticket?.job_info?.job_type}</span>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-semibold">Ticket Id : </Label>
            <span>{ticket?.job_info?.ticket_id}</span>
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-semibold">Job Id: </Label>
            <span>{ticket?.job_info?.ticket_type}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
