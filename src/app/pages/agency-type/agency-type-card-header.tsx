import React from 'react';
import {AgencyTypeFilter} from './agency-type-filter/agency-type-filter';
import {Card, CardBody, CardHeader} from "../../common-library/card";

export default function AgencyTypeCardHeader() {
  return (
    <Card>
      <CardHeader title="DANH MỤC ĐẠI LÝ"/>
      <CardBody>
        <AgencyTypeFilter/>
      </CardBody>
    </Card>
  );
}
