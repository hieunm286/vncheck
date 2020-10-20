import React, {createContext, useCallback, useContext, useState} from 'react';
import {isEqual, isFunction} from 'lodash';
import {initialFilter} from './agency-type-ui-helpers';
import { AgencyType }  from '../../models/agency-type.model';

const AgencyTypeUIContext = createContext<any>(null);

export function useAgencyTypeUIContext() {
  return useContext(AgencyTypeUIContext);
}

export const AgencyTypeUIConsumer = AgencyTypeUIContext.Consumer;

export function AgencyTypeUIProvider({agencyTypeUIEvents, children}: any) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      
      return nextQueryParams;
    });
  }, []);
  
  const initAgencyType : AgencyType = {
    name: '',
    code: '',
    status: true,
  };
  
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAgencyType,
    newAgencyTypeButtonClick: agencyTypeUIEvents.newAgencyTypeButtonClick,
    openEditAgencyTypeDialog: agencyTypeUIEvents.openEditAgencyTypeDialog,
    openDeleteAgencyTypeDialog: agencyTypeUIEvents.openDeleteAgencyTypeDialog,
    openDetailAgencyTypeDialog: agencyTypeUIEvents.openDetailAgencyTypeDialog,
    // openDeleteAgencyTypeDialog: agencyUIEvents.openDeleteAgencyTypeDialog,
    // openFetchAgencyTypeDialog: agencyUIEvents.openFetchAgencyTypeDialog,
    // openUpdateAgencyTypeStatusDialog: agencyUIEvents.openUpdateAgencyTypeStatusDialog,
  };
  
  return <AgencyTypeUIContext.Provider value={value}> {children} </AgencyTypeUIContext.Provider>;
}
