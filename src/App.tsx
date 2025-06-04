import "./App.css";
import XmlEditor from "./components/code-editor-area/xml-editor";

import { useUserDetails } from "./auth/straive-auth";
import { updateXmlContent } from "./features/xml-slice";
import { useAppDispatch } from "./redux-store/hook";
import axios from "axios";
import { appConfig } from "./config/app-config";
import { useEffect } from "react";

function App() {
  // const [xmlContent, setXmlContent] = useState("");

  const user = useUserDetails();

  const dispatch = useAppDispatch();

  // console.log(user);
  const localURL = appConfig.localURL;

  const queuenam = sessionStorage.getItem("queuename");

  useEffect(() => {
    if (queuenam) {
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
            console.error(
              "Request made but no response received:",
              error.request
            );
          } else {
            console.error("Error during setup:", error.message);
          }
        }
      };
      fetchData();
    }
  }, [queuenam]);

  // const handleXMLContentChange = (value: string) => {
  //   dispatch(updateXmlContent(value));
  // };

  return (
    <div className="h-full overflow-auto rounded-2xl">
      <XmlEditor
      // onChange={handleXMLContentChange}
      />
    </div>
  );
}

export default App;
