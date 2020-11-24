import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
registerLocale('vi', vi);

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];

  if (touched && errors) classes.push('is-invalid');

  if (touched && !errors) classes.push('is-valid');

  return classes.join(' ');
};

const getClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];

  if (labelStart) {
    if (labelWidth) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-3`);
      classes.push(`col-md-3`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth) {
      classes.push(`col-xl-${12 - labelWidth - 1}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-9`);
      classes.push('col-12');
    }
  }

  return classes.join(' ');
};

export function DatePickerField({ ...props }: any) {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [field] = useField(props);
  // const [startDate, setStartDate] = React.useState(
  //   setHours(setMinutes(new Date(), 30), 16)
  // );

  return (
    <>
      <div className={props.isHorizontal && 'row'}>
        <div className={props.isHorizontal && getClassName(props.labelWidth, true)}>
          {props.label && <label>{props.label}</label>}
        </div>
        <div className={props.isHorizontal && getClassName(props.labelWidth, false)}>
          <DatePicker
            className={getFieldCSSClasses(touched[field.name], errors[field.name])}
            style={{ width: '100%' }}
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={(field.value && new Date(field.value)) || null}
            {...field}
            {...props}
            onChange={val => {
              setFieldValue(field.name, val);
            }}
            autoComplete="off"
            wrapperClassName="d-block"
            locale="vi"
            placeholderText="Ngày tháng"
            // showTimeSelect
            showTimeInput
            timeInputLabel="Thời gian:"
          />
          {errors[field.name] && touched[field.name] ? (
            <div className="invalid-datepicker-feedback text-danger" style={{ fontSize: '0.9rem' }}>
              Vui lòng nhập 
              {
                // errors[field.name]?.toString()
                 props.label
              }
            </div>
          ) : (
            <div className="feedback">
              {/* Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
