import Footer from "./footer";
import Header from "./header";
import BothSidebars from "./both-sidebars";
import { InitialLoadJobModal } from "../modals/initial-load-job-modal";

const RootLayout = () => {
  const work_request_id = sessionStorage.getItem("work_request_id");

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

      {!work_request_id && <InitialLoadJobModal />}
    </div>
  );
};

export default RootLayout;
