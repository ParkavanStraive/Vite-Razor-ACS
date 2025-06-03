import { axiosInstance } from "@/lib/axios";
import {
  getTokenPayloadTypes,
  WorkRequestPayloadType,
} from "@/types/payload.types";
import {
  getTokenResponseType,
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
