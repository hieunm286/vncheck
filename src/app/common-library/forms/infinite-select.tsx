import React, {ReactElement, useMemo} from 'react';
import {withAsyncPaginate} from 'react-select-async-paginate';
import {useFormikContext} from 'formik';
import {deCapitalizeFirstLetter} from '../helpers/common-function'
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
                                 loadOptions,
                                 onChange,
                                 required,
                                 isHorizontal,
                                 keyField,
                                 selectField = '_id',
                                 validationMessage,
                                 ...props
                               }: {
  label: string | ReactElement;
  loadOptions: any;
  selectField?: string;
  keyField?: string;
  value?: any;
  onChange?: (value: any, entity: any) => any;
  placeholder?: any;
  name: string;
  additional?: any;
  isHorizontal?: boolean;
  disabled?: boolean;
  validationMessage?: string;
  required?: boolean;
}) {
  const {setFieldValue, errors, touched} = useFormikContext<any>();
  const CustomAsyncPaginate = withAsyncPaginate(AtlaskitSelect);
  const styles = useMemo(() => {
    const t: StylesConfig = {
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
    return t;
  }, []);
  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? 'col-xl-4 col-md-4 col-12' : ''}>
          <label className={isHorizontal ? 'mb-0 input-label mt-2' : ''}>
            {label}
            {required ? <span className="text-danger">*</span> : <></>}
          </label>
        </div>
        <div className={isHorizontal ? `col-xl-7 col-md-8 col-12` : ''}>
          <CustomAsyncPaginate
            className={getCSSClasses(errors[name], touched[name])}
            {...props}
            loadOptions={loadOptions}
            onChange={({label,value}: any, action) => {
              console.log(value,label,action);
              onChange && onChange(value[selectField], value);
              setFieldValue(name, label);
            }}
            styles={styles}
            // className={`${errors[name] ? 'border-danger' : 'input-search-select'}`}
          />
          {errors[name] && touched[name] ? (
            <div className="invalid-feedback invalid-datepicker-feedback text-danger" style={{fontSize: '0.9rem'}}>
              {
                // validationMessage ? intl.formatMessage({id: validationMessage}) : 'Vui lòng chọn ' + deCapitalizeFirstLetter(label)
                (!errors[name] && typeof label === 'string') ? 'Vui lòng chọn ' + deCapitalizeFirstLetter(label) : errors[name]
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

// export default InfiniteSelect;
