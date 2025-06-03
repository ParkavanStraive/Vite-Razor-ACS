import { ChevronLeft, ChevronRight, InfoIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import { toggleLeftSidebar } from "@/features/left-sidebar-slice";
import { toggleRightSidebar } from "@/features/right-sidebar-slice";
import axios from "axios";
import { appConfig } from "@/config/app-config";
import { cn } from "@/lib/utils";
import { useUserDetails } from "@/auth/straive-auth";

const Header = () => {
  const dispatch = useAppDispatch();
  const localURL = appConfig.localURL;

  const user = useUserDetails();

  const xmlContent = useAppSelector((state) => state.xml.xmlContent);
  const isLeftOpen = useAppSelector((state) => state.leftSide.isLeftBarHide);
  const isRightOpen = useAppSelector((state) => state.rightSide.isRightBarHide);

  const onSubmitHandler = async () => {
    const xmlBase64 = btoa(xmlContent);

    try {
      const response = await axios.post(`${localURL}/cas_api/xml/save_xml`, {
        fileName: "sample.xml",
        content: xmlBase64, // Crucial: send the Base64 string
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("XML content saved successfully:", response.data);
      } else {
        const errorData = response.data || response.statusText; // Get error details
        console.error("Error saving XML content:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, data: ${errorData}`
        ); // Re-throw for handling
      }
    } catch (error: any) {
      console.error("An error occurred:", error.message); // Handle errors outside the axios call
      // Consider logging the error to a more persistent location (e.g., a database)
    }
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
        <Button variant="outline">Save</Button>
        <Button variant="outline" onClick={onSubmitHandler}>
          Sumit
        </Button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserIcon className="text-white" size={20} />
            <p className="text-white font-bold">{user.name}</p>
          </div>
          <div className="flex items-end  justify-end">
            <InfoIcon className="text-white cursor-pointer" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
