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
import * as ProductionPlanService from './production-plan.service';

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
  versionColumns: any

}

function ProductionPlanVersion({ title, data, paginationParams, setPaginationParams, onSelectMany, selectedEntities, total, loading, versionColumns }: VersionProp) {
	const history = useHistory()
	const intl = useIntl();

  

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
