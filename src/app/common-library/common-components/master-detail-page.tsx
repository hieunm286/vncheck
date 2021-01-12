import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {Card, CardBody, CardHeader, CardStyle1} from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useHistory} from 'react-router-dom';
import _ from 'lodash';
import {RenderInfoDetail} from "../common-types/common-type";
import { harvestingDetail } from '../../pages/production-management/defined/const';

export const getFieldV3 = (field: any, fieldName: string) => {
  const ifNested = (fN: string) => fN.indexOf('.') === -1;
  const ifArray = (k: string) => k.indexOf('[') > -1;
  if (ifNested(fieldName)) {
    return [field[fieldName]];
  }
  const arrName = fieldName.split('.');
  let fields: any[] = [field];
  arrName.forEach((k, iK) => {
    let newFields: any[] = [];
    let key = k;
    if (ifArray(key)) {
      // console.log('ifArray');
      key = key.substring(1, key.length - 1);
      fields.forEach((f, i) => {
        if (f[key]) newFields.push(...f[key]);
      });
    } else {
      fields.forEach((f, i) => {
        if (f[key]) newFields.push(f[key]);
      });
    }
    
    // console.log('newFields',newFields);
    fields = newFields;
  });
  // console.log(fields);
  return fields;
};

export function MasterEntityDetailPage({
                                         header = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
                                         moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
                                         entity,
                                         onClose,
                                         renderInfo,
                                         code,
                                         get,
                                       }: {
  header?: string;
  moduleName?: string;
  entity?: any;
  renderInfo: RenderInfoDetail;
  onClose?: () => void;
  homeURL?: string;
  code?: string;
  get?: ((code: string) => any | null) | null;
}) {
  const intl = useIntl();
  
  const [entityDetail, setEntityDetail] = useState(entity || null);
  
  useEffect(() => {
    setEntityDetail(entity);
  }, [entity])
  
  useEffect(() => {
    if (code && get) {
      get(code).then((res: { data: any }) => {
        setEntityDetail(res.data);
      });
    }
  }, [code]);
  return (
    <>
    <Card>
      <CardHeader
        className={'border-bottom-0 pl-0 large-font-size'}
        title={(<a
            onClick={onClose}
            className={'cursor-pointer text-primary font-weight-boldest'}>
            {onClose && (<ArrowBackIosIcon/>)}
            {intl
              .formatMessage(
                {id: header},
                {moduleName: intl.formatMessage({id: moduleName})},
              )
              .toUpperCase()}
          </a>
        )}
      />
      <CardBody className={'p-0'}>
        <div className={`row`}>
          {renderInfo.map((value, index) => (
            <div key={index} className={`${value.className ?? 'col-md-6 col-12 border-bottom pb-10'}`}>
              {value.header && value.header !== '' && <p className="text-primary detail-dialog-subtitle">
                {intl.formatMessage({id: value.header})}
              </p>}
              <div className={'row no-gutters'}>
                {Object.keys(value.data).map((dataKey) => {
                  console.log(value.data)
                  console.log(dataKey)
                  console.log(value.data[dataKey])
                  console.log('------------------------')
                  return (
                  <>
                    {value.data[dataKey].title && value.data[dataKey].title !== '' &&
                    <div className={`${value.titleClassName ?? 'col-4 mb-10'}`}>
                      {intl.formatMessage({id: value.data[dataKey].title})}:
                    </div>}
                    <div className={`${value.dataClassName ?? 'col-8 mb-10'}`}>
                      {entityDetail && (() => {
                        const displayInfo = value.data[dataKey];
                        const fieldName = displayInfo.keyField ?? dataKey;
                        const displayData = fieldName.indexOf("[") > -1 ?
                          getFieldV3(entityDetail, fieldName) :
                          getFieldV3(entityDetail, fieldName)[0]
                          console.log(fieldName)
                          console.log(displayData)
                        return displayInfo.formatter ? displayInfo.formatter(displayData, entityDetail)
                          : (<>{(_.isNumber(displayData) || _.isString(displayData)) ? displayData : JSON.stringify(displayData)}</>)
                      })()
                      }
                    </div>
                  </>
                )})}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      
    </Card>
    {harvestingDetail.map((value, index) => {
                switch (value.style) {
                  case '1':
                    return (
                      <CardStyle1
                        header={value.header}
                        titleClassName={value.titleClassName}
                        dataClassName={value.dataClassName}
                        data={value.data}
                        entity={entityDetail}
                      />
                    );

                  default:
                    return <></>;
                }
              })}
    </>
  );
}
