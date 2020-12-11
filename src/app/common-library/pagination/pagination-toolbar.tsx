/* eslint-disable no-unused-vars */
import React from 'react';
import {PaginationOptions} from 'react-bootstrap-table-next';
import {useIntl} from 'react-intl';
import {withAsyncPaginate} from "react-select-async-paginate";
import AtlaskitSelect from "@atlaskit/select";
import {any} from "prop-types";

export function PaginationToolbar({
                                    isLoading,
                                    paginationProps,
                                  }: {
  isLoading: boolean;
  paginationProps: PaginationOptions;
}) {
  const intl = useIntl();
  const {
    sizePerPageList = [{text: 0, value: 0}],
    sizePerPage = 10,
    onSizePerPageChange = () => null,
    totalSize = 5,
    page,
  } = paginationProps;
  const style = {
    width: '75px',
  };
  
  const onSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number.parseInt(event.target.value);
    onSizePerPageChange(page ?? -1, newSize);
  };
  const CustomAsyncPaginate = withAsyncPaginate(AtlaskitSelect);
  
  return (
    <div className="d-flex align-items-center py-3">
      {isLoading && (
        <div className="d-flex align-items-center">
          <div className="mr-2 text-muted">
            {intl.formatMessage({id: 'COMMON_COMPONENT.PAGINATION.LOADING'})}
          </div>
          <div className="spinner spinner-primary mr-10"/>
        </div>
      )}
      
      {/*<CustomAsyncPaginate*/}
      {/*  value={page as any}*/}
      {/*  isDisabled={totalSize === 0}*/}
      {/*  loadOptions={ async (search: string, prevOptions: any, {page}: any) => {*/}
      {/*    const paginationOptions = [{label: "5", value: 5}, {label: "10", value: 10}, {label: "15", value: 15}];*/}
      {/*    return {*/}
      {/*      options: paginationOptions,*/}
      {/*      hasMore: false,*/}
      {/*      additional: {*/}
      {/*        page: page + 1,*/}
      {/*      },*/}
      {/*    } as any*/}
      {/*  }}*/}
      {/*  // onChange={(val: any) => {*/}
      {/*  //   setValue(val);*/}
      {/*  //   onChange(val);*/}
      {/*  //   setFieldValue(name, refs ? val.value : val.label);*/}
      {/*  // name={name}*/}
      {/*  // additional={additional}*/}
      {/*  styles={{*/}
      {/*    control: (base, props1) => {*/}
      {/*      // console.log("control", base, props1)*/}
      {/*      return {*/}
      {/*        ...base,*/}
      {/*        backgroundColor: "transparent",*/}
      {/*        borderColor: "#E4E6EF",*/}
      {/*        borderRadius: "0.42rem",*/}
      {/*        borderWidth: "1px",*/}
      {/*        minHeight: "2.3rem",*/}
      {/*        fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",*/}
      {/*        ":hover": {borderColor: "#0fc35c"},*/}
      {/*        ":focus": {borderColor: "#0fc35c"}*/}
      {/*      }*/}
      {/*    },*/}
      {/*    valueContainer: (base, props1) => {*/}
      {/*      return {*/}
      {/*        ...base,*/}
      {/*        paddingLeft: "1rem",*/}
      {/*        fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",*/}
      {/*      }*/}
      {/*    }, menuList: (base, props1) => {*/}
      {/*      console.log(props1);*/}
      {/*      return {*/}
      {/*        ...base,*/}
      {/*        fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",*/}
      {/*      }*/}
      {/*    }, singleValue: (base, props1) => {*/}
      {/*      return {*/}
      {/*        ...base,*/}
      {/*        fontFamily: "SVN-Gilroy, Roboto, Poppins, Helvetica, sans-serif",*/}
      {/*      }*/}
      {/*    },*/}
      {/*    placeholder: (styles) => {*/}
      {/*      return {...styles, color: "#B5B5C3"}*/}
      {/*    },*/}
      {/*    option: (styles, {data, isDisabled, isFocused, isSelected}) => {*/}
      {/*      return {...styles}*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  // className={`${errors[name] ? 'border-danger' : 'input-search-select'}`}*/}
      {/*/>*/}
      <select
        disabled={totalSize === 0}
        className={`btn btn-outline-primary btn-sm ${totalSize ===
          0 && 'disabled'}`}
        onChange={onSizeChange}
        value={sizePerPage+" / " + intl.formatMessage({ id: 'COMMON_COMPONENT.PAGINATION.PAGE' })}
        style={style}>
        {(sizePerPageList as { text: string; value: number }[]).map(value => {
          const isSelect = sizePerPage === value.value;
          return (
            <option
              key={value.text}
              value={value.value}
              className={`btn ${isSelect ? 'active' : ''}`}>
              {value.text}
            </option>
          );
        })}
      </select>
      <span className="text-muted">
        {intl.formatMessage({ id: 'COMMON_COMPONENT.PAGINATION.RECORD_PER_PAGE' })} {totalSize}
      </span>
    </div>
  );
}
