import React from 'react';
import { TreeSelect } from 'antd';
import { useField, useFormikContext } from 'formik';
import './tree-select.scss'
import SelectDropDownIcon from './select-drop-down-icon';
import { FieldFeedbackLabel } from './field-feedback-label';

const getClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];

  if (labelStart) {
    if (labelWidth) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-3`);
      classes.push(`col-md-3`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth) {
      classes.push(`col-xl-${12 - labelWidth - 1}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-9`);
      classes.push('col-12');
    }
  }

  return classes.join(' ');
};

const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName]
  }

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return error[arrName[0]] ? error[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : ''
}

const getTouched = (touched: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return touched[fieldName]
  }

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return touched[arrName[0]] ? touched[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return touched[arrName[0]] ? touched[arrName[0]][arrName[1]] : ''
}


function CustomeTreeSelect(
  { label, 
    data, 
    onChange, 
    value, 
    name, 
    placeholder, 
    withFeedbackLabel,
    withValidation,
    customFeedbackLabel,
    isHorizontal,
    labelWidth,
    width,
    ...props }
  : any) {  
  const styleLabe = {
    width: width,
  };
  const { setFieldValue, errors, touched } = useFormikContext<any>();

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className={isHorizontal && getClassName(labelWidth, true)}>
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label mt-2'}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={isHorizontal && getClassName(labelWidth, false)}>
          <TreeSelect
            suffixIcon={<SelectDropDownIcon />}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={data}
            placeholder={placeholder}
            treeDefaultExpandAll
            onChange={(val) => {
              onChange(val);
              setFieldValue(name, val);
            }}
            className={(errors[name] && touched[name]) ? 'is-invalid ant-tree-select-custom' : 'ant-tree-select-custom'}
          />
          {
            // console.log(touched)
            (errors[name] && touched[name]) && (
              <div className="invalid-feedback">{errors[name]}</div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default CustomeTreeSelect;
