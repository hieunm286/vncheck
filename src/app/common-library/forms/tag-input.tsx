import React from 'react';
import { Select } from 'antd';
import { useField, useFormikContext } from 'formik';

const { Option } = Select;

const getDefautltTag = (data: any) => {
  const idArr: any[] = []

  data.forEach((el: any) => {
    idArr.push(el._id)
  })

  return idArr
}

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

const getError = (error: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName];
  }

  const arrName = fieldName.split('.');

  if (arrName.length === 3) {
    return error[arrName[0]] ? error[arrName[0]][arrName[1]][arrName[2]] : '';
  }

  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : '';
};

function TagInput({
  label,
  data,
  handleChange,
  value,
  name,
  isHorizontal,
  labelWidth,
  isRequired,
  disabled,
  ...props
}: any) {

    const { setFieldValue, errors, touched } = useFormikContext<any>();

    console.log(data)

  return (
    <>
      <div className={isHorizontal && 'row'}>
        <div className={isHorizontal && getClassName(labelWidth, true)}>
          {label && (
            <label className={isHorizontal && 'mb-0 input-label mt-2'}>
              {label} {isRequired && <span className="text-danger">*</span>}
            </label>
          )}
        </div>

        <div className={isHorizontal && getClassName(labelWidth, false)}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            defaultValue={getDefautltTag(data) || []}
            placeholder="Tags Mode"
            onChange={(value: any) => {
                handleChange(value);
                setFieldValue(name, value);
            }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>  
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
            }
            disabled={disabled}
            className={`${errors[name] ? 'border border-danger rounded' : ''}`}
            >
            {data.map((item: any, key: any) => (
              <Option key={item._id} value={item._id}>
                {item.fullName}
              </Option>
            ))}
          </Select>
          {errors[name] && touched[name] ? (
            <div className="invalid-datepicker-feedback text-danger" style={{ fontSize: '0.9rem' }}>
              Vui lòng chọn 
              {
                // errors[field.name]?.toString()
                 label
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

export default TagInput;
