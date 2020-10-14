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

export function Select({
  label,
  withFeedbackLabel,
  type = 'text',
  customFeedbackLabel,
  children,
  isHorizontal,
  width,
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
      <div className={isHorizontal && 'd-flex align-items-center'}>
        {label && (
          <label style={width && styleLabe} className={isHorizontal && 'mb-0 select-label'}>
            {label}
          </label>
        )}
        <select
          style={width && styleInput}
          className={
            withFeedbackLabel
              ? getFieldCSSClasses(touched, error)
              : 'form-control form-control-solid'
          }
          {...field}
          {...props}>
          {children}
        </select>
        {withFeedbackLabel && (
          <FieldFeedbackLabel
            erros={error}
            touched={touched}
            label={label}
            customFeedbackLabel={customFeedbackLabel}
          />
        )}
      </div>
    </>
  );
}
