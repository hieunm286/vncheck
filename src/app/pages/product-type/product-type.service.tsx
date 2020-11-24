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
import { ProductTypeModel } from './product-type.model';

export const API_URL = API_BASE_URL + '/species';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<ProductTypeModel> = (data: ProductTypeModel) => {
  return axios.post(API_URL, data);
};

export const GetAll: GetAllProps<ProductTypeModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}`, {
    params: { ...queryProps, ...paginationProps, sortList },
    // paramsSerializer: ParamsSerializer
  });
};

export const Count: CountProps<ProductTypeModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return axios.get(`${API_URL}/count`, {
    params: { ...queryProps, ...paginationProps, sortList },
  });
};

export const Get: GetProps<ProductTypeModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<ProductTypeModel> = (entity: ProductTypeModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: ProductTypeModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<ProductTypeModel> = (entities: ProductTypeModel[]) => {
  return axios.delete(BULK_API_URL, {
    data: { listSpecies: entities },
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
