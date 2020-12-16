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
  ConvertSelectSearch,
  notifySuccess,
  notify,
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
import { diff, updatedDiff } from 'deep-object-diff';
import EXIF from 'exif-js';
import { isEmpty } from 'lodash';
import exifr from 'exifr';
import { AxiosResponse } from 'axios';
import imageToBase64 from 'image-to-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const prefix = ''

const toDataURL = (url: string) => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

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
  tagData,
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

  console.log(images);

  
  const ConvertImage = (entity: any) => {
    const cv = { ...entity };

    if (entity.image) {
      toDataURL('http://localhost:2999/' + entity.image.path)
        .then(dataUrl  => {
          const url = { data_url: dataUrl };
          console.log(url);
          cv.images = [url];

          setImages(cv)
        })
        .catch(error => {
          console.log(error); // Logs an error if there was one
        });
    }
  };

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        const convert = autoFill
          ? ConvertSelectSearch(res.data, autoFill.searchSelectField)
          : ConvertSelectSearch(res.data);
        setEntityForEdit(convert);
        // setImages(convert.image ? ConvertImage(convert) : initForm)
        ConvertImage(res.data)
        setSearch(res.data);
      });
    }
  }, [code]);

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
          let updateValue;
          setErrorMsg(undefined);

          if (entityForEdit) {
            const diffValue = updatedDiff(entityForEdit, values);

            updateValue = { _id: values._id, ...diffValue };
          } else {
            updateValue = { ...values };
          }

          submitHandle(values, { setSubmitting, setFieldError });
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
                      images={images || []}
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
                          onClick={() => handleSubmit()}
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

export default EntityCrudPagePromise;
