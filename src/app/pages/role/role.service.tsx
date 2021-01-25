import axios from 'axios';
import _ from 'lodash';
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
import {RoleArrayToObject, RoleObjectToArray} from "../../common-library/helpers/common-function";


export const API_URL = API_BASE_URL + '/role';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

export const Create: CreateProps<any> = (data: any) => {
  const sendData = _.cloneDeep(data);
  sendData.scopes = RoleObjectToArray(sendData.scopes);
  if (!sendData.status) {
    sendData.status = '0'
  }
  return axios.post(API_URL, sendData);
};

export const GetAll: GetAllPropsServer<any> = ({
                                                 queryProps,
                                                 sortList,
                                                 paginationProps,
                                               }) => {
  return axios.get(`${API_URL}`, {
    params: {...queryProps, ...paginationProps, sortList},
  }).then(t => {
    // console.log(t);
    return t;
  });
};

const GetCompareFunction = ({key, orderType}: { key: string, orderType: 1 | -1 }) => {
  return (a: any, b: any) => {
    const _a = key && key != '' ? a[key] : a;
    const _b = key && key != '' ? b[key] : b;
    if (_a < _b) {
      return -1 * orderType;
    }
    if (_a > _b) {
      return 1 * orderType;
    }
    return 0;
  }
}
export const StatusList = [{code: "1", name: "Hoạt động"}, {code: "0", name: "Không hoạt động"}];
export const GetStatusList = ({queryProps, paginationProps}: any): Promise<any> => {
  console.log(queryProps);
  return new Promise((resolve, reject) => {
    const totalData = StatusList.filter((val, index, arr) => {
      return Object.values(queryProps).some((query: any) => val.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
    // console.log(data);
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: paginationProps.page, limit: paginationProps.limit, total: totalData.length}
      },
      success: true
    })
  })
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

export const GetById = (_id: string) => {
  return axios.get(`${API_URL}/${_id}`).then(res => {
    if (res.data.scopes?.length > 0) {
      console.log(RoleArrayToObject(res.data.scopes))
      res.data.scopes = RoleArrayToObject(res.data.scopes)
      // res.data = {...res.data, ...RoleArrayToObject(res.data.scopes)};
    }
    console.log(res.data)
    return res;
  })
};
export const Update: UpdateProps<any> = (entity: any) => {
  const sendData = _.cloneDeep(entity);
  sendData.scopes = RoleObjectToArray(sendData.scopes);
  return axios.put(`${API_URL}/${entity._id}`, sendData)
};

export const Delete: DeleteProps<any> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: {listSpecies: entities},
  });
};

