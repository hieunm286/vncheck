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


export const API_URL = API_BASE_URL + '/role';

export const BULK_API_URL = API_URL + '/bulk'

export const API_FILE_URL = API_BASE_URL + '/file';

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
    // console.log(t);
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
  return axios.get(`${API_URL}/${_id}`);
};
export const Update: UpdateProps<any> = (entity: any) => {
  return axios.put(`${API_URL}/${entity._id}`, entity);
};

export const Delete: DeleteProps<any> = (entity: any) => {
  return axios.delete(`${API_URL}/${entity._id}`);
};

export const DeleteMany: DeleteManyProps<any> = (entities: any[]) => {
  return axios.delete(BULK_API_URL, {
    data: {listSpecies: entities},
  });
};

const AtoZ = Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0)).fill(null).map((x, i) => {
  return String.fromCharCode('A'.charCodeAt(0) + i);
})
export const GetIds = ({queryProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = AtoZ.filter((val, index, arr) => {
      return val.indexOf(queryProps._id.toUpperCase()) > -1;
    })
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: 1, limit: 100, total: data.length}
      },
      success: true
    })
  })
}
const From1to100 = Array(99).fill(null).map((x, i) => {
  return (i + 1 + 1000).toString().substr(2);
})
export const GetSubLots = ({queryProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(queryProps);
    const data = From1to100.filter((val, index, arr) => {
      return val.indexOf(queryProps.subLot.toUpperCase()) > -1;
    })
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: 1, limit: 100, total: data.length}
      },
      success: true
    })
  })
}

export const GetNames = ({queryProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(queryProps);
    const data = From1to100.filter((val, index, arr) => {
      return val.indexOf(queryProps.name.toUpperCase()) > -1;
    })
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: 1, limit: 100, total: data.length}
      },
      success: true
    })
  })
}

export const GetManagementOrganization = ({queryProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(queryProps);
    const data = From1to100.filter((val, index, arr) => {
      return val.indexOf(queryProps.managementOrganization.toUpperCase()) > -1;
    })
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: 1, limit: 100, total: data.length}
      },
      success: true
    })
  })
}

export const GetStatus = ({queryProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(queryProps);
    const data = From1to100.filter((val, index, arr) => {
      return val.indexOf(queryProps.status.toUpperCase()) > -1;
    })
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: 1, limit: 100, total: data.length}
      },
      success: true
    })
  })
}
