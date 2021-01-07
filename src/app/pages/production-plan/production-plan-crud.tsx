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
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Input } from 'antd';
import './style/production-plan.scss';
import { FormControl } from 'react-bootstrap';
import { TextareaAutosize } from '@material-ui/core';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { TextArea } = Input;

const notifyError = (error: string) => {
  toast.error(error
    , {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};

const diff = (obj1: any, obj2: any) => {
  if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
    return obj1;
  }

  let diffs: any = {};
  let key;

  let arraysMatch = function(arr1: any, arr2: any) {
    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;
  };

  let compare = function(item1: any, item2: any, key: any) {
    // Get the object type
    let type1 = Object.prototype.toString.call(item1);
    let type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
      diffs[key] = null;
      return;
    }

    // If items are different types
    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    // If an object, compare recursively
    if (type1 === '[object Object]') {
      let objDiff: any = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    // If an array, compare
    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[key] = item2;
      }
      return;
    }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };

  //
  // Compare our objects
  //

  // Loop through the first object
  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      compare(obj1[key], obj2[key], key);
    }
  }

  // Loop through the second object and find missing items
  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  // Return the object of differences
  return diffs;
};

function ProductionPlanCrud({
  entity,
  setEditEntity,
  onModify,
  title,
  // modifyModel,
  reduxModel,
  moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
  code,
  get,
  formPart,
  allFormField,
  allFormButton,
  validation,
  autoFill,
  homePage,
  asyncError,
  refreshData,
  tagData,
  step,
  onApprove,
  updateProcess,
  sendRequest,
  approveFollow,
  currentTab,
  formModel,
  onComments,
}: {
  // modifyModel: ModifyModel;
  title: string;
  entity: any;
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
}) {
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

  const valueRef = React.useRef<any>({ value: '' })

  const [commentsArr, setCommentArr] = useState(entity.comments || []);

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        // const convert = autoFill
        //   ? ConvertSelectSearch(res.data, autoFill.searchSelectField)
        //   : ConvertSelectSearch(res.data);
        const initEntity = addInitField(res.data, initProductPlanForm);
        setEntityForEdit(initEntity);
        setEditEntity(res.data);
        setCommentArr(res.data.comments || []);
      });
    }
  }, [code]);

  const submitHandle = (
    values: any,
    curValues: any,
    { setSubmitting, setFieldError, resetForm }: any,
  ) => {
    onModify(values)
      .then((res: any) => {
        setNoticeModal(true);
        setErrorMsg(undefined);
        refreshData();
        history.push(homePage || GetHomePage(window.location.pathname));
      })
      .catch(error => {
        setSubmitting(false);
        setErrorMsg(error.entity || error.response.entity);
      });
  };

  const handleComment = (comment: any) => {
    onComments(entityForEdit, comment)
      .then(res => {
        setCommentArr(res.data);
        // setComment({ content: '' });
        valueRef.current.value = ''
      })
      .catch(err => {
        throw err;
      });
  };

  const validate = (values: any) => {
    if (values.packing.estimatedQuantity && !_.isInteger(values.packing.estimatedQuantity)) {
      return { status: false, field: 'packing.estimatedQuantity', message: 'Số lượng đóng gói phải là số nguyên' };
    }
    if (values.harvesting.estimatedTime &&
      values.preliminaryTreatment.estimatedTime &&
      !CompareDate(
        new Date(values.preliminaryTreatment.estimatedTime),
        new Date(values.harvesting.estimatedTime),
      )) {
        return { status: false, field: 'preliminaryTreatment.estimatedTime', message: 'Ngày sơ chế không được nhỏ hơn ngày thu hoạch' };
      }

    if (values.planting.expectedQuantity && values.preliminaryTreatment.estimatedQuantity && values.planting.expectedQuantity < values.preliminaryTreatment.estimatedQuantity) {
      return { status: false, field: 'preliminaryTreatment.estimatedQuantity', message: 'Sản lượng sơ chế không được lớn hơn sản lượng thu hoạch' }
    }
    if (
      values.preliminaryTreatment.estimatedTime &&
      values.cleaning.estimatedTime &&
      !CompareDate(
        new Date(values.cleaning.estimatedTime),
        new Date(values.preliminaryTreatment.estimatedTime),
      )
    ) {
      return { status: false, field: 'cleaning.estimatedTime', message: 'Ngày làm sạch không được nhỏ hơn ngày sơ chế' };
    }
    if (values.preliminaryTreatment.estimatedQuantity && values.cleaning.estimatedQuantity && values.preliminaryTreatment.estimatedQuantity < values.cleaning.estimatedQuantity) {
      return { status: false, field: 'cleaning.estimatedQuantity', message: 'Sản lượng làm sạch không được lớn hơn sản lượng sơ chế' }
    }
    if (
      values.cleaning.estimatedTime &&
      values.packing.estimatedTime &&
      !CompareDate(
        new Date(values.packing.estimatedTime),
        new Date(values.cleaning.estimatedTime),
      )
    ) {
      return { status: false, field: 'packing.estimatedTime', message: 'Ngày đóng gói không được nhỏ hơn ngày làm sạch' };
    }
    // if (values.cleaning.estimatedQuantity && values.packing.estimatedQuantity && values.cleaning.estimatedQuantity < values.packing.estimatedQuantity) {
    //   return { status: false, field: 'packing.estimatedQuantity', message: 'Sản lượng đóng gói không được lớn hơn sản lượng làm sạch' }
    // }
    if (
      values.packing.estimatedTime &&
      values.preservation.estimatedStartTime &&
      !CompareDate(
        new Date(values.preservation.estimatedStartTime),
        new Date(values.packing.estimatedTime),
      )
    ) {
      return { status: false, field: 'preservation.estimatedStartTime', message: 'Ngày bảo quản không được nhỏ hơn ngày đóng gói' };
    }
    return { status: true };
  };

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
        initialValues={entityForEdit || initForm}
        // initialValues={initForm}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
          const vResult = validate(values)
          if (!vResult.status && vResult.field && vResult.message) {
            setFieldError(vResult.field, vResult.message)
          } else {
            let updateValue: any;
            setErrorMsg(undefined);

            if (entityForEdit) {
              const diffValue = diff(entityForEdit, values);
              const clValue = { ...values };

              if (
                diffValue.packing &&
                _.isObject(diffValue.packing.packing) &&
                !diffValue.packing.packing.label
              ) {
                delete diffValue.packing.packing;
              }

              if (clValue.packing && clValue.packing.packing) {
                diffValue.packing.packing = clValue.packing.packing._id;
              }

              const validField = [
                'harvesting',
                'preliminaryTreatment',
                'cleaning',
                'packing',
                'preservation',
              ];

              const validNested = [
                'estimatedTime',
                'estimatedQuantity',
                'technical',
                'leader',
                'estimatedExpireTimeStart',
                'estimatedExpireTimeEnd',
                'packing',
                'estimatedStartTime',
                'estimatedEndTime',
              ];

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

              updateValue = { _id: values._id, ...diffValue };
            } else {
              updateValue = { ...values };
            }

            console.log(values);

            if (step === '0') {
              submitHandle(updateValue, values, { setSubmitting, setFieldError, resetForm });
            } else if (step === '1' && currentTab !== '2') {
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
                      history.push(homePage || GetHomePage(window.location.pathname));
                    })
                    .catch(error => {
                      setSubmitting(false);
                      setErrorMsg(error.entity || error.response.entity);
                    });
                })
                .catch(error => {
                  setSubmitting(false);
                  setErrorMsg(error.entity || error.response.entity);
                });
            } else if (step === '1' && currentTab === '2') {
              approveFollow(updateValue)
                .then(res => {
                  setErrorMsg(undefined);
                  refreshData();
                  history.push(homePage || GetHomePage(window.location.pathname));
                })
                .catch(error => {
                  setSubmitting(false);
                  setErrorMsg(error.entity || error.response.entity);
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
                      _validationField && errors[_validationField] ? 'border border-danger' : ''
                    }>
                    {index == 0 && (
                      <CardHeader
                        className={'border-bottom-0'}
                        title={
                          <a
                            onClick={() => history.goBack()}
                            className={'cursor-pointer text-primary font-weight-boldest'}>
                            <ArrowBackIosIcon />
                            {intl
                              .formatMessage(
                                { id: _header },
                                { moduleName: intl.formatMessage({ id: moduleName }) },
                              )
                              .toUpperCase()}
                          </a>
                        }
                      />
                    )}

                    <CardBody>
                      <ModifyEntityPage
                        inputGroups={panel}
                        errors={errors}
                      />

                      {_validationField &&
                        errors[_validationField] &&
                        _.isString(errors[_validationField]) && (
                          <span className="text-danger">{errors[_validationField]}</span>
                        )}
                    </CardBody>
                  </Card>
                );
              })}
            </Form>
            <Card>
              <CardBody>
                <div className="pl-xl-15 pl-md-10 pl-5 mb-5">
                  <span className="modify-subtitle text-primary mt-8">BÌNH LUẬN</span>
                  <div className="mt-8 border border-light rounded pt-5 pb-5">
                    {//entityForEdit.comments
                    // [
                    //   {
                    //     fullName: 'Đầu khấc',
                    //     content:
                    //       'Kế hoạch như tốt mai cho nghỉ việc..........vsdgkdfhkdfoihnsoirnhiosgboisdnbiodrgiosehuigheubguiwebguwebiugwebfiuwebfiuwebguiebgierdnhiordnhoifdnhidofjhpọhpotfjpofk',
                    //   },
                    //   {
                    //     fullName: 'Đầu khấc',
                    //     content:
                    //       'Kế hoạch như tốt mai cho nghỉ việc..........vsdgkdfhkdfoihnsoirnhiosgboisdnbiodrgiosehuigheubguiwebguwebiugwebfiuwebfiuwebguiebgierdnhiordnhoifdnhidofjhpọhpotfjpofk',
                    //   },
                    // ]
                    commentsArr.map(
                      (
                        value: { createdBy: { _id: string; fullName: string }; content: string },
                        key: number,
                      ) => (
                        <div key={key} className="row mb-3">
                          <div className="col-1 text-center">
                            <AccountCircleOutlinedIcon style={{ fontSize: 30 }} />
                          </div>
                          <div className="col-10 bg-light rounded p-3">
                            <p className="font-bold">{value.createdBy.fullName}</p>
                            <p>{value.content}</p>
                          </div>
                        </div>
                      ),
                    )}
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="col-10">
                        <div className="row">
                          <div className="col-11">
                            {/* <TextArea
                              rows={1}
                              placeholder="Viết bình luận..."
                              style={{ width: '100%' }}
                              // autoSize
                              // value={valueRef.current}
                              ref={r => valueRef = r as any}
                              // onChange={(e: any) => {
                              //   valueRef.current = e.target.value
                              // }}
                            /> */}
                            <TextareaAutosize className="form-control" rowsMin={1} aria-label="empty textarea" ref={valueRef} placeholder="Viết bình luận..." />
                            {/* <FormControl as="textarea" aria-label="With textarea" rows={1} ref={valueRef} /> */}
                            
                          </div>
                          <div className="col-1">
                            <button
                              className="btn btn-primary pl-11 pr-11"
                              onClick={() => {
                                if (valueRef.current.value !== '') {
                                  handleComment({ content: valueRef.current.value })
                                } else {
                                  notifyError('Bình luận không được để trống nha')
                                }
                              }}
                              >
                              Gửi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
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
                          {allFormButton.data[keyss].icon} {allFormButton.data[keyss].label}
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
                          {allFormButton.data[keyss].icon} {allFormButton.data[keyss].label}
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
                          {allFormButton.data[keyss].icon} {allFormButton.data[keyss].label}
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
                          {allFormButton.data[keyss].icon} {allFormButton.data[keyss].label}
                        </button>
                        // </Link>
                      );
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
