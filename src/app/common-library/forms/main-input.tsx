import React from 'react';
import './custom.css';
import {DisplayError, FieldFeedbackLabel} from './field-feedback-label';
import {GetClassName, GetFieldCSSClasses} from "../helpers/common-function";
import {ErrorMessage, useFormikContext} from "formik";
import {MainInputState} from "../common-types/common-type";

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
  const {setFieldValue, values, handleChange, getFieldMeta, handleBlur} = useFormikContext<any>();
  
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
              {label}{required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <input
            type={type === 'string-number' ? 'text' : type}
            style={width && styleInput}
            className={
              ['string', 'email', 'file', 'image', 'number', 'string-number'].includes(type)
                ? withFeedbackLabel
                ? GetFieldCSSClasses(getFieldMeta(field.name).touched, getFieldMeta(field.name).error)
                : 'form-control'
                : ''
            }
            min={type === 'number' ? 0 : undefined}
            disabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
            {...field}
            {...props}
            value={field.value ?? ''}
            onChange={(e) => {
              if (type === 'string-number') {
                e.target.value = e.target.value.replace(/\D/g, '');
              }
              handleChange(e);
              onChange && onChange(e, {setFieldValue, values})
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
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg =>   <DisplayError label={label} error={msg} />
            }
          </ErrorMessage>)}
          {/*{withFeedbackLabel && (*/}
          {/*  <FieldFeedbackLabel*/}
          {/*    error={GetError(errors, field.name)}*/}
          {/*    touched={GetTouched(touched, field.name)}*/}
          {/*    label={label}*/}
          {/*    type={type}*/}
          {/*    customFeedbackLabel={customFeedbackLabel}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
}