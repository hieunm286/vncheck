import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {TreeSelect} from 'antd';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import './tree-select.scss'
import SelectDropDownIcon from './select-drop-down-icon';
import {useIntl} from 'react-intl';
import _ from 'lodash';
import {GetClassName} from "../helpers/common-function";
import {DisplayError} from "./field-feedback-label";

function CustomTreeSelect(
  {
    name,
    label,
    withFeedbackLabel = true,
    customFeedbackLabel,
    onChange,
    required,
    placeholder,
    labelWidth,
    onSearch,
    mode, ...props
  }
    : {
    label: string | ReactElement;
    mode?: 'horizontal' | 'vertical',
    value?: any;
    withFeedbackLabel?: boolean;
    customFeedbackLabel?: any;
    onChange?: (value: { value: any, entity: any }, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
    onSearch: (searchQueryObject: any) => any;
    placeholder?: string;
    name: string;
    additional?: any;
    labelWidth?: number;
    validationMessage?: string;
    required?: boolean | ((values: any) => boolean);
    disabled?: boolean | ((values: any) => boolean);
  }) {
  const intl = useIntl();
  const {setFieldValue, errors, touched, setFieldTouched, values} = useFormikContext<any>();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'RADIO.ERROR.REQUIRED';
  }, []);
  const [field, fieldMeta, fieldHelper] = useField({name,validate});
  useEffect(() => {
    fieldMeta.touched && onChange && onChange(field.value, {setFieldValue, values});
  }, [field.value]);
  const [treeData, setTreeData] = useState<any[]>([]);
  useEffect(() => {
    onSearch({}).then(setTreeData);
  }, [])
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
          <TreeSelect
            suffixIcon={<SelectDropDownIcon/>}
            value={field.value}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            loadData={(e)=>{
              // console.log(e);
              return onSearch({})
            }}
            allowClear={true}
            placeholder={placeholder}
            treeDefaultExpandAll
            onChange={(val) => {
              setFieldValue(name, val);
              setFieldTouched(name, true);
            }}
            className={(errors[name] && touched[name]) ? 'is-invalid ant-tree-select-custom' : 'ant-tree-select-custom'}
          />
          {withFeedbackLabel && (<ErrorMessage name={name}>
            {msg => <DisplayError label={label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}

export default CustomTreeSelect;
