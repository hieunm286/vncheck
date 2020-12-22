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
  InputNumber,
  InputSearchSelect,
  InputString,
  InputTag
} from "./common-input";
import _ from 'lodash';

export function ModifyEntityPage<T>({
                                      inputGroups,
                                      entity,
                                      // className = '',
                                      mode = 'horizontal',
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
          if (_.isString(inputGroup)) throw new Error('Sử dụng sai cách ' + inputGroup);
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
      if (_.isString(input)) throw new Error('Sử dụng sai cách ' + key);
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
        // case 'tag':
        //   const defaultTag = (getField(entity, prevKey ? `${prevKey}.${key}` : key))
        //   return (
        //     <InputTag
        //       className={defaultClassName}
        //       name={prevKey !== '' ? `${prevKey}.${key}` : key}
        //       mode={mode}
        //       defaultTag={defaultTag}
        //       tagData={tagData}
        //       type={input._type}
        //       {...input}
        //       key={`modify-page-${key}`}
        //     />
        //   );
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
        default:
          const {_type, ...inn} = input as any;
          return <RenderForm inputs={inn} prevKey={prevKey ? `${prevKey}.${key}` : key} mode={mode}/>
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
      return (<></>)
    })}</>)
};