// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useEffect, useMemo} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useUsersUIContext} from '../users-ui-context';
import './user-table.scss';
import {
    onTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage
} from "../../../common-library/helpers/pagination-helper";
import {defaultSorted, sizePerPageList} from "../users-ui-helpers";
import {ActionsColumnFormatter} from "./column-formatters/actions-column-formatter";
import {Pagination} from "../../../common-library/pagination/pagination";
import {HeaderSortingClasses, SortCaret} from "../../../common-library/helpers/table-sorting-helpers";
import {fetchAllUser} from "../_redux/user-action";
import {GetSelectRow} from "../../../common-library/common-components/table-row-selection-helpers";

export function UsersTable() {
  // Customers UI Context
  const usersUIContext: any = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      openEditUserDialog: usersUIContext.openEditUserDialog,
      openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
    };
  }, [usersUIContext]);
  
  // Getting curret state of customers list from store (Redux)
  const {currentState} = useSelector(
    (state: any) => ({
      currentState: state.users,
    }),
    shallowEqual,
  );
  const {totalCount, entities, listLoading} = currentState;
  
  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    usersUIProps.setIds([]);
    // server call by queryParams
    dispatch(fetchAllUser(usersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersUIProps.queryParams, dispatch]);
  
  // Table columns
  const columns = [
    {
      dataField: 'username',
      text: 'Username',
      sort: true,
      sortCaret: SortCaret,
      HeaderSortingClasses,
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      sort: true,
      sortCaret: SortCaret,
      HeaderSortingClasses,
    },
    {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true,
      sortCaret: SortCaret,
      HeaderSortingClasses,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: SortCaret,
      HeaderSortingClasses,
    },
    {
      dataField: 'role.roleType',
      text: 'Role',
      sort: true,
      sortCaret: SortCaret,
      HeaderSortingClasses,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      sortCaret: SortCaret,
      HeaderSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: usersUIProps.openEditUserDialog,
        openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
      },
      classes: 'text-left pr-0',
      headerClasses: 'text-center',
      style: {
        minWidth: '130px',
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    user: true,
    totalSize: totalCount,
    sizePerPageList: sizePerPageList,
    sizePerPage: usersUIProps.queryParams.limit,
    page: usersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({paginationProps, paginationTableProps}) => {
          return (
            <Pagination isLoading={listLoading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                {...paginationTableProps}
                keyField="username"
                data={entities || []}
                columns={columns}
                defaultSorted={defaultSorted as any}
                onTableChange={onTableChange(usersUIProps.setQueryParams)}
                selectRow={GetSelectRow({
                  entities,
                  ids: usersUIProps.ids,
                  setIds: usersUIProps.setIds,
                }) as any}
                {...paginationProps}>
                <PleaseWaitMessage entities={entities}/>
                <NoRecordsFoundMessage entities={entities}/>
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
