import React, {useCallback} from 'react';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment, {Moment} from 'moment';
import {GetClassName, GetFieldCSSClasses,} from "../helpers/common-function";
import {InputDateTimeType} from "../common-components/common-input";
import {DisplayError} from "./field-feedback-label";

export function DatePickerField({
                                  mode, disabled, required, labelWidth, label, withFeedbackLabel = true,
                                  customFeedbackLabel, ...props
                                }: InputDateTimeType) {
  const {setFieldValue, errors, touched, values, setFieldTouched,getFieldMeta} = useFormikContext<any>();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'RADIO.ERROR.REQUIRED';
  }, []);
  const [field] = useField({
    validate,
    ...props,
  });
  const timestamp = new Date();
  const inverseOffset = moment(timestamp).utcOffset() * -1;
  // console.log(mode);
  return (
    <>
      <div className={mode == 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {label}{required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode == 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <DatePicker picker="date"
                      className={
                        'default-behave ' + props.checkTouched ?
                          GetFieldCSSClasses(getFieldMeta(field.name).touched, getFieldMeta(field.name).error) :
                          GetFieldCSSClasses(getFieldMeta(field.name).touched, getFieldMeta(field.name).error)}
                      locale={locale}
                      {...props}
                      disabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
                      format={props.format ?? "DD/MM/yyyy"}
                      onChange={(val: Moment | null, dateString: string) => {
                        setFieldValue(field.name, val);
                        setFieldTouched(field.name, true);
                        if (val) setFieldValue(field.name, moment(val).add(val.utcOffset(), 'm').utc().toISOString());
                        else setFieldValue(field.name, undefined);
                      }}
                      value={field.value ? moment(field.value).add(inverseOffset, 'm') : null}
          
          />
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg => <DisplayError label={label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}
