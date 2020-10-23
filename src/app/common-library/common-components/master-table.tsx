import React from 'react';
import {useIntl} from 'react-intl';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../helpers/pagination-helper';
import {HeaderSortingClasses, SortCaret,} from '../helpers/table-sorting-helpers';
import {Pagination} from '../../../_metronic/_partials/controls/index';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {ActionsColumnFormatter} from './actions-column-formatter';
import './master-table.scss';
import {SizePerPageList, SortDefault} from "../common-const/const";
import {
  GroupingItemBasicUnitOnSelect,
  SelectionCheckbox
} from "../helpers/table-row-selection-helpers";
import {ActionColumnProps} from "../common-types/common-type";

export function GroupingAllOnSelect({isSelected, setIds, list}: { isSelected: any, setIds: any, list: any }) {
  if (!isSelected) {
    const allIds: any[] = [];
    list.forEach((el: any) => allIds.push(el.code));
    setIds(allIds);
  } else {
    setIds([]);
  }
  return isSelected;
}


export function GetSelectRow({list, ids, setIds}: { list: any, ids: any, setIds: any }) {
  return {
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        list && list.length > 0 && list.length === ids.length;
      const props = {isSelected, list, setIds};
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => GroupingAllOnSelect(props)}
        />
      );
    },
    selectionRenderer: ({rowIndex}: any) => {
      const isSelected = ids.some((el: any) => el === list[rowIndex].code);
      const props = {ids, setIds, customerId: list[rowIndex].code};
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => GroupingItemBasicUnitOnSelect(props)}
        />
      );
    },
  };
}

export function MasterTable<T>({
                                 show,
                                 showModal,
                                 hideModal,
                                 entities,
                                 total,
                                 loading,
                                 queryParams,
                                 setQueryParamsBase,
                                 ids,
                                 setIds,
                                 setQueryParams,
                                 onShowDetail,
                                 onDelete,
                                 onEdit
                               }: ActionColumnProps<T> & { entities: T[], [T: string]: any }) {
  const intl = useIntl();
  
  const columns = [
    {
      dataField: 'ordinal',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + (queryParams.pageNumber - 1) * queryParams.pageSize}</p>
      ),
      style: {paddingTop: 20},
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.CODE'})}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.NAME'})}`,
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
        row.status === 1 ? (
          <CheckCircleIcon style={{color: '#1DBE2D'}}/>
        ) : (
          <IndeterminateCheckBoxIcon/>
        ),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        onShowDetail: onShowDetail,
        onDelete: onDelete,
        onEdit: onEdit,
        openDeleteDialog: showModal,
        openDetailDialog: showModal,
        show: show,
        detailTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.DETAIL.TITLE'})}`,
        editTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.EDIT.TITLE'})}`,
        deleteTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.DELETE.TITLE'})}`,
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
    totalSize: total,
    tableName: 'đơn vị cơ bản',
    sizePerPageList: SizePerPageList,
    sizePerPage: queryParams.pageSize,
    page: queryParams.pageNumber,
  };
  
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({paginationProps, paginationTableProps}) => {
          return (
            <Pagination isLoading={loading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
                bootstrap4
                remote
                {...paginationTableProps}
                keyField="code"
                data={entities}
                columns={columns}
                defaultSorted={SortDefault as any}
                selectRow={
                  GetSelectRow({
                    list: entities,
                    ids: ids,
                    setIds: setIds,
                  }) as any
                }
                onTableChange={getHandlerTableChange(setQueryParams)}
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

