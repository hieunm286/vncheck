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
import { LandLotModel, LandLotSearchModel } from './land-lot.model';
import { purchaseOrderSlice, callTypes } from './land-lot.redux';
import AxiosResponse from "axios";
import LandLot from './land-lot';
import { entities } from './helpers/mock';

// export const API_URL = API_BASE_URL + '/land-lot';

// export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<LandLotModel> = (data: LandLotModel) => {
  // return axios.post(API_URL, data);
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

export const GetAll: GetAllPropsServer<LandLotModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  // return axios.get(`${API_URL}`, {
  //   params: { ...queryProps, ...paginationProps, sortList },
  //   // paramsSerializer: ParamsSerializer
  // });
  // const response = new AxiosResponse<LandLotModel[]>;
  // return response;
  return new Promise((resolve, reject) => {
    // : AxiosResponse<LandLotModel[]> 
    const page = (paginationProps && paginationProps.page) ? paginationProps.page : 1;
    const limit = (paginationProps && paginationProps.limit) ? paginationProps.limit : 5;
    const data = entities.slice(page * limit - limit, page * limit);

    const response = {
      data: {
        data: data,
        paging: {
          page: page,
          limit: limit,
          total: entities.length,
        }
      } as any,
      status: 200,
      statusText: 'OK',
      headers: 'Header oc cho',
      config: {},
    }
    resolve(response);
  });
};

export const Count: CountProps<LandLotModel> = ({
  queryProps,
  sortList,
  paginationProps,
}) => {
  return new Promise((resolve, reject) => {
    // : AxiosResponse<LandLotModel[]> 
    const page = (paginationProps && paginationProps.page) ? paginationProps.page : 1;
    const limit = (paginationProps && paginationProps.limit) ? paginationProps.limit : 5;
    const response = {
      data: {
        data: entities.length,
        paging: {
          page: page,
          limit: limit,
          total: entities.length,
        }
      },
      status: 200,
      statusText: 'OK',
      headers: 'Header oc cho',
      config: {},
    }
    resolve(response);
  });
};

export const Get: GetProps<LandLotModel> = entity => {
  // return axios.get(`${API_URL}/${entity.code}`);
  const result = entities.filter(_entity => {
    return _entity._id === entity._id;
  });
  return new Promise((resolve, reject) => {
    // : AxiosResponse<LandLotModel[]> 
    const response = {
      data: result[0],
      status: 200,
      statusText: 'OK',
      headers: 'Header oc cho',
      config: {},
    }
    resolve(response);
  });
};

export const GetById = (code: string) => {
  // return axios.get(`${API_URL}/${code}`);
  const result = entities.filter(_entity => {
    return _entity._id === code;
  });
  return new Promise((resolve, reject) => {
    // : AxiosResponse<LandLotModel[]> 
    const response = {
      data: result[0],
      status: 200,
      statusText: 'OK',
      headers: 'Header oc cho',
      config: {},
    }
    resolve(response);
  });
};
export const Update: UpdateProps<LandLotModel> = (entity: LandLotModel) => {
  // return axios.put(`${API_URL}/${entity._id}`, entity);
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

export const Delete: DeleteProps<LandLotModel> = (entity: LandLotModel) => {
  // return axios.delete(`${API_URL}/${entity.code}`);
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

export const DeleteMany: DeleteManyProps<LandLotModel> = (entities: LandLotModel[]) => {
  // return axios.delete(API_URL, {
  //   data: { arrayEntities: entities },
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
