import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { getFieldV3 } from '../../common-library/common-components/master-detail-page';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { RenderInfoDetail } from '../../common-library/common-types/common-type';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { AxiosResponse } from 'axios';
import LockIcon from '@material-ui/icons/Lock';

export function FTDetail({
  header,
  moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
  entity,
  onClose,
  renderInfo,
  homeURL,
  code,
  get,
  allFormButton,
  onComments,
  setDetailEntity,
  showComment = true
}: {
  header?: string;
  moduleName?: string;
  entity?: any;
  renderInfo: RenderInfoDetail;
  onClose?: () => void;
  homeURL?: string;
  code?: string;
  get?: (code: string) => any;
  allFormButton?: any;
  onComments?: (entity: any, data: { content: string }) => Promise<AxiosResponse<any>>;
  setDetailEntity?: (entity: any) => void;
  showComment?: boolean;
}) {
  const intl = useIntl();

  const [entityDetail, setEntityDetail] = useState(entity);

  const history = useHistory();

  useEffect(() => {
    setEntityDetail(entity)
  }, [entity])

  useEffect(() => {
    if (code && get) {
      get(code).then((res: { data: any }) => {
        setEntityDetail(res.data);
       
        if (setDetailEntity) {
          setDetailEntity(res.data);
        }
      });
    }
  }, [code]);

  return (
    <>
      {renderInfo.map((value, index) => (
        <React.Fragment key={index}>
          <Card>
            <CardBody className={'p-0'}>
              <div className={`row mt-5`}>
                <div
                  key={index}
                  className={`${value.className ?? 'col-md-6 col-12 border-bottom pb-10'}`}>
                  {value.header && value.header !== '' && (
                    <p className="text-primary detail-dialog-subtitle">
                      {intl.formatMessage({ id: value.header })}
                    </p>
                  )}
                  <div className={'row no-gutters'}>
                    {Object.keys(value.data).map(dataKey => (
                      <>
                        {value.data[dataKey].title && value.data[dataKey].title !== '' && (
                          <div className={`${value.titleClassName ?? 'col-4 mb-10'}`}>
                            {intl.formatMessage({ id: value.data[dataKey].title })}{value.data[dataKey].title !== 'EMPTY' ? ':' : ''}
                          </div>
                        )}
                        <div className={`${value.dataClassName ?? 'col-8 mb-10'}`}>
                          {entityDetail &&
                            (() => {
                              const displayInfo = value.data[dataKey];
                              const fieldName = displayInfo.keyField ?? dataKey;
                              const displayData =
                                fieldName.indexOf('[') > -1
                                  ? getFieldV3(entityDetail, fieldName)
                                  : getFieldV3(entityDetail, fieldName)[0];

                                  console.log(displayData)
                                  console.log(displayInfo)
                             
                              return displayInfo.formatter ? !displayData ? <><LockIcon /> Không có thông tin hoặc Bạn không có quyền xem thông tin này </> : displayData.length === 0 ? <><LockIcon /> Không có thông tin hoặc Bạn không có quyền xem thông tin này </> : (
                                displayInfo.formatter(displayData, entityDetail)
                              ) : (
                                <>
                                  {displayData && (_.isNumber(displayData) || _.isString(displayData))
                                    ? displayData
                                    : JSON.stringify(displayData)}
                                    {
                                        !displayData && <><LockIcon /> Không có thông tin hoặc Bạn không có quyền xem thông tin này </>
                                    }
                                </>
                              );
                            })()}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </React.Fragment>
      ))}
    
    </>
  );
}
