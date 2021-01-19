import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { useIntl } from 'react-intl';
import { generateInitForm, GetHomePage } from '../../common-library/helpers/common-function';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import _ from 'lodash';
import { addInitField, CompareDate, initProductPlanForm } from './defined/const';
import ProductionPlanModal from './production-plan-modal';
import { ModifyEntityPage } from '../../common-library/common-components/modify-entity-page';
import { ModifyForm } from '../../common-library/common-types/common-type';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './style/production-plan.scss';
import ProductionPlanComments from './production-plan-comments';
import { diff, notifyError, notifySuccess, validationForm, validField, validNested } from './defined/crud-helped';

interface Prop {
  title: string;
  entity?: any;
  setEditEntity: (entity: any) => void;
  onModify: (values: any) => Promise<AxiosResponse<any>>;
  reduxModel?: string;
  code: string | null;
  get: (code: string) => Promise<AxiosResponse<any>>;
  onComments: (entity: any, data: { content: string }) => Promise<AxiosResponse<any>>;
  formPart: any;
  allFormField: any;
  allFormButton: any;
  validation?: any;
  autoFill?: any;
  homePage?: string;
  asyncError?: string;
  refreshData: () => void;
  tagData?: any;
  step: string;
  onApprove: (data: any) => Promise<AxiosResponse<any>>;
  updateProcess: (data: any) => Promise<AxiosResponse<any>>;
  sendRequest: (data: any) => Promise<AxiosResponse<any>>;
  approveFollow: (data: any) => Promise<AxiosResponse<any>>;
  currentTab: string | undefined;
  formModel: ModifyForm;
  moduleName?: string;
  current?: any;
  setCurrentTab?: (tab: string | undefined) => void;
}

