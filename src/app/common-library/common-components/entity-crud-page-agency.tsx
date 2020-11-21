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
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

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
  console.log(entityForEdit)

  const [images, setImages] = useState(initForm);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const [defaultShippingAddress, setDefaultShippingAddress] = useState(0);
  const handleShippingAddressChange = (e: any) => {
    console.log(e.target.value)
    setDefaultShippingAddress(e.target.value);
  }

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
          agencyType: res.data.type.name,
          state: res.data.address.state,
          city: res.data.address.city,
          district: res.data.address.district,
          detailAddress: res.data.address.address,
          phoneNumber: res.data.phone,
          username: res.data.owner.username,
          name: res.data.owner.firstName + ' ' + res.data.owner.lastName,
          ownerPhoneNumber: res.data.owner.phone,
          email: res.data.owner.email,
          // gender: ,
          birthDay: Date.parse(res.data.owner.birthDay),
          roleName: res.data.owner.role.roleType,
          // avatar: , 
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
        {({ values, handleSubmit }) => (
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
                  {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={defaultShippingAddress} onChange={handleShippingAddressChange}>
                      <FormControlLabel value={0} control={<Radio />} label="Female" />
                      <FormControlLabel value={1} control={<Radio />} label="Male" />
                      <FormControlLabel value={2} control={<Radio />} label="Other" />
                      <FormControlLabel value={3} disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                  </FormControl> */}
                    <ModifyEntityPage
                      values={values}
                      images={images}
                      onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                        onChange(imageList, addUpdateIndex, key);

                      }}
                      modifyModel={formParts[key].modifyModel as any}
                      column={formParts[key].modifyModel.length}
                      // title={intl.formatMessage({id: formParts[key].title}).toUpperCase()}
                    />
                  </CardBody>
                  {key === Object.keys(formParts)[Object.keys(formParts).length - 1] && (
                    <div className="text-right mb-5 mr-5" key={key}>
                    {Object.keys(allFormButton).map(key => {
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
                      })
                    }
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

export default EntityCrudPageAgency;
