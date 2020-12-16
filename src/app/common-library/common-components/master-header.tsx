import React, {ChangeEvent, useState} from 'react';
import {useIntl} from 'react-intl';
import {Field, Formik} from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import {Input} from '../forms/input';
import {Card, CardBody, CardHeader} from '../card';
import SVG from 'react-inlinesvg';
import {ToAbsoluteUrl} from '../helpers/assets-helpers';
import {SearchModel} from '../common-types/common-type';
// import InfiniteScroll from 'react-infinite-scroll-component';
import {AxiosResponse} from 'axios';
import {DefaultPagination, iconStyle} from '../common-consts/const';
import {InfiniteSelect} from '../forms/infinite-select';
import {DatePickerField} from '../forms/date-picker-field';
// import InfiniteSelect from '../forms/infinite-select';
import STATE_LIST from '../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../_metronic/AdministrativeDivision/district.json';

import './master-header.css';
import {InputDateTime, InputNumber, InputSearchSelect, InputString} from "./common-input";

export function MasterHeader<T>({
                                  title,
                                  onSearch,
                                  searchModel,
                                  initValue = {},
                                  // onReset,
                                  treeData
                                }: {
  searchModel: SearchModel;
  title: string;
  initValue?: any;
  onSearch: (data: any) => void;
  // onReset?: (data?: any) => void;
}) {
  const intl = useIntl();
  
  const handleResetForm = (resetForm: any) => {
    resetForm();
  };
  return (
    <Card className={'master-header-card'}>
      <CardHeader title={intl.formatMessage({id: title}).toUpperCase()}/>
      <CardBody>
        <Formik
          initialValues={initValue}
          onSubmit={values => {
            onSearch({...values});
          }}
          onReset={data => {
            onSearch({});
            // if (onReset) {
            //   onReset(data);
            // }
          }}>
          {({values, handleSubmit, handleBlur, handleChange, setFieldValue, resetForm}) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row master-header-search-margin">
                {searchModel ? (
                  Object.keys(searchModel).map(key => {
                    switch (searchModel[key].type) {
                      case 'string':
                        return (
                          <InputString
                            className={"col-xxl-2 col-md-3 master-header-search-input-margin"}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}/>
                        );
                      case 'number':
                        return (
                          <InputNumber
                            className={"col-xxl-2 col-md-3 master-header-search-input-margin"}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}/>
                        );
                      case 'date-time':
                        return (
                          <InputDateTime
                            className={"col-xxl-2 col-md-3 master-header-search-input-margin"}
                            name={key}
                            {...searchModel[key]}
                            key={`master_header${key}`}
                          />
                        );
                      case 'search-select':
                        if (searchModel[key].onSearch === undefined || searchModel[key].onSearch === null) return;
                        if (!searchModel[key].keyField) return;
                        const t = (t: any) => {
                        
                        };
                        return (
                          <InputSearchSelect
                            className={"col-xxl-2 col-md-3 master-header-search-input-margin"}
                            name={key}
                            {...searchModel[key]}
                            onSearch={searchModel[key].onSearch ?? t}
                            keyField={searchModel[key].keyField ?? ''}
                            key={`master_header${key}`}
                            // onChange={(value: any) => {
                            //   setSearch({...search, [key]: value});
                            // }}
                            additional={{
                              page: DefaultPagination.page,
                            }}
                          />
                        );
                      //
                      // case 'TreeSelect':
                      //   return (
                      //       <CustomeTreeSelect
                      //         label={intl.formatMessage({id: searchM[key].label})}
                      //         disabled={searchM[key].isDisabled ?? false}
                      //         placeholder={intl.formatMessage({id: searchM[key].placeholder})}
                      //         data={treeData}
                      //         value={treeSelectValue}
                      //         onChange={(value: any) => setSearch({...search, [key]: value})}
                      //         name={key}
                      //       />
                      //   );
                      //
                      // case 'stateSelect':
                      //   // const stateValues = Object.values(STATE_LIST).map((state: any) => {return {value: state.name, key: state.code}});
                      //   const labelWidth = 4;
                      //   const isHorizontal = false;
                      //   const stateLabel = intl.formatMessage({id: searchM[key].label});
                      //   const withFeedbackLabelState = true;
                      //   // const placeholder = modifyModel.data[key].placeholder
                      //   // const required = modifyModel.data[key].required;
                      //   return (
                      //     <div className={className} key={`${key}`}>
                      //       {stateLabel && (
                      //         <label
                      //           // className={'mb-0 input-label mt-2'}
                      //         >
                      //           {stateLabel}{' '}
                      //           {withFeedbackLabelState && <span className="text-danger">*</span>}
                      //         </label>
                      //       )}
                      //       <select
                      //         onChange={(e: any) => {
                      //           const selectedIndex = e.target.options.selectedIndex;
                      //           const key = e.target.options[selectedIndex].getAttribute(
                      //             'data-code',
                      //           );
                      //           setSelectedState({value: e.target.value, key: key});
                      //           setSelectedCity({value: '', key: ''});
                      //           setSelectedDistrict({value: '', key: ''});
                      //           setFieldValue('state', e.target.value);
                      //         }}
                      //         className={'form-control'}>
                      //         <option hidden>
                      //           {intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                      //         </option>
                      //         {1 ? (
                      //           Object.values(STATE_LIST).map((state: any) => {
                      //             return (
                      //               <option
                      //                 key={state.code}
                      //                 data-code={state.code}
                      //                 value={state.name}>
                      //                 {state.name}
                      //               </option>
                      //             );
                      //           })
                      //         ) : (
                      //           <></>
                      //         )}
                      //       </select>
                      //       {/* <Field
                      //         name={key}
                      //         type="number"
                      //         value={selectedState.value}
                      //         children={stateValues}
                      //         onChange={(e: any) => {
                      //             const selectedIndex = e.target.options.selectedIndex;
                      //             const key = e.target.options[selectedIndex].getAttribute('data-code')
                      //             setSelectedState({value: e.target.value, key: key}
                      //             )
                      //           }
                      //         }
                      //         component={SelectField}
                      //         isHorizontal
                      //         withFeedbackLabel
                      //         labelWidth={4}
                      //         placeholder={value.data[key].placeholder}
                      //         label={value.data[key].label}
                      //         required={value.data[key].required}
                      //       /> */}
                      //     </div>
                      //   );
                      //
                      // case 'citySelect':
                      //   const cityLabel = intl.formatMessage({id: searchM[key].label});
                      //   const withFeedbackLabelCity = true;
                      //   return (
                      //     <div className={className} key={`${key}`}>
                      //       {cityLabel && (
                      //         <label
                      //           // className={'mb-0 input-label mt-2'}
                      //         >
                      //           {cityLabel} {<span className="text-danger">*</span>}
                      //         </label>
                      //       )}
                      //       <select
                      //         onChange={(e: any) => {
                      //           const selectedIndex = e.target.options.selectedIndex;
                      //           const key = e.target.options[selectedIndex].getAttribute(
                      //             'data-code',
                      //           );
                      //           setSelectedCity({value: e.target.value, key: key});
                      //           setSelectedDistrict({value: '', key: ''});
                      //           setFieldValue('city', e.target.value);
                      //         }}
                      //         className={'form-control'}>
                      //         <option hidden>
                      //           {intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                      //         </option>
                      //         {1 ? (
                      //           Object.values(CITY_LIST)
                      //             .filter((city: any) => {
                      //               return city.parent_code === selectedState.key;
                      //             })
                      //             .map((city: any) => {
                      //               return (
                      //                 <option
                      //                   key={city.code}
                      //                   data-code={city.code}
                      //                   value={city.name}>
                      //                   {city.name}
                      //                 </option>
                      //               );
                      //             })
                      //         ) : (
                      //           <></>
                      //         )}
                      //       </select>
                      //       {/* <Field
                      //           name={key}
                      //           type="number"
                      //           value={selectedCity.value}
                      //           children={cityValues}
                      //           onChange={(e: any) => {
                      //             const selectedIndex = e.target.options.selectedIndex;
                      //             const key = e.target.options[selectedIndex].getAttribute('data-code')
                      //             setSelectedCity({value: e.target.value, key: key}
                      //               )
                      //             }
                      //           }
                      //           component={SelectField}
                      //           isHorizontal
                      //           withFeedbackLabel
                      //           labelWidth={4}
                      //           placeholder={value.data[key].placeholder}
                      //           label={value.data[key].label}
                      //           required={value.data[key].required}
                      //         /> */}
                      //     </div>
                      //   );
                      //
                      // case 'districtSelect':
                      //   const districtLabel = intl.formatMessage({id: searchM[key].label});
                      //   const withFeedbackLabelDistrict = true;
                      //   return (
                      //     <div className={className} key={`${key}`}>
                      //       {districtLabel && (
                      //         <label
                      //           // className={'mb-0 input-label mt-2'}
                      //         >
                      //           {districtLabel} {<span className="text-danger">*</span>}
                      //         </label>
                      //       )}
                      //       <select
                      //         onChange={(e: any) => {
                      //           const selectedIndex = e.target.options.selectedIndex;
                      //           const key = e.target.options[selectedIndex].getAttribute(
                      //             'data-code',
                      //           );
                      //           setSelectedDistrict({value: e.target.value, key: key});
                      //           setFieldValue('district', e.target.value);
                      //         }}
                      //         className={'form-control'}>
                      //         <option hidden>
                      //           {intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                      //         </option>
                      //         {1 ? (
                      //           Object.values(DISTRICT_LIST)
                      //             .filter((district: any) => {
                      //               return district.parent_code === selectedCity.key;
                      //             })
                      //             .map((district: any) => {
                      //               return (
                      //                 <option
                      //                   key={district.code}
                      //                   data-code={district.code}
                      //                   value={district.name}>
                      //                   {district.name}
                      //                 </option>
                      //               );
                      //             })
                      //         ) : (
                      //           <></>
                      //         )}
                      //       </select>
                      //       {/* <Field
                      //           name={key}
                      //           type="number"
                      //           value={selectedDistrict.value}
                      //           children={districtValues}
                      //           onChange={(e: any) => {
                      //             const selectedIndex = e.target.options.selectedIndex;
                      //             const key = e.target.options[selectedIndex].getAttribute('data-code')
                      //             setSelectedDistrict({value: e.target.value, key: key}
                      //               )
                      //             }
                      //           }
                      //           component={SelectField}
                      //           isHorizontal
                      //           withFeedbackLabel
                      //           labelWidth={4}
                      //           placeholder={value.data[key].placeholder}
                      //           label={value.data[key].label}
                      //           required={value.data[key].required}
                      //         /> */}
                      //     </div>
                      //   );
                    }
                    return <></>;
                  })
                ) : (
                  <></>
                )}
              </div>
              
              <div className="row no-gutters">
                <button className="btn btn-primary mr-8 fixed-btn-width" type="submit">
                  <SearchIcon style={iconStyle}/>
                  {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_HEADER.SEARCH_BTN'})}
                </button>
                <button
                  className="btn btn-outline-primary fixed-btn-width"
                  type="reset"
                  onClick={() => handleResetForm(resetForm)}>
                  <SVG src={ToAbsoluteUrl('/media/svg/vncheck/reset-filter.svg')}
                       style={iconStyle}/>
                  {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_HEADER.RESET_FILTER_BTN'})}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
