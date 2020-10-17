// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/user/userAction';
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from '../../../../../components/helpers';
import * as uiHelpers from '../UsersUIHelpers';
import * as columnFormatters from './column-formatters';
import { Pagination } from '../../../../../../_metronic/_partials/controls';
import { useUsersUIContext } from '../UsersUIContext';
import './UserTable.scss';

export function UsersTable() {
  // Customers UI Context
  const usersUIContext = useUsersUIContext();
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
  const { currentState } = useSelector(
    state => ({
      currentState: state.users,
    }),
    shallowEqual,
  );
  const { totalCount, entities, listLoading } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    usersUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAllUser(usersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: 'username',
      text: 'Username',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'role.roleType',
      text: 'Role',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
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
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: usersUIProps.queryParams.pageSize,
    page: usersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={listLoading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="username"
                data={entities || []}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(usersUIProps.setQueryParams)}
                selectRow={getSelectRow({
                  entities,
                  ids: usersUIProps.ids,
                  setIds: usersUIProps.setIds,
                })}
                {...paginationTableProps}
                {...paginationProps}>
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
