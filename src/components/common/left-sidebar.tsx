import { spix } from "@/data/dummy-data";
import { extractData_spix_ts } from "@/utils/custom-function";

const LeftSidebar = () => {
  const extractedSpixData = extractData_spix_ts(spix.split("\n"));
  // console.log(extractedSpixData);

  return (
    <div>{/* <div>{Object.entries(extractedSpixData.result)}</div> */}</div>
  );
};

export default LeftSidebar;
