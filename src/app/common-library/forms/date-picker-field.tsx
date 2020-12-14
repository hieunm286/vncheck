import React from 'react';
import {useField, useFormikContext} from 'formik';
// import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import {DatePicker} from 'antd';
// registerLocale('vi', vi);
import locale from 'antd/es/date-picker/locale/vi_VN';
import {useIntl} from "react-intl";
import moment from 'moment';

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

// export function ExampleCustomInput({value, onClick}: { value: any, onClick: any }) {
//   return (
//     <div className="form-group">
//       <input type="text" className="form-control" value={value} onClick={onClick}/>
//       <FontAwesomeIcon icon={faCalendarAlt} onClick={onClick}/>
//     </div>
//   );
// }

export function DatePickerField({...props}: any) {
  const {setFieldValue, errors, touched} = useFormikContext<any>();
  const [field] = useField(props);
  const intl = useIntl();
  const ExampleCustomInput = (props: any) => {
    return (
      <div className="form-group mb-0 cursor-pointer">
        <input type="text"  {...props} className="form-control pr-8"/>
        <FontAwesomeIcon icon={faCalendarAlt} style={{position: 'absolute', top: 11, right: 9, color: '#42526E'}}
                         onClick={props.onClick}/>
      </div>)
  }
  return (
    <>
      <div className={props.isHorizontal && 'row'}>
        <div className={props.isHorizontal && getClassName(props.labelWidth, true)}>
          {props.label && <label>{props.label}</label>}
        </div>
        <div className={props.isHorizontal && getClassName(props.labelWidth, false)}>
          <DatePicker picker="date"
                      className={getFieldCSSClasses(getTouched(touched, field.name), getError(errors, field.name))}
                      locale={locale}
                      placeholder={intl.formatMessage({id: props.placeholder ?? 'COMMON_COMPONENT.DATEPICKER.PLACEHOLDER'})}
                      format={"DD/MM/yyyy"}
                      onChange={(val: any, dateString: string) => {
                        if (val) setFieldValue(field.name, moment(val).add(val.utcOffset(), 'm').utc().toISOString());
                        else setFieldValue(field.name, undefined);
                      }}
                      disabled={props.disabled}
                      value={field.value ? moment(field.value) : null}
          />
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
