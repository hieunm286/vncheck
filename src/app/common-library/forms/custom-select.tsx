import React from 'react';
import { useField } from 'formik';

interface CustomSelectState {
  label: string;
  withFeedbackLabel: boolean;
  type: string;
  children: any;
  isHorizontal: boolean;
  width: number | any;
  checkSelect: boolean;
  labelWidth: number | any;
  name: string;
  value: any;
  onChange: any;
  disabled: boolean;
}

export function CustomSelect({
  label,
  withFeedbackLabel,
  type = 'text',
  children,
  isHorizontal,
  width,
  checkSelect,
  labelWidth,
  ...props
}: CustomSelectState) {
  //   const [field, meta] = useField(props);
  //   const { touched, error } = meta;

  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        <div
          className={`col-xl-${labelWidth ? labelWidth : 3} 
            col-md-${labelWidth ? labelWidth : 3} 
            col-12`}>
          {label && (
            <label
              style={width ? styleLabe : {}}
              className={isHorizontal ? 'mb-0 select-label mt-2' : ''}>
              {label} <span className="text-danger">*</span>
            </label>
          )}
        </div>
        <div
          className={`col-xl-${labelWidth ? 12 - labelWidth - 1 : 8} 
          col-md-${labelWidth ? 12 - labelWidth : 9} 
          col-12`}>
          <select
            style={width ? styleInput : {}}
            className={checkSelect ? 'form-control' : 'form-control border border-danger'}
            // {...field}
            {...props}>
            {children}
          </select>

          {!checkSelect && (
            <span className="text-danger" style={{ fontSize: 12 }}>
              Vui lòng chọn {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
