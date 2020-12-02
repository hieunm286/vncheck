import React from 'react';
import { Modal } from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../card';
import ImgGallery from '../forms/image-gallery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';

export function MasterEntityDetailPage({
  title = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
  moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
  entity,
  onClose,
  renderInfo,
  mode,
  homeURL,
}: {
  title?: string;
  moduleName?: string;
  entity: any;
  renderInfo: any;
  onClose: () => void;
  mode: 'line' | 'split';
  homeURL?: string;
}) {
  const intl = useIntl();

  const history = useHistory();
  return (
    <>
      {mode === 'line' && (
        <LineMode
          title={title}
          entity={entity}
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
          entity={entity}
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
const LineMode = ({ entity, renderInfo, intl, title, moduleName, history, homeURL }: any) => (
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
                              {entity && entity[child.keyField]
                                ? child.nested
                                  ? entity[child.keyField][child.nested]
                                  : entity[child.keyField]
                                : 'Empty'}
                            </p>
                          </div>
                        </div>
                      );

                    case 'image':
                      return (
                        <div className="mt-3" key={childKey}>
                          <p className="col-4">{child.title}:</p>

                          <img src={entity[child.keyField][child.nested]} alt="..." />
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

const SplitMode = ({ entity, renderInfo, intl, title, moduleName, history, homeURL }: any) => (
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
                                  {entity && entity[childKey] ? entity[childKey] : 'Empty'}
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
                              <img src={entity[childKey]} alt="..." />
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
