// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {useMemo} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import './agency-table.scss';
import {useAgencyUIContext} from "../agency-ui-context";
import {defaultSorted, sizePerPageList} from "../agency-ui-helpers";
import {
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage
} from "../../../components/helpers/table-pagination-helpers";
import {ActionsColumnFormatter} from "./column-formatters/actions-column-formatter";
import {GetSelectAgencyRow} from "../../../components/helpers/table-row-selection-helpers";
import paginationFactory, {PaginationProvider} from "react-bootstrap-table2-paginator";
import {Pagination} from "../../../components/pagination/pagination";

export function AgencyTable() {
  // Customers UI Context
  const agencyUIContext: any = useAgencyUIContext();
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
      currentState: state.agencyType,
    }),
    shallowEqual,
  );
  const {totalCount, entities, listLoading, agencyTypeForView} = currentState;
  
  // Customers Redux state
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // clear selections list
  //   agencyUIProps.setIds([]);
  //   // server call by queryParams
  //   dispatch(actions.fetchAllAgencyType(agencyUIProps.queryParams));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [agencyUIProps.queryParams, dispatch]);
  
  // Table columns
  const columns = [
    {
      dataField: 'name',
      text: 'Tên đại lý',
    },
    {
      dataField: 'agency_id',
      text: 'Mã đại lý',
    },
    
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openDeleteAgencyDialog: agencyUIProps.openDeleteAgencyDialog,
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
  
  console.log(entities ? (Object.values(entities)[0] ? 'undefined' : '[objects]') : '[]');
  
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
                {...paginationOptions}
                keyField="agency_id"
                // data={entities ? (Object.values(entities)[0] ? Object.values(entities)[0].agencies : []) : []}
                data={agencyTypeForView ? agencyTypeForView.agencies : []}
                columns={columns}
                defaultSorted={defaultSorted as any}
                onTableChange={getHandlerTableChange(agencyUIProps.setQueryParams)}
                selectRow={GetSelectAgencyRow({
                  entities,
                  ids: agencyUIProps.ids,
                  setIds: agencyUIProps.setIds,
                }) as any}
              >
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
