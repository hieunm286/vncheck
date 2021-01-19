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
import {UserModel} from "./user.model";


export const API_URL = API_BASE_URL + '/user';

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
    params: {...queryProps, ...paginationProps, sortList, t: ['1', '3', '4']},
  });
};

export const Count: CountProps<UserModel> = (queryProps) => {
  return axios.get(`${API_URL}/get/count`, {
    params: {...queryProps},
  });
};

export const GetById = (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};


export const Get: GetProps<UserModel> = (entity) => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const Update: UpdateProps<UserModel> = (entity) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<UserModel> = (entity) => {
  //Lười sửa nên viết như này cho nhanh
  return axios.put(`${API_URL}/${entity._id}`, {...entity, status: '0'});
};

export const DeleteMany: DeleteManyProps<UserModel> = (entities) => {
  return axios.delete(API_URL, {
    data: {arrayEntities: entities}
  });
};

