import React, {ReactElement, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {withAsyncPaginate} from 'react-select-async-paginate';
import {useFormikContext} from 'formik';
import {deCapitalizeFirstLetter, GetClassName} from '../helpers/common-function'
import AtlaskitSelect from "@atlaskit/select";
import {useIntl} from "react-intl";
import {StylesConfig} from "react-select/src/styles";

const getCSSClasses = (errorName: any, isTouched: any): string => {
  const classes: string[] = [];
  
  // classes.push('form-control')
  if (isTouched) {
    if (errorName) {
      classes.push('is-invalid');
      classes.push('border-danger');
    } else {
      // classes.push('is-valid');
    }
  }
  classes.push('input-search-select');
  return classes.join(" ");
}

export function InfiniteSelect({
                                 name,
                                 label,
                                 value,
                                 loadOptions,
                                 onChange,
                                 required,
                                 keyField,
                                 disabled,
                                 selectField,
                                 validationMessage,
                                 labelWidth,
                                 mode, ...props
                               }: {
  label: string | ReactElement;
  loadOptions: any;
  selectField?: string;
  keyField?: string;
  mode?: 'horizontal' | 'vertical',
  value?: any;
  onChange?: (value: { value: any, entity: any }, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
  placeholder?: string;
  name: string;
  additional?: any;
  labelWidth?: number;
  validationMessage?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  
}) {
  const {setFieldValue, errors, touched, values, setFieldTouched} = useFormikContext<any>();
  const CustomAsyncPaginate = withAsyncPaginate(AtlaskitSelect);
  
  // useEffect(() => {
  //   setFieldTouched(name, true)
  
  // }, [])
  
  const styles = useMemo((): StylesConfig => {
    return {
      control: (base, props1) => {
        // console.log("control", base, props1)
        return {
          ...base,
          backgroundColor: "transparent",
          borderColor: "#E4E6EF",
          borderRadius: "0.42rem",
          borderWidth: "1px",
          minHeight: "2.3rem",
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          ":hover": {borderColor: "#0fc35c"},
          ":focus": {borderColor: "#0fc35c"},
          fontSize: "12px"
        }
      },
      valueContainer: (base, props1) => {
        return {
          ...base,
          paddingLeft: "1rem",
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          fontSize: "12px"
        }
      },
      menuList: (base, props1) => {
        // console.log(props1);
        return {
          ...base,
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          fontSize: "12px"
        }
      },
      singleValue: (base, props1) => {
        return {
          ...base,
          fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
          fontSize: "12px"
        }
      },
      dropdownIndicator: (base, props1) => {
        return {...base, padding: "0.41rem 0px !important", color: "#B5B5C3"}
      },
      placeholder: (styles) => {
        return {...styles, color: "#B5B5C3", fontSize: "12px"}
      },
      option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {...styles}
      },
    }
  }, []);

  const getValue = (selectFields?: string, names?: string, formValues?: any) => {
    if (formValues && names && formValues[names]) {
      if (selectFields) {
        return formValues[names][selectFields]
      } else {
        return formValues[names]
      }
    }
    return;
  }

  console.log(errors[name]);
  console.log(name)
  console.log(touched);
  console.log(GetSearchSelectValue({selectField, name, values}));
  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
            {label}
            {required ? <span className="text-danger">*</span> : <></>}
          </label>
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <CustomAsyncPaginate
            className={getCSSClasses(errors[name], touched[name])}
            {...props}
            value={GetSearchSelectValue({selectField, name, values})}
            // value={GetSearchSelectValue({selectField, name, values})}
            getOptionValue={option => {
              return selectField ? option[selectField] : option
            }}
            getOptionLabel={option => {
              return keyField ? option[keyField] : option
            }}
            loadOptions={loadOptions}
            onChange={(value: any, action) => {
              setFieldValue(name, value);
              onChange && onChange(value, {setFieldValue, values});
            }}
            styles={styles}
            isDisabled={disabled ? typeof disabled === 'boolean' ? disabled : disabled(values) : disabled}
            // className={`${errors[name] ? 'border-danger' : 'input-search-select'}`}
          />
          {errors[name] ? (
            <div className="text-danger" style={{fontSize: '0.9rem'}}>
              {
                // validationMessage ? intl.formatMessage({id: validationMessage}) : 'Vui lòng chọn ' + deCapitalizeFirstLetter(label)
                // (!errors[name] && typeof label === 'string') ? 'Vui lòng chọn ' + deCapitalizeFirstLetter(label) : errors[name]
                errors[name]
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

export const GetSearchSelectValue = ({values, selectField, name}: { values: any, selectField?: string, name: string }) => {
  const path = name.split('.');
  const obj = path.reduce((pre, cur, curI, arr) => {
    return pre ? pre[cur] : pre;
  }, values)
  return     selectField ? (obj ? [obj[selectField]] : [obj]) : [obj]
}
