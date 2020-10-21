// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useEffect, useMemo} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as actions from '../_redux/agency-action';
import { Pagination } from '../../../../_metronic/_partials/controls';
import './agency-table.scss';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {ActionsColumnFormatter} from './column-formatters/actions-column-formatter';
import {defaultSorted, sizePerPageList} from '../agency-ui-helpers';
import {useAgencyUIContext} from '../agency-ui-context';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../../common-library/helpers/pagination-helper';
import {
  HeaderSortingClasses,
  SortCaret,
} from '../../../common-library/helpers/table-sorting-helpers';
import { GetSelectAgencyRow } from '../../../common-library/helpers/table-row-selection-helpers';

export function AgencyTable() {
  // Customers UI Context
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      ids: agencyUIContext.ids,
      setIds: agencyUIContext.setIds,
      queryParams: agencyUIContext.queryParams,
      setQueryParams: agencyUIContext.setQueryParams,
      openEditAgencyDialog: agencyUIContext.openEditAgencyDialog,
      openDeleteAgencyDialog: agencyUIContext.openDeleteAgencyDialog,
      openDetailAgencyDialog: agencyUIContext.openDetailAgencyDialog,
    };
  }, [agencyUIContext]);
  
  // Getting curret state of customers list from store (Redux)
  const {currentState} = useSelector(
    (state: any) => ({
      currentState: state.agency,
    }),
    shallowEqual,
  );
  const {totalCount, entities, listLoading} = currentState;
  
  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    agencyUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAllAgency(agencyUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyUIProps.queryParams, dispatch]);
  
  console.log(agencyUIProps.ids);
  
  // Table columns
  const columns = [
    {
      dataField: 'name',
      text: 'Tên đại lý',
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'agency_id',
      text: 'Mã đại lý',
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'address',
      text: 'Địa chỉ đại lý',
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
      formatter: (cell: any, row: any) =>
        row.address + ', ' + row.district + ', ' + row.city + ', ' + row.state,
    },
    {
      dataField: 'status',
      text: '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Trạng thái',
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
      headerClasses: 'text-center',
      classes: 'text-center pr-0',
      formatter: (cell: any, row: any) =>
        row.status === 0 ? (
          <CheckCircleIcon style={{color: '#1DBE2D'}}/>
        ) : (
          <IndeterminateCheckBoxIcon/>
        ),
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditAgencyDialog: agencyUIProps.openEditAgencyDialog,
        openDeleteAgencyDialog: agencyUIProps.openDeleteAgencyDialog,
        openDetailAgencyDialog: agencyUIProps.openDetailAgencyDialog,
      },
      classes: 'text-center pr-0',
      headerClasses: 'text-center',
      style: {
        minWidth: '130px',
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    agency: true,
    totalSize: totalCount,
    sizePerPageList: sizePerPageList,
    sizePerPage: agencyUIProps.queryParams.pageSize,
    page: agencyUIProps.queryParams.pageNumber,
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
                keyField="agency_id"
                data={entities || []}
                columns={columns}
                defaultSorted={defaultSorted as any}
                onTableChange={getHandlerTableChange(agencyUIProps.setQueryParams)}
                selectRow={
                  GetSelectAgencyRow({
                    entities,
                    ids: agencyUIProps.ids,
                    setIds: agencyUIProps.setIds,
                  }) as any
                }
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
