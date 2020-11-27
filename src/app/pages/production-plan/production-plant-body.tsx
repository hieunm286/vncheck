import React from 'react';
import { Tabs } from 'antd';
import { Card, CardBody } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import { PaginationProps } from 'react-bootstrap';
import './style/production-plan.scss'

const { TabPane } = Tabs;

function callback(key: string | number) {
  console.log(key);
}

function ProductionPlanBody({
  tabData
}: {
  tabData: any[]
}) {
//   const masterColumn = isShowId
//     ? {
//         _id: {
//           dataField: '_id',
//           text: 'STT',
//           formatter: (cell: any, row: any, rowIndex: number) => (
//             <p>
//               {rowIndex + 1 + ((paginationParams.page ?? 0) - 1) * (paginationParams.limit ?? 0)}
//             </p>
//           ),
//           style: { paddingTop: 20 },
//         },
//         ...columns,
//       }
//     : columns;

  

  return (
    <Card>
      {/* {title && <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />} */}
      <CardBody>
        <Tabs defaultActiveKey="0" onChange={callback} tabBarStyle={{ color: '#27AE60' }} className="production-plan-tab-active">
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
