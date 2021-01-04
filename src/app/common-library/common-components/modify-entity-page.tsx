import React, {Fragment} from 'react';
import {InputGroups} from '../common-types/common-type';
import {useIntl} from 'react-intl';
import {
  InputBoolean,
  InputCheckBox,
  InputDateTime,
  InputImage,
  InputNumber,
  InputRadio,
  InputSearchSelect,
  InputString,
  InputStringNumber,
  InputTag,
  InputTreeSelect,
} from './common-input';
import _ from 'lodash';
import {InputCustom} from "../forms/input-custom";
import { getField } from '../helpers/common-function';

export function ModifyEntityPage<T>({
                                      inputGroups,
                                      mode = 'horizontal',
                                    }: // tagData
                                      {
                                        inputGroups: InputGroups;
                                        mode?: 'horizontal' | 'vertical';
                                        errors?: any;
                                      }) {
  const intl = useIntl();
  const {_subTitle, ...pl} = inputGroups;
  return (
    <>
      <div className={'row'}>
        {pl && Object.values(pl).map((inputGroup, index) => {
          if (_.isString(inputGroup)) throw new Error('Sử dụng sai cách ' + inputGroup + '\n' + JSON.stringify(pl));
          const {_subTitle, _className, _dataClassName, _titleClassName, ...inputs} = inputGroup;
          return (
            <div key={`modify-entity-page${index}`} className={_className ?? 'col-12'}>
              {_subTitle && _subTitle !== '' && (<div
                className="modify-subtitle text-primary">{intl.formatMessage({id: _subTitle}).toUpperCase()}</div>)}
              <RenderForm inputs={inputs} prevKey={''} mode={mode}/>
            </div>
          )
        })}
      </div>
    </>
  );
}

export const RenderForm = ({inputs, prevKey, mode}: any) => {
  const intl = useIntl();
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
              mode={mode}
              type={input._type}
              {...input}
              key={`modify-page-form-${name}`}
            />
          );
        }
        case 'tree-select': {
          return (
            <InputTreeSelect
              className={defaultClassName}
              name={key}
              mode={mode}
              type={input._type}
              {...input}
              key={`master_header${key}`}
            />
          );
        }
        case 'tag': {
          return (
            <InputTag
              className={defaultClassName}
              name={name}
              mode={mode}
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
        default: {
          const {_type, _subTitle, _className, _dataClassName, _titleClassName, ...innt} = input as any;
          return (<Fragment key={`render_form${prevKey ? `${prevKey}.${key}` : key}`}>
            <div className={_className ?? ''}>
              {_subTitle && _subTitle !== '' && (<div
                className="modify-subtitle text-primary">{intl.formatMessage({id: _subTitle}).toUpperCase()}</div>)}
              <RenderForm inputs={innt} prevKey={prevKey ? `${prevKey}.${key}` : key} mode={mode}/>
            </div>
          </Fragment>)
        }
      }
      return (<></>)
    })}</>)
};
