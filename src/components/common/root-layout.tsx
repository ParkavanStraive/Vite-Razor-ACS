import Footer from "./footer";
import Header from "./header";
import BothSidebars from "./both-sidebars";
import { InitialLoadJobModal } from "../modals/initial-load-job-modal";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/apis/api";
import { useUserDetails } from "@/auth/straive-auth";

const RootLayout = () => {
  const user = useUserDetails();

  const { mutate } = useMutation({
    mutationFn: getToken,
    mutationKey: ["getToken"],
  });

  useEffect(() => {
    // Only fetch token if user data is available.

    const token = sessionStorage.getItem("token");
    const session_key = sessionStorage.getItem("session_key");
    if (user && !token && !session_key) {
      mutate(
        {
          user_id: user.username,
          project_name: "acs_razor",
          access_token: "EMG9WDUvV2JrCi49fklVjx54T",
          api_name: "workrequest",
        },
        {
          onSuccess: (data) => {
            if (data) {
              // Add a check here
              sessionStorage.setItem("token", data.result.data.token);
              sessionStorage.setItem(
                "session_key",
                data.result.data.session_key
              );
              // sessionStorage.setItem(
              //   "token_created_time",
              //   data.result.data.token_created_time
              // );
            }
          },
        }
      );
    }
  }, [user, mutate]);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-16 bg-white border-b rounded-b-2xl bg-[linear-gradient(87deg,rgba(27,38,59,1)_0%,rgba(65,90,119,1)_50%,rgba(119,141,169,1)_100%)]">
        <Header />
      </div>

      <div className="flex h-[calc(100vh-88px)] gap-4">
        <BothSidebars />
      </div>

      <div className="w-full h-6 bg-white border-t rounded-t-2xl">
        <Footer />
      </div>

      <InitialLoadJobModal />
    </div>
  );
};

export default RootLayout;
