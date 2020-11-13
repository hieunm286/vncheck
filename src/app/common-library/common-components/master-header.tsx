import React, { ChangeEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import { Field, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import { Input } from '../forms/input';
import { Card, CardBody, CardHeader } from '../card';
import SVG from 'react-inlinesvg';
import { ToAbsoluteUrl } from '../helpers/assets-helpers';
import { SearchModel } from '../common-types/common-type';
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import * as AgencyService from '../../pages/purchase-order/agency.service';
import { AsyncPaginate } from 'react-select-async-paginate';
import { DefaultPagination } from '../common-consts/const';
import { InfiniteSelect } from '../forms/infinite-select';
import { DatePickerField } from '../forms/date-picker-field';
// import InfiniteSelect from '../forms/infinite-select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from 'antd';

import './master-header.css';
import CustomeTreeSelect from '../forms/tree-select';

export function MasterHeader<T>({
  title,
  onSearch,
  searchModel,
  initValue,
  stringOnChange,
}: {
  searchModel: SearchModel;
  title: string;
  initValue: any;
  onSearch: (data: any) => void;
  stringOnChange?: (e: ChangeEvent<HTMLInputElement>, searchM: any, search: any, onChange: any, key: string) => void;
}) {
  const intl = useIntl();

  const searchM: any = { ...searchModel };

  const [search, onChange] = useState<any>(initValue);

  const [searchTerm, setSearchTerm] = useState({
    code: '',
    agencyAddress: '',
    agency: '',
  });

  const [treeValue, setTreeValue] = useState();

  const handleResetForm = (resetForm: any) => {
    resetForm();
    // onSearch(initValue);
    onChange(initValue);
  };
  // const loadOptions = async (search: string, prevOptions: any, service: any, keyField: string) => {
  //   return new Promise<{ options: { label: string; value: string }[]; hasMore: boolean }>(
  //     resolve => {
  //       const queryProps: any = {};
  //       queryProps[keyField] = search;
  //       service.GetAll({ queryProps, paginationProps }).then((res: { data: any[] }) => {
  //         service.Count({ queryProps: { code: search } }).then((c: any) => {
  //           const hasMore = prevOptions.length < c.data - (DefaultPagination.limit ?? 0);
  //           console.log(hasMore);
  //           console.log(prevOptions);
  //           setPaginationProps({
  //             ...paginationProps,
  //             page: (paginationProps.page ?? 0) + 1,
  //           });
  //           resolve({
  //             options: res.data.map(e => {
  //               return { label: e[keyField], value: e[keyField] };
  //             }),
  //             hasMore: hasMore,
  //           });
  //         });
  //       });
  //     },
  //   );
  // };

  const loadOptions = async (
    search: string,
    prevOptions: any,
    { page }: any,
    service: any,
    keyField: string,
    key: string,
  ) => {
    const queryProps: any = {};
    queryProps[keyField] = search;

    const paginationProps = {
      ...DefaultPagination,
      page: page,
    };

    const entities = await service.GetAll({ queryProps, paginationProps });
    const count = await service.Count({ queryProps });

    const hasMore = prevOptions.length < count.data - (DefaultPagination.limit ?? 0);

    // setSearchTerm({ ...searchTerm, [key]: search });

    const data = [...new Set(entities.data)];

    return {
      options: data.map((e: any) => {
        return { label: e[keyField], value: e._id };
      }),
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ id: title }).toUpperCase()} />

      <CardBody>
        <Formik
          initialValues={initValue}
          onSubmit={values => {
            console.log(values);
            onSearch(values);
          }}
          onReset={data => {
            onSearch(data);
          }}>
          {({ values, handleSubmit, handleBlur, handleChange, setFieldValue, resetForm }) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">
                {searchModel ? (
                  Object.keys(searchM).map(key => {
                    switch (searchM[key].type) {
                      case 'string':
                        return (
                          <div
                            className="col-xxl-3 col-md-3 mt-md-5 mt-5"
                            key={'master_header' + key}>
                            <Field
                              name={key}
                              value={search[key]}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if(stringOnChange) {
                                  stringOnChange(e, searchM, search, onChange, key);
                                } else {
                                  onChange({ ...search, [key]: e.target.value });
                                }
                                // const value = e.target.value.toUpperCase();
                                // if(searchM[key].keyField === "lotSubLotCode") {
                                //   console.log(value.length)
                                //   if(value.length > 3) {

                                //   } else if(value.length === 3 || value.length === 2) {
                                //     const newCharacterEntered = value.slice(-1);
                                //     if('0' <= newCharacterEntered && newCharacterEntered <= '9') {
                                //       onChange({
                                //         ...search, 
                                //         [key]: value,
                                //         subLot: {label: value.substring(1, value.length), value: value.substring(1, value.length)}
                                //       });
                                //     }
                                //   }
                                //   else if(value.length === 1) {
                                //     if('A' <= value && value <= 'Z') {
                                //       onChange({
                                //         ...search, 
                                //         [key]: value,
                                //         lot: {label: value, value: value},
                                //         subLot: {label: '', value: ''}
                                //       });
                                //     }
                                //   }
                                //   else { // value.length === 0
                                //     onChange({
                                //       ...search, 
                                //       [key]: value,
                                //       lot: {label: value, value: value},
                                //       subLot: {label: '', value: ''}
                                //     });
                                //   }
                                // } else {
                                //   onChange({ ...search, [key]: value });
                                // }
                              }}
                              component={Input}
                              placeholder={intl.formatMessage({ id: searchM[key].placeholder })}
                              label={intl.formatMessage({ id: searchM[key].label })}
                              withFeedbackLabel={true}
                            />
                          </div>
                        );

                      case 'number':
                        return (
                          <div
                            className="col-xxl-3 col-md-3 mt-md-5 mt-5"
                            key={`master_header${key}`}>
                            <Field
                              name={key}
                              type="number"
                              component={Input}
                              placeholder={intl.formatMessage({ id: searchM[key].placeholder })}
                              label={intl.formatMessage({ id: searchM[key].label })}
                              withFeedbackLabel={true}
                            />
                          </div>
                        );

                      case 'Datetime':
                        return (
                          <div className="col-xxl-3 col-md-3 mt-md-5 mt-5 " key={key}>
                            <DatePickerField
                              name="date"
                              label={intl.formatMessage({ id: searchM[key].label })}
                            />
                          </div>
                        );

                      case 'SearchSelect':
                        return (
                          <div className="col-xxl-3 col-md-3 mt-md-5 mt-5" key={key}>
                            <InfiniteSelect
                              label={intl.formatMessage({ id: searchM[key].label })}
                              isHorizontal={false}
                              value={search[key]}
                              onChange={(value: any) => {
                                onChange({ ...search, [key]: value });
                                // setSearchTerm({
                                //   ...searchTerm,
                                //   [key]: searchM[key].ref ? value.value : value.label,
                                // });
                              }}
                              loadOptions={(search: string, prevOptions: any, { page }: any) =>
                                loadOptions(
                                  search,
                                  prevOptions,
                                  { page },
                                  searchM[key].service,
                                  searchM[key].keyField,
                                  key,
                                )
                              }
                              refs={searchM[key].ref}
                              additional={{
                                page: DefaultPagination.page,
                              }}
                              name={key}
                              placeholder={intl.formatMessage({ id: searchM[key].placeholder })}
                            />
                          </div>
                        );

                      case 'TreeSelect':
                        return (
                          <div className="col-xxl-3 col-md-3 mt-md-5 mt-5" key={key}>
                            <CustomeTreeSelect
                              label="Tree Select"
                              data={searchM[key].data}
                              value={search[key]}
                              onChange={(value: any) => onChange({ ...search, [key]: value })}
                              name={key}
                            />
                          </div>
                        );
                    }
                    return <></>;
                  })
                ) : (
                  <></>
                )}
              </div>

              <div>
                <button className="btn btn-primary" type="submit">
                  <SearchIcon />
                  {intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_HEADER.SEARCH_BTN' })}
                </button>

                <button
                  className="btn btn-outline-primary ml-5"
                  type="reset"
                  onClick={() => handleResetForm(resetForm)}>
                  <SVG src={ToAbsoluteUrl('/media/svg/vncheck/reset-filter.svg')} />
                  &nbsp;
                  {intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_HEADER.RESET_FILTER_BTN' })}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
