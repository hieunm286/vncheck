import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {_ModifyModelType, ModifyModel, ModifyPart, OldModifyModel} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {generateInitForm, getField, getNewImage, getOnlyFile} from '../helpers/common-function';
import {Field, Form, Formik} from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {MainInput} from '../forms/main-input';
import {DefaultPagination, iconStyle} from '../common-consts/const';
import {Link, useHistory} from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../forms/custom-image-upload';
import {uploadImage} from '../../pages/purchase-order/purchase-order.service';
import {Card, CardBody} from '../card';
import {DatePickerField} from '../forms/date-picker-field';
import {Switch} from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import {InfiniteSelect} from '../forms/infinite-select';
import TagInput from '../forms/tag-input';
import ImgGallery from '../forms/image-gallery';
import {FormikRadioGroup} from '../forms/radio-group-field';
import {SwitchField} from '../forms/switch-field';
import {InfiniteSelectV2} from '../forms/infinite-select-v2';
import {isArray} from 'lodash';
import {
  InputBoolean,
  InputDateTime,
  InputImage,
  InputNumber,
  InputSearchSelect,
  InputString,
  InputTag
} from "./common-input";

function ModifyEntityPage<T>({
                               modifyModel,
                               title,
                               column,
                               entityForEdit,
                               mode = 'horizontal',
                               errors
                             }: {
  modifyModel: ModifyModel;
  mode?: 'horizontal' | 'vertical'
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
  search?: any;
  setSearch?: any;
  handleChangeTag?: any;
  values?: any;
  tagData?: any;
  entityForEdit?: any;
  errors?: any
}) {
  const intl = useIntl();
  // const initForm = generateInitForm(modifyModel);
  const defaultClassName = 'mt-3';
  const renderForm = useCallback((data: _ModifyModelType, prevKey: string): ReactElement => {
    return (
      <>
        {Object.keys(data).map(key => {
          const input = data[key];
          switch (input.type) {
            case 'string':
              return (
                <InputString
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  {...input}
                  mode={mode}
                  key={`modify-page-${key}`}/>
              );
            case 'number':
              return (
                <InputNumber
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  key={`modify-page-${key}`}/>
              );
            
            case 'date-time':
              return (
                <InputDateTime
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  key={`modify-page-${key}`}/>
              );
            // case 'radioGroup':
            //   const _shippingAddresses = values['shippingAddress'];
            //   return _shippingAddresses ? (
            //     <FormikRadioGroup
            //       ariaLabel="defaultShippingAddress"
            //       name="defaultShippingAddress"
            //       addresses={_shippingAddresses}
            
            //     />
            //   ) : (
            //     <></>
            //   );
            case 'image':
              return (
                <InputImage
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  key={`modify-page-${key}`}
                />
              )
                ;
            case 'boolean':
              return (
                <InputBoolean
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  key={`modify-page-${key}`}
                />
              );
            case 'search-select':
              return (
                <InputSearchSelect
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  key={`modify-page-${key}`}
                />
              );
            // case 'tag':
            //   const defaultTag = (getField(entityForEdit, prevKey ? `${prevKey}.${key}` : key))
            //   return (
            //     <InputTag
            //       className={defaultClassName}
            //       name={prevKey !== '' ? `${prevKey}.${key}` : key}
            //       mode={mode}
            //       defaultTag={defaultTag}
            //       {...input}
            //       key={`modify-page-${key}`}
            //     />
            //   );
            case 'object':
              return (<>{renderForm(input.data, prevKey ? `${prevKey}.${key}` : key)}</>);
            //
            // case 'SearchSelectV2':
            //   return (
            //     <div className="mt-3" key={key}>
            //       <InfiniteSelectV2
            //         label={intl.formatMessage({id: value.data[key].label})}
            //         isHorizontal={true}
            //         value={value.data[key].fillField ? search[key][value.data[key].fillField] : search[key]}
            //         onChange={(value: any) => {
            //           setSearch({...search, [key]: value});
            //           // setSearchTerm({
            //           //   ...searchTerm,
            //           //   [key]: searchM[key].ref ? value.value : value.label,
            //           // });
            //         }}
            //         service={value.data[key].service}
            //         keyField={value.data[key].keyField}
            //         dataField={entityForEdit[value.data[key].rootField][value.data[key].keyField]}
            //         display={value.data[key].display}
            //         refs={value.data[key].ref}
            //         additional={{
            //           page: DefaultPagination.page,
            //         }}
            //         name={prevKey !== '' ? `${prevKey}.${key}` : key}
            //         placeholder={intl.formatMessage({id: value.data[key].placeholder})}
            //       />
            //     </div>
            //   );
            //
            
            case 'gallery':
              return (
                <div className="mt-3" key={key}>
                  <ImgGallery
                    label={intl.formatMessage({id: input.label as any})}
                    labelWidth={4}
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    isHorizontal
                    mode='multiple'
                    photos={[
                      {
                        path: 'https://source.unsplash.com/aZjw7xI3QAA/1144x763',
                        author: 'Nguyễn Minh Hiếu',
                        time: '26/09/2020 9:00',
                        location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
                        thumbnail: 'https://source.unsplash.com/aZjw7xI3QAA/100x67',
                      },
                      {
                        path: 'https://source.unsplash.com/c77MgFOt7e0/1144x763',
                        author: 'Nguyễn Minh Hiếu',
                        time: '26/09/2020 9:00',
                        location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
                        thumbnail: 'https://source.unsplash.com/c77MgFOt7e0/100x67',
                      },
                      {
                        path: 'https://source.unsplash.com/QdBHnkBdu4g/1144x763',
                        author: 'Nguyễn Minh Hiếu',
                        time: '26/09/2020 9:00',
                        location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
                        thumbnail: 'https://source.unsplash.com/QdBHnkBdu4g/100x67',
                      },
                    ]}
                  />
                </div>
              );
            // handle shippingAddress
            // case 'array':
            //   const shippingAddresses = values[key];
            //   return shippingAddresses
            //     ? shippingAddresses.map((el: any, innerKey: any) => {
            //       return (
            //         <div className="mt-3" key={`${innerKey}`}>
            //           <Field
            //             name={key}
            //             value={
            //               shippingAddresses[innerKey].address +
            //               ', ' +
            //               shippingAddresses[innerKey].district +
            //               ', ' +
            //               shippingAddresses[innerKey].city +
            //               ', ' +
            //               shippingAddresses[innerKey].state
            //             }
            //             component={MainInput}
            //             isHorizontal
            //             withFeedbackLabel
            //             labelWidth={4}
            //             placeholder={intl.formatMessage({id: value.data[key].placeholder})}
            //             label={intl.formatMessage({id: value.data[key].label})}
            //             required={value.data[key].required}
            //           />
            //         </div>
            //       );
            //     })
            //     : console.log(shippingAddresses);
            //   break;
          }
          return (<></>);
        })}
      </>
    );
  }, []);
  
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
        modifyModel.map((value, index) => (
          <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={`meg-${index}`}>
            {value.title && <h6 className="text-primary">{value.title.toUpperCase()}</h6>}
            {renderForm(value.data, '')}
          </div>
        ))}
      </div>
    </>
  );
}

export default ModifyEntityPage;
