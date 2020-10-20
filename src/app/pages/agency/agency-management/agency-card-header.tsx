import React from 'react';
import {AgencyFilter} from './agency-filter/agency-filter';
import {Card, CardBody, CardHeader} from "../../../components/card";

export default function AgencyCardHeader() {
  return (
    <Card>
      <CardHeader title="DANH MỤC ĐẠI LÝ"/>
      <CardBody>
        <AgencyFilter/>
      </CardBody>
    </Card>
  );
}
