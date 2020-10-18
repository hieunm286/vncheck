import axios from 'axios';
import { any } from 'prop-types';
import { API_BASE_URL } from '../../../../const';

export const AGENCIES_URL = API_BASE_URL + '/admin/agency';
export const AGENCY_URL = API_BASE_URL + '/admin/agency';
export const AGENCY_URL_SEARCH = API_BASE_URL + '/admin/v1/search/agency';

export function createAgency(user: any, imageArray: any) {
  console.log(user);

  let formData = new FormData();

  for (var key in user) {
    formData.append(key, user[key]);
  }

  if (imageArray && imageArray.length > 0) {
    imageArray.forEach((file: any) => {
      formData.append('image[]', file);
    });
  }
  // console.log(formData);
  // Object.keys(user).forEach(key => formData.append(key, user[key]));

  // console.log(Object.keys(user));
  // return axios.post(AGENCIES_URL, formData);
  return axios({
    method: 'POST',
    url: AGENCIES_URL,
    data: formData,
  });
  // return axios.post(AGENCIES_URL, formData);
}

export function getAllAgencys(queryParams: {
  filter: any;
  pageNumber: any;
  pageSize: any;
  sortField: any;
  sortOrder: any;
}) {
  // const sign = signTransaction('');
  // console.log(sign);
  if (queryParams.filter) {
    return axios.post(`${AGENCY_URL_SEARCH}?page=${queryParams.pageNumber}`, queryParams.filter);
  } else if (
    queryParams.filter &&
    (!queryParams.filter.field || queryParams.filter.field === 'all')
  ) {
    return axios.get(
      `${AGENCY_URL_SEARCH}?page=${queryParams.pageNumber}&limit=${queryParams.pageSize}&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      &field=all
      &query=${queryParams.filter.searchText}`,
    );
  } else {
    return axios.get(
      `${AGENCIES_URL}?page=${queryParams.pageNumber}&limit=${queryParams.pageSize}&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      `,
    );
  }
}

export function getAgencyById(id: string) {
  return axios.get(`${AGENCIES_URL}/${id}`);
}

export function getImage(imagePath: string) {
  const imageURL: string = `${API_BASE_URL}${imagePath}`;
  return axios.get(imageURL, {
    responseType: 'arraybuffer',
  });
}

export function updateAgency(user: any, imageArray: any) {
  // console.log(`${AGENCIES_URL}/${user.username}`);
  let formData = new FormData();

  for (var key in user) {
    formData.append(key, user[key]);
  }

  if (imageArray && imageArray.length > 0) {
    imageArray.forEach((file: any) => {
      formData.append('image[]', file);
    });
  }
  // return axios.put(`${AGENCY_URL}/${user.agency_id}`, formData);
  return axios({
    method: 'PUT',
    url: `${AGENCY_URL}/${user.agency_id}`,
    data: formData,
  });
}

export function deleteAgency(userId: any) {
  return axios.delete(`${AGENCY_URL}/${userId}`);
}

export function deleteManyAgency(arr: any) {
  return axios.delete(AGENCIES_URL, {
    data: {
      arr: arr,
    },
  });
}
