import { SortOrder } from 'react-bootstrap-table-next';
import { PaginationProps } from '../common-types/common-type';
import { HeaderSortingClasses, SortCaret } from '../helpers/table-sorting-helpers';

export type OrderType = '1' | '-1';

export const SortDefault: { dataField: any; order: string }[] = [
  { dataField: '', order: 'asc' },
];
export const SizePerPageList = [
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '15', value: 15 },
];
export const DefaultPagination: PaginationProps = {
  sortBy: SortDefault[0].dataField,
  sortType: SortDefault[0].order,
  page: 1,
  limit: 5,
};
export const iconStyle = {
  fontSize: 14,
};

export const SortColumn = {
  sort: true,
  sortCaret: SortCaret,
  headerSortingClasses: HeaderSortingClasses,
  headerClasses: 'text-center',
  classes: 'text-center pr-0',
};

export const NormalColumn = {
  headerClasses: 'text-center',
  classes: 'text-center pr-0',
};

export const StatusValue = 1;
