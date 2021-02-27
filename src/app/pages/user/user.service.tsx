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
import {RoleArrayToObject, RoleObjectToArray} from "../../common-library/helpers/common-function";
import _ from "lodash";
import { CustomersModel } from '../customers/customers.model';


export const API_URL = API_BASE_URL + '/user';

export const BULK_API_URL = API_URL + '/bulk'

export const Create: CreateProps<any> = (data: any) => {
  const sendData = _.cloneDeep(data);
  sendData.scopes = RoleObjectToArray(sendData.scopes);
  return axios.post(API_URL, sendData);
};

export const GetAll: GetAllPropsServer<any> = ({
                                                 queryProps,
                                                 sortList,
                                                 paginationProps,
                                               }) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
  });
};

export const Count: CountProps<any> = (queryProps) => {
  return axios.get(`${API_URL}/get/count`, {
    params: {...queryProps},
  });
};

export const GetById = (id: string) => {
  return axios.get(`${API_URL}/${id}`).then(res => {
    if (_.isArray(res.data.scopes)) {
      let scopeArray = res.data.scopes;
      scopeArray = _.isEqual(scopeArray, res.data.addedScope.enable) ? [...scopeArray] : [...scopeArray, ...res.data.addedScope.enable];
      scopeArray = scopeArray.filter((s: string) => {
        return !res.data.addedScope.disable.some((d: string) => (s === d));
      });
      res.data.scopes = RoleArrayToObject(scopeArray);
    }
    return res;
  });
};


export const Get: GetProps<any> = (entity) => {
  return axios.get(`${API_URL}/${entity._id}`);
};

export const Update: UpdateProps<any> = (entity) => {
  const sendData = _.cloneDeep(entity);
  sendData.scopes = RoleObjectToArray(sendData.scopes);
  return axios.put(`${API_URL}/${entity._id}`, sendData);
};

export const Delete: DeleteProps<any> = (entity) => {
  //Lười sửa nên viết như này cho nhanh
  return axios.put(`${API_URL}/${entity._id}`, {...entity, status: '0'});
};

export const DeleteMany: DeleteManyProps<any> = (entities) => {
  return axios.delete(API_URL, {
    data: {arrayEntities: entities}
  });
};

