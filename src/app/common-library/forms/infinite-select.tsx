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
  ...props
}: any) {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [values, setValue] = React.useState(null);
  // const [field] = useField(props);
  return (
    <div>
      <label>{label}</label>
      <div>
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
      </div>
    </div>
  );
}

// export default InfiniteSelect;
