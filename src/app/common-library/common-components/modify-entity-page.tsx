import React from 'react';
import {InputGroups} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {getField} from '../helpers/common-function';
import {useFormikContext} from 'formik';
import {
  InputBoolean,
  InputCheckBox,
  InputDateTime,
  InputImage,
  InputNumber,
  InputRadio,
  InputSearchSelect,
  InputString, InputStringNumber,
  InputTag,
} from './common-input';
import _ from 'lodash';
import {InputCustom} from "../forms/input-custom";

export function ModifyEntityPage<T>({
  inputGroups,
  entity,
  // className = '',
  mode = 'horizontal',
}: // tagData
{
  inputGroups: InputGroups;
  mode?: 'horizontal' | 'vertical';
  onChange?: any;
  // className?: string;
  handleChangeTag?: any;
  values?: any;
  entity?: any;
  errors?: any;
}) {
  const { _subTitle, ...pl } = inputGroups;
  return (
    <>
      <div className={'row'}>
        {pl && Object.values(pl).map((inputGroup, index) => {
          if (_.isString(inputGroup)) throw new Error('Sử dụng sai cách ' + inputGroup + '\n' + JSON.stringify(pl));
          const {_subTitle, _className, _dataClassName, _titleClassName, ...inputs} = inputGroup;
          return (
            <div key={`modify-entity-page${index}`} className={_className ?? 'col-12'}>
              {_subTitle && <div className="modify-subtitle text-primary">{_subTitle.toUpperCase()}</div>}
              <RenderForm inputs={inputs} prevKey={''} mode={mode}/>
            </div>
          )
        })}
      </div>
    </>
  );
}

export const RenderForm = ({ inputs, prevKey, mode }: any) => {
  const { setFieldValue, touched, values } = useFormikContext<any>();
  const defaultClassName = 'mb-5';
  return (<>
    {Object.keys(inputs).map(key => {
      const input = inputs[key];
      if (_.isString(input)) throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(inputs));
      const name = prevKey !== '' ? `${prevKey}.${key}` : key;
      switch (input._type) {
        case 'string':
        case 'email':
          return (
            <InputString
              className={defaultClassName}
              name={name}
              type={input._type}
              {...input}
              mode={mode}
              key={`modify-page-form-${name}`}/>
          );
          case 'string-number': {
            return (
              <InputStringNumber
                className={defaultClassName}
                name={name}
                type={input._type}
                {...input}
                mode={mode}
                key={`modify-page-form-${name}`}/>
            );
          }
        case 'number':
          return (
            <InputNumber
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}/>
          );
        case 'date-time':
          return (
            <InputDateTime
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}/>
          );
        case 'radio':
          return (
            <InputRadio
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}/>
          )
        case 'boolean': {
          return (
            <InputBoolean
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }
        case 'image':
          return (
            <InputImage
              className={defaultClassName}
              name={name}
              mode={mode}
              type={input._type}
              {...input}
              // value={(values && values[key]) || []}
              key={`modify-page-form-${name}`}
            />
          );
        case 'search-select': {
          return (
            <InputSearchSelect
              className={defaultClassName}
              name={name}
              value={values[key]}
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }
        case 'tag': {
          const defaultTag = (getField(values, prevKey ? `${prevKey}.${key}` : key))
          console.log('----------------')
          console.log(prevKey ? `${prevKey}.${key}` : key)
          console.log(defaultTag)
          console.log('----------------')
  
          return (
            <InputTag
              className={defaultClassName}
              name={name}
              mode={mode}
              data={defaultTag}
              // tagData={tagData || []}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }

        case 'checkbox':
            return (
              <InputCheckBox
                className={defaultClassName}
                name={name}
                type={input._type}
                {...input}
                key={`modify-page-form-${name}`}
              />
            );

        case 'custom': {
          const {_type, ...props} = input;
          return (<InputCustom {...props} key={`modify-page-form-${name}`}/>);
        }
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
        // case 'gallery':
        //   return (
        //     <div className="mt-3" key={key}>
        //       <ImgGallery
        //         label={intl.formatMessage({id: input.label as any})}
        //         labelWidth={4}
        //         name={prevKey !== '' ? `${prevKey}.${key}` : key}
        //         isHorizontal
        //         mode='multiple'
        //         photos={[
        //           {
        //             path: 'https://source.unsplash.com/aZjw7xI3QAA/1144x763',
        //             author: 'Nguyễn Minh Hiếu',
        //             time: '26/09/2020 9:00',
        //             location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
        //             thumbnail: 'https://source.unsplash.com/aZjw7xI3QAA/100x67',
        //           },
        //           {
        //             path: 'https://source.unsplash.com/c77MgFOt7e0/1144x763',
        //             author: 'Nguyễn Minh Hiếu',
        //             time: '26/09/2020 9:00',
        //             location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
        //             thumbnail: 'https://source.unsplash.com/c77MgFOt7e0/100x67',
        //           },
        //           {
        //             path: 'https://source.unsplash.com/QdBHnkBdu4g/1144x763',
        //             author: 'Nguyễn Minh Hiếu',
        //             time: '26/09/2020 9:00',
        //             location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
        //             thumbnail: 'https://source.unsplash.com/QdBHnkBdu4g/100x67',
        //           },
        //         ]}
        //       />
        //     </div>
        //   );
        
        default:
          const {_type, ...inn} = input as any;
          console.log(prevKey ? `${prevKey}.${key}` : key);
          return <RenderForm inputs={inn} prevKey={prevKey ? `${prevKey}.${key}` : key} mode={mode}
                             key={`render_form${prevKey ? `${prevKey}.${key}` : key}`}/>
      }
      return (<></>)
    })}</>)
};
