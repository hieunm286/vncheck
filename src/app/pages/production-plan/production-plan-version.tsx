import React from 'react';
import {Card, CardBody, CardHeader} from '../../common-library/card';
import {MasterTable} from '../../common-library/common-components/master-table';
import {ProductionPlanModel} from './production-plant.model';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';
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
  data: any;
  total: number;
  loading: boolean;
  paginationParams: any;
  setPaginationParams: (paginationParams: any) => void;
  onSelectMany: (selectedEntities: ProductionPlanModel[]) => void;
  selectedEntities: ProductionPlanModel[];
  versionColumns: any
  
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
                                 versionColumns
                               }: VersionProp) {
  const history = useHistory()
  const intl = useIntl();
  
  
  return (
    <Card>
      
      <CardHeader title={<><span
        onClick={() => history.goBack()}><ArrowBackIosIcon/></span> {'KẾ HOẠCH SỐ ' + title.toUpperCase()}</>}/>
      <CardBody>
        <MasterTable
          entities={data || []}
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
