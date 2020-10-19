import React from 'react';
import { Card, CardBody, CardHeader } from '../../../components/card';
import { useIntl } from 'react-intl';
import BasicUnitFilter from './basic-unit-filter/basic-unit-filter';

function BasicUnitCardHeader() {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: 'BASIC_UNIT.CARD_HEADER.TITLE' })} />
      <CardBody>
        <BasicUnitFilter />
      </CardBody>
    </Card>
  );
}

export default BasicUnitCardHeader;
