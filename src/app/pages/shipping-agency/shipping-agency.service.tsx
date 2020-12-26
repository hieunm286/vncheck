import axios from 'axios';
import { API_BASE_URL } from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  SearchModel,
  UpdateProps,
} from '../../common-library/common-types/common-type';

export const API_URL = API_BASE_URL + '/shipping-agency';

export const BULK_API_URL = API_URL + '/bulk'

export const Create: CreateProps<any> = (data: any) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllPropsServer<any> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}`, {
    params: { ...queryProps, ...paginationProps, sortList },
  });
};

export const Count: CountProps<any> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}/count`, {
    params: { ...queryProps, ...paginationProps, sortList },
  });
};

export const Get: GetProps<any> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`).then((t) => {
    console.log(t.data);
    return t;
  });
};
export const Update: UpdateProps<any> = (entity: any) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: { listShippingAgencies: entities },
  });
};
