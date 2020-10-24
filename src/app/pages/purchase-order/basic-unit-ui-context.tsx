import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import {DefaultPagination} from "../../common-library/common-const/const";

const BasicUnitUIContext = createContext<any>(null);

export function useBasicUnitUIContext() {
  return useContext(BasicUnitUIContext);
}

export const BasicUnitUIConsumer = BasicUnitUIContext.Consumer;

export function BasicUnitUIProvider({ basicUnitUIEvents, children }: any) {
  const [queryParams, setQueryParamsBase] = useState(DefaultPagination);
  const [ids, setIds] = useState([]);
  // const setQueryParams = useCallback(nextQueryParams => {
  //   setQueryParamsBase(prevQueryParams => {
  //     if (isFunction(nextQueryParams)) {
  //       nextQueryParams = nextQueryParams(prevQueryParams);
  //     }
  //
  //     if (isEqual(prevQueryParams, nextQueryParams)) {
  //       return prevQueryParams;
  //     }
  //
  //     return nextQueryParams;
  //   });
  // }, []);

  const useAutofill = false;

  let initBasicUnit = null;

  if (useAutofill) {
    initBasicUnit = {};
  } else {
    initBasicUnit = {};
  }

  const value: any = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    // setQueryParams,
    initBasicUnit,
    // newBasicUnitButtonClick: basicUnitUIEvents.newBasicUnitButtonClick,
    // openEditBasicUnitDialog: basicUnitUIEvents.openEditBasicUnitDialog,
    // openDeleteBasicUnitDialog: basicUnitUIEvents.openDeleteBasicUnitDialog,
    // openDetailBasicUnitDialog: basicUnitUIEvents.openDetailBasicUnitDialog,
    // openDeleteManyBasicUnitDialog: basicUnitUIEvents.openDeleteManyBasicUnitDialog,
  };

  return <BasicUnitUIContext.Provider value={value}> {children} </BasicUnitUIContext.Provider>;
}
