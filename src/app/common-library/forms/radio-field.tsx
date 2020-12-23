import React, {useEffect, useState} from 'react';
import './custom.css';
import {FieldFeedbackLabel} from './field-feedback-label';
import {useField, useFormikContext} from 'formik';
import {useIntl} from 'react-intl';
import {FormControlLabel, RadioGroup} from "@material-ui/core";
import StyledRadio from "./StyledRadio";
import {GetClassName, GetError, GetTouched} from "../helpers/common-function";
import _ from "lodash";
import {InputRadioType} from "../common-components/common-input";


export function RadioField({mode, disabled, required, options, labelWidth, onChange, withFeedbackLabel, label, customFeedbackLabel, type, ...props}: InputRadioType) {
  const {setFieldValue, handleChange, errors, touched, values} = useFormikContext<any>();
  const [field] = useField({
    ...props,
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
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <RadioGroup
            {...props}
            {...field}
            onChange={(e) => {
              handleChange(e)
              onChange && onChange(e, {setFieldValue, values})
              // setTouched(field.name, true)
            }}
            className={(errors[field.name] && touched[field.name]) ? 'is-invalid' : ''}
          >
            <div className="row no-gutters">
              {_innerOptions.map((val, index, arr) => {
                return (<FormControlLabel value={val.value} control={<StyledRadio/>}
                                          key={`radio_${field.name}_${val.value}`}
                                          label={intl.formatMessage({id: val.label})}/>)
              })}
            </div>
          </RadioGroup>
          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={GetError(errors, field.name)}
              touched={GetTouched(touched, field.name)}
              label={label as any}
              type={type}
              customFeedbackLabel={customFeedbackLabel}
            />
          )}
        </div>
      </div>
    </>
  );
}