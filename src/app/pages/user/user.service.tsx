import axios from 'axios';
import {API_BASE_URL} from '../../common-library/common-consts/enviroment';
import {CreateProps, GetAllPropsServer,} from '../../common-library/common-types/common-type';


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
    params: {...queryProps, ...paginationProps, sortList},
  }).then(t => {
    console.log(t);
    return t;
  });
};

// const GetCompareFunction = ({key, orderType}: { key: string, orderType: 1 | -1 }) => {
//   return (a: any, b: any) => {
//     const _a = key && key != '' ? a[key] : a;
//     const _b = key && key != '' ? b[key] : b;
//     if (_a < _b) {
//       return -1 * orderType;
//     }
//     if (_a > _b) {
//       return 1 * orderType;
//     }
//     return 0;
//   }
// }
// export const RoleList = ['ROLE.MANAGER', 'ROLE.ADMIN', 'ROLE.FARMER', 'ROLE.TECHNICIAN']
//
// export const GetRole = ({queryProps, paginationProps}: any, convertFn?: (value: string) => string): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     const _roleList = convertFn ? RoleList.map(convertFn) : RoleList;
//     const totalData = _roleList.filter((val, index, arr) => {
//       return val.toLowerCase().indexOf(queryProps.role.toLowerCase()) > -1;
//     })
//     const data = totalData.sort(GetCompareFunction({
//       key: paginationProps.sortBy,
//       orderType: paginationProps.sortType === 'asc' ? 1 : -1
//     })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
//
//     resolve({
//       code: 200,
//       data: {
//         data: data,
//         paging: {page: paginationProps.page, limit: paginationProps.limit, total: totalData.length}
//       },
//       success: true
//     })
//   })
// }

