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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIntl } from 'react-intl';
import {
  ConvertSelectSearch,
  generateInitForm,
  GetHomePage,
} from '../../common-library/helpers/common-function';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import ModifyEntityPage from '../../common-library/common-components/modify-entity-page';
import _ from 'lodash';

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
  submit,
  onApprove,
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
  submit: boolean;
  onApprove: (data: any) => Promise<AxiosResponse<any>>;
}) {
  const intl = useIntl();
  const initForm = autoFill
    ? generateInitForm(allFormField, autoFill.field, autoFill.data)
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

  function handleChangeTag(value: string, key?: string) {
    // const newTag: string[] = [...tagArr];
    // newTag.push(value);
    // setTagArr({ ...tagArr, [key]: newTag });
  }

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        const convert = autoFill
          ? ConvertSelectSearch(res.data, autoFill.searchSelectField)
          : ConvertSelectSearch(res.data);
        setEntityForEdit(convert);
        setSearch(res.data);
      });
    }
  }, [code]);

  const notify = (error: string) => {
    toast.error(`😠 ${error}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifySuccess = () => {
    toast.success(`😠 Thành công`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const submitHandle = (values: any, { setSubmitting, setFieldError }: any) => {
    onModify(values)
      .then((res: any) => {
        history.push(homePage || GetHomePage(window.location.pathname));
        notifySuccess();
        setErrorMsg(undefined);
        refreshData();
      })
      .catch(error => {
        setSubmitting(false);
        setErrorMsg(error.data || error.response.data);
        notify(error.data || error.response.data);
      });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit || initForm}
        // initialValues={initForm}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          let updateValue: any;
          setErrorMsg(undefined);

          if (entityForEdit) {
            const diffValue = diff(entityForEdit, values);

            if (diffValue.packing && _.isObject(diffValue.packing.packing) && !diffValue.packing.packing.label) {
              delete diffValue.packing
            }

            updateValue = { _id: values._id, ...diffValue };
          } else {
            updateValue = { ...values };
          }

          if (!submit) {
            submitHandle(updateValue, { setSubmitting, setFieldError });
          } else {
            onApprove(values)
              .then(res => {
                submitHandle(updateValue, { setSubmitting, setFieldError });
              })
              .catch(error => {
                setSubmitting(false);
                setErrorMsg(error.data || error.response.data);
                notify(error.data || error.response.data);
              });
          }
        }}>
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(formPart).map(key => (
                <Card key={key}>
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
                          {entityForEdit
                            ? `CHỈNH SỬA ${formPart[key].header}`
                            : `TẠO ${formPart[key].header} MỚI`}
                        </>
                      }
                    />
                  )}
                  <CardBody>
                    <ModifyEntityPage
                      entityForEdit={entityForEdit}
                      images={images}
                      modifyModel={formPart[key].modifyModel as any}
                      column={formPart[key].modifyModel.length}
                      title={formPart[key].title}
                      handleChangeTag={handleChangeTag}
                      search={search}
                      setSearch={setSearch}
                      tagData={tagData}
                    />
                    {errorMsg && (
                      <div className="text-right mt-5">
                        <span className="text-danger">{errorMsg}</span>
                      </div>
                    )}
                  </CardBody>
                  {allFormButton.type === 'inside' &&
                    key === Object.keys(formPart)[Object.keys(formPart).length - 1] && (
                      <div className="text-right mb-5 mr-20" key={key}>
                        {Object.keys(allFormButton.data).map(keyss => {
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
            {allFormButton.type === 'outside' && (
              <div className="text-right mb-5 mr-20">
                {Object.keys(allFormButton.data).map(keyss => {
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
      </Formik>
    </>
  );
}

export default ProductionPlanCrud;
