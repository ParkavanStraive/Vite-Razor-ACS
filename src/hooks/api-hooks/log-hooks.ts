import { getConversionLog, getLogFile } from "@/apis/api";
import { ITicketType } from "@/features/ticket-slice";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ConversionLogType {
  conversionLogPath: string;
  work_request_id: string | null;
  ticketType: string | null;
}

export const useConversionLogFile = ({
  conversionLogPath,
  ticketType,
  work_request_id,
}: ConversionLogType) => {
  return useQuery({
    queryKey: ["getConversionLog", conversionLogPath],
    queryFn: () => {
      if (!conversionLogPath) {
        return Promise.reject(new Error("conversionLogPath is not defined"));
      }
      return getConversionLog(conversionLogPath);
    },
    enabled: !!(
      work_request_id &&
      conversionLogPath &&
      ticketType === "xml_conversion"
    ),
  });
};

export const useGetLogFile = () => {
  return useMutation({
    mutationFn: getLogFile,
    mutationKey: ["getLogFile"],
  });
};
