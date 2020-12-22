import React, {Fragment, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {
  generateInitForm,
  GetHomePage,
  getNewImage,
  getOnlyFile,
  getOnlyBase64,
} from '../helpers/common-function';
import { Field, Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {diff} from 'deep-object-diff';
import exifr from 'exifr'
import {ModifyForm, ModifyPanel} from "../common-types/common-type";
import _ from "lodash";
import {ModifyEntityPage} from "./modify-entity-page";

const toDataURL = (url: string) =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );

function EntityCrudPage({
                          entity,
                          onModify,
                          // header = 'COMMON_COMPONENT.CREATE_UPDATE.TITLE',
                          moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
                          code,
                          get,
                          formModel,
                          // allFormField,
                          actions,
                          validation,
                          autoFill,
                        }: {
  // modifyModel: ModifyModel;
  moduleName?: string;
  entity: any;
  onModify: (values: any) => void;
  code: string | null;
  get: (code: string) => any | null;
  formModel: ModifyForm;
  // allFormField: any;
  actions: any;
  validation?: any;
  autoFill?: any;
}) {
  const intl = useIntl();
  // const initForm = autoFill
  //   ? generateInitForm(allFormField, autoFill.field, autoFill.data)
  //   : generateInitForm(allFormField);
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);
  const {_header, ...modifyPanels} = formModel;
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  // const [tagArr, setTagArr] = useState(initForm);
  
  const [imageData, setImageData] = useState<{ data_url: any; exif: any }[]>([])
  
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
    // const newArr = getNewImage(images[key], imageList);
    // console.log(newArr)
    // newArr.forEach((file, index) => {
    //   ImageMeta(file.file)
    // });
    // ImageMeta(newArr)

    setFieldValue(key, imageData);

    // data for submit
    // setImages({...images, [key]: imageList});
    setImageRootArr(base64Array);
  };

  function handleChangeTag(value: string, key?: string) {
    // const newTag: string[] = [...tagArr];
    // newTag.push(value);
    // setTagArr({ ...tagArr, [key]: newTag });
  }

  const ConvertImage = (entity: any) => {
    const cv = { ...entity };

    if (entity.image) {
      toDataURL('/' + entity.image.path)
        .then(dataUrl => {
          const url = { data_url: dataUrl };
          console.log(url);
          delete cv.image;
          cv.images = [url];

          // setImages(cv)
          setEntityForEdit(cv);
        })
        .catch(error => {
          console.log(error); // Logs an error if there was one
        });
    }
  };

  // console.log(images)

  // useEffect(() => {
  //   if (code) {
  //     get(code).then((res: { data: any }) => {
  //       setEntityForEdit(res.data);
  //     });
  //   }
  // }, [code]);

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        // const convert = autoFill
        //   ? ConvertSelectSearch(res.data, autoFill.searchSelectField)
        //   : ConvertSelectSearch(res.data);
        // setEntityForEdit(res.data);
        // setImages(convert.image ? ConvertImage(convert) : initForm)
        ConvertImage(res.data);
        // setSearch(res.data);
      });
    }
  }, [code]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          // if (entityForEdit) {
          //   const updateValue = diff(entityForEdit, values);
          //   onModify({_id: values._id, ...updateValue});
          // } else {
          //   onModify({...values});
          // }
          onModify(values);
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
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(modifyPanels).map((key, index,keys) => {
                const val = modifyPanels[key];
                if(_.isString(val)) throw new Error('Sử dụng sai cách ' + key);
                const {_title, ...panel} = val;
                return (
                  <Card key={key} className={'modify-page'}>
                    <CardHeader className={'border-bottom-0'}
                                title={index == 0 ? (
                                  <a onClick={() => history.goBack()}
                                     className={'cursor-pointer text-primary font-weight-boldest'}>
                                    <ArrowBackIosIcon/>
                                    {intl
                                      .formatMessage({id: _header}, {moduleName: intl.formatMessage({id: moduleName})})
                                      .toUpperCase()}
                                  </a>) : (
                                  <>{intl.formatMessage(
                                    {id: _title},
                                    {moduleName: intl.formatMessage({id: moduleName})})
                                    .toUpperCase()}</>)}
                    />
                    <CardBody>
                      <ModifyEntityPage
                        // className={formPart[key].className}
                        // images={images}
                        inputGroups={panel}
                      />
                      {(
                        <div className="text-right mt-10" key={key}>
                          {Object.keys(actions).map(keyss => {
                            switch (actions[keyss].role) {
                              case 'submit':
                                console.log(actions[keyss])
                                return (
                                  <button
                                    formNoValidate
                                    type={actions[keyss].type}
                                    className={actions[keyss].className}
                                    key={keyss}
                                    onClick={() => handleSubmit()}>
                                    {actions[keyss].icon} {actions[keyss].label}
                                  </button>
                                );
                
                              case 'button':
                                console.log(actions[keyss])
                  
                                return (
                                  <button
                                    type={actions[keyss].type}
                                    className={actions[keyss].className}
                                    key={keyss}>
                                    {actions[keyss].icon} {actions[keyss].label}
                                  </button>
                                );
                              case 'link-button':
                                return (
                                  <Link to={actions[keyss].linkto} key={keyss}>
                                    <button
                                      type={actions[keyss].type}
                                      className={actions[keyss].className}>
                                      {actions[keyss].icon} {actions[keyss].label}
                                    </button>
                                  </Link>
                                );
                            }
                          })}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                )
              })}
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
