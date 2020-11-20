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
import AxiosResponse from "axios";
import LandLot from './land-lot';
import { entities } from './helpers/mock';

export const API_URL = API_BASE_URL + '/land-lot';

// export const API_FILE_URL = API_BASE_URL + '/file';

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
  return axios.get(`${API_URL}/count`);
};

export const Get: GetProps<LandLotModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (code: string) => {
  return axios.get(`${API_URL}/${code}`);
};
export const Update: UpdateProps<LandLotModel> = (entity: LandLotModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const DeleteMany: DeleteManyProps<LandLotModel> = (entities: LandLotModel[]) => {
  return axios.delete(`${API_URL}/bulk`, {
    data: { listLandLot: entities.map(entity => entity._id) },
  });
};

export const Delete: DeleteProps<LandLotModel> = (entity: LandLotModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};



export const uploadImage = (image: any) => {
  // console.log('run updload');
  // console.log(image);
  // let formData = new FormData();
  // formData.append('image', image);
  // return axios({
  //   method: 'POST',
  //   url: API_FILE_URL,
  //   data: formData,
  // });
  return new Promise((resolve, reject) => {
    // : AxiosResponse<LandLotModel[]> 
    const response = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: 'Server has not been implemented',
      config: {},
    }
    resolve(response);
  });
};
