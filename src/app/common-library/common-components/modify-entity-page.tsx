import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {_ModifyModelType, ModifyModel, ModifyPart, OldModifyModel} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {generateInitForm, getField, getNewImage, getOnlyFile} from '../helpers/common-function';
import {Field, Form, Formik, useFormikContext} from 'formik';
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
import _ from 'lodash';

function ModifyEntityPage<T>({
                               modifyModel,
                               title,
                               entity,
                               // className = '',
                               mode = 'horizontal',
                               tagData,
                               images
                             }: {
  
  modifyModel: ModifyModel;
  mode?: 'horizontal' | 'vertical'
  images?: any;
  onChange?: any;
  title?: string;
  // className?: string;
  handleChangeTag?: any;
  values?: any;
  tagData?: any;
  entity?: any;
  errors?: any
}) {
  const intl = useIntl();
  const {setFieldValue, touched, values} = useFormikContext<any>();
  const defaultClassName = 'mt-5';
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
              console.log(images)
              return (
                <InputImage
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  value={images[key] || []}
                  key={`modify-page-${key}`}
                />
              )
                ;
            case 'search-select':
              return (
                <InputSearchSelect
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  value={values[key]}
                  mode={mode}
                  {...input}
                  key={`modify-page-${key}`}
                />
              );
            case 'tag':
              const defaultTag = (getField(entity, prevKey ? `${prevKey}.${key}` : key))
              return (
                <InputTag
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  defaultTag={defaultTag}
                  tagData={tagData}
                  {...input}
                  key={`modify-page-${key}`}
                />
              );
            case 'object':
              return (<>{renderForm(input.data, prevKey ? `${prevKey}.${data[key].name ?? key}` : (data[key].name ?? key))}</>);
            //
            // case 'SearchSelectV2':
            //   return (
            //     <div className="mt-3" key={key}>
            //       <InfiniteSelectV2
            //         label={intl.formatMessage({id: input.label})}
            //         isHorizontal={true}
            //         value={input.fillField ? search[key][input.fillField] : search[key]}
            //         onChange={(value: any) => {
            //           setSearch({...search, [key]: value});
            //           // setSearchTerm({
            //           //   ...searchTerm,
            //           //   [key]: searchM[key].ref ? value.value : value.label,
            //           // });
            //         }}
            //         service={input.service}
            //         keyField={input.keyField}
            //         dataField={entityForEdit[input.rootField][input.keyField]}
            //         display={input.display}
            //         refs={input.ref}
            //         additional={{
            //           page: DefaultPagination.page,
            //         }}
            //         name={prevKey !== '' ? `${prevKey}.${key}` : key}
            //         placeholder={intl.formatMessage({id: input.placeholder})}
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
            //             placeholder={intl.formatMessage({id: input.placeholder})}
            //             label={intl.formatMessage({id: input.label})}
            //             required={input.required}
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
  }, [images]);
  
  console.log(modifyModel)
  
  return (
    <>
      {title && <h6 className="text-primary">{title.toUpperCase()}</h6>}
      <div className={'row'}>
        {modifyModel &&
        modifyModel.map((value, index) => (
          <div key={`meg-${index}`} className={value.className}>
            {value.title && <h6 className="text-primary">{value.title.toUpperCase()}</h6>}
            {renderForm(value.data, '')}
          </div>
        ))}
      </div>
    </>
  );
}

export default ModifyEntityPage;
