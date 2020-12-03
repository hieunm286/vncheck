import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../card';
import ImgGallery from '../forms/image-gallery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';

const getField = (field: any, fieldName: string) => {
  console.log(field);
  console.log(fieldName);
  if (fieldName.indexOf('.') === -1) {
    return field[fieldName];
  }

  const arrName = fieldName.split('.');

  let fields: any = field[arrName[0]];

  console.log(fields);

  arrName.forEach((el: string, key: number) => {
    if (key > 0) {
      fields = fields[el];
    }
  });

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
        <SplitMode
          title={title}
          entityDetail={entityDetail}
          renderInfo={renderInfo}
          intl={intl}
          moduleName={moduleName}
          history={history}
          homeURL={homeURL}
        />
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
          <p className="text-primary font-weight-bold">{value.header}</p>
          <div className="row">
            {value.data.map((el: any, elKey: number) => (
              <div key={elKey} className={`col-md-6 col-12 border-bottom pb-10`}>
                {el.map((child: any, childKey: string) => {
                  switch (child.type) {
                    case 'string':
                      return (
                        <div className="mt-3" key={childKey}>
                          <div className="row">
                            <p className="col-4">{child.title}:</p>
                            <p className="col-8">
                              {entityDetail ? getField(entityDetail, child.keyField) : 'Empty'}
                            </p>
                          </div>
                        </div>
                      );

                    case 'link':
                      return (
                        <div className="mt-3" key={childKey}>
                          <div className="row">
                            <p className="col-4">{child.title}:</p>
                            <div className="col-8">
                              <Link to={entityDetail ? `${child.path}/${entityDetail[child.params]}` : ''}>
                                {entityDetail ? getField(entityDetail, child.keyField) : 'Empty'}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );

                    case 'image':
                      return (
                        <div className="mt-3" key={childKey}>
                          <div className="row">
                            <p className="col-4">{child.title}:</p>
                            <div className="col-8">
                              <img
                                src={entityDetail ? getField(entityDetail, child.keyField) : ''}
                                alt="..."
                                width="125px"
                              />
                            </div>
                          </div>

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
                                      thumbnail: 'https://source.unsplash.com/aZjw7xI3QAA/100x67',
                                    },
                                    {
                                      src: 'https://source.unsplash.com/c77MgFOt7e0/1144x763',
                                      author: 'Nguyễn Minh Hiếu',
                                      time: '26/09/2020 9:00',
                                      location: `21°01'10.1"N 105°47'28.6"E`,
                                      thumbnail: 'https://source.unsplash.com/c77MgFOt7e0/100x67',
                                    },
                                    {
                                      src: 'https://source.unsplash.com/QdBHnkBdu4g/1144x763',
                                      author: 'Nguyễn Minh Hiếu',
                                      time: '26/09/2020 9:00',
                                      location: `21°01'10.1"N 105°47'28.6"E`,
                                      thumbnail: 'https://source.unsplash.com/QdBHnkBdu4g/100x67',
                                    },
                                  ]
                            }
                          /> */}
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
              <div className="row">
                {value.data.map((el: any, elKey: number) => (
                  <div key={elKey} className={`col-md-6 col-12`}>
                    {Object.keys(el).map((childKey: string) => {
                      switch (el[childKey].type) {
                        case 'string':
                          return (
                            <div className="mt-3" key={childKey}>
                              <div className="row">
                                <p className="col-4">{el[childKey].title}:</p>
                                <p className="col-8">
                                  {/* {entity && entity[childKey] ? entity[childKey] : 'Empty'} */}
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
