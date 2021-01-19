import React from 'react';
import {Tabs} from 'antd';
import {Card, CardBody} from '../../common-library/card';
import {MasterTable} from '../../common-library/common-components/master-table';
import './style/production-plan.scss'
import {DefaultPagination} from '../../common-library/common-consts/const';

const {TabPane} = Tabs;


function ProductionPlanBody({
                              tabData,
                              setCurrentTab,
                              currentTab,
                              setEntities,
                              setPaginationProps,
                              trigger,
                              setTrigger
                            }: {
  tabData: any[],
  setCurrentTab: (tab: string | undefined) => void;
  currentTab: string | undefined;
  setEntities: (el: any) => void;
  setPaginationProps: (el: any) => void;
  trigger: boolean;
  setTrigger: (entity: boolean) => void;
}) {
  
  function callback(key: string | undefined) {
    
    if (key === currentTab) {
      setTrigger(!trigger)
    } else {
      setCurrentTab(key)
    }
    setEntities([])
    setPaginationProps(DefaultPagination)
  }
  console.log(tabData)
  
  
  return (
    <Card>
      {/* {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />} */}
      <CardBody>
        <Tabs defaultActiveKey={currentTab} onChange={callback} tabBarStyle={{color: '#27AE60'}}
              className="production-plan-tab-active">
          {tabData.map((item: any, key: number) => (
            <TabPane tab={item.tabTitle} key={'' + key}>
              <MasterTable
                entities={item.entities}
                columns={item.columns}
                total={item.total}
                loading={item.loading}
                paginationParams={item.paginationParams}
                setPaginationParams={item.setPaginationParams}
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
