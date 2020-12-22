import React from 'react';
import {useField, useFormikContext} from 'formik';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment, {Moment} from 'moment';
import {
  deCapitalizeFirstLetter,
  GetClassName,
  GetError,
  GetFieldCSSClasses,
  GetTouched
} from "../helpers/common-function";
import {InputDateTimeType} from "../common-components/common-input";
import _ from "lodash";

export function DatePickerField({mode, disabled,required, ...props}: InputDateTimeType) {
  const {setFieldValue, errors, touched, values} = useFormikContext<any>();
  const [field] = useField({
    ...props,
    disabled: disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled,
    required: required ? typeof required === 'boolean' ? required : required(values) : required
  });
  const timestamp = new Date();
  const inverseOffset = moment(timestamp).utcOffset() * -1;
  console.log(mode);
  return (
    <>
      <div className={mode == 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(props.labelWidth, true) : ''}>
          {props.label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {props.label && <label>{props.label}</label>} {props.required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode == 'horizontal' ? GetClassName(props.labelWidth, false) : ''}>
          <DatePicker picker="date"
                      className={
                        'default-behave ' + props.checkTouched ?
                          GetFieldCSSClasses(GetTouched(touched, field.name), GetError(errors, field.name)) :
                          GetFieldCSSClasses(GetTouched(touched, field.name), GetError(errors, field.name))}
                      locale={locale}
                      {...props}
                      format={props.format ?? "DD/MM/yyyy"}
                      onChange={(val: Moment | null, dateString: string) => {
                        setFieldValue(field.name, val);
                        if (val) setFieldValue(field.name, moment(val).add(val.utcOffset(), 'm').utc().toISOString());
                        else setFieldValue(field.name, undefined);
                      }}
                      value={field.value ? moment(field.value).add(inverseOffset, 'm') : null}
          
          />
          {!props.checkTouched && GetError(errors, field.name) ? (
            <div className="invalid-datepicker-feedback text-danger" style={{fontSize: '0.9rem'}}>
              Vui lòng chọn
              {
                '\u00A0' + (_.isString(props.label) ? deCapitalizeFirstLetter(props.label) : '')
              }
              hợp lệ
            </div>
          ) : (
            <div className="feedback">
            </div>
          )}
          {props.checkTouched === true && GetError(errors, field.name) && GetTouched(touched, field.name) ? (
            <div className="invalid-datepicker-feedback text-danger" style={{fontSize: '0.9rem'}}>
              Vui lòng chọn
              {
                '\u00A0' + (_.isString(props.label) ? deCapitalizeFirstLetter(props.label) : '')
              }
            </div>
          ) : (
            <div className="feedback">
            </div>
          )}
        </div>
      </div>
    </>
  );
}
