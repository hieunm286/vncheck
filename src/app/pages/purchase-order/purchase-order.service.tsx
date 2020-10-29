import axios from 'axios';
import { API_BASE_URL } from '../../common-library/common-consts/enviroment';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllProps,
  GetProps,
  SearchModel,
  UpdateProps,
} from '../../common-library/common-types/common-type';
import { PurchaseOrderModel, PurchaseOrderSearchModel } from './purchase-order.model';

export const API_URL = API_BASE_URL + '/purchase-order';

export const Create: CreateProps<PurchaseOrderModel> = (data: PurchaseOrderModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllProps<PurchaseOrderModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}`, {
    params: { ...queryProps, ...paginationProps, sortList },
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps<PurchaseOrderModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}/count`, {
    params: { ...queryProps, ...paginationProps, sortList },
  });
};

export const Get: GetProps<PurchaseOrderModel> = entity => {
  return axios.get(`${API_URL}/${entity.code}`);
};

export const Update: UpdateProps<PurchaseOrderModel> = (entity: PurchaseOrderModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<PurchaseOrderModel> = (entity: PurchaseOrderModel) => {
  return axios.delete(`${API_URL}/${entity.code}`);
};

export const DeleteMany: DeleteManyProps<PurchaseOrderModel> = (entities: PurchaseOrderModel[]) => {
  return axios.delete(API_URL, {
    data: { arrayEntities: entities },
  });
};
