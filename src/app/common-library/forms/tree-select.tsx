import React from 'react';
import { TreeSelect } from 'antd';
import { useField, useFormikContext } from 'formik';
import './tree-select.scss'

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
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={data}
            placeholder={placeholder}
            treeDefaultExpandAll
            onChange={(val) => {
              onChange(val);
              setFieldValue(name, val);
            }}
            className="ant-tree-select-custom"
          />
        </div>
      </div>
    </>
  );
}

export default CustomeTreeSelect;
