import { Switch } from '@material-ui/core';
import React from 'react';
import './custom.css';
import { FieldFeedbackLabel } from './field-feedback-label';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { useFormikContext } from 'formik';

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];

  if (touched && errors) classes.push('is-invalid');

  if (touched && errors) classes.push('is-valid');

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

const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName]
  }

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return error[arrName[0]] ? error[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : ''
}

const getTouched = (touched: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return touched[fieldName]
  }

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return touched[arrName[0]] ? touched[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return touched[arrName[0]] ? touched[arrName[0]][arrName[1]] : ''
}

interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  isHorizontal: any;
  labelWidth: any;
  width: any;
  type: any;
}

export function SwitchField({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel,
  withValidation,
  customFeedbackLabel,
  isHorizontal,
  labelWidth,
  width,
  type = 'text',
  ...props
}: MainInputState) {
  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  // console.log(errors)
  // console.log(touched)

  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className={isHorizontal && getClassName(labelWidth, true)}>
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label mt-2'}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>

        <div className={isHorizontal && getClassName(labelWidth, false)}>
          {
            <Switch 
              // style={{color: "#1DBE2D"}}
              checked={values.status}
              onChange={(e: any) => {console.log(e.target.checked);values.status = e.target.checked;setFieldValue('status', e.target.checked)}}
              color="primary"
              checkedIcon={<CheckCircleOutlinedIcon style={{backgroundColor: "#FFFFFF"}} />}
              // icon={<CheckCircleIcon />}
              {...props}
              {...field}
            />
          }
          

          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={getError(errors, field.name)}
              touched={getTouched(touched, field.name)}
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