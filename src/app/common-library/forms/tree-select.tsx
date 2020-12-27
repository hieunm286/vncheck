import React, {ReactElement, useEffect, useState} from 'react';
import {TreeSelect} from 'antd';
import {useField, useFormikContext} from 'formik';
import './tree-select.scss'
import SelectDropDownIcon from './select-drop-down-icon';
import {useIntl} from 'react-intl';
import _ from 'lodash';
import {GetClassName} from "../helpers/common-function";

function CustomTreeSelect(
  {
    name,
    label,
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
  const [field, fieldMeta, fieldHelper] = useField({name,});
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
          {errors[name] ? (
            <div className="text-danger" style={{fontSize: '0.9rem'}}>
              {
                // validationMessage ? intl.formatMessage({id: validationMessage}) : 'Vui lòng chọn ' + deCapitalizeFirstLetter(label)
                // (!errors[name] && typeof label === 'string') ? 'Vui lòng chọn ' + deCapitalizeFirstLetter(label) : errors[name]
                _.isString(errors[name]) ? intl.formatMessage({id: errors[name] as string}) : errors[name]
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

export default CustomTreeSelect;
