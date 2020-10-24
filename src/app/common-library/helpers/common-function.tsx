import {SortProps} from "../common-types/common-type";

export const CapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const ParamsSerializer = (params: { sortList: SortProps, [t: string]: any }): string => {
  console.log(111);
  const orderParams = Object.keys(params.sortList).reduce((pre, current, i) => {
    return {
      orderBy: pre.orderBy + (i == 0 ? '' : ',') + current,
      orderType: pre.orderType + (i == 0 ? '' : ',') + params.sortList[current]
    }
  }, {orderBy: '', orderType: ''});
  const res = Object.entries({
    ...params,
    sortList: undefined, ...orderParams
  }).map(([key, value]) => `${key}=${value}`).join('&');
  return res;
}