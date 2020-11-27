import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { MasterTable } from '../../common-library/common-components/master-table';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import { MultilevelSaleBodyProp } from './multilevel-sale.model';
import AddIcon from '@material-ui/icons/Add';
const MultiLevelSaleBody: React.FC<MultilevelSaleBodyProp> = ({ title, data, body, onCreate, onEdit, onDelete }) => {
  const intl = useIntl();

  return (
    <Card>
      {title && <CardHeader title={title} />}
      <CardBody>
        {/* <div className="row no-gutters mb-10">
          <div className="col-md-6 col-12">
            <MasterTreeStructure data={data} />
          </div>
        </div> */}
        <div className="row no-gutters mb-10 justify-content-center">
          {body.map((item: any, key: number) => {
            switch (item.type) {
              case 'Tree':
                return (
                  <Fragment key={key}>
                    <div className={`col-md-${(12 / body.length - 1)} col-12 border border-primary p-5 mr-md-5`}>
                      <p>{item.title} <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => {if (onCreate) {onCreate(null)}}}><AddIcon /></span></p>
                      <MasterTreeStructure data={item.data} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                  </Fragment>
                );

              case 'Table':
                return (
                  <Fragment key={key}>
                    <div className={`col-md-${(12 / body.length)} col-12 border border-primary p-5 ml-md-5`}>
                      <p>{item.title}</p>

                      <MasterTable
                        entities={item.data}
                        columns={item.prop.columns}
                        total={item.prop.total}
                        loading={item.prop.loading}
                        paginationParams={item.prop.paginationParams}
                        setPaginationParams={item.prop.setPaginationParams}
                        onSelectMany={item.prop.onSelectMany}
                        selectedEntities={item.prop.selectedEntities}
                        removeSelectRow
                      />
                    </div>
                  </Fragment>
                );
            }
            return <></>;
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default MultiLevelSaleBody;

