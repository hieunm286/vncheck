import React from 'react';
import './custom.css';
import {FieldFeedbackLabel} from './field-feedback-label';
import {useFormikContext} from 'formik';
import {useIntl} from 'react-intl';
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import StyledRadio from "./StyledRadio";
import {GetClassName, GetError, GetTouched} from "../helpers/common-function";

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
  name: any;
}

export function RadioField({
                             field, // { name, value, onChange, onBlur }
                             form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                             label,
                             withFeedbackLabel,
                             withValidation,
                             customFeedbackLabel,
                             isHorizontal,
                             labelWidth,
                             width,
                             name,
                             type = 'text',
                             ...props
                           }: MainInputState) {
  const styleLabe = {
    width: width,
  };
  const {values, setFieldValue} = useFormikContext<any>();
  
  const intl = useIntl();
  
  const handleGenderChange = (e: any) => {
    // setFieldValue('defaultShippingAddress', e.target.value)
    setFieldValue('gender', e.target.value)
  }
  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className={isHorizontal && GetClassName(labelWidth, true)}>
          {label && (
            <label style={width && styleLabe} className={isHorizontal && 'mb-0 input-label mt-2'}>
              {label} {withFeedbackLabel && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        
        <div className={isHorizontal && GetClassName(labelWidth, false)}>
          <RadioGroup name={name} value={values.gender}
                      onChange={(e: any) => handleGenderChange(e)} {...props} {...field}
                      className={(errors[field.name] && touched[field.name]) ? 'is-invalid' : ''}>
            <div className="row no-gutters">
              <FormControlLabel name={name} value="1" control={<StyledRadio/>}
                                label={intl.formatMessage({id: 'AGENCY.EDIT.LABEL.OWNER_GENDER_MALE'})}/>
              <FormControlLabel name={name} value="0" control={<StyledRadio/>}
                                label={intl.formatMessage({id: 'AGENCY.EDIT.LABEL.OWNER_GENDER_FEMALE'})}/>
            </div>
          </RadioGroup>
          {withFeedbackLabel && (
            <FieldFeedbackLabel
              error={GetError(errors, field.name)}
              touched={GetTouched(touched, field.name)}
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