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
import { LandLotModel, LandLotSearchModel } from './land-lot.model';
import { purchaseOrderSlice, callTypes } from './land-lot.redux';

export const API_URL = API_BASE_URL + '/purchase-order';

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<LandLotModel> = (data: LandLotModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllProps<LandLotModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}`, {
    params: { ...queryProps, ...paginationProps, sortList },
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps<LandLotModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}/count`, {
    params: { ...queryProps, ...paginationProps, sortList },
  });
};

export const Get: GetProps<LandLotModel> = entity => {
  return axios.get(`${API_URL}/${entity.code}`);
};

export const GetById = (code: string) => {
  return axios.get(`${API_URL}/${code}`);
};
export const Update: UpdateProps<LandLotModel> = (entity: LandLotModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<LandLotModel> = (entity: LandLotModel) => {
  return axios.delete(`${API_URL}/${entity.code}`);
};

export const DeleteMany: DeleteManyProps<LandLotModel> = (entities: LandLotModel[]) => {
  return axios.delete(API_URL, {
    data: { arrayEntities: entities },
  });
};

export const uploadImage = (image: any) => {
  console.log('run updload');
  console.log(image);
  let formData = new FormData();
  formData.append('image', image);
  return axios({
    method: 'POST',
    url: API_FILE_URL,
    data: formData,
  });
};
