import React, { ReactElement, useCallback } from 'react';
import { Checkbox } from 'antd';
import {ErrorMessage, useField, useFormikContext} from 'formik';
import './input-checkbox.scss';

const CheckboxGroup = Checkbox.Group;

const GetCheckBoxValue = (data: any[]) => {

  if (!data) return []

  const checkArr: any[] = [];

  data.forEach((values: any) => {
    if (!values.disabled) {
      checkArr.push(values.value);
    }
  });

  return checkArr
}

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];

const plainOptions = ['Apple', 'Pear', 'Orange'];

interface Prop {
  optionData: any[];
  name: string;
  label: string | ReactElement;
}

function CheckBoxField({ optionData, name, label }: Prop) {
  const [checkedList, setCheckedList] = React.useState<any>([]);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  const [field] = useField({name});
  const {setFieldValue, errors, touched, getFieldMeta, values} = useFormikContext<any>();

  const onChange = (list: any[]) => {
    setCheckedList(list);
    setFieldValue(name, list)
    setIndeterminate(!!list.length && list.length < optionData.length);
    setCheckAll(list.length === optionData.length);
  };

  const onCheckAllChange = (e: any) => {
    const checkArr: any[] = GetCheckBoxValue(optionData);
    
    setCheckedList(e.target.checked ? checkArr : []);
    setFieldValue(name, e.target.checked ? checkArr : [])
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <div className="d-flex flex-column w-25">
        <div className="check-all-field checkbox-input bg-light">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} className="checkbox-all">
            {label}
          </Checkbox>
        </div>
        <Checkbox.Group
          options={optionData}
          defaultValue={GetCheckBoxValue(field.value)}
          value={checkedList}
          onChange={onChange}
          className="checkbox-input"
        />
      </div>
    </>
  );
}

export default CheckBoxField;
