import React from 'react';
import BootstrapTable, { ColumnDescription, RowSelectionType } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import {
  onTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../helpers/pagination-helper';
import './master-table.scss';
import { SizePerPageList, SortDefault } from '../common-const/const';
import { SelectionCheckbox } from './table-row-selection-helpers';
import { ActionColumnProps } from '../common-types/common-type';
import { Pagination } from '../pagination/pagination';
import isEqual from 'react-fast-compare';

export function GetSelectRow<T>({
  entities,
  selectedEntities,
  onSelectMany,
}: {
  entities: T[];
  selectedEntities: T[];
  onSelectMany: (entities: T[]) => void;
}) {
  return {
    mode: 'checkbox' as RowSelectionType,
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        selectedEntities &&
        selectedEntities.length > 0 &&
        selectedEntities.length === entities.length;
      console.log(selectedEntities);
      console.log(isSelected);
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => {
            if (!isSelected) {
              onSelectMany(entities);
            } else {
              onSelectMany([]);
            }
          }}
        />
      );
    },
    selectionRenderer: ({ rowIndex }: { rowIndex: number }) => {
      const isSelected =
        selectedEntities && selectedEntities.some(entity => isEqual(entity, entities[rowIndex]));
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => {
            if (isSelected) {
              onSelectMany(selectedEntities.filter(entity => !isEqual(entity, entities[rowIndex])));
            } else {
              onSelectMany([...selectedEntities, entities[rowIndex]]);
            }
          }}
        />
      );
    },
  };
}

export function MasterTable<T>({
  show,
  showModal,
  entities,
  selectedEntities,
  total,
  loading,
  queryParams,
  setQueryParams,
  onShowDetail,
  onDelete,
  onEdit,
  onSelectMany,
  columns,
}: ActionColumnProps<T> & {
  selectedEntities: T[];
  columns: ColumnDescription[];
  entities: T[];
  [T: string]: any;
}) {
  const paginationOptions = {
    basicUnit: true,
    totalSize: total,
    tableName: 'đơn vị cơ bản',
    sizePerPageList: SizePerPageList,
    sizePerPage: queryParams.limit,
    page: queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={loading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
                bootstrap4
                remote
                {...paginationTableProps}
                keyField="_id"
                data={entities}
                columns={columns}
                defaultSorted={SortDefault as any}
                selectRow={GetSelectRow({
                  entities: entities,
                  selectedEntities: selectedEntities,
                  onSelectMany: onSelectMany,
                })}
                onTableChange={onTableChange(setQueryParams)}
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