function ProductionPlanCrud({
  entity,
  setEditEntity,
  onModify,
  moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
  code,
  get,
  allFormField,
  allFormButton,
  validation,
  autoFill,
  homePage,
  refreshData,
  step,
  onApprove,
  updateProcess,
  sendRequest,
  approveFollow,
  currentTab,
  formModel,
  onComments,
  current,
  setCurrentTab
}: Prop) {
  const intl = useIntl();
  const initForm = autoFill
    ? generateInitForm(allFormField, autoFill.field, autoFill.entity)
    : generateInitForm(allFormField);
  //   const modifyM = { ...modifyModel } as any;
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);

  const { _header, ...modifyPanels } = formModel;

  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const [confirmModal, setConfirmModal] = useState(false);
  const [noticeModal, setNoticeModal] = useState(false);


  const [commentsArr, setCommentArr] = useState(entity?.comments || []);

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        // const convert = autoFill
        //   ? ConvertSelectSearch(res.data, autoFill.searchSelectField)
        //   : ConvertSelectSearch(res.data);
        const initEntity = addInitField(res.data, initProductPlanForm);
        setEntityForEdit(initEntity);
        console.log(initEntity);
        setEditEntity(res.data);
        setCommentArr(res.data.comments || []);
      }).catch(err => {
        // notifyError('Không thể kết nối đến server')
        history.push('/production-plan')
      });
    }
  }, [code]);

  const submitHandle = (
    values: any,
    curValues: any,
    { setSubmitting, setFieldValue, resetForm }: any,
  ) => {
    onModify(values)
      .then((res: any) => {
        setNoticeModal(true);
        setErrorMsg(undefined);
        refreshData();
        notifySuccess('Lưu thành công')
        history.push(homePage || GetHomePage(window.location.pathname));
      })
      .catch(error => {
        setSubmitting(false);
        setErrorMsg(error.entity || error.response.entity);
        notifyError('Lỗi server. Vui lòng thử lại sau');
        // resetForm(entityForEdit);
      });
  };

  // const handleComment = (entity: any, comment: any) => {
  //   onComments(entity, comment)
  //     .then(res => {
  //       setCommentArr(res.data);
  //       // setComment({ content: '' });
  //       valueRef.current.value = '';
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // };

  return (
    <>
      <ProductionPlanModal
        show={confirmModal}
        mode="confirm"
        title="ĐÓNG"
        body="Kế hoạch này sẽ không được lưu"
        onClose={() => {
          setConfirmModal(false);
        }}
        onConfirm={() => {
          history.push(homePage || GetHomePage(window.location.pathname));
        }}
      />
      <ProductionPlanModal
        show={noticeModal}
        mode="notice"
        title="abc"
        body="xyz"
        onClose={() => {
          setNoticeModal(false);
        }}
        // onConfirm={() => {
        //   history.push(homePage || GetHomePage(window.location.pathname));
        // }}
      />
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit}
        // initialValues={initForm}
        validationSchema={validation}
        validate={validationForm}
        onSubmit={(values, { setSubmitting, setFieldValue, resetForm }) => {
          let updateValue: any;
          setErrorMsg(undefined);

          if (entityForEdit) {
            const clValue = { ...values };

            validField.forEach(keys => {
              if (!_.isString(clValue[keys].technical[0])) {
                clValue[keys].technical = [...entityForEdit[keys].technical]
              }

              if (!_.isString(clValue[keys].leader[0])) {
                clValue[keys].leader = [...entityForEdit[keys].leader]
              }
            })

            const diffValue = diff(entityForEdit, clValue);


            if (
              diffValue.packing &&
              _.isObject(diffValue.packing.packing) &&
              !diffValue.packing.packing.label
            ) {
              delete diffValue.packing.packing;
            }

            if (
              clValue &&
              clValue.packing &&
              clValue.packing.packing &&
              diffValue &&
              diffValue.packing
            ) {
              diffValue.packing.packing = clValue.packing.packing._id;
            }

            

            validField.forEach(keys => {
              const cvLeader: any[] = [];
              const cvTechnical: any[] = [];

              if (clValue[keys] && clValue[keys].leader) {
                clValue[keys].leader.forEach((value: any) => {
                  if (value.user) {
                    cvLeader.push(value.user._id);
                  }
                });

                clValue[keys].leader = cvLeader;
              }

              if (clValue[keys] && clValue[keys].technical) {
                clValue[keys].technical.forEach((value: any) => {
                  if (value.user) {
                    cvTechnical.push(value.user._id);
                  }
                });

                clValue[keys].technical = cvTechnical;
              }
            });

            validField.forEach(keys => {
              Object.keys(clValue[keys]).forEach(cKey => {
                if (diffValue[keys] && !diffValue[keys][cKey] && validNested.includes(cKey)) {
                  diffValue[keys][cKey] = clValue[keys][cKey];
                }
              });
            });

            validField.forEach(keys => {
              if (diffValue[keys]) {
                Object.keys(diffValue[keys]).forEach(cKey => {
                  if (
                    !diffValue[keys][cKey] ||
                    (_.isArray(diffValue[keys][cKey]) && diffValue[keys][cKey].length === 0)
                  ) {
                    delete diffValue[keys][cKey];
                  }
                });

                if (_.isEmpty(diffValue[keys])) {
                  delete diffValue[keys];
                }
              }
            });

            Object.keys(diffValue).forEach(key => {
              if (!validField.includes(key)) {
                delete diffValue[key];
              }
            })

            updateValue = { _id: values._id, ...diffValue };
          
          console.log(entityForEdit)
          console.log(values);
          console.log(updateValue)

          if (step === '0') {
            submitHandle(updateValue, values, { setSubmitting, setFieldValue, resetForm });
          } else if (step === '1' && current !== '2' && current !== '5') {
            // if (!updateValue.step || updateValue.step !== '1') {
            //   updateValue.step = '1';
            // }
            // submitHandle(updateValue, { setSubmitting, setFieldError });
            onModify(updateValue)
              .then((res: any) => {
                sendRequest(entityForEdit)
                  .then(ress => {
                    setErrorMsg(undefined);
                    refreshData();
                    if (setCurrentTab) { setCurrentTab('1') }
                    notifySuccess('Gửi duyệt thành công')
                    history.push(homePage || GetHomePage(window.location.pathname));
                  })
                  .catch(error => {
                    setSubmitting(false);
                    setErrorMsg(error.entity || error.response.entity);
                    notifyError('Lỗi server. Vui lòng thử lại sau');
                    console.log('1')
                    // resetForm(entityForEdit);
                  });
              })
              .catch(error => {
                setSubmitting(false);
                setErrorMsg(error.entity || error.response.entity);
                notifyError('Lỗi server. Vui lòng thử lại sau');
                console.log('2')
                // resetForm(entityForEdit);
              });
          } else if (step === '1' && current && (current === '2' || current === '5')) {
            approveFollow(updateValue)
              .then(res => {
                setErrorMsg(undefined);
                refreshData();
                if (setCurrentTab) { setCurrentTab('1') }
                notifySuccess('Gửi duyệt thành công')
                history.push(homePage || GetHomePage(window.location.pathname));
              })
              .catch(error => {
                setSubmitting(false);
                setErrorMsg(error.entity || error.response.entity);
                notifyError('Lỗi server. Vui lòng thử lại sau');
                console.log('3')
                // resetForm(entityForEdit);
              });
          }
        }
        }}>
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(modifyPanels).map((key, index) => {
                const val = modifyPanels[key];
                if (!_.isObject(val)) throw new Error('Sử dụng sai cách ' + key);
                const { _title, _validationField, ...panel } = val;
                console.log(_validationField);
                return (
                  <Card
                    key={key}
                    className={
                      _validationField &&
                      errors[_validationField] &&
                      _.isString(errors[_validationField])
                        ? 'border border-danger'
                        : ''
                    }>
                    {index === 0 && (
                      <CardHeader
                        className={'border-bottom-0'}
                        title={
                          <span
                            onClick={() => history.goBack()}
                            className={'cursor-pointer text-primary font-weight-boldest'}>
                            <ArrowBackIosIcon />
                            {intl
                              .formatMessage(
                                { id: _header },
                                { moduleName: intl.formatMessage({ id: moduleName }) },
                              )
                              .toUpperCase()}
                          </span>
                        }
                      />
                    )}

                    <CardBody>
                      <ModifyEntityPage inputGroups={panel} errors={errors} />

                      {_validationField &&
                        errors[_validationField] &&
                        _.isString(errors[_validationField]) && (
                          <span className="text-danger pl-xl-15 pl-md-10 pl-5">
                            Vui lòng nhập đúng thứ tự các bước
                          </span>
                        )}
                    </CardBody>
                  </Card>
                );
              })}
            </Form>
            <ProductionPlanComments entity={entityForEdit} onComments={onComments}  />
            {/* {errors && (
              <div className="text-left mt-5">
                <span className="text-danger">{JSON.stringify(errors)}</span>
              </div>
            )} */}
            {allFormButton.type === 'outside' && (
              <div className="text-right mb-5 mr-20">
                {Object.keys(allFormButton.data).map(keyss => {
                  switch (allFormButton.data[keyss].role) {
                    case 'submit':
                      return (
                        <button
                          type={allFormButton.data[keyss].type}
                          onClick={() => {
                            handleSubmit();
                            allFormButton.data[keyss].onClick();
                          }}
                          className={allFormButton.data[keyss].className}
                          key={keyss}>
                          {allFormButton.data[keyss].icon} {intl.formatMessage({ id: allFormButton.data[keyss].label })}
                        </button>
                      );

                    case 'special':
                      return (
                        <button
                          type={allFormButton.data[keyss].type}
                          onClick={() => {
                            handleSubmit();
                            allFormButton.data[keyss].onClick();
                          }}
                          className={allFormButton.data[keyss].className}
                          key={keyss}>
                          {allFormButton.data[keyss].icon ?? <></>}{' '}
                          {intl.formatMessage({ id: allFormButton.data[keyss].label })}
                        </button>
                      );

                    case 'button':
                      return (
                        <button
                          type={allFormButton.data[keyss].type}
                          className={allFormButton.data[keyss].className}
                          key={keyss}
                          onClick={() => {
                            allFormButton.data[keyss].onClick();
                          }}>
                          {allFormButton.data[keyss].icon} {intl.formatMessage({ id: allFormButton.data[keyss].label })}
                        </button>
                      );
                    case 'link-button':
                      return (
                        // <Link to={allFormButton.data[keyss].linkto} key={keyss}>
                        <button
                          type={allFormButton.data[keyss].type}
                          className={allFormButton.data[keyss].className}
                          key={keyss}
                          onClick={() => {
                            setConfirmModal(true);
                          }}>
                          {allFormButton.data[keyss].icon} {intl.formatMessage({ id: allFormButton.data[keyss].label })}
                        </button>
                        // </Link>
                      );

                      default:
                        return <></>
                  }
                })}
              </div>
            )}
          </>
        )}
      </Formik>
    </>
  );
}

export default ProductionPlanCrud;
