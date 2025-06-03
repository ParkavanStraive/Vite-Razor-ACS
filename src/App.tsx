import "./App.css";
import XmlEditor from "./components/code-editor-area/xml-editor";

import { useUserDetails } from "./auth/straive-auth";

function App() {
  // const [xmlContent, setXmlContent] = useState("");

  const user = useUserDetails();

  // console.log(user);

  // useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     // const response = await axios.get(`${baseUrl}/xml?jobid=${jobId}`);
  //     const response = await axios.get(
  //       `${localURL}/xml/getxml?fileName=sample.xml`
  //     );

  //     dispatch(updateXmlContent(response.data));
  //     // setXmlContent(response.data);
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.error(
  //         "Server responded with an error:",
  //         error.response.status,
  //         error.response.data
  //       );
  //     } else if (error.request) {
  //       console.error("Request made but no response received:", error.request);
  //     } else {
  //       console.error("Error during setup:", error.message);
  //     }
  //   }
  // };
  //   fetchData();
  // }, []);

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
