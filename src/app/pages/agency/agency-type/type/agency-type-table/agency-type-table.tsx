// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useEffect, useMemo} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useAgencyTypeUIContext} from '../agency-type-ui-context';
import './agency-type-table.scss';
import {fetchAgencyTypeViewById, fetchAllAgencyType} from "../../_redux/agency-type-action";
import {HeaderSortingClasses, SortCaret} from "../../../../../components/helpers/table-sorting-helpers";
import {sizePerPageList} from "../../agency-ui-helpers";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage
} from "../../../../../components/helpers/table-pagination-helpers";
import {ActionsColumnFormatter} from "./column-formatters/actions-column-formatter";

export function AgencyTypeTable() {
  // Customers UI Context
  const agencyTypeUIContext: any = useAgencyTypeUIContext();
  const agencyTypeUIProps = useMemo(() => {
    return {
      ids: agencyTypeUIContext.ids,
      setIds: agencyTypeUIContext.setIds,
      queryParams: agencyTypeUIContext.queryParams,
      setQueryParams: agencyTypeUIContext.setQueryParams,
      openEditAgencyTypeDialog: agencyTypeUIContext.openEditAgencyTypeDialog,
      openDeleteAgencyTypeDialog: agencyTypeUIContext.openDeleteAgencyTypeDialog,
      openDetailAgencyTypeDialog: agencyTypeUIContext.openDetailAgencyTypeDialog,
    };
  }, [agencyTypeUIContext]);
  
  // Getting curret state of customers list from store (Redux)
  const {currentState} = useSelector(
    (state: any) => ({
      currentState: state.agencyType,
    }),
    shallowEqual,
  );
  const {totalCount, entities, listLoading} = currentState;
  
  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    agencyTypeUIProps.setIds([]);
    // server call by queryParams
    dispatch(fetchAllAgencyType(agencyTypeUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyTypeUIProps.queryParams, dispatch]);
  
  // Table columns
  const columns = [
    {
      dataField: 'type_name',
      text: 'Tên loại',
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditAgencyTypeDialog: agencyTypeUIProps.openEditAgencyTypeDialog,
        openDeleteAgencyTypeDialog: agencyTypeUIProps.openDeleteAgencyTypeDialog,
        openDetailAgencyTypeDialog: agencyTypeUIProps.openDetailAgencyTypeDialog,
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
    agencyType: true,
    totalSize: totalCount,
    sizePerPageList: sizePerPageList,
    sizePerPage: agencyTypeUIProps.queryParams.pageSize,
    page: agencyTypeUIProps.queryParams.pageNumber,
  };
  
  const rowEvents = {
    onClick: (e: any, row: any, rowIndex: any) => {
      if (e.target.tagName.toLowerCase() === 'td') {
        dispatch(fetchAgencyTypeViewById(row.agency_type_id));
      }
    },
  };
  
  return (
    // <>
    // <PaginationProvider pagination={paginationFactory(paginationOptions)}>
    //   {({ paginationProps, paginationTableProps }) => {
    //     return (
    //       <Pagination isLoading={listLoading} paginationProps={paginationProps}>
    <BootstrapTable
      wrapperClasses="table-responsive"
      bordered={false}
      classes="table table-head-custom table-vertical-center overflow-hidden"
      bootstrap4
      remote
      keyField="agency_type_id"
      data={entities || []}
      columns={columns}
      // defaultSorted={defaultSorted}
      onTableChange={getHandlerTableChange(agencyTypeUIProps.setQueryParams)}
      rowEvents={rowEvents}
      
      // selectRow={getSelectAgencyRow({
      //   entities,
      //   ids: agencyTypeUIProps.ids,
      //   setIds: agencyTypeUIProps.setIds,
      // })}
      // {...paginationTableProps}
    >
      <PleaseWaitMessage entities={entities}/>
      <NoRecordsFoundMessage entities={entities}/>
    </BootstrapTable>
    //         </Pagination>
    //       );
    //     }}
    //   </PaginationProvider>
    // </>
  );
}
