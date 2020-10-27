import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';

registerLocale('vi', vi);

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

export function DatePickerField({ ...props }: any) {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [field] = useField(props);
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <div>
        <DatePicker
          className={getFieldCSSClasses(touched[field.name], errors[field.name])}
          style={{ width: '100%' }}
          dateFormat="dd/MM/yyyy"
          selected={(field.value && new Date(field.value)) || null}
          {...field}
          {...props}
          onChange={val => {
            setFieldValue(field.name, val);
          }}
          wrapperClassName="d-block"
          locale="vi"
          placeholderText="Ngày tháng"
        />
      </div>
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">{errors[field.name]?.toString()}</div>
      ) : (
        <div className="feedback">
          {/* Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format */}
        </div>
      )}
    </>
  );
}
