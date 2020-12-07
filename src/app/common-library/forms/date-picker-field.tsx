import React from 'react';
import {useField, useFormikContext} from 'formik';
import DatePicker, {registerLocale} from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons'

registerLocale('vi', vi);

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];
  
  if (touched && errors) classes.push('is-invalid');
  
  if (touched && !errors) classes.push(' ');
  
  return classes.join(' ');
};

const getField = (field: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return field.name[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  let fields: any = field.name[arrName[0]]
  
  arrName.forEach((el: string, key: number) => {
    if (key > 0) {
      fields = fields[el]
    }
    
  })
  
  return fields
}

const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  if (arrName.length === 3) {
    return error[arrName[0]] && error[arrName[1]] ? error[arrName[0]][arrName[1]][arrName[2]] : ''
  }
  
  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : ''
}

const getTouched = (touched: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return touched[fieldName]
  }
  
  const arrName = fieldName.split('.')
  
  if (arrName.length === 3) {
    return touched[arrName[0]] && touched[arrName[1]] ? touched[arrName[0]][arrName[1]][arrName[2]] : ''
  }
  
  return touched[arrName[0]] ? touched[arrName[0]][arrName[1]] : ''
}

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

export function DatePickerField({...props}: any) {
  const {setFieldValue, errors, touched} = useFormikContext<any>();
  const [field] = useField(props);
  const ExampleCustomInput = ({ value, onClick }:{ value:any, onClick:any }) => (
    <button  onClick={onClick}>
      {value}
    </button>
  );
  
  return (
    <>
      <div className={props.isHorizontal && 'row'}>
        <div className={props.isHorizontal && getClassName(props.labelWidth, true)}>
          {props.label && <label>{props.label}</label>}
        </div>
        <div className={props.isHorizontal && getClassName(props.labelWidth, false)}>
            <DatePicker
              className={getFieldCSSClasses(getTouched(touched, field.name), getError(errors, field.name))}
              style={{width: '100%'}}
              dateFormat="dd/MM/yyyy h:mm aa"
              selected={(field.value && new Date(field.value)) || null}
              {...field}
              {...props}
              onChange={(val: any) => {
                val.toISOString = () =>
                  (new Date(val.getTime() - val.getTimezoneOffset() * 60000)).toISOString();
                setFieldValue(field.name, val);
              }}
              autoComplete="off"
              wrapperClassName="d-block"
              locale="vi"
              placeholderText="Chọn"
              showTimeInput
              timeInputLabel="Thời gian:"
              disabled={props.disabled}
            />
          <FontAwesomeIcon icon={faCalendarAlt} style={{position:'absolute', top: 9, right:9}}/>
          {/*<DatePicker*/}
          {/*  onChange={(val: any) => {*/}
          {/*    val.toISOString = () =>*/}
          {/*      (new Date(val.getTime() - val.getTimezoneOffset() * 60000)).toISOString();*/}
          {/*    setFieldValue(field.name, val);*/}
          {/*  }}*/}
          {/*  customInput={ExampleCustomInput}*/}
          {/*/>*/}
  
          {getError(errors, field.name) && getTouched(touched, field.name) ? (
            <div className="invalid-datepicker-feedback text-danger" style={{fontSize: '0.9rem'}}>
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
