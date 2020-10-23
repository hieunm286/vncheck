import axios from 'axios';
import {API_BASE_URL} from '../../common-library/common-const/enviroment';
import {PaginationProps, SortProps} from "../../common-library/common-types/common-type";
import {ParamsSerializer} from "../../common-library/helpers/common-function";
import {PurchaseOrderModel} from "./purchase-order.model";

export const API_URL = API_BASE_URL + '/purchase-order';
export const BASIC_UNIT_SEARCH = API_BASE_URL + '/basic-unit/search/all';

export const Create = (data: any) => {
  return axios.post(API_URL, data);
};

export const GetAll = (queryProps: any, sortList?: SortProps[], paginationProps?: PaginationProps) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
    // paramsSerializer: ParamsSerializer
  });
};

export const Count = (queryProps: any) => {
  return axios.get(`${API_URL}/count`);
};

export const Get = (code: string) => {
  return axios.get(`${API_URL}/${code}`);
};

export const Update = (data: any) => {
  const {name, status, quantity} = data;
  return axios.put(`${API_URL}/${data.code}`, {name, status, quantity});
};

export const Delete = (entity:PurchaseOrderModel) => {
  return axios.delete(`${API_URL}/${entity.code}`);
};

export const DeleteMany = (arrayCode: string[]) => {
  return axios.delete(API_URL, {
    data: {
      arrayCode: arrayCode,
    },
  });
};

export const searchBasicUnit = (data: any) => {
  return axios.get(`${BASIC_UNIT_SEARCH}?code=${data.code}&name=${data.name}`);
};
