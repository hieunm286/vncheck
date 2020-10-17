import React, {createContext, useContext, useState, useCallback} from 'react';
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

    const initAgency = {
        // id: undefined,
        agency_id: '',
        name: '',
        status: 0,
        phone: '',
        tax_id: '',
        username: '',
        agency_type_id: '',
        shipping_address: '',
        address: '',
        country: '',
        town: '',
        city: '',
        district: '',
        state: '',
    };

    const value = {
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
        // openDeleteAgencyDialog: agencyUIEvents.openDeleteAgencyDialog,
        // openFetchAgencyDialog: agencyUIEvents.openFetchAgencyDialog,
        // openUpdateAgencyStatusDialog: agencyUIEvents.openUpdateAgencyStatusDialog,
    };

    return <AgencyUIContext.Provider value={value}> {children} </AgencyUIContext.Provider>;
}
