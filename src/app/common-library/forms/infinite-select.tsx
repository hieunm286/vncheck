import React from 'react';
import {withAsyncPaginate} from 'react-select-async-paginate';
import {useFormikContext} from 'formik';
import {deCapitalizeFirstLetter} from '../helpers/common-function'
import AtlaskitSelect from "@atlaskit/select";
import {useIntl} from "react-intl";

const style = {
  borderRadius: 5
}

export function InfiniteSelect({
                                 label,
                                 loadOptions,
                                 value,
                                 onChange,
                                 placeholder = "COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER",
                                 name,
                                 additional,
                                 refs,
                                 isHorizontal,
                                 isDisabled,
                                 validationMessage,
                                 ...props
                               }: {
  label: string
  loadOptions?: any;
  value?: any;
  onChange?: any;
  placeholder?: any
  name: string;
  additional?: any;
  refs?: boolean;
  isHorizontal?: boolean;
  isDisabled?: boolean;
  validationMessage?: string;
}) {
  const {setFieldValue, errors, touched} = useFormikContext<any>();
  const [values, setValue] = React.useState(null);
  const CustomAsyncPaginate = withAsyncPaginate(AtlaskitSelect);
  const intl = useIntl();
  
  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        {/*<div className={isHorizontal ? 'col-xl-4 col-md-4 col-12' : ''}>*/}
          <label>{label}</label>
        {/*</div>*/}
        <div className={isHorizontal ? `col-xl-7 col-md-8 col-12` : ''}>
          <CustomAsyncPaginate
            value={value}
            isDisabled={isDisabled}
            loadOptions={loadOptions}
            onChange={(val: any) => {
              setValue(val);
              onChange(val);
              setFieldValue(name, refs ? val.value : val.label);
            }}
            placeholder={intl.formatMessage({id: placeholder})}
            name={name}
            additional={additional}
            styles={{
              control: (base, props1) => {
                console.log("control", base, props1)
                return {
                  ...base,
                  backgroundColor: "transparent",
                  borderColor: "#E4E6EF",
                  borderRadius: "0.42rem",
                  borderWidth: "1px",
                  minHeight:"2.3rem",
                  fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
                  ":hover": {borderColor: "#0fc35c"},
                  ":focus": {borderColor: "#0fc35c"}
                }
              },
              valueContainer: (base, props1) => {
                return {
                  ...base,
                  paddingLeft: "1rem",
                  fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
                }
              }, menuList: (base, props1) => {
                return {
                  ...base,
                  fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
                }
              }, singleValue: (base, props1) => {
                return {
                  ...base,
                  fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",
                }
              }
              //
              // , input: (base, props1) => {
              //   console.log("input",base, props1)
              //   return {...base, onFocus:()=>{console.log(1)},onBlur:(a:any,b:any)=>{console.log(2,a,b)}}
              // },valueContainer:(base, props1) => {
              //   console.log("valueContainer",base, props1)
              //   return {...base, onFocus:()=>{console.log(1)},onBlur:(a:any,b:any)=>{console.log(2,a,b)}}
              // }
            }}
            className={`${errors[name] ? 'border-danger' : 'input-search-select'}`}
          />
          {errors[name] && touched[name] ? (
            <div className="invalid-datepicker-feedback text-danger" style={{fontSize: '0.9rem'}}>
              {
                // validationMessage ? intl.formatMessage({id: validationMessage}) : 'Vui lòng chọn ' + deCapitalizeFirstLetter(label)
                errors[name] ? errors[name] : 'Vui lòng chọn ' + deCapitalizeFirstLetter(label)
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
