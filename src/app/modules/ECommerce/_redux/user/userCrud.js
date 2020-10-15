import axios from 'axios';
import { API_BASE_URL } from '../../../../Const';

export const USER_URL = API_BASE_URL + '/user';
export const USER_URL_SEARCH = USER_URL + '/all/search';

export function createUser(user) {
  console.log(user);
  return axios.post(USER_URL, user);
}

export function getAllUsers(queryParams) {
  return axios.get(
    `${USER_URL}?page=${queryParams.pageNumber}&limit=${queryParams.pageSize}&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}`,
  );
}

export function getUserById(userId) {
  return axios.get(`${USER_URL}/${userId}`);
}

export function updateUser(user) {
  console.log(`${USER_URL}/${user.id}`);
  return axios.put(`${USER_URL}/${user.id}`, user);
}

export function deleteUser(userId) {
  return axios.delete(`${USER_URL}/${userId}`);
}
