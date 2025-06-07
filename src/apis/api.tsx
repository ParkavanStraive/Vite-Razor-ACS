import { axiosInstance } from "@/lib/axios";
import {
  getTokenPayloadTypes,
  TicketPayload,
  WorkRequestPayloadType,
} from "@/types/payload.types";
import {
  getTokenResponseType,
  ParserResponseType,
  TicketResponseType,
  WorkRequestResponseType,
} from "@/types/response.types";

export const getXml = async (fileName: string) => {
  const res = await axiosInstance.get(`/xml/getxml?fileName=${fileName}`);
  return res.data;
};

export const getConversionLog = async (fileName: string) => {
  const res = await axiosInstance.get(`/xml/getxml?fileName=${fileName}`);
  return res.data;
};

export const getToken = async (
  data: getTokenPayloadTypes
): Promise<getTokenResponseType> => {
  const res = await axiosInstance.post(`/xml/get_token`, data);
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

export const saveTicket = async (data: any) => {
  const res = await axiosInstance.post(`/xml/save_xml`, data);
  return res.data;
};

export const updateTicket = async (data: any) => {
  const res = await axiosInstance.post(`/xml/update_ticket`, data);
  return res.data;
};

export const validateParser = async (
  data: any
): Promise<ParserResponseType> => {
  const res = await axiosInstance.post(`/xml/validate/parser`, data);
  return res.data;
};

export const validateSpix = async (data: any) => {
  const res = await axiosInstance.post(`/xml/validate/spix`, data);
  return res.data;
};

export const getLogFile = async (data: any) => {
  const res = await axiosInstance.post(`/xml/getLogFile`, data);
  return res.data;
};
