import {useIntl} from "react-intl";
import {DefaultPagination} from "../common-consts/const";
import {Field} from "formik";
import {MainInput} from "../forms/main-input";
import {DatePickerField} from "../forms/date-picker-field";
import CustomImageUpload from "../forms/custom-image-upload";
import {SwitchField} from "../forms/switch-field";
import {InfiniteSelect} from "../forms/infinite-select";
import TagInput from "../forms/tag-input";
import React, {ReactElement, useCallback, useMemo} from "react";

const DefaultPlaceholder = {
  'string': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'number': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'search-select': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'tag': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'date-time': 'COMMON_COMPONENT.INFINITE_SELECT.PLACEHOLDER',
  'boolean': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'image': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
  'radio-group': 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
}

export const InputNumber = ({label, placeholder, ...props}: {
  name: string,
  label: string | ReactElement,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string, [X: string]: any
}) => {
  const intl = useIntl();
  return (<Field component={MainInput}
                 placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.number})}
                 label={typeof label === 'string' ? intl.formatMessage({id: label}) : label}
                 type='number'
                 {...props}
  />)
}

export const InputString = ({label, placeholder, className, ...props}: {
  name: string,
  className?: string,
  label: string | ReactElement,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string, [X: string]: any
}) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <Field {...props}
             component={MainInput}
             placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.string})}
             label={typeof label === 'string' ? intl.formatMessage({id: label}) : label}
             type={'text'}
      />
    </div>
  )
}


export const InputDateTime = ({label, placeholder, className, ...props}: {
  name: string,
  label: string | ReactElement,
  className?: string,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string, [X: string]: any
}) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <DatePickerField {...props}
                       placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder["date-time"]})}
                       label={typeof label === 'string' ? intl.formatMessage({id: label}) : label}
      
      />
    </div>
  );
}

export const InputBoolean = ({label, placeholder, className, ...props}: {
  name: string,
  label: string | ReactElement,
  className?: string,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string, [X: string]: any
}) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <Field {...props}
             component={SwitchField}
             placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.boolean})}
             label={typeof label === 'string' ? intl.formatMessage({id: label}) : label}
      /></div>
  );
}
export const InputImage = ({label, className, ...props}: {
  name: string,
  value: any,
  label: string | ReactElement,
  required?: boolean,
  disabled?: boolean,
  [X: string]: any
}) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <CustomImageUpload  {...props}
                          label={typeof label === 'string' ? intl.formatMessage({id: label}) : label}
      /></div>
  );
}
export const InputTag = ({label, placeholder, className, ...props}: {
  name: string,
  label: string,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string, [X: string]: any
}) => {
  const intl = useIntl();
  return (
    <div className={className}>
      <TagInput {...props}
                label={intl.formatMessage({id: label})}
                placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder.tag})}
        // handleChange={handleChangeTag}
        // data={isArray(defaultTag) ? defaultTag : []}
        // tagData={tagData}
        // root={value.data[key].root}
      />
    </div>
  );
}


export const InputSearchSelect = ({label, placeholder, onSearch, keyField, onDisplayOptions, className, ...props}: {
  name: string,
  label: string | ReactElement,
  onSearch: (searchQueryObject: any) => any,
  keyField: string,
  onDisplayOptions?: (props: any) => ReactElement
  required?: boolean,
  disabled?: boolean,
  placeholder?: string, [X: string]: any
}) => {
  const intl = useIntl();
  const loadOptions = useCallback(
    async (search: string, prevOptions: any, {page}: any) => {
      const queryProps: any = {};
      queryProps[keyField] = search;
      const paginationProps = {
        ...DefaultPagination,
        page,
      };
      const entities = await onSearch({queryProps, paginationProps});
      const count = entities.data.paging.total;
      const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);
      const data = [...new Set(entities.data.data)];
      return {
        options: data.map((e: any) => {
          return {label: (onDisplayOptions ? onDisplayOptions(e) : e[keyField]), value: e};
        }),
        hasMore: hasMore,
        additional: {
          page: page + 1,
        },
      };
    }, []);
  return (
    <div className={className}>
      <InfiniteSelect {...props}
                      keyField={keyField}
                      placeholder={intl.formatMessage({id: placeholder ?? DefaultPlaceholder["search-select"]})}
                      label={typeof label === 'string' ? intl.formatMessage({id: label}) : label}
                      loadOptions={loadOptions}
                      additional={{
                        page: DefaultPagination.page,
                      }}
      />
    </div>
  );
}