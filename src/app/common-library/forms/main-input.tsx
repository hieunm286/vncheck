import React from 'react';
import './custom.css';
import {FieldFeedbackLabel} from './field-feedback-label';
import {GetClassName, GetFieldCSSClasses, GetTouched} from "../helpers/common-function";


const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  if (arrName.length === 3) {
    return error[arrName[0]] ? error[arrName[0]][arrName[1]][arrName[2]] : ''
  }
  
  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : ''
}

interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  mode: 'horizontal' | 'vertical';
  labelWidth: any;
  width: any;
  type: any;
  value: any;
  disabled?: boolean;
  required?: boolean;
}

export function MainInput({
                            field, // { name, value, onChange, onBlur }
                            form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            label,
                            withFeedbackLabel,
                            withValidation,
                            customFeedbackLabel,
                            mode,
                            labelWidth,
                            width,
                            type = 'text',
                            disabled,
                            required,
                            ...props
                          }: MainInputState) {
  const styleInput = {
    marginRight: 0,
  };
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <input
            type={type}
            style={width && styleInput}
            className={
              ['text', 'email', 'file', 'image', 'number'].includes(type)
                ? withFeedbackLabel
                ? GetFieldCSSClasses(GetTouched(touched, field.name), getError(errors, field.name))
                : 'form-control'
                : ''
            }
            min={type === 'number' ? 0 : undefined}
            disabled={disabled}
            {...field}
            {...props}
          />
          
          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={getError(errors, field.name)}
              touched={GetTouched(touched, field.name)}
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