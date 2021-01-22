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
import { AxiosResponse } from 'axios';
import { notifyError } from './defined/crud-helped';

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
  get?: (id: string) => Promise<AxiosResponse<any>>
}

function ProductionPlanVersion({
  title,
  versionColumns,
  get
}: VersionProp) {
  const history = useHistory();
  const intl = useIntl();

  const [plan, setPlan] = React.useState('')
  const [versionData, setVersionData] = React.useState<any[]>([])


  React.useEffect(() => {
    if (title && get) {
      get(title).then(res => {
        setPlan(res.data.history[0]?.productPlan?.code)

        const sortedArray = _.map(
          _.orderBy(res.data.history, o => new Date(o.createdAt), 'desc'),
        );

        setVersionData(sortedArray)
      }).catch (err => {
        notifyError('Lỗi server. Vui lòng thử lại sau')
      })
    }
  })

  return (
    <Card>
      <CardHeader
        title={
          <>
            <span onClick={() => history.goBack()} className={'cursor-pointer text-primary font-weight-boldest'}>
              <ArrowBackIosIcon />
            </span>
            {'KẾ HOẠCH SỐ ' + plan.toUpperCase()}
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
          data={versionData}
          columns={Object.values(versionColumns)}
        >
          <PleaseWaitMessage entities={versionData} />
          <NoRecordsFoundMessage entities={versionData} />
        </BootstrapTable>
      </CardBody>
    </Card>
  );
}

export default ProductionPlanVersion;
