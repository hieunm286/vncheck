import React, {useCallback, useEffect, useState} from 'react';
import './custom.css';
import {DisplayError} from './field-feedback-label';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {useIntl} from 'react-intl';
import {FormControlLabel, RadioGroup} from "@material-ui/core";
import StyledRadio from "./StyledRadio";
import {GetClassName} from "../helpers/common-function";
import _ from "lodash";
import {InputRadioType} from "../common-components/common-input";


export function RadioField({
                             label,
                             name,
                             withFeedbackLabel = true,
                             withValidation,
                             customFeedbackLabel,
                             mode,
                             labelWidth,
                             disabled,
                             required,
                             options,
                             onChange,
                             type,
                             optionsClassName,
                             ...props
                           }: InputRadioType) {
  const {setFieldValue, handleChange, values, handleBlur} = useFormikContext<any>();
  const validate = useCallback((value: any): string | void => {
    if (required && (value === null || value === '')) return 'RADIO.ERROR.REQUIRED';
  }, []);
  const [field] = useField({
    validate,
    name,
    disabled: disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled,
    required: required ? typeof required === 'boolean' ? required : required(values) : required
  });
  const [_innerOptions, setInnerOptions] = useState(options);
  useEffect(() => {
    if (_.isArray(options)) setInnerOptions(options);
    else setInnerOptions(options(values));
  }, [options]);
  const intl = useIntl();
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        {label && (
          <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {label}{required && <span className="text-danger">*</span>}
            </label>
          </div>
        )}
        
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <RadioGroup
            {...props}
            {...field}
            name={name}
            value={field.value ?? null}
            onChange={(e) => {
              handleChange(e)
              onChange && onChange(e, {setFieldValue, values})
              // setTouched(field.name, true)
            }}
            onBlur={handleBlur}
          >
            <div className={'row no-gutters'}>
              {_innerOptions.map((val, index, arr) => {
                return (<FormControlLabel className={optionsClassName} value={val.value} control={<StyledRadio/>}
                                          key={`radio_${name}_${val.value}`}
                                          label={_.isString(val.label) ?
                                            intl.formatMessage({id: val.label}) : val.label({
                                              setFieldValue,
                                              handleChange,
                                              values,
                                              handleBlur
                                            })}/>)
              })}
            </div>
          </RadioGroup>
          {withFeedbackLabel && (<ErrorMessage name={name}>
            {msg => <DisplayError label={label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}