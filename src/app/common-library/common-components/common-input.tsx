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
import {RadioField} from '../forms/radio-field';
import CheckboxTable from '../forms/checkbox-table';
import CustomTreeSelect from "../forms/tree-select";

const DefaultPlaceholder = {
  string: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  number: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'search-select': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'tree-select': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
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
  value: object | ((value: any) => any);
  mode?: 'horizontal' | 'vertical';
  placeholder?: string;
  options: { value: any; label: string | ((...props: any) => ReactElement) }[] | ((...props: any) => { value: any; label: string }[]);
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
export type InputTreeSelectType = {
  name: string;
  data?: any;
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
  value?: any;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  pathField?: string;
  mode?: 'horizontal' | 'vertical';
  [X: string]: any;
};

export type InputCheckBoxType = {
  name: string;
  value: any;
  label: string | ReactElement;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  mode?: 'horizontal' | 'vertical';
  [X: string]: any;
};

export const InputNumber = ({label, required, placeholder, className, ...props}: InputNumberType) => {
  const intl = useIntl();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'INPUT.ERROR.REQUIRED';
  }, [required]);
  return (
    <div className={className}>
      <Field
        validate={validate}
        {...props}
        component={MainInput}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.number})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        type="number"
        required={required}
      />
    </div>
  );
};
export const InputStringNumber = ({label, required, placeholder, className, ...props}: InputNumberType) => {
  const intl = useIntl();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'INPUT.ERROR.REQUIRED';
  }, [required]);
  return (
    <div className={className}>
      <Field
        validate={validate}
        {...props}
        component={MainInput}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.number})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        type="string-number"
        required={required}
      />
    </div>
  );
};

export const InputString = ({label, required, placeholder, className, ...props}: InputStringType) => {
  const intl = useIntl();
  const validate = useCallback((value: any): string | void => {
    if (required && !value) return 'INPUT.ERROR.REQUIRED';
    if (props.type === 'email') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'INPUT.ERROR.INVALID_EMAIL';
      }
    }
  }, [required]);
  return (
    <div className={className}>
      <Field
        validate={validate}
        {...props}
        component={MainInput}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.string})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        required={required}
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
export const InputTag = ({
                           label,
                           placeholder,
                           className,
                           data,
                           tagData,
                           ...props
                         }: InputTagType) => {
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
  const loadOptions = useCallback(
    async (search: string, prevOptions: any, {page}: any) => {
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
    },
    [onSearch],
  );
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

export const InputTreeSelect = ({
                                  label,
                                  placeholder,
                                  className,
                                  onSearch,
                                  ...props
                                }: InputTreeSelectType) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <CustomTreeSelect
        {...props}
        placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder['tree-select']})}
        label={_.isString(label) ? intl.formatMessage({id: label}) : label}
        onSearch={onSearch}
      />
    </div>
  );
};

export const InputCheckBox = ({
                                data,
                                columns,
                                loading,
                                onSelectMany,
                                selectedEntities,
                                selectColumnPosition,
                                name,
                                ...props
                              }: InputCheckBoxType) => {
  return (
    <CheckboxTable
      {...props}
      name={name}
      data={data || []}
      columns={columns || {}}
      total={data ? data.length : 0}
      loading={loading}
      onSelectMany={onSelectMany}
      selectedEntities={selectedEntities}
      selectColumnPosition={selectColumnPosition}
    />
  );
};
