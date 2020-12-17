import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'antd';
import { useField, useFormikContext } from 'formik';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DefaultPagination } from '../common-consts/const';
import { fetchAllUser } from '../../pages/account/_redux/user-action';
import { deCapitalizeFirstLetter } from '../helpers/common-function';

const { Option } = Select;

const getDefautltTag = (data: any) => {
  const idArr: any[] = [];

  data.forEach((el: any) => {
    idArr.push(el.user ? el.user._id : el._id)
  })

  return idArr;
};

const getFieldCSSClasses = (touched: any, errors: any) => {
  const classes = ['form-control'];

  if (errors) classes.push('is-invalid');

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

const getTouched = (touched: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return touched[fieldName]
  }

  console.log(fieldName)

  const arrName = fieldName.split('.')

  if (arrName.length === 3) {
    return touched[arrName[0]] ? touched[arrName[0]][arrName[1]][arrName[2]] : ''
  }

  return touched[arrName[0]] ? touched[arrName[0]][arrName[1]] : ''
}

const getError = (error: any, fieldName: string, index?: number) => {
  if (fieldName.indexOf('.') === -1) {
    return error[fieldName];
  }

  const arrName = fieldName.split('.');

  
  if (index) {
    return error[arrName[index]]
  }


  if (arrName.length === 3) {
    return error[arrName[0]] ? error[arrName[0]][arrName[1]][arrName[2]] : '';
  }

  return error[arrName[0]] ? error[arrName[0]][arrName[1]] : '';
};

function useStateCallback(initialState: any) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = (state: any, cb: any) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current = state;
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

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
  tagData,
  root,
  placeholder = "Chọn",
  ...props
}: any) {

    const { setFieldValue, errors, touched } = useFormikContext<any>();

    const [queryProps, setQueryProps] = useState({ firstName: '' })
  const [paginationProps, setPaginationProps] = useState(DefaultPagination);

  const {currentState} = useSelector(
    (state: any) => ({
      currentState: state.users,
    }),
    shallowEqual,
  );
  const {totalCount, entities, listLoading} = currentState;
  
  // // Customers Redux state
  // const dispatch = useDispatch();
  // useEffect(() => {
    
  //   dispatch(fetchAllUser());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [queryProps, paginationProps, dispatch]);

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
            placeholder={placeholder}
            onChange={(value: any) => {
                handleChange(value);
                setFieldValue(name, value);
            }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={disabled}
            className={`${getTouched(touched, name) && getError(errors, name) ? 'border border-danger rounded' : ''}`}
            // className={'default-behave ' + getFieldCSSClasses(getTouched(touched, name), getError(errors, name))}

            >
            {entities && entities.map((item: any, key: any) => (
              <Option key={item._id} value={item._id}>
                {item.fullName ? item.fullName : item.user && item.user.fullName ? item.user.fullName : item.lastName ? item.lastName : item.user.lastName}
              </Option>
            ))}
          </Select>
          {getError(errors, name) && getTouched(touched, name) ? (
            <div className="invalid-datepicker-feedback text-danger" style={{ fontSize: '0.9rem' }}>
              Vui lòng chọn
              {
                // errors[field.name]?.toString()
                '\u00A0' + deCapitalizeFirstLetter(label)
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
