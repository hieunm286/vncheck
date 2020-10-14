import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../../_metronic/_partials/controls';
import { AgencyFilter } from './agency-filter/AgencyFilter';

export default function AgencyCardHeader() {
  return (
    <Card>
      <CardHeader title="DANH MỤC ĐẠI LÝ"></CardHeader>
      <CardBody>
        <AgencyFilter />
      </CardBody>
    </Card>
  );
}
