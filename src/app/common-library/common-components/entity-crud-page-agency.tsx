import React, { useEffect, useState } from 'react';
import ModifyEntityPage from './modify-entity-page';
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
import { Card, CardBody, CardHeader } from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function EntityCrudPageAgency({
  entity,
  onModify,
  title,
  // modifyModel,
  reduxModel,
  code,
  get,
  formPart: formParts,
  allFormField,
  allFormButton,
}: {
  // modifyModel: ModifyModel;
  title?: string;
  entity?: any;
  onModify: (values: any) => void;
  reduxModel?: string;
  code?: string | null;
  get: (code: string) => any | null;
  formPart?: any;
  allFormField?: any;
  allFormButton?: any;
}) {
  const intl = useIntl();
  const initForm = generateInitForm(allFormField);
  //   const modifyM = { ...modifyModel } as any;
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);

  const [images, setImages] = useState(initForm);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const onChange = (imageList: any, addUpdateIndex: any, key: any) => {
    const imageArray = getOnlyFile(imageList);

    const newArr = getNewImage(imageRootArr, imageArray);
    console.log(key)
    newArr.forEach((file, index) => {
      uploadImage(file)
        .then(res => {
          // console.log('update: ' + index);
        })
        .catch(err => {
          console.log(err);
        });
    });
    // data for submit
    setImages({...images, [key]: imageList});
    setImageRootArr(imageArray);
  };

  console.log(initForm);

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        const entity = {...res.data, 
          state: res.data.address.state,
          city: res.data.address.city,
          district: res.data.address.district,
          address: res.data.address.address,
          phoneNumber: res.data.phone,
        };
        console.log(entity);
        setEntityForEdit(entity);
      });
    }
  }, [code]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit || initForm}
        // validationSchema={PurchaseOrderSchema}
        onSubmit={values => {
          console.log(values);
          onModify(values);
          history.goBack()
        }}>
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(formParts).map(key => (
                <Card key={key}>
                  {formParts[key].header && (
                    <CardHeader
                      title={
                        <>
                          <a onClick={() => history.goBack()}>
                            <ArrowBackIosIcon />
                          </a>
                          {entityForEdit ? `CHỈNH SỬA ${formParts[key].header}` : `THÊM MỚI ${formParts[key].header}`}
                        </>
                      }
                    />
                  )}
                  <CardBody>
                    <ModifyEntityPage
                      images={images}
                      onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                        onChange(imageList, addUpdateIndex, key);

                      }}
                      modifyModel={formParts[key].modifyModel as any}
                      column={formParts[key].modifyModel.length}
                      title={formParts[key].title}
                    />
                  </CardBody>
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
            {/* {Object.keys(allFormButton).map(key => {
              switch (allFormButton[key].role) {
                case 'submit':
                  return (
                    <button
                      type={allFormButton[key].type}
                      className={allFormButton[key].className}
                      key={key}
                      onClick={() => handleSubmit()}>
                      {allFormButton[key].icon} {allFormButton[key].label}
                    </button>
                  );

                case 'button':
                  return (
                    <button
                      type={allFormButton[key].type}
                      className={allFormButton[key].className}
                      key={key}>
                      {allFormButton[key].icon} {allFormButton[key].label}
                    </button>
                  );
                case 'link-button':
                  return (
                    <Link to={allFormButton[key].linkto} key={key}>
                      <button
                        type={allFormButton[key].type}
                        className={allFormButton[key].className}>
                        {allFormButton[key].icon} {allFormButton[key].label}
                      </button>
                    </Link>
                  );
              }
            })} */}
          </>
        )}
      </Formik>
    </>
  );
}

export default EntityCrudPageAgency;
