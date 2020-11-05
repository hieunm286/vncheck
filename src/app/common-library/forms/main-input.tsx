import React from 'react';
import './custom.css';
import { FieldFeedbackLabel } from './field-feedback-label';

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  isHorizontal: any;
  labelWidth: any;
  width: any;
  type: any;
}

export function MainInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel,
  withValidation,
  customFeedbackLabel,
  isHorizontal,
  labelWidth,
  width,
  type = 'text',
  ...props
}: MainInputState) {
  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div
          className={`col-xl-${labelWidth ? labelWidth : 3} col-md-${
            labelWidth ? labelWidth : 3
          } col-12`}>
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label mt-2'}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div
          className={`col-xl-${labelWidth ? 12 - labelWidth - 1 : 8} col-md-${
            labelWidth ? 12 - labelWidth : 9
          } col-12`}>
          <input
            type={type}
            style={width && styleInput}
            className={
              type === 'text' || type === 'email' || type === 'file' || type === 'image'
                ? withFeedbackLabel
                  ? getFieldCSSClasses(touched[field.name], errors[field.name])
                  : 'form-control'
                : ''
            }
            {...field}
            {...props}
          />

          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={errors[field.name]}
              touched={touched[field.name]}
              label={label}
              type={type}
              customFeedbackLabel={customFeedbackLabel}
            />
          )}
        </div>
      </div>
    </>
  );
}
