import React from 'react';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import { ProductionPlanModel } from './production-plant.model';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../common-library/helpers/pagination-helper';
import { SortDefault } from '../../common-library/common-consts/const';
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'lodash';

interface MasterDataVersion {
  _id: string;
  name: string;
  createBy: string;
  createDate: Date;
  approveDate: Date;
}

interface VersionProp {
  title: string;
  data: any;
  total: number;
  loading: boolean;
  paginationParams: any;
  setPaginationParams: (paginationParams: any) => void;
  onSelectMany: (selectedEntities: ProductionPlanModel[]) => void;
  selectedEntities: ProductionPlanModel[];
  versionColumns: any;
}

function ProductionPlanVersion({
  title,
  data,
  paginationParams,
  setPaginationParams,
  onSelectMany,
  selectedEntities,
  total,
  loading,
  versionColumns,
}: VersionProp) {
  const history = useHistory();
  const intl = useIntl();

  const sortedArray = _.map(
    _.orderBy(data, o => new Date(o.createdAt), 'desc'),
  );

  return (
    <Card>
      <CardHeader
        title={
          <>
            <span onClick={() => history.goBack()} className={'cursor-pointer text-primary font-weight-boldest'}>
              <ArrowBackIosIcon />
            </span>
            {'KẾ HOẠCH SỐ ' + title.toUpperCase()}
          </>
        }
      />
      <CardBody>
        {/* <MasterTable
          entities={data || []}
          columns={versionColumns as any}
          total={data ? data.length : 0}
          loading={loading}
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
          // onSelectMany={onSelectMany}
          // selectedEntities={selectedEntities}
        /> */}
        <BootstrapTable
          wrapperClasses="table-responsive"
          bordered={false}
          classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
          bootstrap4
          remote
          keyField="_id"
          data={sortedArray}
          columns={Object.values(versionColumns)}
        >
          <PleaseWaitMessage entities={data} />
          <NoRecordsFoundMessage entities={data} />
        </BootstrapTable>
      </CardBody>
    </Card>
  );
}

export default ProductionPlanVersion;
