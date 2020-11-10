import { Switch } from '@material-ui/core';
import React from 'react';
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

export function SwitchButton({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel,
  withValidation,
  customFeedbackLabel,
  type = 'text',
  isHorizontal,
  ...props
}: any) {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <div className={isHorizontal && 'd-flex mt-3'}>
        {label && (
          <label className={isHorizontal && 'w-50 justify-content-center align-self-center'}>
            {label}
          </label>
        )}
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          className={
            withValidation
              ? getFieldCSSClasses(touched[field.name], errors[field.name])
              : 'form-control'
          }
          {...field}
          {...props}
        />
        {/* <input
          type={type}
          className={
            withValidation
              ? getFieldCSSClasses(touched[field.name], errors[field.name])
              : 'form-control'
          }
          {...field}
          {...props}
        /> */}
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
