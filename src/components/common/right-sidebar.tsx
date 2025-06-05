// import { spix } from "@/data/dummy-data";
// import { extractData_spix_ts } from "@/utils/custom-function";
import ItemListDisplay from "../custom/items-list-display";
import { useAppSelector } from "@/redux-store/hook";

// type FinalResultObject = {
//   [key: string]: Record<string, unknown> | undefined;
//   "List of errors"?: Record<string, unknown>;
//   "List of warnings"?: Record<string, unknown>;
// };

const RightSidebar = () => {
  // const extractedSpixData = extractData_spix_ts(spix.split("\n"));
  const { conversionLogError } = useAppSelector((state) => state.xmlErrors);

  const extConversionLog = conversionLogError
    .split("\n")
    .filter((line) => line.trim() !== "");

  // const extractedSpixData =
  //   typeof spix === "string" ? extractData_spix_ts(spix.split("\n")) : spix;

  // function isFinalResultObject(obj: any): obj is FinalResultObject {
  //   return (
  //     obj &&
  //     typeof obj === "object" &&
  //     ("List of errors" in obj || "List of warnings" in obj)
  //   );
  // }

  // const result = extractedSpixData?.result;
  // const errors = isFinalResultObject(result)
  //   ? result["List of errors"]
  //   : undefined;
  // const warnings = isFinalResultObject(result)
  //   ? result["List of warnings"]
  //   : undefined;

  return (
    <div>
      {/* <ItemListDisplay items={errors ?? {}} title="List of Errors" />
      <ItemListDisplay items={warnings ?? {}} title="List of Warnings" /> */}
      <ItemListDisplay
        items={extConversionLog ?? {}}
        title="List of Warnings"
      />
    </div>
  );
};

export default RightSidebar;
