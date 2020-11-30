import React from 'react';
import { PaginationProps } from 'react-bootstrap';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import { ProductionPlanModel } from './production-plant.model';
import { useIntl } from 'react-intl';
import { NormalColumn, SortColumn } from '../../common-library/common-consts/const';
import { Link, useHistory } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface MasterDataVersion {
  _id: string;
  name: string;
  createBy: string;
  createDate: Date;
  approveDate: Date;
}

interface VersionProp {
  title: string;
  data: MasterDataVersion[];
  total: number;
  loading: boolean;
  paginationParams: any;
  setPaginationParams: (paginationParams: any) => void;
  onSelectMany: (selectedEntities: ProductionPlanModel[]) => void;
	selectedEntities: ProductionPlanModel[];

}

function ProductionPlanVersion({ title, data, paginationParams, setPaginationParams, onSelectMany, selectedEntities, total, loading }: VersionProp) {
	const history = useHistory()
	const intl = useIntl();

  const versionColumns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationParams.page ?? 0) - 1) * (paginationParams.limit ?? 0)}</p>
      ),
      style: { paddingTop: 20 },
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    createBy: {
      dataField: 'createBy',
			text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_CREATEBY' })}`,
		
      ...SortColumn,
      classes: 'text-center',
    },

    createDate: {
      dataField: 'createDate',
			text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_CREATEDATE' })}`,
			formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{new Intl.DateTimeFormat('en-GB').format(row.createDate)}</p>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    approveDate: {
      dataField: 'approveDate',
			text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_APPROVEDATE' })}`,
			formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{new Intl.DateTimeFormat('en-GB').format(row.approveDate)}</p>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span
          className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
          // onClick={() => onShowDetail(row)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <Visibility className="text-primary eye" />
          </span>
        </span>
      ),

      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  return (
    <Card>
			
      <CardHeader title={<><span onClick={() => history.goBack()}><ArrowBackIosIcon /></span> {'KẾ HOẠCH SỐ ' + title.toUpperCase()}</>} />
      <CardBody>
        <MasterTable
          entities={data as any}
          columns={versionColumns as any}
          total={total}
          loading={loading}
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
          onSelectMany={onSelectMany}
          selectedEntities={selectedEntities}
        />
      </CardBody>
    </Card>
  );
}

export default ProductionPlanVersion;
