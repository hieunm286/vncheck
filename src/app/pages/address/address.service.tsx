import STATE_LIST from './state.json';
import CITY_LIST from './city.json';
import DISTRICT_LIST from './district.json';

const StateList = Object.values(STATE_LIST);
const CityList = Object.values(CITY_LIST);
const DistrictList = Object.values(DISTRICT_LIST);
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

export const GetState = ({queryProps, paginationProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const totalData = StateList.filter((val, index, arr) => {
      return val.name_with_type.toLowerCase().indexOf(queryProps.name_with_type.toLowerCase()) > -1;
    })
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
    
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
export const GetCity = ({queryProps, paginationProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let totalData = CityList.filter((val, index, arr) => {
      return val.name_with_type.toLowerCase().indexOf(queryProps.name_with_type.toLowerCase()) > -1;
    })
    queryProps.parent_code && (totalData = totalData.filter((val, index, arr) => {
      return val.parent_code === queryProps.parent_code;
    }));
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
    
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

export const GetDistrict = ({queryProps, paginationProps}: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let totalData = DistrictList.filter((val, index, arr) => {
      return val.name_with_type.toLowerCase().indexOf(queryProps.name_with_type.toLowerCase()) > -1;
    })
    queryProps.parent_code && (totalData = totalData.filter((val, index, arr) => {
      return val.parent_code === queryProps.parent_code;
    }));
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
    
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
