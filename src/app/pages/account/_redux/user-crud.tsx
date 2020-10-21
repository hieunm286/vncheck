import axios from 'axios';
import { API_BASE_URL } from '../../../common-library/common-const/enviroment';

export const USERS_URL = API_BASE_URL + '/users';
export const USER_URL = API_BASE_URL + '/user';
export const USER_URL_SEARCH = API_BASE_URL + '/users';

export function createUser(user: {
  publicKey: string;
  encryptedPrivateKey: string;
  password: string;
}) {
  console.log(user);
  return axios.post(USERS_URL, user);
}

export function getAllUsers(queryParams: {
  filter: { field: string; searchText: any };
  pageNumber: any;
  pageSize: any;
  sortField: any;
  sortOrder: any;
}) {
  // const sign = signTransaction('');
  // console.log(sign);
  if (queryParams.filter && queryParams.filter.field) {
    return axios.get(
      `${USER_URL_SEARCH}?page=${queryParams.pageNumber}&limit=${queryParams.pageSize}&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      &field=${queryParams.filter.field}
      &query=${queryParams.filter.searchText}`,
    );
  } else if (
    queryParams.filter &&
    (!queryParams.filter.field || queryParams.filter.field === 'all')
  ) {
    return axios.get(
      `${USER_URL_SEARCH}?page=${queryParams.pageNumber}&limit=${queryParams.pageSize}&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      &field=all
      &query=${queryParams.filter.searchText}`,
    );
  } else {
    return axios.get(
      `${USERS_URL}?page=${queryParams.pageNumber}&limit=${queryParams.pageSize}&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      `,
    );
  }
}

export function getUserById(id: string) {
  return axios.get(`${USERS_URL}/${id}`);
}

export function updateUser(user: any) {
  // console.log(`${USERS_URL}/${user.username}`);
  return axios.put(`${USER_URL}/${user.username}`, user);
}

export function deleteUser(userId: any) {
  return axios.delete(`${USER_URL}/${userId}`);
}
