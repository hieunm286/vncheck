export const UserStatusCssClasses = ['danger', 'success', 'info', ''];
export const UserStatusTitles = ['Suspended', 'Active', 'Pending', ''];
export const UserTypeCssClasses = ['success', 'danger', ''];
export const UserTypeTitles = ['Business', 'Individual', ''];
export const defaultSorted = [
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
export const initialFilter = {
  data: {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    issuer_signature: 'User',
    password: '',
    is_locked: 0,
  },
  sortOrder: 'asc', // asc||desc
  sortField: 'username',
  pageNumber: 1,
  limit: 5,
};
