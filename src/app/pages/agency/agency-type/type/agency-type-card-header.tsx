import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../_metronic/_partials/controls/index';
import { AgencyTypeFilter } from './agencyType-filter/agency-type-filter';

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
