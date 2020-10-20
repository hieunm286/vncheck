import React, {createContext, useCallback, useContext, useState} from 'react';
import {isEqual, isFunction} from 'lodash';
import {initialFilter} from './agency-ui-helpers';

const AgencyUIContext = createContext<any>(null);

export function useAgencyUIContext() {
  return useContext(AgencyUIContext);
}

export const AgencyUIConsumer = AgencyUIContext.Consumer;

export function AgencyUIProvider({agencyUIEvents, children}: any) {
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
  
  const useAutofill = false;
  
  let initAgency = null;
  
  if (useAutofill) {
    initAgency = {
      // id: undefined,
      agency_id: '',
      name: 'aaa',
      status: 0,
      phone: '0214367589',
      tax_id: 'aaa',
      username: 'aaa',
      agency_type_id: 'aaa',
      shipping_address: 'aaa',
      address: '',
      country: '',
      town: '',
      city: '',
      district: '',
      state: '',
      email: 'aaa@gmail.com',
      owner_phone: '0123456789',
      agency_image: '',
    };
  } else {
    initAgency = {
      // id: undefined,
      agency_id: '',
      name: '',
      status: 0,
      phone: '',
      tax_id: '',
      owner_name: '',
      agency_type_id: '',
      shipping_address: '',
      agency_addresses: {
        address: '',
        town: '',
        city: '',
        district: '',
        state: '',
      },
      country: '',
      address: '',
      email: '',
      owner_phone: '',
      agency_image: '',
    };
  }
  
  const value: any = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAgency,
    newAgencyButtonClick: agencyUIEvents.newAgencyButtonClick,
    openEditAgencyDialog: agencyUIEvents.openEditAgencyDialog,
    openDeleteAgencyDialog: agencyUIEvents.openDeleteAgencyDialog,
    openDetailAgencyDialog: agencyUIEvents.openDetailAgencyDialog,
    openDeleteManyAgencyDialog: agencyUIEvents.openDeleteManyAgencyDialog,
  };
  
  return <AgencyUIContext.Provider value={value}> {children} </AgencyUIContext.Provider>;
}
