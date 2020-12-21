import React from 'react';
import './custom.css';
import {FieldFeedbackLabel} from './field-feedback-label';
import {GetClassName, GetError, GetFieldCSSClasses, GetTouched} from "../helpers/common-function";
import {useFormikContext} from "formik";
import { truncate } from 'lodash';


export interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  mode: 'horizontal' | 'vertical';
  labelWidth: number;
  width: any;
  type: string;
  value: any;
  onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  name: string;
}

export function MainInput({
                            field, // { name, value, onChange, onBlur }
                            form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            label,
                            withFeedbackLabel = true,
                            withValidation,
                            customFeedbackLabel,
                            mode,
                            labelWidth,
                            width,
                            onChange,
                            type = 'text',
                            disabled,
                            required,
                            ...props
                          }: MainInputState) {
  const styleInput = {
    marginRight: 0,
  };
  const {setFieldValue, values, handleChange, setTouched, handleBlur} = useFormikContext<any>();
  
  // console.log(errors)
  // console.log(GetError(errors, field.name))
  // console.log(touched)
  // console.log(GetTouched(touched, field.name))
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
                ? GetFieldCSSClasses(GetTouched(touched, field.name), GetError(errors, field.name))
                : 'form-control'
                : ''
            }
            min={type === 'number' ? 0 : undefined}
            disabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
            {...field}
            {...props}
            onChange={(e) => {
              handleChange(e)
              onChange && onChange(e, {setFieldValue, values})
              // setTouched(field.name, true)
            }}
            onBlur={(e) => {
              handleBlur(e)
            }}
          
          />
{/* 
          { GetError(errors, field.name) && 
             <div className="invalid-feedback">
             <FormattedMessage id={error}></FormattedMessage>
             {GetError(errors, field.name)}
           </div>
          <span className="text-danger">
            {GetError(errors, field.name)}
          </span>
           
          } */}
          
          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={GetError(errors, field.name)}
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