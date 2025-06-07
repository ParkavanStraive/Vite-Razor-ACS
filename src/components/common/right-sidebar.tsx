// import { spix } from "@/data/dummy-data";
import {
  extractData_parser,
  extractData_spix_ts,
} from "@/utils/custom-function";
import ItemListDisplay from "../custom/items-list-display";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import { getConversionLog, getLogFile } from "@/apis/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  setConversionLog,
  setParserLogError,
  setSpixLogError,
} from "@/features/error-slice";
import { toast } from "sonner";
import { AccordionSkeleton } from "../custom-ui/skeleton/accordian-skeleton";
import { useConversionLogFile, useGetLogFile } from "@/hooks/log-hooks";

type FinalResultObject = {
  [key: string]: Record<string, unknown> | undefined;
  "List of errors"?: Record<string, unknown>;
  "List of warnings"?: Record<string, unknown>;
};

const RightSidebar = () => {
  const { spixLogError, parserLogError, conversionLogError } = useAppSelector(
    (state) => state.xmlErrors
  );

  console.log("spi", spixLogError, parserLogError);

  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.ticket);
  const conversionLogPath = ticket?.job_info?.conversion_log_path;
  const xmlPath = ticket?.job_info?.xml_path;

  const work_request_id = sessionStorage.getItem("work_request_id");
  const ticketType = sessionStorage.getItem("ticket_type");

  const { mutate: logFileMutate, isPending: isLogFilePending } =
    useGetLogFile();

  useEffect(() => {
    if (xmlPath && work_request_id) {
      logFileMutate(
        {
          xml: xmlPath,
          logType: ticketType,
        },
        {
          onSuccess: (data) => {
            // console.log(data);
            if (ticketType === "spix") {
              dispatch(setSpixLogError(data));
            } else {
              dispatch(setParserLogError(data));
            }
          },
        }
      );
    }
  }, [xmlPath, work_request_id, dispatch]);

  const {
    data: conversionLogData,
    // isLoading: logIsLoading,
    isSuccess: logIsSuccess,
    error: logError,
    isError: logIsError,
  } = useConversionLogFile({ conversionLogPath, ticketType, work_request_id });

  useEffect(() => {
    if (logIsSuccess && conversionLogData) {
      dispatch(setConversionLog(conversionLogData));
    }
  }, [logIsSuccess, conversionLogData]);

  useEffect(() => {
    if (logIsError && logError) {
      toast("Error fetching conversion log:", {
        description: (logError as Error).message,
      });
    }
  }, [logIsError, logError]);

  const extParserLogError = extractData_parser(parserLogError.split("\n"));

  const extConversionLog = conversionLogError
    .split("\n")
    .filter((line) => line.trim() !== "");

  const extractedSpixData =
    typeof spixLogError === "string"
      ? extractData_spix_ts(spixLogError.split("\n"))
      : spixLogError;

  function isFinalResultObject(obj: any): obj is FinalResultObject {
    return (
      obj &&
      typeof obj === "object" &&
      ("List of errors" in obj || "List of warnings" in obj)
    );
  }

  const result = extractedSpixData?.result;
  const errors = isFinalResultObject(result)
    ? result["List of errors"]
    : undefined;
  const warnings = isFinalResultObject(result)
    ? result["List of warnings"]
    : undefined;

  return (
    <div>
      {ticketType === "spix" && (
        <>
          {isLogFilePending ? (
            <AccordionSkeleton />
          ) : (
            <>
              <ItemListDisplay items={errors ?? {}} title="List of Errors" />
              <ItemListDisplay
                items={warnings ?? {}}
                title="List of Warnings"
              />
            </>
          )}
        </>
      )}
      {ticketType === "xml_conversion" && (
        <ItemListDisplay
          items={extConversionLog ?? {}}
          title="Xml Conversion Errors"
        />
      )}
      {ticketType === "parser" && (
        <ItemListDisplay
          items={extParserLogError ?? {}}
          title="Parser Errors"
        />
      )}
    </div>
  );
};

export default RightSidebar;
