import React, {useCallback} from 'react';
import {Select} from 'antd';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import {GetClassName} from '../helpers/common-function';
import {useIntl} from 'react-intl';
import {DisplayError} from "./field-feedback-label";

const {Option} = Select;

const getDefautltTag = (data: any) => {
  if (!data) return;

  const idArr: any[] = [];
  
  data?.forEach((el: any) => {
    idArr.push(el.user ? el.user._id : el._id)
  })
  
  return idArr;
};

function TagInput({
                    label,
                    data,
                    handleChange,
                    value,
                    name,
                    mode,
                    labelWidth,
                    required,
                    disabled,
                    tagData,
                    root, 
                    withFeedbackLabel = true,
                    placeholder,
                    ...props
                  }: {
  
  placeholder?: string;
  [X: string]: any;
}) {
  const intl = useIntl();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'RADIO.ERROR.REQUIRED';
  }, [required, value]);
  const [field] = useField({name, validate});
  const {setFieldValue, errors, touched, getFieldMeta} = useFormikContext<any>();

  return (
    <>
      <div className={mode === 'horizontal' ? 'row' : ''}>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, true) : ''}>
          {label && (
            <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
              {label}{required && <span className="text-danger">*</span>}
            </label>
          )}
        </div>
        <div className={mode === 'horizontal' ? GetClassName(labelWidth, false) : ''}>
          <Select
            mode="multiple"
            style={{width: '100%'}}
            defaultValue={getDefautltTag(field.value) || []}
            placeholder={placeholder}
            onChange={(value: any) => {
              // handleChange(value);
              setFieldValue(name, value);
            }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={disabled}
            className={`${getFieldMeta(field.name).touched && getFieldMeta(field.name).error ? 'border border-danger rounded' : ''}`}
            // className={'default-behave ' + getFieldCSSClasses(getTouched(touched, name), getError(errors, name))}
          
          >
            {tagData && tagData.map((item: any, key: any) => (
              <Option key={item._id} value={item._id}>
                {item.fullName ? item.fullName : item.user && item.user.fullName ? item.user.fullName : item.lastName ? item.lastName : item.user.lastName}
              </Option>
            ))}
          </Select>
          {withFeedbackLabel && (<ErrorMessage name={field.name}>
            {msg => <DisplayError label={label} error={msg}/>
            }
          </ErrorMessage>)}
        </div>
      </div>
    </>
  );
}

export default TagInput;
