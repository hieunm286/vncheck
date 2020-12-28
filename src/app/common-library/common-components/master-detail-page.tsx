import React, { Fragment, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { getField } from '../helpers/common-function';
import _ from 'lodash';
import ImgGallery from '../forms/image-gallery';
import { MasterTable } from './master-table';
import BootstrapTable from 'react-bootstrap-table-next';

const getFieldV3 = (field: any, fieldName: string) => {
  const ifNested = (fN: string) => fN.indexOf('.') === -1;
  const ifArray = (k: string) => k.indexOf('[') > -1;

  if (ifNested(fieldName)) {
    return [field[fieldName]];
  }
  const arrName = fieldName.split('.');
  // let ke/y = arrName[0];
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
  console.log(fields);
  return fields;
};

export function MasterEntityDetailPage({
  title = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
  moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
  entity,
  onClose,
  renderInfo,
  mode,
  homeURL,
  code,
  get,
  allFormButton,
}: {
  title?: string;
  moduleName?: string;
  entity: any;
  renderInfo: any;
  onClose: () => void;
  mode: 'line' | 'split';
  homeURL?: string;
  code: string | null;
  get: (code: string) => any | null;
  allFormButton?: any;
}) {
  const intl = useIntl();

  const [entityDetail, setEntityDetail] = useState();

  const history = useHistory();

  console.log(entityDetail);

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        setEntityDetail(res.data);
      });
    }
  }, [code]);
  return (
    <>
      {mode === 'line' && (
        <LineMode
          title={title}
          entityDetail={entityDetail}
          renderInfo={renderInfo}
          intl={intl}
          moduleName={moduleName}
          history={history}
          homeURL={homeURL}
        />
      )}
      {mode === 'split' && (
        <>
        <SplitMode
          title={title}
          entityDetail={entityDetail}
          renderInfo={renderInfo}
          intl={intl}
          moduleName={moduleName}
          history={history}
          homeURL={homeURL}
          allFormButton={allFormButton}
        />
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
      )}
    </>
  );
}

