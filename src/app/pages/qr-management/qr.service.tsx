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
import {QrModel} from './qr.model';

export const API_URL = API_BASE_URL + '/agency';

export const Create: CreateProps<QrModel> = (data: QrModel) => {
  return axios.post(API_URL, data);
};

// const convertAddress = (address: any) => {
//   let convertURL: string = `${API_URL}?`
//
//   Object.keys(address).forEach((key: string, index: number) => {
//     convertURL = convertURL + `address.${key}=${address[key]}`
//
//     if (index !== Object.keys(address).length - 1) {
//       convertURL = convertURL + '&'
//     }
//   })
//
//   return convertURL
// }
//
export const GetAll: GetAllPropsServer<QrModel> = ({queryProps, sortList, paginationProps}) => {
  // const convertQuery = { ...queryProps }
  // if (queryProps && queryProps.address) {
  //   delete convertQuery.address
  //   return axios.get(convertAddress(queryProps.address), {
  //     params: { ...convertQuery, ...paginationProps, sortList },
  //     paramsSerializer: ParamsSerializer
  // });
  // }
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Count: CountProps<any> = ({
                                         queryProps,
                                         sortList,
                                         paginationProps,
                                       }) => {
  return axios.get(`${API_URL}/count`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Get: GetProps<QrModel> = entity => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const GetById = (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};

export const Update: UpdateProps<QrModel> = (entity: QrModel) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<QrModel> = (entity: QrModel) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<QrModel> = (entities: QrModel[]) => {
  return axios.delete(`${API_URL}/bulk`, {
    data: {listAgencies: entities},
  });
};
