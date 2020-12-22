import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {_ModifyModelType, ModifyModel, ModifyPart} from '../common-types/common-type';
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

function ModifyEntityPage<T>({
                               modifyModel,
                               title,
                               entity,
                               // className = '',
                               mode = 'horizontal',
                               tagData,
                               images
                             }: {
  
  modifyModel: { title: string; modifyModel: ModifyModel };
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
  const defaultClassName = 'mb-5';
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
              case 'image':
              console.log(values)
              console.log(key)
              return (
                <InputImage
                  className={defaultClassName}
                  name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  mode={mode}
                  {...input}
                  value={values[key] || []}
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
  }, [values]);
  
  console.log(modifyModel)
  
  return (
    <>
      {modifyModel.title && <h6 className="text-primary">{modifyModel.title.toUpperCase()}</h6>}
      <div className={'row'}>
        {modifyModel &&
        modifyModel.modifyModel.map((value, index) => (
          <div key={`meg-${index}`} className={value.className ?? 'col-12'}>
            {value.title && <div className="modify-subtitle text-primary">{value.title.toUpperCase()}</div>}
            {renderForm(value.data, '')}
          </div>
        ))}
      </div>
    </>
  );
}

export default ModifyEntityPage;
