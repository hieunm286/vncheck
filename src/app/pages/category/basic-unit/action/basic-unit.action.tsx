import * as requestFromServer from '../api/basic-unit.api';

export interface queryParamsProps {
  data: any;
  pageSize: number | string;
  pageNumber: number | string;
  sortOrder: string;
  sortField: string;
}

const fetchAllBasicUnit = (queryParams: queryParamsProps) => {};
