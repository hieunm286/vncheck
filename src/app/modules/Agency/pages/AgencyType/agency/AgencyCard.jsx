import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../../_metronic/_partials/controls';
import { AgencyTable } from './agency-table/AgencyTable';
import { useAgencyUIContext } from './AgencyUIContext';
import { Link } from 'react-router-dom';

export function AgencyCard() {
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      ids: agencyUIContext.ids,
      newUserButtonClick: agencyUIContext.newUserButtonClick,
    };
  }, [agencyUIContext]);

  return (
    <Card className="h-100">
      <CardHeader title="DANH SÁCH ĐẠI LÝ"></CardHeader>

      <CardBody>
        <div className="row no-gutters mb-10"></div>

        {/* <AgencyFilter /> */}
        <AgencyTable />
      </CardBody>
    </Card>
  );
}
