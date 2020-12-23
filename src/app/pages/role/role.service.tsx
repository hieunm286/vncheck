const GetCompareFunction = ({key, orderType}: { key: string, orderType: 1 | -1 }) => {
  return (a: any, b: any) => {
    const _a = key && key != '' ? a[key] : a;
    const _b = key && key != '' ? b[key] : b;
    if (_a < _b) {
      return -1 * orderType;
    }
    if (_a > _b) {
      return 1 * orderType;
    }
    return 0;
  }
}
export const RoleList = ['ROLE.MANAGER', 'ROLE.ADMIN', 'ROLE.FARMER', 'ROLE.TECHNICIAN']

export const GetRole = ({queryProps, paginationProps}: any, convertFn?: (value: string) => string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const _roleList = convertFn ? RoleList.map(convertFn) : RoleList;
    const totalData = _roleList.filter((val, index, arr) => {
      return val.toLowerCase().indexOf(queryProps.role.toLowerCase()) > -1;
    })
    const data = totalData.sort(GetCompareFunction({
      key: paginationProps.sortBy,
      orderType: paginationProps.sortType === 'asc' ? 1 : -1
    })).slice((paginationProps.page - 1) * paginationProps.limit, paginationProps.page * paginationProps.limit);
    
    resolve({
      code: 200,
      data: {
        data: data,
        paging: {page: paginationProps.page, limit: paginationProps.limit, total: totalData.length}
      },
      success: true
    })
  })
}