import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../_metronic/_partials/controls/index';
import { AgencyTypeTable } from './agency-type-table/agency-type-table';
import { AgencyTypeGrouping } from './agency-type-group/agency-type-grouping.tsx';
import { useAgencyTypeUIContext } from './agency-type-ui-context';
import { AgencyTypeFilter } from './agency-type-filter/agency-type-filter';
import { Link } from 'react-router-dom';

export function AgencyTypeCard() {
  const agencyTypeUIContext = useAgencyTypeUIContext();
  const agencyTypeUIProps = useMemo(() => {
    return {
      ids: agencyTypeUIContext.ids,
      newAgencyTypeButtonClick: agencyTypeUIContext.newAgencyTypeButtonClick,
    };
  }, [agencyTypeUIContext]);

  return (
    <Card className="h-100">
      <CardHeader title="DANH SÁCH LOẠI ĐẠI LÝ"></CardHeader>
      <CardBody>
        <button className="btn btn-danger" onClick={agencyTypeUIProps.newAgencyTypeButtonClick}>
          Tạo mới
        </button>
        {/* <AgencyTypeFilter /> */}
        {agencyTypeUIProps.ids.length > 0 && <AgencyTypeGrouping />}
        <AgencyTypeTable />
      </CardBody>
    </Card>
  );
}
