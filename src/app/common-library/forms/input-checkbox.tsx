import React, { ReactElement, useCallback } from 'react';
import { Checkbox } from 'antd';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import './input-checkbox.scss';

const CheckboxGroup = Checkbox.Group;

const GetCheckBoxValue = (data: any[]) => {
  if (!data) return [];

  const checkArr: any[] = [];

  data.forEach((values: any) => {
    checkArr.push(values.value);
  });

  return checkArr;
};

const handleCheckAll = (data: any[]) => {
  if (!data) return [];

  const checkArr: any[] = [];

  data.forEach((values: any) => {
    if (!values.disabled) {
      checkArr.push(values.value);
    }
  });

  return checkArr;
};

interface Prop {
  optionData: any[];
  name: string;
  label: string | ReactElement;
}

function CheckBoxField({ optionData, name, label }: Prop) {
  const [field] = useField({ name });

  const [checkedList, setCheckedList] = React.useState<any>([GetCheckBoxValue(field.value)]);
  const [indeterminate, setIndeterminate] = React.useState(GetCheckBoxValue(field.value).length > 0 ? true : false);
  const [checkAll, setCheckAll] = React.useState(false);

  const { setFieldValue, errors, touched, getFieldMeta, values } = useFormikContext<any>();

  const onChange = (list: any[]) => {
    setCheckedList(list);
    setFieldValue(name, list);
    setIndeterminate(!!list.length && list.length < optionData.length);
    setCheckAll(list.length === optionData.length);
  };

  const onCheckAllChange = (e: any) => {
    const checkArr: any[] = handleCheckAll(optionData);

    setCheckedList(e.target.checked ? checkArr : []);
    setFieldValue(name, e.target.checked ? checkArr : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  console.log(values)
  console.log(field.value)

  return (
    <>
      <div className="row">
        <div className="d-flex flex-column col-md-8 col-12">
          <div className="check-all-field checkbox-input bg-light">
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
              className="checkbox-all">
              {label}
            </Checkbox>
          </div>
          <div className="w-100">
            <Checkbox.Group
              options={optionData}
              // defaultValue={}
              value={checkedList}
              onChange={onChange}
              className="checkbox-input w-100"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckBoxField;
