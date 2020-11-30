import React, { Dispatch, SetStateAction } from 'react';
import { Tabs } from 'antd';
import { Card, CardBody } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import { PaginationProps } from 'react-bootstrap';
import './style/production-plan.scss'

const { TabPane } = Tabs;



function ProductionPlanBody({
  tabData,
  setCurrentTab,
  currentTab
}: {
  tabData: any[],
  setCurrentTab: (tab: string | undefined) => void;
  currentTab: string | undefined;
}) {

  function callback(key: string | undefined) {
    setCurrentTab(key)
  }
  

  return (
    <Card>
      {/* {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />} */}
      <CardBody>
        <Tabs defaultActiveKey={currentTab} onChange={callback} tabBarStyle={{ color: '#27AE60' }} className="production-plan-tab-active">
          {/* <TabPane tab="Tab 1" key="1">
            <MasterTable
              entities={entities}
              columns={masterColumn}
              total={total}
              loading={loading}
              paginationParams={paginationParams}
              setPaginationParams={setPaginationParams}
              onSelectMany={onSelectMany}
              selectedEntities={selectedEntities}
            />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane> */}
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
