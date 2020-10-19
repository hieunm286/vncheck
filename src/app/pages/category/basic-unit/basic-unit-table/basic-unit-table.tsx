import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../../../components/helpers/table-pagination-helpers';
import {
  HeaderSortingClasses,
  SortCaret,
} from '../../../../components/helpers/table-sorting-helpers';
import { Pagination } from '../../../../../_metronic/_partials/controls';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { ActionsColumnFormatter } from './column-formatters/actions-column-formatter';
import { defaultSorted, sizePerPageList } from '../basic-unit-ui-helpers';
import './basic-unit-table.scss';
import { useBasicUnitUIContext } from '../basic-unit-ui-context';
import { GetSelectBasicUnitRow } from '../../../../components/helpers/table-row-selection-helpers';

function BasicUnitTable({ show, showModal, hideModal, basicUnitArray }: any) {
  const intl = useIntl();

  const basicUnitUIContext = useBasicUnitUIContext();
  const basicUnitUIProps = useMemo(() => {
    return {
      ids: basicUnitUIContext.ids,
      setIds: basicUnitUIContext.setIds,
      queryParams: basicUnitUIContext.queryParams,
      setQueryParams: basicUnitUIContext.setQueryParams,
    };
  }, [basicUnitUIContext]);

  const columns = [
    {
      dataField: 'ordinal',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => <p>{rowIndex + 1}</p>,
    },
    {
      dataField: 'basicUnitCode',
      text: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.CODE' })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'basicUnitName',
      text: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.NAME' })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'status',
      text: `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${intl.formatMessage({
        id: 'BASIC_UNIT.CARD.TABLE.STATUS',
      })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
      headerClasses: 'text-center',
      classes: 'text-center pr-0',
      formatter: (cell: any, row: any) =>
        row.status === 0 ? (
          <CheckCircleIcon style={{ color: '#1DBE2D' }} />
        ) : (
          <IndeterminateCheckBoxIcon />
        ),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.ACTION' })}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: showModal,
        openDeleteDialog: showModal,
        openDetailDialog: showModal,
        show: show,
      },
      classes: 'text-center pr-0',
      headerClasses: 'text-center',
      style: {
        minWidth: '130px',
      },
    },
  ];

  const paginationOptions = {
    basicUnit: true,
    totalSize: basicUnitArray.length,
    tableName: 'đơn vị cơ bản',
    sizePerPageList: [
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
    ],
    sizePerPage: 5,
    page: 1,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination /*isLoading={listLoading}*/ paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
                bootstrap4
                remote
                {...paginationTableProps}
                keyField="basicUnitCode"
                data={basicUnitArray}
                columns={columns}
                defaultSorted={defaultSorted as any}
                selectRow={
                  GetSelectBasicUnitRow({
                    basicUnitArray,
                    ids: basicUnitUIProps.ids,
                    setIds: basicUnitUIProps.setIds,
                  }) as any
                }
                onTableChange={getHandlerTableChange(basicUnitUIProps.setQueryParams)}
                {...paginationProps}>
                <PleaseWaitMessage entities={basicUnitArray} />
                <NoRecordsFoundMessage entities={basicUnitArray} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default BasicUnitTable;
