export const AgencyTypeStatusCssClasses = ['danger', 'success', 'info', ''];
export const AgencyTypeStatusTitles = ['Suspended', 'Active', 'Pending', ''];
export const AgencyTypeTypeCssClasses = ['success', 'danger', ''];
export const AgencyTypeTypeTitles = ['Business', 'Individual', ''];
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
    agency_id: '',
    name: '',
    status: 0,
    phone: '',
    tax_id: '',
    username: '',
    agency_type_id: '',
    shipping_address: '',
    address: '',
    country: '',
    town: '',
    city: '',
    district: '',
    state: '',
  },
  sortOrder: 'asc', // asc||desc
  sortField: 'username',
  pageNumber: 1,
  pageSize: 5,
};
