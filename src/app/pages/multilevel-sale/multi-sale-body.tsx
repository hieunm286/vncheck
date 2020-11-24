import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import { MultilevelSaleBodyProp } from './multilevel-sale.model';

const MultiLevelSaleBody: React.FC<MultilevelSaleBodyProp> = ({ title, data, body }) => {
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
        <div className="row no-gutters mb-10">
          {body.map((item: any, key: number) => {
            switch (item.type) {
              case 'Tree':
                return (
                  <Fragment key={key}>
                    <div className={`col-md-${12 / body.length} col-12`}>
                      <p>{item.title}</p>
                      <MasterTreeStructure data={item.data} />
                    </div>
                  </Fragment>
                );

              case 'Table':
                return (
                  <Fragment key={key}>
                    <div className={`col-md-${12 / body.length} col-12`}>
                      <p>cccc</p>
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
