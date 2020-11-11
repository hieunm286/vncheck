import React, { useEffect, useState } from 'react';
import { ModifyModel } from '../common-types/common-type';
import { useIntl } from 'react-intl';
import { generateInitForm, getNewImage, getOnlyFile } from '../helpers/common-function';
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
import { Card, CardBody } from '../card';
import { DatePickerField } from '../forms/date-picker-field';

function ModifyEntityPage<T>({
  // entity,
  // onModify,
  // title,
  modifyModel,
  // reduxModel,
  // code,
  // get,
  images,
  onChange,
  title,
  column,
}: {
  modifyModel: any;
  // title: string;
  // entity: T;
  // onModify: (values: any) => void;
  // reduxModel: string;
  // code: string | null;
  // get: (code: string) => any | null;
  images?: any;
  onChange?: any;
  title?: string;
  column?: number;
}) {
  const intl = useIntl();
  // const initForm = generateInitForm(modifyModel);
  const modifyM = { ...modifyModel } as any;
  // const history = useHistory();
  // const [entityForEdit, setEntityForEdit] = useState(entity);

  // const [images, setImages] = useState([]);
  // const [imageRootArr, setImageRootArr] = useState<any>([]);

  // const onChange = (imageList: any, addUpdateIndex: any) => {
  //   const imageArray = getOnlyFile(imageList);

  //   const newArr = getNewImage(imageRootArr, imageArray);

  //   newArr.forEach((file, index) => {
  //     uploadImage(file)
  //       .then(res => {
  //         console.log('update: ' + index);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  //   // data for submit
  //   setImages(imageList);
  //   setImageRootArr(imageArray);
  // };

  // useEffect(() => {
  //   if (code) {
  //     get(code).then((res: { data: any }) => {
  //       setEntityForEdit(res.data);
  //     });
  //   }
  // }, [code]);

  return (
    // <Card>
    //   <CardBody>
    //     <Formik
    //       enableReinitialize={true}
    //       initialValues={entityForEdit || initForm}
    //       // validationSchema={PurchaseOrderSchema}
    //       onSubmit={values => {
    //         onModify(values);
    //         history.push('/purchase-order');
    //       }}>
    //       {({ handleSubmit }) => (
    <>
      {/* <Form className="form form-label-right"> */}
      {title && <h6 className="text-primary">{title.toUpperCase()}</h6>}
      <div className={(column ? column : 1) > 1 ? 'row' : ''}>
        {modifyModel &&
          modifyModel.map((value: any, key: any) => (
            <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={key}>
              {value.title && <h6 className="text-primary">{value.title.toUpperCase()}</h6>}
              {Object.keys(value.data).map(key => {
                switch (value.data[key].type) {
                  case 'string':
                    return (
                      <div className="mt-3" key={key}>
                        <Field
                          name={key}
                          component={MainInput}
                          placeholder={value.data[key].placeholder}
                          withFeedbackLabel
                          labelWidth={4}
                          isHorizontal
                          label={value.data[key].label}
                          disabled={value.data[key].disabled}
                          required={value.data[key].required}
                        />
                      </div>
                    );
                  case 'number':
                    return (
                      <div className="mt-3" key={`${key}`}>
                        <Field
                          name={key}
                          type="number"
                          component={MainInput}
                          isHorizontal
                          withFeedbackLabel
                          labelWidth={4}
                          placeholder={value.data[key].placeholder}
                          label={value.data[key].label}
                          required={value.data[key].required}
                        />
                      </div>
                    );
                  case 'Datetime':
                    return (
                      <div className="mt-3" key={key}>
                        <DatePickerField
                          name={key}
                          isHorizontal
                          label={value.data[key].label}
                          labelWidth={4}
                          type="Datetime"
                          required={value.data[key].required}
                        />
                      </div>
                    );
                  case 'image':
                    return (
                      <div className="mt-3" key={key}>
                        <CustomImageUpload
                          images={images[key]}
                          onChange={(imageList: any, addUpdateIndex: any) => {
                            onChange(imageList, addUpdateIndex, key);
                          }}
                          label={value.data[key].label}
                          labelWidth={4}
                          isHorizontal={true}
                          required={value.data[key].required}
                        />
                      </div>
                    );

                  case 'object':
                    return (
                      <>
                        {Object.keys(value.data[key]).map(childKey => {
                          switch (value.data[key][childKey].type) {
                            case 'string':
                              return (
                                <div className="mt-3" key={childKey}>
                                  <Field
                                    name={`${key}.${childKey}`}
                                    component={MainInput}
                                    placeholder={value.data[key][childKey].placeholder}
                                    withFeedbackLabel
                                    labelWidth={4}
                                    isHorizontal
                                    label={value.data[key][childKey].label}
                                    disabled={value.data[key][childKey].disabled}
                                    required={value.data[key][childKey].required}
                                  />
                                </div>
                              );
                            case 'number':
                              return (
                                <div className="mt-3" key={`${childKey}`}>
                                  <Field
                                    name={`${key}.${childKey}`}
                                    type="number"
                                    component={MainInput}
                                    isHorizontal
                                    withFeedbackLabel
                                    labelWidth={4}
                                    placeholder={value.data[key][childKey].placeholder}
                                    label={value.data[key][childKey].label}
                                    required={value.data[key][childKey].required}
                                  />
                                </div>
                              );
                          }
                        })}
                      </>
                    );
                }
                return <></>;
              })}
            </div>
          ))}
      </div>
      {/* {modifyModel ? (
        Object.keys(modifyM).map(key => {
          switch (modifyM[key].type) {
            case 'string':
              return (
                <div className="mt-3" key={key}>
                  <Field
                    name={key}
                    component={MainInput}
                    placeholder={modifyM[key].placeholder}
                    withFeedbackLabel
                    labelWidth={4}
                    isHorizontal
                    label={modifyM[key].label}
                    disabled={modifyM[key].disabled}
                  />
                </div>
              );
            case 'number':
              return (
                <div className="mt-3" key={`${key}`}>
                  <Field
                    name={key}
                    type="number"
                    component={MainInput}
                    isHorizontal
                    withFeedbackLabel
                    labelWidth={4}
                    placeholder={modifyM[key].placeholder}
                    label={modifyM[key].label}
                  />
                </div>
              );
            case 'Datetime':
              return (
                <div className="mt-3" key={key}>
                  <DatePickerField
                    name="date"
                    isHorizontal
                    label={modifyM[key].label}
                    labelWidth={4}
                  />
                </div>
              );
            case 'image':
              return (
                <div className="mt-3" key={key}>
                  <CustomImageUpload
                    images={images}
                    onChange={onChange}
                    label={modifyM[key].label}
                    labelWidth={4}
                    isHorizontal={true}
                    isRequired
                  />
                </div>
              );
          }
          return <></>;
        })
      ) : (
        <></>
      )} */}
      {/* </Form> */}
      {/* 
              <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary mr-2">
                <SaveOutlinedIcon style={iconStyle} /> Lưu
              </button>

              <Link to="/purchase-order">
                <button type="button" className="btn btn-outline-primary">
                  <CancelOutlinedIcon style={iconStyle} /> Hủy
                </button>
              </Link>
            </>
          )}
        </Formik>
      </CardBody>
    </Card> */}
    </>
  );
}

export default ModifyEntityPage;
