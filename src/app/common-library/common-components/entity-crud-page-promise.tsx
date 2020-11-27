import React, { useEffect, useState } from 'react';
import ModifyEntityPage from './modify-entity-page';
import { ModifyModel } from '../common-types/common-type';
import { useIntl } from 'react-intl';
import {
  generateInitForm,
  GetHomePage,
  getNewImage,
  getOnlyFile,
  getOnlyBase64,
} from '../helpers/common-function';
import { Field, Form, Formik } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../forms/main-input';
import { iconStyle } from '../common-consts/const';
import { Link, useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../forms/custom-image-upload';
import { uploadImage } from '../../pages/purchase-order/purchase-order.service';
import { Card, CardBody, CardHeader } from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { diff } from 'deep-object-diff';
import EXIF from 'exif-js';
import { isEmpty } from 'lodash';
import exifr from 'exifr';
import { AxiosResponse } from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EntityCrudPagePromise({
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
  const ImageMeta = (file: any) => {
    if (!file) return '';

    file.forEach((item: any) => {
      exifr.parse(item.file).then(res => {
        const image = {
          data_url: item.data_url,
          exif: res,
        };

        const data: any[] = [];
        data.push(image);
        console.log(image);
        setImageData(prevImages => [...prevImages, ...data]);
      });
    });
  };

  const onChange = (
    imageList: any,
    addUpdateIndex: any,
    key: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => {
    const imageArray = getOnlyFile(imageList);
    const base64Array = getOnlyBase64(imageList);
    const ImagesData = [];
    const newArr = getNewImage(images[key], imageList);
    // console.log(newArr)
    // newArr.forEach((file, index) => {
    //   ImageMeta(file.file)
    // });
    ImageMeta(newArr);

    setFieldValue(key, imageData);

    // data for submit
    setImages({ ...images, [key]: imageList });
    setImageRootArr(base64Array);
  };

  function handleChangeTag(value: string, key?: string) {
    // const newTag: string[] = [...tagArr];
    // newTag.push(value);
    // setTagArr({ ...tagArr, [key]: newTag });
  }

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        setEntityForEdit(res.data);
      });
    }
  }, [code]);



  const notify = () => {
    toast.error(`😠 ${errorMsg}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (errorMsg) {
      // store.addNotification({
      //   title: 'Error!',
      //   message: error,
      //   type: 'danger',
      //   insert: 'top',
      //   container: 'top-center',
      //   animationIn: ['animate__animated', 'animate__fadeIn'],
      //   animationOut: ['animate__animated', 'animate__fadeOut'],
      //   dismiss: {
      //     duration: 5000,
      //     onScreen: true,
      //   },
      // });
      notify();
    }
  }, [errorMsg]);

  const submitHandle = (values: any, { setSubmitting, setFieldError }: any) => {
    onModify(values)
      .then((res: any) => {
        history.push(GetHomePage(window.location.pathname));
        setErrorMsg(undefined);
        refreshData();
      })
      .catch(error => {
        setSubmitting(false);
        setErrorMsg(JSON.stringify(error));
      });
  };

  return (
    <>
      <ToastContainer />
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit || initForm}
        // initialValues={initForm}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          let updateValue;
          setErrorMsg(undefined);

          if (entityForEdit) {
            const diffValue = diff(entityForEdit, values);
            updateValue = { _id: values._id, ...diffValue };
          } else {
            updateValue = { ...values };
          }
          submitHandle(updateValue, { setSubmitting, setFieldError });
        }}>
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(formPart).map(key => (
                <Card key={key}>
                  {formPart[key].header && (
                    <CardHeader
                      title={
                        <>
                          <a onClick={() => history.goBack()}>
                            <ArrowBackIosIcon />
                          </a>
                          {entityForEdit
                            ? `CHỈNH SỬA ${formPart[key].header}`
                            : `THÊM MỚI ${formPart[key].header}`}
                        </>
                      }
                    />
                  )}
                  <CardBody>
                    <ModifyEntityPage
                      images={images}
                      onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                        onChange(imageList, addUpdateIndex, key, setFieldValue);
                      }}
                      modifyModel={formPart[key].modifyModel as any}
                      column={formPart[key].modifyModel.length}
                      title={formPart[key].title}
                      handleChangeTag={handleChangeTag}
                    />
                    {/* {errorMsg && (
                      <div className="text-right mt-5">
                        <span className="text-danger">{errorMsg}</span>
                      </div>
                    )} */}
                  </CardBody>
                  {key === Object.keys(formPart)[Object.keys(formPart).length - 1] && (
                    <div className="text-right mb-5 mr-5" key={key}>
                      {Object.keys(allFormButton).map(keyss => {
                        switch (allFormButton[keyss].role) {
                          case 'submit':
                            return (
                              <button
                                formNoValidate
                                type={allFormButton[keyss].type}
                                className={allFormButton[keyss].className}
                                key={keyss}>
                                {allFormButton[keyss].icon} {allFormButton[keyss].label}
                              </button>
                            );

                          case 'button':
                            return (
                              <button
                                type={allFormButton[keyss].type}
                                className={allFormButton[keyss].className}
                                key={keyss}>
                                {allFormButton[keyss].icon} {allFormButton[keyss].label}
                              </button>
                            );
                          case 'link-button':
                            return (
                              <Link to={allFormButton[keyss].linkto} key={keyss}>
                                <button
                                  type={allFormButton[keyss].type}
                                  className={allFormButton[keyss].className}>
                                  {allFormButton[keyss].icon} {allFormButton[keyss].label}
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
            {/* 
            <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary mr-2">
              <SaveOutlinedIcon style={iconStyle} /> Lưu
            </button>

            <Link to="/purchase-order">
              <button type="button" className="btn btn-outline-primary">
                <CancelOutlinedIcon style={iconStyle} /> Hủy
              </button>
            </Link> */}
          </>
        )}
      </Formik>
    </>
  );
}

export default EntityCrudPagePromise;
