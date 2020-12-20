import React, {Fragment, useEffect, useState} from 'react';
import ModifyEntityPage from './modify-entity-page';
import {OldModifyModel} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {
  generateInitForm,
  GetHomePage,
  getNewImage,
  getOnlyFile,
  getOnlyBase64
} from '../helpers/common-function';
import {Field, Form, Formik} from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {MainInput} from '../forms/main-input';
import {iconStyle} from '../common-consts/const';
import {Link, useHistory} from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../forms/custom-image-upload';
import {uploadImage} from '../../pages/purchase-order/purchase-order.service';
import {Card, CardBody, CardHeader} from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {diff} from 'deep-object-diff';
import EXIF from 'exif-js';
import {isEmpty} from 'lodash';
import exifr from 'exifr'
import {Modal} from "react-bootstrap";
import {MasterEntityDetail} from "./master-entity-detail-dialog";

function EntityCrudPage({
                          entity,
                          onModify,
                          title = 'COMMON_COMPONENT.CREATE_UPDATE.TITLE',
                          moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
                          code,
                          get,
                          models,
                          allFormField,
                          allFormButton,
                          validation,
                          autoFill,
                        }: {
  // modifyModel: ModifyModel;
  title?: string;
  moduleName?: string;
  entity: any;
  onModify: (values: any) => void;
  code: string | null;
  get: (code: string) => any | null;
  models: any;
  allFormField: any;
  allFormButton: any;
  validation?: any;
  autoFill?: any;
}) {
  const intl = useIntl();
  const initForm = autoFill
    ? generateInitForm(allFormField, autoFill.field, autoFill.data)
    : generateInitForm(allFormField);
  const {header, ...formPart} = models;
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);
  
  const [images, setImages] = useState(initForm);
  const [imageRootArr, setImageRootArr] = useState<any>([]);
  
  const [tagArr, setTagArr] = useState(initForm);
  
  const [imageData, setImageData] = useState<{ data_url: any; exif: any }[]>([])
  
  const ImageMeta = (file: any) => {
    if (!file) return '';
    
    file.forEach((item: any) => {
      exifr.parse(item.file).then(res => {
        const image = {
          data_url: item.data_url,
          exif: res
        }
        
        const data: any[] = []
        data.push(image)
        console.log(image)
        setImageData(prevImages => ([...prevImages, ...data]))
        
      })
    })
  };
  
  
  const onChange = (imageList: any, addUpdateIndex: any, key: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    const imageArray = getOnlyFile(imageList);
    const base64Array = getOnlyBase64(imageList);
    const ImagesData = []
    const newArr = getNewImage(images[key], imageList);
    // console.log(newArr)
    // newArr.forEach((file, index) => {
    //   ImageMeta(file.file) 
    // });
    ImageMeta(newArr)
    
    setFieldValue(key, imageData)
    
    // data for submit
    setImages({...images, [key]: imageList});
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
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit ?? initForm}
        validationSchema={validation}
        onSubmit={values => {
          console.log(values);
          if (entityForEdit) {
            const updateValue = diff(entityForEdit, values);
            onModify({_id: values._id, ...updateValue});
          } else {
            onModify({...values, imageData});
          }
          // if (asyncError !== '') {
          //   store.addNotification({
          //     title: "Wonderful!",
          //     message: "teodosii@react-notifications-component",
          //     type: "success",
          //     insert: "top",
          //     container: "top-right",
          //     animationIn: ["animate__animated", "animate__fadeIn"],
          //     animationOut: ["animate__animated", "animate__fadeOut"],
          //     dismiss: {
          //       duration: 5000,
          //       onScreen: true
          //     }
          //   });
          // }
          history.push(GetHomePage(window.location.pathname));
        }}>
        {({handleSubmit, setFieldValue}) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(formPart).map((key, index,keys) => (
                <Card key={key}>
                    <CardHeader className={'border-bottom-0'}
                                title={index == 0 ? (
                                  <a onClick={() => history.goBack()}
                                     className={'cursor-pointer text-primary font-weight-boldest'}>
                                    <ArrowBackIosIcon/>
                                    {intl
                                      .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
                                      .toUpperCase()}
                                  </a>) : (
                                  <>{intl.formatMessage(
                                    {id: header},
                                    {moduleName: intl.formatMessage({id: moduleName})})
                                    .toUpperCase()}</>)}
                    />
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
                  </CardBody>
                  {(index == keys.length - 1)&& (
                    <div className="text-right mb-5 mr-5" key={key}>
                      {Object.keys(allFormButton).map(keyss => {
                        switch (allFormButton[keyss].role) {
                          case 'submit':
                            return (
                              <button
                                formNoValidate
                                type={allFormButton[keyss].type}
                                className={allFormButton[keyss].className}
                                key={keyss}
                                onClick={() => handleSubmit()}>
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

export default EntityCrudPage;
