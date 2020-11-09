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
        <div className={getClassName(labelWidth, true)}>
          {label && (
            <label
              style={width ? styleLabe : {}}
              className={isHorizontal ? 'mb-0 select-label mt-2' : ''}>
              {label} <span className="text-danger">*</span>
            </label>
          )}
        </div>

        <div className={getClassName(labelWidth, false)}>
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
