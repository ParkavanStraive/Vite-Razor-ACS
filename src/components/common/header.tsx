import {
  ChevronLeft,
  ChevronRight,
  InfoIcon,
  Loader,
  LogOut,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";

import { appConfig } from "@/config/app-config";
import { useAuthLogout, useUserDetails } from "@/auth/straive-auth";
import { JobInfoPopover } from "../custom-ui/job-info-popover";
import { useMutation } from "@tanstack/react-query";
import { saveTicket, updateTicket } from "@/apis/api";
import { encode, decode, Base64 } from "js-base64";
import { xmlToBase64 } from "@/utils/xml-to-base64";
import { SessionStorage } from "@azure/msal-browser";

const Header = () => {
  const ticket = useAppSelector((state) => state.ticket);
  const user = useUserDetails();
  const logout = useAuthLogout();

  const { mutate: updateXmlMutate, isPending: isXmlPending } = useMutation({
    mutationFn: updateTicket,
    mutationKey: ["updateXml"],
  });

  const { mutate: saveXmlMutate, isPending } = useMutation({
    mutationFn: saveTicket,
    mutationKey: ["updateXml"],
  });

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("session_key");
    sessionStorage.removeItem("queuename");
    logout();
  };

  const xmlContent = useAppSelector((state) => state.xml.xmlContent);
  const work_request_id = sessionStorage.getItem("work_request_id");
  // const isLeftOpen = useAppSelector((state) => state.leftSide.isLeftBarHide);
  // const isRightOpen = useAppSelector((state) => state.rightSide.isRightBarHide);

  const onSubmitHandler = () => {
    const xmlBase64 = encode(xmlContent);
    console.log("xmlBase64", xmlBase64);

    saveXmlMutate(
      {
        fileName: ticket?.job_info?.xml_path,
        content: xmlBase64,
      },
      {
        onSuccess: (data) => {
          console.log("XML content saved successfully:", data);
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
              onSuccess: (data) => {
                console.log("XML content saved successfully:", data);
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
        onSuccess: (data) => {
          console.log("XML content saved successfully:", data);
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
        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(toggleLeftSidebar())}
        >
          <ChevronLeft
            className={cn(
              "transition-all duration-300",
              isLeftOpen ? "" : "rotate-180"
            )}
          />
        </Button> */}
      </div>

      <div className="flex items-center justify-between gap-2">
        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(toggleRightSidebar())}
        >
          <ChevronRight
            className={cn(
              "transition-all duration-300",
              isRightOpen ? "" : "rotate-180"
            )}
          />
        </Button>{" "} */}
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

        {/* <Button size={"icon"} variant="destructive" onClick={handleLogout}>
          <LogOutIcon />
        </Button> */}

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
