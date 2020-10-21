import {SortOrder} from "react-bootstrap-table-next";
import {QueryParamsProps} from "./common-type";

export const SortDefault: { dataField: any; order: SortOrder }[] = [
  {dataField: 'id', order: 'asc'}
];
export const SizePerPageList = [
  {text: '5', value: 5,},
  {text: '10', value: 10,},
  {text: '15', value: 15,},
];
export const FilterDefault: QueryParamsProps = {
  data: {},
  orderBy: SortDefault[0].dataField,
  orderType: SortDefault[0].order,
  pageNumber: 1,
  pageSize: 5,
};
