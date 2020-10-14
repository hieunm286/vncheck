import React from 'react';
import { useField } from 'formik';
import { FieldFeedbackLabel } from './FieldFeedbackLabel';

const getFieldCSSClasses = (touched, errors) => {
  const classes = ['form-control', 'form-control-solid'];
  if (touched && errors) {
    classes.push('is-invalid-select');
  }

  if (touched && !errors) {
    classes.push('is-valid-select');
  }

  return classes.join(' ');
};

export function CustomSelect({
  label,
  withFeedbackLabel,
  type = 'text',
  customFeedbackLabel,
  children,
  isHorizontal,
  width,
  checkSelect,
  ...props
}) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className="col-md-3 col-12">
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 select-label'}>
              {label} <span className="text-danger">*</span>
            </label>
          )}
        </div>
        <div className="col-md-9 col-12">
          <select
            style={width && styleInput}
            className={withFeedbackLabel ? 'is-invalid-select' : 'form-control form-control-solid'}
            {...field}
            {...props}>
            {children}
          </select>
          {/* {withFeedbackLabel && (
            <FieldFeedbackLabel
              erros={error}
              touched={touched}
              label={label}
              customFeedbackLabel={customFeedbackLabel}
            />
          )} */}
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
