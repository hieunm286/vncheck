import React, { ChangeEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Field, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import { Input } from '../forms/input';
import { Card, CardBody, CardHeader } from '../card';
import SVG from 'react-inlinesvg';
import { ToAbsoluteUrl } from '../helpers/assets-helpers';
import { SearchModel } from '../common-types/common-type';
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios, { AxiosResponse } from 'axios';
import * as AgencyService from '../../pages/purchase-order/agency.service';
import { AsyncPaginate } from 'react-select-async-paginate';
import { DefaultPagination } from '../common-consts/const';
import { InfiniteSelect } from '../forms/infinite-select';
import { DatePickerField } from '../forms/date-picker-field';
// import InfiniteSelect from '../forms/infinite-select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from 'antd';
import STATE_LIST from '../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../_metronic/AdministrativeDivision/district.json';

import './master-header.css';
import CustomeTreeSelect from '../forms/tree-select';
import { ConvertToTreeNode } from '../helpers/common-function';
import * as StoreLevelService from '../../pages/multilevel-sale/multilevel-sale.service';

export function MasterHeader<T>({
  title,
  onSearch,
  searchModel,
  initValue,
  stringOnChange,
  searchSelectOnChange,
  customSearchSelectLoadOption,
  onReset,
}: {
  searchModel: SearchModel;
  title: string;
  initValue: any;
  onSearch: (data: any) => void;
  onReset?: () => void;
  stringOnChange?: (
    e: ChangeEvent<HTMLInputElement>,
    searchM: any,
    search: any,
    onChange: any,
    key: string,
    handleChange: any,
    setFieldValue: any,
    setIsDisabled: any,
    isDisabeld: any,
  ) => void;
  searchSelectOnChange?: (
    value: any,
    values: any,
    searchM: any,
    search: any,
    setSearch: any,
    key: string,
    handleChange: any,
    setFieldValue: any,
    setIsDisabled: any,
    isDisabled: any,
  ) => void;
  customSearchSelectLoadOption?: (
    search: string,
    prevOptions: any,
    { page }: any,
    service: any,
    keyField: string,
    key: string,
  ) => void;
}) {
  const intl = useIntl();

  const searchM: any = { ...searchModel };

  const [search, setSearch] = useState<any>(initValue);

  let _disabled: any = {};
  Object.keys(initValue).forEach(field => {
    _disabled = { ..._disabled, [field]: false };
  });
  // _disabled.subLot = true;

  const [isDisabled, setIsDisabled] = useState<any>(_disabled);

  const [treeValue, setTreeValue] = useState();

  const handleResetForm = (resetForm: any) => {
    resetForm();
    // onSearch(initValue);
    setSearch(initValue);
    // reset disable
    let _disabled = {};
    Object.keys(initValue).forEach(field => {
      _disabled = { ..._disabled, [field]: false };
    });
    setIsDisabled(_disabled);
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

  // const [ search, setSearch ] = useState<any>(formValues);

  const [address, setAddress] = useState<any>({
    state: { key: '', value: '' },
    city: { key: '', value: '' },
    district: { key: '', value: '' },
  });

  const [selectedState, setSelectedState] = useState<any>({ key: '', value: '' });
  const [selectedCity, setSelectedCity] = useState<any>({ key: '', value: '' });
  const [selectedDistrict, setSelectedDistrict] = useState<any>({ key: '', value: '' });

  const [stateValues, setStateValues] = useState<any>();
  const [cityValues, setCityValues] = useState<any>();
  const [districtValues, setDistrictValues] = useState<any>();

  const [treeSelectValue, setTreeSelectValue] = useState<any>();
  const [treeData, setTreeData] = useState<any>();

  const treeLoadOptions = async (service: any) => {
    const queryProps: any = {};
    // queryProps[keyField] = search;
    // queryProps =

    if (!service) console.error('search select with undefined service');
    const entities = await service.GetAll({});
    return entities.data;
  };

  useEffect(() => {
    treeLoadOptions(StoreLevelService) // treeLoadOptions(modifyModel.data['storeLevel'].service)
      .then((res: any) => {
        // console.log(res);
        // console.log(DataExample)
        const treeData = ConvertToTreeNode(res);
        setTreeData(treeData);
      });
  }, []);

  const loadOptions = async (
    search: string,
    prevOptions: any,
    { page }: any,
    { service, keyField, key }: { service: any; keyField: string; key: string },
    {
      onFetch,
      onCount,
    }: {
      onFetch?: (props: any) => Promise<AxiosResponse<any>>;
      onCount?: (props: any) => Promise<AxiosResponse<any>>;
    },
  ) => {
    const queryProps: any = {};
    queryProps[keyField] = search;

    const paginationProps = {
      ...DefaultPagination,
      page: page,
    };

    const entities = await service.GetAll({ queryProps, paginationProps });
    // const count = onCount ? await onCount({ queryProps }) : await service.Count({ queryProps });
    const count = entities.data.paging.total;
    const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);

    const data = [...new Set(entities.data.data)];

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
            onSearch(values);
            console.log(values);
          }}
          onReset={data => {
            if (onReset) {
              onReset();
            }
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
                            className="col-xxl-2 col-md-2 mt-md-5 mt-5"
                            key={'master_header' + key}>
                            <Field
                              name={key}
                              // value={search[key]}
                              disabled={isDisabled ? isDisabled[key] : false}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (stringOnChange) {
                                  stringOnChange(
                                    e,
                                    searchM,
                                    search,
                                    setSearch,
                                    key,
                                    handleChange,
                                    setFieldValue,
                                    setIsDisabled,
                                    isDisabled,
                                  );
                                } else {
                                  handleChange(e);
                                }
                              }}
                              component={Input}
                              placeholder={intl.formatMessage({ id: searchM[key].placeholder })}
                              label={intl.formatMessage({ id: searchM[key].label })}
                              withFeedbackLabel={true}
                              // onChange={(e: any) => {
                              //   handleChange(e);
                              //   let someValue = e.currentTarget.value;

                              //   setSearch({
                              //     ...search,
                              //     name: { label: someValue, value: someValue },
                              //   });
                              // }}
                            />
                          </div>
                        );

                      case 'number':
                        return (
                          <div
                            className="col-xxl-2 col-md-2 mt-md-5 mt-5"
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
                          <div className="col-xxl-2 col-md-2 mt-md-5 mt-5 " key={key}>
                            <DatePickerField
                              name="date"
                              label={intl.formatMessage({ id: searchM[key].label })}
                            />
                          </div>
                        );

                      case 'SearchSelect':
                        return (
                          <div className="col-xxl-2 col-md-2 mt-md-5 mt-5" key={key}>
                            <InfiniteSelect
                              isDisabled={isDisabled ? isDisabled[key] : false}
                              label={intl.formatMessage({ id: searchM[key].label })}
                              isHorizontal={false}
                              value={search[key]}
                              onChange={(value: any) => {
                                if (searchSelectOnChange) {
                                  searchSelectOnChange(
                                    value,
                                    values,
                                    searchM,
                                    search,
                                    setSearch,
                                    key,
                                    handleChange,
                                    setFieldValue,
                                    setIsDisabled,
                                    isDisabled,
                                  );
                                } else {
                                  setSearch({ ...search, [key]: value });
                                }
                                // setSearchTerm({
                                //   ...searchTerm,
                                //   [key]: searchM[key].ref ? value.value : value.label,
                                // });
                              }}
                              loadOptions={(search: string, prevOptions: any, { page }: any) => {
                                if (customSearchSelectLoadOption) {
                                  return customSearchSelectLoadOption(
                                    search,
                                    prevOptions,
                                    { page },
                                    searchM[key].service,
                                    searchM[key].keyField,
                                    key,
                                  );
                                } else {
                                  return loadOptions(
                                    search,
                                    prevOptions,
                                    { page },
                                    {
                                      service: searchM[key].service,
                                      keyField: searchM[key].keyField,
                                      key: key,
                                    },
                                    {},
                                  );
                                }
                              }}
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
                          <div className="col-xxl-2 col-md-2 mt-md-5 mt-5" key={key}>
                            <CustomeTreeSelect
                              label={intl.formatMessage({ id: searchM[key].label })}
                              placeholder={intl.formatMessage({ id: searchM[key].placeholder })}
                              data={treeData}
                              value={treeSelectValue}
                              onChange={(value: any) => setSearch({ ...search, [key]: value })}
                              name={key}
                            />
                          </div>
                        );

                      case 'stateSelect':
                        // const stateValues = Object.values(STATE_LIST).map((state: any) => {return {value: state.name, key: state.code}});
                        const labelWidth = 4;
                        const isHorizontal = false;
                        const stateLabel = intl.formatMessage({ id: searchM[key].label });
                        const withFeedbackLabelState = true;
                        // const placeholder = modifyModel.data[key].placeholder
                        // const required = modifyModel.data[key].required;
                        return (
                          <div className="col-xxl-2 col-md-2 mt-md-5 mt-5" key={`${key}`}>
                            {stateLabel && (
                              <label
                              // className={'mb-0 input-label mt-2'}
                              >
                                {stateLabel}{' '}
                                {withFeedbackLabelState && <span className="text-danger">*</span>}
                              </label>
                            )}
                            <select
                              onChange={(e: any) => {
                                const selectedIndex = e.target.options.selectedIndex;
                                const key = e.target.options[selectedIndex].getAttribute(
                                  'data-code',
                                );
                                setSelectedState({ value: e.target.value, key: key });
                                setSelectedCity({ value: '', key: '' });
                                setSelectedDistrict({ value: '', key: '' });
                                setFieldValue('state', e.target.value);
                              }}
                              className={'form-control'}>
                              <option hidden>
                                {intl.formatMessage({ id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER' })}
                              </option>
                              {1 ? (
                                Object.values(STATE_LIST).map((state: any) => {
                                  return (
                                    <option
                                      key={state.code}
                                      data-code={state.code}
                                      value={state.name}>
                                      {state.name}
                                    </option>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </select>
                            {/* <Field
                              name={key}
                              type="number"
                              value={selectedState.value}
                              children={stateValues}
                              onChange={(e: any) => {
                                  const selectedIndex = e.target.options.selectedIndex;
                                  const key = e.target.options[selectedIndex].getAttribute('data-code')
                                  setSelectedState({value: e.target.value, key: key}
                                  )
                                }
                              }
                              component={SelectField}
                              isHorizontal
                              withFeedbackLabel
                              labelWidth={4}
                              placeholder={value.data[key].placeholder}
                              label={value.data[key].label}
                              required={value.data[key].required}
                            /> */}
                          </div>
                        );

                      case 'citySelect':
                        const cityLabel = intl.formatMessage({ id: searchM[key].label });
                        const withFeedbackLabelCity = true;
                        return (
                          <div className="col-xxl-2 col-md-2 mt-md-5 mt-5" key={`${key}`}>
                            {cityLabel && (
                              <label
                              // className={'mb-0 input-label mt-2'}
                              >
                                {cityLabel} {<span className="text-danger">*</span>}
                              </label>
                            )}
                            <select
                              onChange={(e: any) => {
                                const selectedIndex = e.target.options.selectedIndex;
                                const key = e.target.options[selectedIndex].getAttribute(
                                  'data-code',
                                );
                                setSelectedCity({ value: e.target.value, key: key });
                                setSelectedDistrict({ value: '', key: '' });
                                setFieldValue('city', e.target.value);
                              }}
                              className={'form-control'}>
                              <option hidden>
                                {intl.formatMessage({ id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER' })}
                              </option>
                              {1 ? (
                                Object.values(CITY_LIST)
                                  .filter((city: any) => {
                                    return city.parent_code === selectedState.key;
                                  })
                                  .map((city: any) => {
                                    return (
                                      <option
                                        key={city.code}
                                        data-code={city.code}
                                        value={city.name}>
                                        {city.name}
                                      </option>
                                    );
                                  })
                              ) : (
                                <></>
                              )}
                            </select>
                            {/* <Field
                                name={key}
                                type="number"
                                value={selectedCity.value}
                                children={cityValues}
                                onChange={(e: any) => {
                                  const selectedIndex = e.target.options.selectedIndex;
                                  const key = e.target.options[selectedIndex].getAttribute('data-code')
                                  setSelectedCity({value: e.target.value, key: key}
                                    )
                                  }
                                }
                                component={SelectField}
                                isHorizontal
                                withFeedbackLabel
                                labelWidth={4}
                                placeholder={value.data[key].placeholder}
                                label={value.data[key].label}
                                required={value.data[key].required}
                              /> */}
                          </div>
                        );

                      case 'districtSelect':
                        const districtLabel = intl.formatMessage({ id: searchM[key].label });
                        const withFeedbackLabelDistrict = true;
                        return (
                          <div className="col-xxl-2 col-md-2 mt-md-5 mt-5" key={`${key}`}>
                            {districtLabel && (
                              <label
                              // className={'mb-0 input-label mt-2'}
                              >
                                {districtLabel} {<span className="text-danger">*</span>}
                              </label>
                            )}
                            <select
                              onChange={(e: any) => {
                                const selectedIndex = e.target.options.selectedIndex;
                                const key = e.target.options[selectedIndex].getAttribute(
                                  'data-code',
                                );
                                setSelectedDistrict({ value: e.target.value, key: key });
                                setFieldValue('district', e.target.value);
                              }}
                              className={'form-control'}>
                              <option hidden>
                                {intl.formatMessage({ id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER' })}
                              </option>
                              {1 ? (
                                Object.values(DISTRICT_LIST)
                                  .filter((district: any) => {
                                    return district.parent_code === selectedCity.key;
                                  })
                                  .map((district: any) => {
                                    return (
                                      <option
                                        key={district.code}
                                        data-code={district.code}
                                        value={district.name}>
                                        {district.name}
                                      </option>
                                    );
                                  })
                              ) : (
                                <></>
                              )}
                            </select>
                            {/* <Field
                                name={key}
                                type="number"
                                value={selectedDistrict.value}
                                children={districtValues}
                                onChange={(e: any) => {
                                  const selectedIndex = e.target.options.selectedIndex;
                                  const key = e.target.options[selectedIndex].getAttribute('data-code')
                                  setSelectedDistrict({value: e.target.value, key: key}
                                    )
                                  }
                                }
                                component={SelectField}
                                isHorizontal
                                withFeedbackLabel
                                labelWidth={4}
                                placeholder={value.data[key].placeholder}
                                label={value.data[key].label}
                                required={value.data[key].required}
                              /> */}
                          </div>
                        );
                    }
                    return <></>;
                  })
                ) : (
                  <></>
                )}
              </div>

              <div className="row no-gutters">
                <div className="mr-5">
                  <button className="btn btn-primary pl-4 pr-5" type="submit">
                    <SearchIcon style={{ fontSize: 14 }} />
                    {intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_HEADER.SEARCH_BTN' })}
                  </button>
                </div>

                <div className="mr-5">
                  <button
                    className="btn btn-outline-primary pl-7 pr-7"
                    type="reset"
                    onClick={() => handleResetForm(resetForm)}>
                    <SVG src={ToAbsoluteUrl('/media/svg/vncheck/reset-filter.svg')} />
                    &nbsp;
                    {intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_HEADER.RESET_FILTER_BTN' })}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
