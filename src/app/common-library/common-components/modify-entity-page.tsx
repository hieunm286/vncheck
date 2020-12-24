import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {
  _ModifyModelInput,
  ModifyPanel,
  ModifyInputGroup,
  InputGroups,
  InputGroupType
} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {generateInitForm, getField, getNewImage, getOnlyFile} from '../helpers/common-function';
import {Field, Form, Formik, useFormikContext} from 'formik';
import ImgGallery from '../forms/image-gallery';
import {
  InputBoolean,
  InputDateTime,
  InputImage,
  InputNumber, InputRadio,
  InputSearchSelect,
  InputString,
  InputTag
} from "./common-input";
import _ from 'lodash';
import {FormikRadioGroup} from "../forms/radio-group-field";

export function ModifyEntityPage<T>({
                                      inputGroups,
                                      entity,
                                      // className = '',
                                      mode = 'horizontal',
                                      // tagData
                                    }: {
  
  inputGroups: InputGroups;
  mode?: 'horizontal' | 'vertical'
  onChange?: any;
  // className?: string;
  handleChangeTag?: any;
  values?: any;
  entity?: any;
  errors?: any
}) {
  
  console.log(inputGroups)
  const {_subTitle, ...pl} = inputGroups;
  return (
    <>
      <div className={'row'}>
        {pl && Object.values(pl).map((inputGroup, index) => {
          if (_.isString(inputGroup)) throw new Error('Sử dụng sai cách ' + inputGroup + '\n' + JSON.stringify(pl));
          const {_subTitle, _className, _dataClassName, _titleClassName, ...inputs} = inputGroup;
          return (
            <div key={`meg-${index}`} className={_className ?? 'col-12'}>
              {_subTitle && <div className="modify-subtitle text-primary">{_subTitle.toUpperCase()}</div>}
              <RenderForm inputs={inputs} prevKey={''} mode={mode} />
            </div>
          )
        })}
      </div>
    </>
  );
}

export const RenderForm = ({inputs, prevKey, mode}: any) => {
  const intl = useIntl();
  const {setFieldValue, touched, values} = useFormikContext<any>();
  console.log(values)
  const defaultClassName = 'mb-5';
  return (<>
    {Object.keys(inputs).map(key => {
      const input = inputs[key];
      if (_.isString(input)) throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(inputs));
      switch (input._type) {
        case 'string':
          return (
            <InputString
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              type={input._type}
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
              type={input._type}
              {...input}
              key={`modify-page-${key}`}/>
          );
        case 'date-time':
          return (
            <InputDateTime
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-${key}`}/>
          );
        case 'radio':
          return (
            <InputRadio
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-${key}`}/>
          )
        // const _shippingAddresses = ['22','33333','5555555'];
        // return _shippingAddresses ? (
        //   <FormikRadioGroup
        //     ariaLabel="defaultShippingAddress"
        //     name="defaultShippingAddress"
        //     addresses={_shippingAddresses}
        //     currentAddress={"22"} setCurrentAddress={(e: any) => {
        //     console.log(e)
        //   }}/>
        // ) : (
        //   <></>
        case 'boolean':
          return (
            <InputBoolean
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-${key}`}
            />
          );
        case 'image':
          return (
            <InputImage
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              mode={mode}
              type={input._type}
              {...input}
              value={(values && values[key]) || []}
              key={`modify-page-${key}`}
            />
          );
        case 'search-select':
          console.log(prevKey !== '' ? `${prevKey}.${key}` : key)
          return (
            <InputSearchSelect
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              value={values[key]}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-${key}`}
            />
          );
        case 'tag':
          const defaultTag = (getField(values, prevKey ? `${prevKey}.${key}` : key))
          return (
            <InputTag
              className={defaultClassName}
              name={prevKey !== '' ? `${prevKey}.${key}` : key}
              mode={mode}
              defaultTag={defaultTag}
              // tagData={tagData || []}
              type={input._type}
              {...input}
              key={`modify-page-${key}`}
            />
          );
        //
        // case 'SearchSelectV2':
        //   return (
        //     <InputTag
        //       className={defaultClassName}
        //       name={prevKey !== '' ? `${prevKey}.${key}` : key}
        //       mode={mode}
        //       defaultTag={defaultTag}
        //       tagData={tagData || []}
        //       type={input._type}
        //       {...input}
        //       key={`modify-page-${key}`}
        //     />
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
        default:
          const {_type, ...inn} = input as any;
          console.log(prevKey ? `${prevKey}.${key}` : key);
          return <RenderForm inputs={inn} prevKey={prevKey ? `${prevKey}.${key}` : key} mode={mode}
                             key={`render_form${prevKey ? `${prevKey}.${key}` : key}`}/>
      }
      return (<></>)
    })}</>)
};