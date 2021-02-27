import { AxiosInstance } from "axios";
import { axiosSlice } from "./axios-slice";

const { actions } = axiosSlice;

export const getAxiosInstance = (instanceName: string) => (
  dispatch: (arg0: {payload: any}) => void,
) => {
  dispatch(actions.getAxiosInstance(instanceName));
}

export const addAxiosInstance = (instanceName: string) => (
  dispatch: (arg0: {payload: any}) => void,
) => {
  dispatch(actions.addAxiosInstance(instanceName));
}