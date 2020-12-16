import React, {Fragment} from 'react';
import {Card, CardBody, CardHeader} from '../card';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';
import {useIntl} from 'react-intl';
import {iconStyle} from '../common-consts/const';
import {MasterTable} from './master-table';
import {PaginationProps} from '../common-types/common-type';
import {ColumnDescription} from 'react-bootstrap-table-next';

export interface BasicUnitDataProps {
  showModal: any;
  hideModal: any;
  show: any;
  list: any[];
  total: number;
  loading: boolean;
  queryParams: any;
  setQueryParamsBase: any;
  ids: any[];
  setIds: any;
  setQueryParams: any;
}

export function MasterBody<T>({
                                entities,
                                total,
                                loading,
                                paginationParams,
                                setPaginationParams,
                                onSelectMany,
                                onCreate,
                                selectedEntities,
                                columns,
                                onDeleteMany,
                                isShowId,
                                title,
                              }: {
  total: number;
  loading: boolean;
  onSelectMany: (entities: T[]) => void;
  onCreate: () => void;
  columns: ColumnDescription[];
  entities: T[];
  selectedEntities: T[];
  paginationParams: PaginationProps;
  setPaginationParams: (data: PaginationProps) => void;
  onDeleteMany: () => void;
  isShowId?: boolean;
  title?: string;
}) {
  const intl = useIntl();
  
  const masterColumn = isShowId
    ? {
      _id: {
        dataField: '_id',
        text: 'STT',
        formatter: (cell: any, row: any, rowIndex: number) => (
          <Fragment>
            {rowIndex + 1 + ((paginationParams.page ?? 0) - 1) * (paginationParams.limit ?? 0)}
          </Fragment>
        ),
        headerClasses: 'text-center',
        align: 'center'
      },
      ...columns,
    }
    : columns;
  
  return (
    <Card className={'master-body-card'} >
      {title && <CardHeader title={intl.formatMessage({id: title}).toUpperCase()}/>}
      <CardBody>
        <div className="row no-gutters mb-10">
            <button type="button" className="btn btn-primary fixed-btn-width mr-8" onClick={onCreate}>
              <AddIcon style={iconStyle}/>
              {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.HEADER.ADD_BTN'})}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary fixed-btn-width"
              onClick={() => {
                onSelectMany(selectedEntities);
                onDeleteMany();
              }}>
              <DeleteOutlineOutlinedIcon style={iconStyle}/>
              {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.HEADER.DELETE_BTN'})}
            </button>
        </div>
        
        <MasterTable
          entities={entities}
          columns={masterColumn}
          total={total}
          loading={loading}
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
          onSelectMany={onSelectMany}
          selectedEntities={selectedEntities}
        />
        
        {/* <MasterTreeStructure /> */}
      </CardBody>
    </Card>
  );
}
