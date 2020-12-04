import React, { useEffect } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useField, useFormikContext } from 'formik';
import { deCapitalizeFirstLetter } from '../helpers/common-function'
import { useIntl } from 'react-intl';

const style = {
  borderRadius: 5
}

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
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [values, setValue] = React.useState(null);

  return (
    <>
      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? 'col-xl-4 col-md-4 col-12' : ''}>
          <label className="mb-0 input-label mt-2">{label}</label>
        </div>
        <div className={isHorizontal ? `col-xl-7 col-md-8 col-12` : ''}>
          <AsyncPaginate
            value={value}
            isDisabled={isDisabled}
            loadOptions={loadOptions}
            onChange={val => {
              setValue(val);
              onChange(val);
              setFieldValue(name, refs ? val.value : val.label);
            }}
            placeholder={placeholder}
            name={name}
            additional={additional}
            className={`${errors[name] ? 'border border-danger rounded' : ''}`}

          />
          {errors[name] && touched[name] ? (
            <div className="invalid-datepicker-feedback text-danger" style={{ fontSize: '0.9rem' }}>
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
