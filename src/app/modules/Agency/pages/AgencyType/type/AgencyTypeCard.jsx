import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../../_metronic/_partials/controls';
import { AgencyTypeTable } from './agencyType-table/AgencyTypeTable';
import { AgencyTypeGrouping } from './agencyType-grouping/AgencyTypeGrouping';
import { useAgencyTypeUIContext } from './AgencyTypeUIContext';
import { AgencyTypeFilter } from './agencyType-filter/AgencyTypeFilter';
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
