import axios from 'axios';
import { API_BASE_URL } from '../../../../../Const';

export const AGENCIES_URL = API_BASE_URL + '/admin/agency-type';
export const AGENCY_URL = API_BASE_URL + '/admin/agency-type';
export const AGENCY_URL_SEARCH = API_BASE_URL + '/admin/v1/search/agency';

export function createAgencyType(agencyType: any) {
  const form_data = new FormData();
  console.log(agencyType);
  // for (var key in agencyType) {
  //   form_data.append(key, agencyType[key]);
  // }
  form_data.append('agency_type_id', agencyType.agency_type_id);
  form_data.append('type_name', agencyType.type_name);
  form_data.append('type_status', agencyType.type_status);

  for (var value of form_data.values()) {
    console.log(value);
  }
  return axios.post(AGENCIES_URL, form_data);
}

export function getAllAgencyTypes(queryParams: {
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
      `${AGENCIES_URL}?page=${queryParams.pageNumber}&limit=50&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      `,
    );
  }
}

export function getAgencyTypeById(id: string) {
  return axios.get(`${AGENCIES_URL}/${id}`);
}

export function updateAgencyType(agencyId: any) {
  // console.log(`${AGENCIES_URL}/${user.username}`);
  return axios.put(`${AGENCIES_URL}/${agencyId.agency_type_id}`, agencyId);
}

export function deleteAgencyType(agencyId: any) {
  return axios.delete(`${AGENCIES_URL}/${agencyId}`);
}
