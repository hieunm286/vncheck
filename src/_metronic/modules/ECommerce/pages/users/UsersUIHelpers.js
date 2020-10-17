export const UserStatusCssClasses = ['danger', 'success', 'info', ''];
export const UserStatusTitles = ['Suspended', 'Active', 'Pending', ''];
export const UserTypeCssClasses = ['success', 'primary', ''];
export const UserTypeTitles = ['Business', 'Individual', ''];
export const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];
export const sizePerPageList = [
  {
    text: '3',
    value: 3,
  },
  {
    text: '5',
    value: 5,
  },
  {
    text: '10',
    value: 10,
  },
];
export const initialFilter = {
  data: {
    email: '',
    dateofbirth: '',
    phone: '',
    paid: 0,
    location: 'VN',
    ordinal: 1,
    children: {
      gpa: 0,
    },
  },
  sortOrder: 'asc', // asc||desc
  sortField: 'id',
  pageNumber: 1,
  pageSize: 3,
};
