import React, {useEffect, useMemo, useState} from 'react';
import './custom.css';
import {DisplayError} from './field-feedback-label';
import {GetClassName, GetFieldCSSClasses} from "../helpers/common-function";
import {ErrorMessage, useFormikContext} from "formik";
import {MainInputState} from "../common-types/common-type";
import _ from "lodash";
import {useIntl} from "react-intl";

export function MainInput({
                            field,
                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
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
                            placeholder,
                            ...props
                          }: MainInputState) {
  const styleInput = {
    marginRight: 0,
  };
  const {setFieldValue, values, handleChange, getFieldMeta, handleBlur, setFieldError} = useFormikContext<any>();
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  const _disabled = useMemo(() => (disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled), [disabled]);
  const [_error, setError] = useState<string | null | undefined>(null);
  useEffect(() => {
    if (form.isSubmitting) setError(null);
  }, [form.isSubmitting])
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        {_label && (
          <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {_label}{required && <span className="text-danger">*</span>}
            </label>
          </div>
        )}
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
            disabled={_disabled}
            {...field}
            {...props}
            placeholder={_disabled ? '' : intl.formatMessage({id: placeholder}, {label: _.isString(_label) ? _label : ''})}
            value={field.value ?? ''}
            onChange={(e) => {
              if (type === 'string-number') {
                const test = /^\d+$/.test(e.target.value);
                if (!test) {
                  e.target.value = e.target.value.replace(/\D/g, '');
                  setError('INPUT.ERROR.TYPE_ONLY_NUMBER');
                } else setError(null);
              }
              handleChange(e);
              onChange && onChange(e, {setFieldValue, values})
            }}
            onBlur={(e) => {
              handleBlur(e)
            }}
          />
          {_error && withFeedbackLabel && (<DisplayError label={_label} error={_error}/>)}
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg => <DisplayError label={_label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}