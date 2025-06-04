import { spix } from "@/data/dummy-data";
import { extractData_spix_ts } from "@/utils/custom-function";
import ItemListDisplay from "../custom/items-list-display";

type FinalResultObject = {
  [key: string]: Record<string, unknown> | undefined;
  "List of errors"?: Record<string, unknown>;
  "List of warnings"?: Record<string, unknown>;
};

const RightSidebar = () => {
  // const extractedSpixData = extractData_spix_ts(spix.split("\n"));
  // console.log(extractedSpixData);

  const extractedSpixData =
    typeof spix === "string" ? extractData_spix_ts(spix.split("\n")) : spix;

  function isFinalResultObject(obj: any): obj is FinalResultObject {
    return (
      obj &&
      typeof obj === "object" &&
      ("List of errors" in obj || "List of warnings" in obj)
    );
  }

  // Check if result and the lists exist to prevent errors
  const result = extractedSpixData?.result;
  const errors = isFinalResultObject(result)
    ? result["List of errors"]
    : undefined;
  const warnings = isFinalResultObject(result)
    ? result["List of warnings"]
    : undefined;

  return (
    <div>
      <ItemListDisplay items={errors ?? {}} title="List of Errors" />

      <ItemListDisplay items={warnings ?? {}} title="List of Warnings" />
      {/* Fallback if data is not in the expected format
      {!errors && !warnings && extractedSpixData?.result && (
        <div>
          <p>
            No errors or warnings lists found, but other data is present.
            Displaying raw 'result' keys:
          </p>
          {Object.entries(extractedSpixData.result).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </div>
          ))}
        </div>
      )}
      {!extractedSpixData?.result && (
        <p>Loading data or data is not available in the expected format.</p>
      )} */}
    </div>
  );
};

export default RightSidebar;
