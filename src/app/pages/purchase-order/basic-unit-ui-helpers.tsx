import { SortOrder } from 'react-bootstrap-table-next';
import {QueryParamsProps} from "../../common-type";

export const defaultSorted: { dataField: any; order: SortOrder }[] = [
  {
    dataField: 'id',
    order: 'asc',
  },
];
export const sizePerPageList = [
  {
    text: '5',
    value: 5,
  },
  {
    text: '10',
    value: 10,
  },
  {
    text: '15',
    value: 15,
  },
];
export const initialFilter: QueryParamsProps = {
  data: {},
  orderBy: 'name',
  orderType: 'asc',
  pageNumber: 1,
  pageSize: 5,
};
