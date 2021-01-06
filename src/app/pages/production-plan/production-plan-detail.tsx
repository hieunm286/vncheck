import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { getFieldV3 } from '../../common-library/common-components/master-detail-page';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import { RenderInfoDetail } from '../../common-library/common-types/common-type';

export function ProductionPlanDetail({
  header = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
  moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
  entity,
  onClose,
  renderInfo,
  homeURL,
  code,
  get,
  allFormButton,
}: {
  header?: string;
  moduleName?: string;
  entity?: any;
  renderInfo: RenderInfoDetail;
  onClose: () => void;
  homeURL?: string;
  code: string | null;
  get: (code: string) => any | null;
  allFormButton?: any;
}) {
  const intl = useIntl();

  const [entityDetail, setEntityDetail] = useState(entity);

  const history = useHistory();
  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        setEntityDetail(res.data);
      });
    }
  }, [code]);
  return (
    <>
      {renderInfo.map((value, index) => (
        <React.Fragment key={index}>
          <Card>
            {index === 0 && (
              <CardHeader
                className={'border-bottom-0 pl-0 large-font-size'}
                title={
                  <a
                    onClick={() => history.goBack()}
                    className={'cursor-pointer text-primary font-weight-boldest'}>
                    <ArrowBackIosIcon />
                    {intl
                      .formatMessage(
                        { id: header },
                        { moduleName: intl.formatMessage({ id: moduleName }) },
                      )
                      .toUpperCase()}
                  </a>
                }
              />
            )}
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
                            {intl.formatMessage({ id: value.data[dataKey].title })}:
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
																	console.log(entityDetail)
																	console.log(fieldName)
                              console.log(displayData);
                              return displayInfo.formatter ? (
                                displayInfo.formatter(displayData, entityDetail)
                              ) : (
                                <>
                                  {_.isNumber(displayData) || _.isString(displayData)
                                    ? displayData
                                    : JSON.stringify(displayData)}
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
      {allFormButton && allFormButton.type === 'outside' && (
        <div className="text-right mb-5 mr-20">
          {Object.keys(allFormButton.data).map(keyss => {
            switch (allFormButton['data'][keyss].role) {
              case 'submit':
                return (
                  <button
                    type={allFormButton['data'][keyss].type}
                    onClick={() => {
                      // handleSubmit();
                      allFormButton['data'][keyss].onClick();
                    }}
                    className={allFormButton['data'][keyss].className}
                    key={keyss}>
                    {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                  </button>
                );

              case 'special':
                return (
                  <button
                    type={allFormButton['data'][keyss].type}
                    onClick={() => {
                      // handleSubmit();
                      allFormButton['data'][keyss].onClick(entityDetail);
                    }}
                    className={allFormButton['data'][keyss].className}
                    key={keyss}>
                    {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                  </button>
                );

              case 'button':
                return (
                  <button
                    type={allFormButton['data'][keyss].type}
                    className={allFormButton['data'][keyss].className}
                    key={keyss}
                    onClick={() => {
                      allFormButton['data'][keyss].onClick(entityDetail);
                    }}>
                    {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                  </button>
                );
              case 'link-button':
                return (
                  <Link to={allFormButton['data'][keyss].linkto} key={keyss}>
                    <button
                      type={allFormButton['data'][keyss].type}
                      className={allFormButton['data'][keyss].className}>
                      {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                    </button>
                  </Link>
                );
            }
          })}
        </div>
      )}
    </>
  );
}