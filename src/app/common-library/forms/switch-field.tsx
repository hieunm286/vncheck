import {Switch} from 'antd';
import React from 'react';
import './custom.css';
import {useField, useFormikContext} from 'formik';
import {GetClassName, GetError, GetTouched} from "../helpers/common-function";
import {CheckOutlined, CloseOutlined} from "@material-ui/icons";
import {InputBooleanType} from "../common-components/common-input";

export function SwitchField({
                              mode, disabled,required, onChange,
                              ...props
                            }: InputBooleanType) {
  const {setFieldValue, errors, touched, values} = useFormikContext<any>();
  const [field] = useField({
    ...props,
    disabled: disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled,
    required: required ? typeof required === 'boolean' ? required : required(values) : required
  });
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(props.labelWidth, true) : ''}>
          {props.label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-1' : ''}>
              {props.label && <label>{props.label}</label>} {props.required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode == 'horizontal' ? GetClassName(props.labelWidth, false) : ''}>
          {
            <Switch
              checked={field?.value}
              {...props}
              onChange={(e) => {
                setFieldValue(field.name, e);
                onChange && onChange(e, {setFieldValue, values})
                // setTouched(field.name, true)
              }}
              checkedChildren={<CheckOutlined/>}
              // unCheckedChildren={<CloseOutlined/>}
              className={field?.value ? 'bg-primary' : 'bg-dark-o-95'}
            />
          }
          
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