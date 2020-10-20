import axios from 'axios';
import {API_BASE_URL} from '../../../const';
import {AgencyType} from "../../../models/agency-type.model";

export const AGENCY_TYPE_URL = API_BASE_URL + '/agency-types';
export const AGENCY_URL_SEARCH = API_BASE_URL + '/admin/v1/search/agency';

export function createAgencyType(agencyType: AgencyType) {
  const form_data = new FormData();
  form_data.append('code', agencyType.code);
  form_data.append('name', agencyType.name);
  form_data.append('status', agencyType.status.toString());
  return axios.post(AGENCY_TYPE_URL, agencyType);
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
      `${AGENCY_TYPE_URL}?page=${queryParams.pageNumber}&limit=50&sortby=${queryParams.sortField}&orderby=${queryParams.sortOrder}
      `,
    );
  }
}

export function getAgencyTypeById(id: string) {
  return axios.get(`${AGENCY_TYPE_URL}/${id}`);
}

export function updateAgencyType(agency: AgencyType) {
  // console.log(`${AGENCIES_URL}/${user.username}`);
  return axios.put(`${AGENCY_TYPE_URL}/${agency.code}`, agency);
}

export function deleteAgencyType(agencyId: any) {
  return axios.delete(`${AGENCY_TYPE_URL}/${agencyId}`);
}
