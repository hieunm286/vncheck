import React, { ChangeEvent } from 'react';
import './custom.css';
import { FieldFeedbackLabel } from './field-feedback-label';
import { useIntl } from 'react-intl';

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];

  // if (touched && errors) classes.push('is-invalid');

  // if (touched && errors) classes.push('is-valid');

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

export function SelectField({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel,
  withValidation,
  customFeedbackLabel,
  isHorizontal,
  labelWidth,
  width,
  children,
  type = 'text',
  ...props
}: {
  field : any; // { name, value, onChange, onBlur }
  form: { touched: any, errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  isHorizontal: any;
  labelWidth: any;
  width: any,
  children: any,
  type: any,
}) {
  const styleLabe = {
    width: width,
  };

  const styleInput = {
    marginRight: 0,
  };

  const intl = useIntl();

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
        <select
          className={withFeedbackLabel ? getFieldCSSClasses(touched, errors) : 'form-control'}
          {...field}
          {...props}>
          <option hidden>{intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}</option>
          {children ?
            children.map((opt: any, key: number) => {
              return (
                <option key={opt.key} data-code={opt.key} value={opt.value}>{opt.value}</option>
              )
            })
            :
            (<></>)
          }
        </select>

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