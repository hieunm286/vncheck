import React, { Dispatch, SetStateAction } from 'react';
import { Tabs } from 'antd';
import { Card, CardBody } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import { PaginationProps } from 'react-bootstrap';
import './style/production-plan.scss'
import { DefaultPagination } from '../../common-library/common-consts/const';

const { TabPane } = Tabs;



function ProductionPlanBody({
  tabData,
  setCurrentTab,
  currentTab,
  setEntities,
  setPaginationProps
}: {
  tabData: any[],
  setCurrentTab: (tab: string | undefined) => void;
  currentTab: string | undefined;
  setEntities: (el: any) => void;
  setPaginationProps: (el: any) => void;
}) {

  function callback(key: string | undefined) {
    setCurrentTab(key)
    setEntities([])
    setPaginationProps(DefaultPagination)
  }
  

  return (
    <Card>
      {/* {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />} */}
      <CardBody>
        <Tabs defaultActiveKey={currentTab} onChange={callback} tabBarStyle={{ color: '#27AE60' }} className="production-plan-tab-active">
          {tabData.map((item: any, key: number) => (
            <TabPane tab={item.tabTitle} key={'' + key}>
              <MasterTable
                entities={item.entities}
                columns={item.columns}
                total={item.total}
                loading={item.loading}
                paginationParams={item.paginationParams}
                setPaginationParams={item.setPaginationParams}
                onSelectMany={item.onSelectMany}
                selectedEntities={item.selectedEntities}
                removeSelectRow
              />
            </TabPane>
          ))}
        </Tabs>
        {/* <MasterTreeStructure /> */}
      </CardBody>
    </Card>
  );
}

export default ProductionPlanBody;
