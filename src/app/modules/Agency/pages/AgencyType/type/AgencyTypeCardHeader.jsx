import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../../_metronic/_partials/controls';
import { AgencyTypeFilter } from './agencyType-filter/AgencyTypeFilter';

export default function AgencyTypeCardHeader() {
  return (
    <Card>
      <CardHeader title="DANH MỤC ĐẠI LÝ"></CardHeader>
      <CardBody>
        <AgencyTypeFilter />
      </CardBody>
    </Card>
  );
}
