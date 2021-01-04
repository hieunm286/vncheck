import React, {Fragment} from 'react';
import {useIntl} from 'react-intl';
import {Card, CardBody, CardHeader} from '../../common-library/card';
import {MasterTable} from '../../common-library/common-components/master-table';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import {MultilevelSaleBodyProp} from './multilevel-sale.model';
import AddIcon from '@material-ui/icons/Add';
import './style/multilevel-sale.scss';

const showArray_v2 = (fileds: any, data: any): any => {
  const AllField: any = fileds;
  
  data.forEach((el: any, key: number) => {
    // AllField[el._id] = true;
    if (el.children && el.children.length > 0) {
      AllField[el._id] = true;
      
      showArray_v2(AllField, el.children);
    } else {
      AllField[el._id] = true;
    }
  });
  
  return AllField;
};

const MultiLevelSaleBody: React.FC<MultilevelSaleBodyProp> = ({
                                                                title,
                                                                body,
                                                                onCreate,
                                                                onEdit,
                                                                onDelete,
                                                                onFetchAgency,
                                                              }) => {
  const intl = useIntl();
  
  return (
    <Card>
      {title && <CardHeader title={intl.formatMessage({id: title})}/>}
      <CardBody>
        {/* <div className="row no-gutters mb-10">
          <div className="col-md-6 col-12">
            <MasterTreeStructure data={data} />
          </div>
        </div> */}
        <div className="row no-gutters mb-10 justify-content-between">
          {body.map((item: any, key: number) => {
            switch (item.type) {
              case 'Tree':
                return (
                  <Fragment key={key}>
                    <div className={`col-xl-${12 / body.length} col-12 pr-3`}>
                      <div className="p-5 layout">
                        <p style={{fontWeight: 'bold'}}>
                          {intl.formatMessage({id: item.title})}
                          <span
                            className="text-primary"
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                              if (onCreate) {
                                onCreate(null);
                              }
                            }}>
                            <AddIcon/>
                          </span>
                        </p>
                        <MasterTreeStructure
                          data={item.data}
                          onCreate={onCreate}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onFetchAgency={onFetchAgency}
                          showChildren={showArray_v2({}, item.data)}
                        />
                      </div>
                    </div>
                  </Fragment>
                );
              
              case 'Table':
                return (
                  <Fragment key={key}>
                    <div className={`col-xl-${12 / body.length} col-12 pl-3`}>
                      <div className="p-5 layout">
                        <p style={{fontWeight: 'bold'}}>
                          {intl.formatMessage({id: item.title})}
                        </p>
                        
                        <MasterTable
                          entities={item.data}
                          columns={item.prop.columns}
                          total={item.prop.total}
                          loading={item.prop.loading}
                          paginationParams={item.prop.paginationParams}
                          setPaginationParams={item.prop.setPaginationParams}
                        />
                      </div>
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
