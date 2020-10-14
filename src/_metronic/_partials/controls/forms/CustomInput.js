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

export function CustomInput({
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
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  return (
    <>
      <div className={isHorizontal && 'd-flex align-items-center'}>
        {label && (
          <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label'}>
            {label}
          </label>
        )}
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
      </div>

      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
