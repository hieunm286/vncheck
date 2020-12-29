import axios from 'axios';
import {API_BASE_URL} from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllPropsServer,
  GetProps,
  UpdateProps,
} from '../../common-library/common-types/common-type';

export const API_URL = API_BASE_URL + '/product-plan';

export const API_USER = API_BASE_URL + '/user';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<any> = (data: any) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllPropsServer<any> = ({
                                                 queryProps,
                                                 sortList,
                                                 paginationProps,
                                               }) => {
  console.log(111);
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps},
    // paramsSerializer: ParamsSerializer
  });
};

export const Approve = (entity: any, data: any) => {
  return axios.put(`${API_URL}/${entity._id}/confirm`, data);
}

export const UpdateProcess = (entity: any, data: any) => {
  return axios.put(`${API_URL}/${entity._id}/update-process`, data)
}

export const GetHistory = (entity: any) => {
  return axios.get(`${API_URL}/${entity._id}/history`);
}

export const Count: CountProps<any> = ({
                                         queryProps,
                                         sortList,
                                         paginationProps,
                                       }) => {
  return axios.get(`${API_URL}/count`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Get: GetProps<any> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetUser = () => {
  return axios.get(`${API_USER}`);
}

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<any> = (entity: any) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: {listSpecies: entities},
  });
};