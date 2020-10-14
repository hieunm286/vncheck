import React from 'react';
import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import './Custom.css';

const getFieldCSSClasses = (touched, errors) => {
  const classes = ['form-control'];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

export function MainInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel,
  withValidation,
  customFeedbackLabel,
  isHorizontal,
  width,
  type = 'text',
  ...props
}) {
  const styleLabe = {
    width: 100,
  };

  const styleInput = {
    marginRight: 0,
  };

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className="col-md-3 col-12">
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label'}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className="col-md-9 col-12">
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
