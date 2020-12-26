import React from 'react';
import { Card, CardBody } from '../../common-library/card';
import { Steps, Divider } from 'antd';
import { DefaultPagination } from '../../common-library/common-consts/const';
import { MasterTable } from '../../common-library/common-components/master-table';

const { Step } = Steps;

function ProductionManagementBody({
  stepData,
  setCurrentStep,
  currentStep,
  setEntities,
  setPaginationProps,
}: {
  stepData: any[];
  setCurrentStep: (tab: number | undefined) => void;
  currentStep: number | undefined;
  setEntities: (el: any) => void;
  setPaginationProps: (el: any) => void;
}) {
  function callback(key: number) {
    setCurrentStep(key);
    setEntities([]);
    setPaginationProps(DefaultPagination);
  }

  return (
    <Card>
      {/* {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />} */}
      <CardBody>
        <Steps current={currentStep} onChange={callback}>
					{stepData.map((item: any, key: number) => (
            <Step title={item.title} key={'' + key} />
          ))}
        </Steps>
      </CardBody>
    </Card>
  );
}

export default ProductionManagementBody;
