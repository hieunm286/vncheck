import {useIntl} from 'react-intl';
import {DefaultPagination} from '../common-consts/const';
import {Field} from 'formik';
import {MainInput} from '../forms/main-input';
import {DatePickerField} from '../forms/date-picker-field';
import CustomImageUpload from '../forms/custom-image-upload';
import {SwitchField} from '../forms/switch-field';
import {InfiniteSelect} from '../forms/infinite-select';
import TagInput from '../forms/tag-input';
import React, {ReactElement, useCallback} from 'react';
import _ from 'lodash';
import {RadioField} from "../forms/radio-field";

const DefaultPlaceholder = {
  string: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  number: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'search-select': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  tag: 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'date-time': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  boolean: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  image: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'radio-group': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
};

export type InputStringType = {
  name: string;
  className?: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};

export type InputRadioType = {
  name: string;
  className?: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  options: { value: any, label: string }[] | ((...props: any) => { value: any, label: string }[]);
  [X: string]: any;
};
export type InputNumberType = {
  name: string;
  className?: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputDateTimeType = {
  name: string;
  label: string | ReactElement;
  className?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputBooleanType = {
  name: string;
  label: string | ReactElement;
  className?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputSearchSelectType = {
  name: string;
  label: string | ReactElement;
  onSearch: (searchQueryObject: any) => any;
  keyField?: string;
  selectField?: string;
  onDisplayOptions?: (props: any) => ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputTagType = {
  name: string;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  [X: string]: any;
};
export type InputImageType = {
  name: string;
  value: any;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  [X: string]: any;
};
export const InputNumber = ({label, placeholder, className, ...props}: InputNumberType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <Field
        {...props}
        component={MainInput}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.number})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        type="number"
        {...props}
      />
    </div>
  );
};

export const InputString = ({label, placeholder, className, ...props}: InputStringType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <Field
        {...props}
        component={MainInput}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.string})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        type={'text'}
      />
    </div>
  );
};

export const InputRadio = ({label, placeholder, className, ...props}: InputRadioType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <RadioField
        {...props}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
      />
      {/*<Field*/}
      {/*  {...props}*/}
      {/*  component={RadioField}*/}
      {/*  placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.string})}*/}
      {/*  label={_.isString(label) ? intl.formatMessage({id: label}) : label}*/}
      {/*/>*/}
    </div>
  );
};

export const InputDateTime = ({label, placeholder, className, ...props}: InputDateTimeType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <DatePickerField
        {...props}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder['date-time']})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
      />
    </div>
  );
};

export const InputBoolean = ({label, placeholder, className, ...props}: InputBooleanType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <SwitchField
        {...props}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder['date-time']})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
      />
    </div>
  );
};
export const InputImage = ({label, className, value, ...props}: InputImageType) => {
  const intl = useIntl();
  console.log(value)
  return (
    <div className={className}>
      <CustomImageUpload
        value={value}
        {...props}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
      />
    </div>
  );
};
export const InputTag = ({label, placeholder, className, data, tagData, ...props}: InputTagType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <TagInput
        {...props}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.boolean})}
        // handleChange={handleChangeTag}
        data={data || []}
        tagData={tagData || []}
      />
    </div>
  );
};

export const InputSearchSelect = ({
                                    name,
                                    label,
                                    placeholder,
                                    onSearch,
                                    keyField,
                                    onDisplayOptions,
                                    className,
                                    selectField,
                                    ...props
                                  }: InputSearchSelectType) => {
  const intl = useIntl();
  const loadOptions = useCallback(async (search: string, prevOptions: any, {page}: any) => {
    const queryProps: any = {};
    if (keyField) {
      queryProps[keyField] = search;
    } else {
      const names = name.split('.');
      queryProps[names[names.length - 1]] = search;
    }
    const paginationProps = {
      ...DefaultPagination,
      sortBy: keyField,
      page,
    };
    const entities = await onSearch({queryProps, paginationProps});
    const count = entities.data.paging.total;
    const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);
    const data = [...new Set(entities.data.data)];
    return {
      options: data,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  }, [onSearch]);
  console.log(props.values)
  return (
    <div className={className}>
      <InfiniteSelect
        {...props}
        name={name}
        keyField={keyField}
        selectField={selectField}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder['search-select']})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        loadOptions={loadOptions}
        additional={{
          page: DefaultPagination.page,
        }}
      />
    </div>
  );
};

