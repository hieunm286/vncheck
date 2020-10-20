import {useCallback, useState} from "react";
import {isEqual, isFunction} from "lodash";
import {QueryParamsProps} from "./common-type";

export const InitQueryParams = (initialFilter: QueryParamsProps) => {
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

export const AddSearchQuery = ({pageNumber, pageSize, sortField, sortOrder}: QueryParamsProps): string => {
  return `page=${pageNumber}&limit=${pageSize}&sortBy=${sortField}&orderBy=${sortOrder}`;
}