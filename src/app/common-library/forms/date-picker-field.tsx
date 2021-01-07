import React, {useCallback, useMemo} from 'react';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment, {Moment} from 'moment';
import {GetClassName, GetFieldCSSClasses,} from "../helpers/common-function";
import {InputDateTimeType} from "../common-components/common-input";
import {DisplayError} from "./field-feedback-label";
import {useIntl} from "react-intl";
import _ from "lodash";

export function DatePickerField({
                                  mode, disabled, required, labelWidth, label, withFeedbackLabel = true,
                                  customFeedbackLabel,placeholder, ...props
                                }: InputDateTimeType) {
  const {setFieldValue, errors, touched, values, setFieldTouched, getFieldMeta} = useFormikContext<any>();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'RADIO.ERROR.REQUIRED';
  }, []);
  const [field] = useField({
    validate,
    ...props,
  });
  const timestamp = new Date();
  const inverseOffset = moment(timestamp).utcOffset() * -1;
  const intl = useIntl();
  const _label = useMemo(() => (_.isString(label) ? intl.formatMessage({id: label}) : label), []);
  return (
    <>
      <div className={mode == 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {_label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {_label}{required && <span className="text-danger">*</span>}
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
                      showTime
                      {...props}
                      placeholder={intl.formatMessage({id: placeholder},  {label:_.isString(_label) ? _label:''})}
                      disabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
                      format={props.format ?? "DD/MM/yyyy HH:mm"}
                      onChange={(val: Moment | null, dateString: string) => {
                        setFieldTouched(field.name, true);
                        setFieldValue(field.name, val);
                        setFieldTouched(field.name, true);
                        if (val) setFieldValue(field.name, moment(val).add(val.utcOffset(), 'm').utc().toISOString());
                        else setFieldValue(field.name, required ? '' : undefined);
                      }}
                      onBlur={(e) => {
                        setFieldTouched(field.name, true);
                      }}
                      value={field.value ? moment(field.value).add(inverseOffset, 'm') : null}
          />
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg => <DisplayError label={_label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}
