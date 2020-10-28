import React from 'react';
import './custom.css';

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

export function Input({
                        field, // { name, value, onChange, onBlur }
                        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        label,
                        withFeedbackLabel,
                        withValidation,
                        customFeedbackLabel,
                        isHorizontal,
                        type = 'text',
                        ...props
                      }: any) {
  return (
    <>
      <div className={isHorizontal && 'd-flex mt-3'}>
        {label && (
          <label className={isHorizontal && 'w-50 justify-content-center align-self-center'}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={
            withValidation
              ? getFieldCSSClasses(touched[field.name], errors[field.name])
              : 'form-control'
          }
          {...field}
          {...props}
        />
      </div>
      {/* {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          className={
            type === 'text' ? (
            withFeedbackLabel
              ? getFieldCSSClasses(touched[field.name], errors[field.name])
              : 'form-control' ) : ''
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
      </div> */}
    </>
  );
}
