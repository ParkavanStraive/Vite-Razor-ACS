import { getXml } from "@/apis/api";
import { ITicketType } from "@/features/ticket-slice";
import { useQuery } from "@tanstack/react-query";

export const useGetXml = (
  xmlPath: string | undefined,
  ticket: ITicketType,
  work_request_id: string
) => {
  const isEnabled = !!(ticket?.job_info && work_request_id && xmlPath);

  return useQuery({
    queryKey: ["getXml", xmlPath],
    queryFn: () => getXml(xmlPath!),
    enabled: isEnabled,
  });
};
