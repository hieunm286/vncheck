import axios from 'axios';
import { API_BASE_URL } from '../../../common-library/common-consts/enviroment';

export const USERS_URL = API_BASE_URL + '/user';
export const USER_URL = API_BASE_URL + '/user';
export const USER_URL_SEARCH = API_BASE_URL + '/user';

export function createUser(user: {
  publicKey: string;
  encryptedPrivateKey: string;
  password: string;
}) {
  console.log(user);
  return axios.post(USERS_URL, user);
}

export function getAllUsers(queryParams?: {
  filter: { field: string; searchText: any };
  page: any;
  limit: any;
  sortBy: any;
  sortType: any;
}) {
  // const sign = signTransaction('');
  // console.log(sign);
  if (typeof queryParams === 'undefined') return axios.get(USERS_URL);

  if (queryParams.filter && queryParams.filter.field) {
    return axios.get(
      `${USER_URL_SEARCH}?page=${queryParams.page}&limit=${queryParams.limit}&sortBy=${queryParams.sortBy}&sortType=${queryParams.sortType}
      &field=${queryParams.filter.field}
      &query=${queryParams.filter.searchText}`,
    );
  } else if (
    queryParams.filter &&
    (!queryParams.filter.field || queryParams.filter.field === 'all')
  ) {
    return axios.get(
      `${USER_URL_SEARCH}?page=${queryParams.page}&limit=${queryParams.limit}&sortBy=${queryParams.sortBy}&sortType=${queryParams.sortType}
      &field=all
      &query=${queryParams.filter.searchText}`,
    );
  } else {
    return axios.get(
      `${USERS_URL}?page=${queryParams.page}&limit=${queryParams.limit}&sortBy=${queryParams.sortBy}&sortType=${queryParams.sortType}
      `,
    );
  }
}

export const GetAll = ({
  queryProps,
  sortList,
  paginationProps,
}: any) => {
  console.log(111);
  return axios.get(`${USERS_URL}`, {
    params: { ...queryProps, ...paginationProps },
    // paramsSerializer: ParamsSerializer
  });
};
export function getUserById(id: string) {
  return axios.get(`${USERS_URL}/${id}`);
}

export function updateUser(user: any) {
  // console.log(`${USERS_URL}/${user.username}`);
  return axios.put(`${USER_URL}/${user._id}`, user);
}

export function deleteUser(userId: any) {
  return axios.delete(`${USER_URL}/${userId}`);
}
