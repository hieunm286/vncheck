import React, {useEffect, useState} from 'react';
import './custom.css';
import {FieldFeedbackLabel} from './field-feedback-label';
import {useFormikContext} from 'formik';
import {useIntl} from 'react-intl';
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import StyledRadio from "./StyledRadio";
import {GetClassName, GetError, GetFieldCSSClasses, GetTouched} from "../helpers/common-function";
import {MainInputState} from "../common-types/common-type";
import _ from "lodash";


export function RadioField({
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
                             disabled,
                             required,
                             type = 'text',
                             options,
                             ...props
                           }: MainInputState & { options: { value: any, label: string }[] | ((...props: any) => { value: any, label: string }[]); }) {
  const {setFieldValue, values, handleChange, setTouched, handleBlur} = useFormikContext<any>();
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
            onChange={(e) => {
              handleChange(e)
              onChange && onChange(e, {setFieldValue, values})
              // setTouched(field.name, true)
            }}
            disabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
            {...field}
            {...props}
            className={(errors[field.name] && touched[field.name]) ? 'is-invalid' : ''}
          >
            <div className="row no-gutters">
              {_innerOptions.map((val, index, arr) => {
                return (<FormControlLabel name={props.name} value={val.value} control={<StyledRadio/>}
                                          key={`radio_${field.name}_${val.value}`}
                                          label={intl.formatMessage({id: val.label})}/>)
              })}
            </div>
          </RadioGroup>
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