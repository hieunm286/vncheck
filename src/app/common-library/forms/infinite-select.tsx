import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useField, useFormikContext } from 'formik';

export function InfiniteSelect({
  label,
  loadOptions,
  value,
  onChange,
  placeholder,
  name,
  additional,
  refs,
  isHorizontal,
  ...props
}: any) {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [values, setValue] = React.useState(null);
  const [field] = useField(props);

  console.log(errors)

  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? 'col-4' : ''}>
          <label>{label}</label>
        </div>
        <div className={isHorizontal ? 'col-7' : ''}>
          <AsyncPaginate
            value={value}
            loadOptions={loadOptions}
            onChange={val => {
              setValue(val);
              onChange(val);
              setFieldValue(name, refs ? val.value : val.label);
            }}
            placeholder={placeholder}
            name={name}
            additional={additional}
          />
          {errors[name] && touched[name] ? (
            <div className="invalid-datepicker-feedback text-danger" style={{ fontSize: '0.9rem' }}>
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

// export default InfiniteSelect;
