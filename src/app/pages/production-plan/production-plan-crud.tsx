import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { uploadImage } from '../../pages/purchase-order/purchase-order.service';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import { diff } from 'deep-object-diff';
import EXIF from 'exif-js';
import { isEmpty, isEqual } from 'lodash';
import exifr from 'exifr';
import { AxiosResponse } from 'axios';
// import { diff } from 'deep-diff';

import { useIntl } from 'react-intl';
import {
  generateInitForm,
  GetHomePage,
} from '../../common-library/helpers/common-function';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import ModifyEntityPage from '../../common-library/common-components/modify-entity-page';
import _ from 'lodash';
import { addInitField, initProductPlanForm } from './defined/const';
import ProductionPlanModal from './production-plan-modal';

const diff = (obj1: any, obj2: any) => {
  console.log(obj1);
  console.log(obj2);

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

const validField = [''];

function ProductionPlanCrud({
  entity,
  onModify,
  title,
  // modifyModel,
  reduxModel,
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
}: {
  // modifyModel: ModifyModel;
  title: string;
  entity: any;
  onModify: (values: any) => Promise<AxiosResponse<any>>;
  reduxModel?: string;
  code: string | null;
  get: (code: string) => any | null;
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
}) {
  const intl = useIntl();
  const initForm = autoFill
    ? generateInitForm(allFormField, autoFill.field, autoFill.entity)
    : generateInitForm(allFormField);
  //   const modifyM = { ...modifyModel } as any;
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);

  const [images, setImages] = useState(initForm);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const [tagArr, setTagArr] = useState(initForm);

  const [imageData, setImageData] = useState<{ data_url: any; exif: any }[]>([]);

  const [checkFormError, setCheckFormError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [search, setSearch] = useState<any>(initForm);

  const [confirmModal, setConfirmModal] = useState(false);
  const [noticeModal, setNoticeModal] = useState(false);
  function handleChangeTag(value: string, key?: string) {
    // const newTag: string[] = [...tagArr];
    // newTag.push(value);
    // setTagArr({ ...tagArr, [key]: newTag });
  }

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        // const convert = autoFill
        //   ? ConvertSelectSearch(res.data, autoFill.searchSelectField)
        //   : ConvertSelectSearch(res.data);
        setEntityForEdit(res.data);
        setSearch(res.data);
      });
    }
  }, [code]);

  const submitHandle = (values: any, curValues: any, { setSubmitting, setFieldError, resetForm }: any) => {
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
        initialValues={addInitField(entityForEdit, initProductPlanForm) || initForm}
        // initialValues={initForm}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
          let updateValue: any;
          setErrorMsg(undefined);

          if (entityForEdit) {
            const diffValue = diff(addInitField(entityForEdit, initProductPlanForm), values);
            console.log(diffValue);
            const clValue = { ...values };

            if (
              diffValue.packing &&
              _.isObject(diffValue.packing.packing) &&
              !diffValue.packing.packing.label
            ) {
              delete diffValue.packing;
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

          console.log(values)

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
        }}>
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(formPart).map(key => (
                <Card
                  key={key}
                  className={
                    formPart[key].keyField && errors[formPart[key].keyField]
                      ? 'border border-danger'
                      : ''
                  }>
                  {formPart[key].header && (
                    <CardHeader
                      title={
                        <>
                          <a
                            onClick={() =>
                              history.push(homePage || GetHomePage(window.location.pathname))
                            }>
                            <ArrowBackIosIcon />
                          </a>
                          {entityForEdit && currentTab !== '0'
                            ? `CHỈNH SỬA ${formPart[key].header}`
                            : `TẠO ${formPart[key].header} MỚI`}
                        </>
                      }
                    />
                  )}
                  <CardBody>
                    <ModifyEntityPage
                      entity={entityForEdit}
                      images={images}
                      modifyModel={formPart[key].modifyModel}
                      title={formPart[key].title}
                      handleChangeTag={handleChangeTag}
                      tagData={tagData}
                      errors={errors}
                    />

                    {formPart[key].keyField && errors[formPart[key].keyField] && (
                      <span className="text-danger">Vui lòng nhập đúng thứ tự các bước</span>
                    )}
                  </CardBody>
                  {allFormButton.type === 'inside' &&
                    key === Object.keys(formPart)[Object.keys(formPart).length - 1] && (
                      <div className="text-right mb-5 mr-20" key={key}>
                        {Object.keys(allFormButton.entity).map(keyss => {
                          switch (allFormButton['data'][keyss].role) {
                            case 'submit':
                              return (
                                <button
                                  formNoValidate
                                  type={allFormButton['data'][keyss].type}
                                  className={allFormButton['data'][keyss].className}
                                  key={keyss}>
                                  {allFormButton['data'][keyss].icon}{' '}
                                  {allFormButton['data'][keyss].label}
                                </button>
                              );

                            case 'button':
                              return (
                                <button
                                  type={allFormButton['data'][keyss].type}
                                  className={allFormButton['data'][keyss].className}
                                  key={keyss}
                                  onClick={() => {
                                    allFormButton['data'][keyss].onClick();
                                  }}>
                                  {allFormButton['data'][keyss].icon}{' '}
                                  {allFormButton['data'][keyss].label}
                                </button>
                              );
                            case 'link-button':
                              return (
                                <Link to={allFormButton['data'][keyss].linkto} key={keyss}>
                                  <button
                                    type={allFormButton['data'][keyss].type}
                                    className={allFormButton['data'][keyss].className}>
                                    {allFormButton['data'][keyss].icon}{' '}
                                    {allFormButton['data'][keyss].label}
                                  </button>
                                </Link>
                              );
                          }
                        })}
                      </div>
                    )}
                </Card>
              ))}
            </Form>
            {errorMsg && (
              <div className="text-left mt-5">
                <span className="text-danger">{intl.formatMessage({ id: errorMsg })}</span>
              </div>
            )}
            {allFormButton.type === 'outside' && (
              <div className="text-right mb-5 mr-20">
                {Object.keys(allFormButton.entity).map(keyss => {
                  switch (allFormButton['data'][keyss].role) {
                    case 'submit':
                      return (
                        <button
                          type={allFormButton['data'][keyss].type}
                          onClick={() => {
                            handleSubmit();
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
                            handleSubmit();
                            allFormButton['data'][keyss].onClick();
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
                            allFormButton['data'][keyss].onClick();
                          }}>
                          {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
                        </button>
                      );
                    case 'link-button':
                      return (
                        // <Link to={allFormButton['data'][keyss].linkto} key={keyss}>
                        <button
                          type={allFormButton['data'][keyss].type}
                          className={allFormButton['data'][keyss].className}
                          key={keyss}
                          onClick={() => {
                            setConfirmModal(true);
                          }}>
                          {allFormButton['data'][keyss].icon} {allFormButton['data'][keyss].label}
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