// eslint-disable-next-line no-lone-blocks
const LineMode = ({ entityDetail, renderInfo, intl, title, moduleName, history, homeURL }: any) => (
  <Card>
    <CardHeader
      title={
        <>
          <span
            onClick={() => {
              if (homeURL) {
                history.push(homeURL);
              } else {
                history.goBack();
              }
            }}>
            <ArrowBackIosIcon />
          </span>
          {intl.formatMessage({ id: title }).toUpperCase()}
        </>
      }
    />
    <CardBody>
      {renderInfo.map((value: any, key: any) => (
        <div key={key} className="mt-5">
          <p className="text-primary" style={{ fontWeight: 600 }}>{value.header}</p>
          <div className={value.className} style={{ color: '#000000' }}>
            {value.data.map((el: any, elKey: number) => (
              <div key={elKey} className={value.className ? `col-md-${12 / value.data.length} col-12 border-bottom pb-10` : `border-bottom pb-10`}>
                {el.map((child: any, childKey: string) => {
                  const Separator = () =>
                    child.separator ? (
                      typeof child.separator === 'string' ? (
                        <Fragment>{child.separator}</Fragment>
                      ) : (
                        child.separator
                      )
                    ) : (
                      <Fragment>, </Fragment>
                    );
                  switch (child.type) {
                    case 'string':
                      return (
                        <div className="mt-3" key={childKey}>
                          <div className="row no-gutters">
                            <p className={value.className ? 'col-4' : 'col-2'}>{child.title}:</p>
                            <p className={value.className ? 'col-8' : 'col-10'}>
                              {entityDetail ? (
                                getFieldV3(entityDetail, child.keyField).map((f, i, arr) => {
                                  return (
                                    <Fragment>
                                      {child.convertFn ? child.convertFn(f) : f}
                                      {i < arr.length - 1 && <Separator />}
                                    </Fragment>
                                  );
                                })
                              ) : (
                                <Fragment>'Empty'</Fragment>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    case 'date-time':
                      return (
                        <div className="mt-3" key={childKey}>
                          <div className="row no-gutters">
                            <p className={value.className ? 'col-4' : 'col-2'}>{child.title}:</p>
                            <p className={value.className ? 'col-8' : 'col-10'}>
                              {entityDetail ? (
                                getFieldV3(entityDetail, child.keyField).map((f, i, arr) => {
                                  const date_input = new Date(f);
                                  return (
                                    <Fragment>
                                      {child.convertFn
                                        ? child.convertFn(f)
                                        : format(
                                            date_input,
                                            child.format ? child.format : 'dd/MM/yyyy H:mma',
                                          )}
                                      {i < arr.length - 1 && <Separator />}
                                    </Fragment>
                                  );
                                })
                              ) : (
                                <Fragment>'Empty'</Fragment>
                              )}
                            </p>
                          </div>
                        </div>
                      );

                    case 'link':
                      return (
                        <div className="mt-3" key={childKey}>
                          <div className="row no-gutters">
                            <p className="col-4">{child.title}:</p>
                            <div className="col-8">
                              <Link
                                to={
                                  entityDetail ? `${child.path}/${entityDetail[child.params]}` : ''
                                }>
                                {entityDetail ? (
                                  getFieldV3(entityDetail, child.keyField).map((f, i, arr) => {
                                    return (
                                      <Fragment>
                                        {child.convertFn ? child.convertFn(f) : f}
                                        {i < arr.length - 1 && <Separator />}
                                      </Fragment>
                                    );
                                  })
                                ) : (
                                  <Fragment>'Empty'</Fragment>
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );

                      case 'table':
                        const entities = entityDetail ? getField(entityDetail, child.keyField) : []
                        return (
                          <div className="mt-3" key={childKey}>
                            <BootstrapTable 
                              wrapperClasses="table-responsive"
                              bordered={false}
                              classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
                              bootstrap4
                              remote
                              keyField="_id"
                              data={entities || []}
                              columns={Object.values(child.columns) || []}
                            />
                        </div>
                        )

                    case 'image':
                      return (
                        <div className="mt-3" key={childKey}>
                          {/* <div className="row">
                            <p className="col-4">{child.title}:</p>
                            <div className="col-8">
                              {entityDetail ? (
                                getFieldV3(entityDetail, child.keyField).map((f, i, arr) => {
                                  return (
                                    <Fragment>
                                      <img
                                        src={child.convertFn ? child.convertFn(f) : f}
                                        alt="..."
                                        width="125px"
                                      />
                                      {i < arr.length - 1 && <Separator />}
                                    </Fragment>
                                  );
                                })
                              ) : (
                                <img src={''} alt="..." width="125px" />
                              )}
                            </div>
                          </div> */}

                          <ImgGallery
                            label={el[childKey].title}
                            labelWidth={4}
                            name={key}
                            isHorizontal
                            photo={entityDetail && getField(entityDetail, child.keyField)}
                            mode='single'
                          />
                        </div>
                      );
                  }
                  return <></>;
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </CardBody>
  </Card>
);

const SplitMode = ({
  entityDetail,
  renderInfo,
  intl,
  title,
  moduleName,
  history,
  homeURL,
  allFormButton
}: any) => (
  <>
    {renderInfo.map((value: any, key: any) => (
      <React.Fragment key={key}>
        <Card>
          {key === 0 && (
            <CardHeader
              title={
                <>
                  <span
                    onClick={() => {
                      if (homeURL) {
                        history.push(homeURL);
                      } else {
                        history.goBack();
                      }
                    }}>
                    <ArrowBackIosIcon />
                  </span>
                  {intl.formatMessage({ id: title }).toUpperCase()}
                </>
              }
            />
          )}
          <CardBody>
            <div key={key} className="mt-5">
              <p className="text-primary font-weight-bold">{value.header}</p>
              <div className="row no-gutters">
                {value.data.map((el: any, elKey: number) => (
                  <div key={elKey} className={`col-md-6 col-12`}>
                    {el.map((child: any, childKey: string) => {
                      const Separator = () =>
                        child.separator ? (
                          typeof child.separator === 'string' ? (
                            <Fragment>{child.separator}</Fragment>
                          ) : (
                            child.separator
                          )
                        ) : (
                          <Fragment>, </Fragment>
                        );
                      switch (el[childKey].type) {
                        case 'string':
                          return (
                            <div className="mt-3" key={childKey}>
                              <div className="row no-gutters">
                                <p className="col-4">{el[childKey].title}:</p>
                                <p className="col-8">
                                  {entityDetail ? (
                                    _.isArray(getField(entityDetail, child.keyField)) ? (
                                      getField(
                                        entityDetail,
                                        child.keyField,
                                      ).map((f: any, i: number) => <p key={i}>{f.lastName}</p>)
                                    ) : (
                                      getFieldV3(entityDetail, child.keyField).map((f, i, arr) => {
                                        return (
                                          <Fragment>
                                            {child.convertFn ? child.convertFn(f) : f}
                                            {i < arr.length - 1 && <Separator />}
                                          </Fragment>
                                        );
                                      })
                                    )
                                  ) : (
                                    // getField(entityDetail, child.keyField)
                                    <Fragment>'Empty'</Fragment>
                                  )}
                                </p>
                              </div>
                            </div>
                          );

                        case 'array':
                          const arr = entityDetail ? getField(entityDetail, child.keyField) : []
                          return (
                            <div className="mt-3" key={childKey}>
                              <div className="row no-gutters">
                                <p className="col-4">{el[childKey].title}:</p>
                                <p className="col-8">
                                  {entityDetail ? (
                                    arr.map((f: any, i: number) => (
                                      <span key={i}>{getField(f, el[childKey].target)}
                                      {i < arr.length - 1 && ','}</span>
                                    ))
                                  ) : (
                                    <Fragment>'Empty'</Fragment>
                                  )}
                                </p>
                              </div>
                            </div>
                          );

                        case 'date-time':
                          return (
                            <div className="mt-3" key={childKey}>
                              <div className="row no-gutters">
                                <p className="col-4">{child.title}:</p>
                                <p className="col-8">
                                  {entityDetail ? (
                                    getFieldV3(entityDetail, child.keyField).map((f, i, arr) => {
                                      const date_input = new Date(f);
                                      return (
                                        <Fragment>
                                          {child.convertFn
                                            ? child.convertFn(f)
                                            : format(
                                                date_input,
                                                child.format ? child.format : 'dd/MM/yyyy H:mma',
                                              )}
                                          {i < arr.length - 1 && <Separator />}
                                        </Fragment>
                                      );
                                    })
                                  ) : (
                                    <Fragment>'Empty'</Fragment>
                                  )}
                                </p>
                              </div>
                            </div>
                          );

                        case 'image':
                          return (
                            <div className="mt-3" key={childKey}>
                              {/* <ImgGallery
                                label={el[childKey].title}
                                labelWidth={4}
                                name={key}
                                isHorizontal
                                photos={
                                  entity && entity[childKey]
                                    ? entity[childKey]
                                    : [
                                        {
                                          src: 'https://source.unsplash.com/aZjw7xI3QAA/1144x763',
                                          author: 'Nguyễn Minh Hiếu',
                                          time: '26/09/2020 9:00',
                                          location: `21°01'10.1"N 105°47'28.6"E`,
                                          thumbnail:
                                            'https://source.unsplash.com/aZjw7xI3QAA/100x67',
                                        },
                                        {
                                          src: 'https://source.unsplash.com/c77MgFOt7e0/1144x763',
                                          author: 'Nguyễn Minh Hiếu',
                                          time: '26/09/2020 9:00',
                                          location: `21°01'10.1"N 105°47'28.6"E`,
                                          thumbnail:
                                            'https://source.unsplash.com/c77MgFOt7e0/100x67',
                                        },
                                        {
                                          src: 'https://source.unsplash.com/QdBHnkBdu4g/1144x763',
                                          author: 'Nguyễn Minh Hiếu',
                                          time: '26/09/2020 9:00',
                                          location: `21°01'10.1"N 105°47'28.6"E`,
                                          thumbnail:
                                            'https://source.unsplash.com/QdBHnkBdu4g/100x67',
                                        },
                                      ]
                                }
                              /> */}
                              {/* <img src={entity[childKey]} alt="..." /> */}
                            </div>
                          );
                      }
                      return <></>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        
      </React.Fragment>
    ))}
  </>
);
