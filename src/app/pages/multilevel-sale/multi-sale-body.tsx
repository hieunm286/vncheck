import React from 'react';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import { MultilevelSaleBodyProp } from './multilevel-sale.model';

const MultiLevelSaleBody: React.FC<MultilevelSaleBodyProp> = ({ title, data }) => {
  const intl = useIntl();

  return (
    <Card>
      {title && <CardHeader title={title} />}
      <CardBody>
        <div className="row no-gutters mb-10">
            <div className="col-md-6 col-12">
                <MasterTreeStructure 
                    data={data}
                />
        
            </div>
        </div>

      </CardBody>
    </Card>
  );
};

export default MultiLevelSaleBody;
