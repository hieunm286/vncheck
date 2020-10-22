import {useCallback, useState} from "react";
import {isEqual, isFunction} from "lodash";
import {PaginationProps, SortProps} from "../common-types/common-type";

export const InitQueryParams = (initialFilter: PaginationProps) => {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase((prevQueryParams: any) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);
  return {
    queryParams,
    setQueryParamsBase,
    setQueryParams
  }
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
export const InitShow = () => {
  return useState({
    edit: false,
    delete: false,
    detail: false,
    deleteMany: false,
  })
}