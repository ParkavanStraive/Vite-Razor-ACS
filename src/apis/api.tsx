import { axiosInstance } from "@/lib/axios";
import {
  getTokenPayloadTypes,
  TicketPayload,
  WorkRequestPayloadType,
} from "@/types/payload.types";
import {
  getTokenResponseType,
  TicketResponseType,
  WorkRequestResponseType,
} from "@/types/response.types";

export const getToken = async (
  data: getTokenPayloadTypes
): Promise<getTokenResponseType> => {
  const res = await axiosInstance.post(
    // `/acs_razor/api/webservices.php/gettoken`,
    `/xml/get_token`,
    data
  );
  return res.data;
};

export const getWorkRequest = async (
  data: WorkRequestPayloadType
): Promise<WorkRequestResponseType> => {
  const res = await axiosInstance.post(`/xml/get_workrequests`, data);

  return res.data;
};

export const getTicket = async (
  data: TicketPayload
): Promise<TicketResponseType> => {
  const res = await axiosInstance.post(`/xml/get_ticket`, data);
  return res.data;
};
