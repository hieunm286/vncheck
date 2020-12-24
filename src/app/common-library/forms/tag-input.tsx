import React, {useEffect, useRef, useState} from 'react';
import {Select} from 'antd';
import {useField, useFormikContext} from 'formik';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {DefaultPagination} from '../common-consts/const';
import {fetchAllUser} from '../../pages/account/_redux/user-action';
import {deCapitalizeFirstLetter, GetClassName, GetError, GetTouched} from '../helpers/common-function';

const { Option } = Select;

const getDefautltTag = (data: any) => {
  const idArr: any[] = [];
  
  data?.forEach((el: any) => {
    idArr.push(el.user ? el.user._id : el._id)
  })
  
  return idArr;
};

function TagInput({
                    label,
                    data,
                    handleChange,
                    value,
                    name,
                    mode,
                    labelWidth,
                    required,
                    disabled,
                    tagData,
                    root,
                    placeholder,
                    ...props
                  }: {
  
  placeholder?: string;
  [X: string]: any;
}) {
  
  const {setFieldValue, errors, touched} = useFormikContext<any>();
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <Select
            mode="multiple"
            style={{width: '100%'}}
            defaultValue={getDefautltTag(data) || []}
            placeholder={placeholder}
            onChange={(value: any) => {
                // handleChange(value);
                setFieldValue(name, value);
            }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={disabled}
            className={`${GetTouched(touched, name) && GetError(errors, name) ? 'border border-danger rounded' : ''}`}
            // className={'default-behave ' + getFieldCSSClasses(getTouched(touched, name), getError(errors, name))}
          
          >
            {tagData && tagData.map((item: any, key: any) => (
              <Option key={item._id} value={item._id}>
                {item.fullName ? item.fullName : item.user && item.user.fullName ? item.user.fullName : item.lastName ? item.lastName : item.user.lastName}
              </Option>
            ))}
          </Select>
          {GetError(errors, name) && GetTouched(touched, name) ? (
            <div className="invalid-datepicker-feedback text-danger" style={{fontSize: '0.9rem'}}>
              Vui lòng chọn
              {
                // errors[field.name]?.toString()
                '\u00A0' + deCapitalizeFirstLetter(label)
              }
            </div>
          ) : (
            <div className="feedback">
              {/* Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TagInput;
