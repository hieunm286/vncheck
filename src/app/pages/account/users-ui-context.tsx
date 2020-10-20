import React, {createContext, useCallback, useContext, useState} from 'react';
import {isEqual, isFunction} from 'lodash';
import {initialFilter} from './users-ui-helpers';

const UsersUIContext = createContext<any>(null);

export function useUsersUIContext() {
  return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({usersUIEvents, children}: any) {
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
  
  const initUser = {
    // id: undefined,
    is_locked: 0,
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    issuer_signature: 'User',
  };
  
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initUser,
    newUserButtonClick: usersUIEvents.newUserButtonClick,
    openEditUserDialog: usersUIEvents.openEditUserDialog,
    openDeleteUserDialog: usersUIEvents.openDeleteUserDialog,
    // openDeleteUsersDialog: usersUIEvents.openDeleteUsersDialog,
    // openFetchUsersDialog: usersUIEvents.openFetchUsersDialog,
    // openUpdateUsersStatusDialog: usersUIEvents.openUpdateUsersStatusDialog,
  };
  
  return <UsersUIContext.Provider value={value}> {children} </UsersUIContext.Provider>;
}
