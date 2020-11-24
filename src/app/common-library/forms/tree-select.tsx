import React from 'react';
import { TreeSelect } from 'antd';
import { useField, useFormikContext } from 'formik';
import './tree-select.scss'

function CustomeTreeSelect({ label, data, onChange, value, name, placeholder, ...props }: any) {
  const { setFieldValue, errors, touched } = useFormikContext<any>();

  return (
    <div>
      <label>{label}</label>
      <div>
        <TreeSelect
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={data}
          placeholder={placeholder}
          treeDefaultExpandAll
          onChange={(val) => {
            onChange(val);
            setFieldValue(name, val);
          }}
          className="ant-tree-select-custom"
        />
      </div>
    </div>
  );
}

export default CustomeTreeSelect;
