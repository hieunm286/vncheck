import axios from 'axios';
import { API_BASE_URL } from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllProps,
  GetProps,
  UpdateProps,
} from '../../common-library/common-types/common-type';
import { AgencyModel } from './agency.model';

export const API_URL = API_BASE_URL + '/agency';

export const Create: CreateProps<AgencyModel> = (data: AgencyModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllProps<AgencyModel> = ({ queryProps, sortList, paginationProps }) => {
  return axios.get(`${API_URL}`, {
    params: { ...queryProps, ...paginationProps, sortList },
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps = (queryProps: any) => {
  return axios.get(`${API_URL}/count`, {
    params: { ...queryProps.queryProps },
  });
};

export const Get: GetProps<AgencyModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const Update: UpdateProps<AgencyModel> = (entity: AgencyModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<AgencyModel> = (entity: AgencyModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<AgencyModel> = (entities: AgencyModel[]) => {
  return axios.delete(API_URL, {
    data: { arrayEntities: entities },
  });
};
