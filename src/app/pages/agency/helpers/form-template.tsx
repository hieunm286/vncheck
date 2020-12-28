import React, {useEffect, useState} from 'react';
import {Field, useFormikContext} from 'formik';
import {MainInput} from '../../../common-library/forms/main-input';
import {DatePickerField} from '../../../common-library/forms/date-picker-field';
import TagInput from '../../../common-library/forms/tag-input';
import {InfiniteSelect} from '../../../common-library/forms/infinite-select';
import CustomImageUpload from '../../../common-library/forms/custom-image-upload';
import {DefaultPagination} from '../../../common-library/common-consts/const';
import ImgGallery from '../../../common-library/forms/image-gallery';
import {FormikRadioGroup} from '../../../common-library/forms/radio-group-field';
import {SwitchField} from '../../../common-library/forms/switch-field';
import {RadioField} from '../../../common-library/forms/radio-field';
import STATE_LIST from '../../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../../_metronic/AdministrativeDivision/district.json';
import {useIntl} from 'react-intl';
import {ConvertToTreeNode} from '../../../common-library/helpers/common-function';
import * as StoreLevelService from '../../multilevel-sale/multilevel-sale.service';
import {Select} from 'antd'; // import Select from 'react-select';
import './ant-select.scss'
import SelectDropDownIcon from '../../../common-library/forms/select-drop-down-icon';

const FormTemplate = ({
                        modifyModel,
                        images,
                        onChange,
                        title,
                        column,
                        handleChangeTag,
                        handleAddButton,
                        handleEditButton,
                        handleDeleteButton,
                        setShippingAddressEntity,
                        formValues,
                        currentAddress,
                        setCurrentAddress,
                      }: {
  modifyModel: any;
  images?: any;
  onChange?: any;
  title?: string;
  column?: number;
  handleChangeTag?: any;
  handleAddButton?: any;
  handleEditButton?: any;
  handleDeleteButton?: any;
  setShippingAddressEntity?: any;
  formValues?: any;
  currentAddress?: any;
  setCurrentAddress?: any;
}) => {
  
  const {touched, errors, values, setFieldValue} = useFormikContext<any>();
  
  const [search, setSearch] = useState<any>(formValues);
  
  const [searchSelect, setSearchSelect] = useState<any>({});
  
  const {Option} = Select;
  
  // prevent role from being null
  // useEffect(() => {
  //   setSearch(formValues);
  // }, [formValues]);
  useEffect(() => {
    if (formValues && formValues.roleName) {
      setSearchSelect(formValues.roleName);
    }
  }, [formValues])
  
  
  const [address, setAddress] = useState<any>({
    state: {key: '', value: ''},
    city: {key: '', value: ''},
    district: {key: '', value: ''},
  });
  
  const [selectedState, setSelectedState] = useState<any>({key: '', value: ''});
  const [selectedCity, setSelectedCity] = useState<any>({key: '', value: ''});
  const [selectedDistrict, setSelectedDistrict] = useState<any>({key: '', value: ''});
  
  
  const [stateValues, setStateValues] = useState<any>([]);
  const [cityValues, setCityValues] = useState<any>([]);
  const [districtValues, setDistrictValues] = useState<any>([]);
  
  const [treeSelectValue, setTreeSelectValue] = useState<any>(null);
  const [treeData, setTreeData] = useState<any>([]);
  
  const intl = useIntl();
  
  
  useEffect(() => {
    treeLoadOptions(StoreLevelService) // treeLoadOptions(modifyModel.data['storeLevel'].service)
      .then((res: any) => {
        const treeData = ConvertToTreeNode(res);
        setTreeData(treeData)
      });
    
  }, []);
  
  useEffect(() => {
    if (values.storeLevel && values.storeLevel._id) {
      setTreeSelectValue(values.storeLevel._id)
    }
  }, [values.storeLevel])
  
  // useEffect(() => {
  //   const stateValues = Object.values(STATE_LIST).map((state: any) => {return {value: state.name, key: state.code}});
  //   setStateValues(stateValues);
  // },[]);
  
  // useEffect(() => {
  //   const cityValues = selectedState ? Object.values(CITY_LIST).
  //   filter((city: any) => {return city.parent_code === selectedState.key})
  //   .map((city: any) => {return {value: city.name, key: city.code}})
  //  : [];
  //  setCityValues(cityValues);
  // },[selectedState]);
  
  // useEffect(() => {
  //   const cityValues = selectedState ? Object.values(CITY_LIST).
  //   filter((city: any) => {return city.parent_code === selectedState.key})
  //   .map((city: any) => {return {value: city.name, key: city.code}})
  //  : [];
  //  setCityValues(cityValues);
  // },[selectedState]);
  
  useEffect(() => {
    if (values.state === undefined) {
      setSelectedState({
        value: undefined,
        key: undefined
      });
    }
    if (values.state !== undefined && values.state !== null) {
      setSelectedState({
        value: values.state,
        key: getCodeFromName(Object.values(STATE_LIST), values.state)
      });
    }
    if (values.state === null) {
      setSelectedState({
        value: null,
        key: null
      });
    }
  }, [values.state]);
  
  useEffect(() => {
    if (values.city !== undefined && values.city !== null) {
      setSelectedCity({
        value: values.city,
        key: getCodeFromName(Object.values(CITY_LIST).filter((city: any) => {
          return city.parent_code === selectedState.key
        }), values.city)
      });
    }
    if (values.city === undefined) {
      setSelectedCity({
        value: undefined,
        key: undefined
      });
    }
    if (values.city === null) {
      setSelectedCity({
        value: null,
        key: null
      });
    }
  }, [selectedState]);
  
  useEffect(() => {
    if (values.district !== undefined && values.district !== null) {
      setSelectedDistrict({
        value: values.district,
        key: getCodeFromName(Object.values(DISTRICT_LIST).filter((district: any) => {
          return district.parent_code === selectedCity.key
        }), values.district)
      });
    }
    if (values.district === undefined) {
      setSelectedDistrict({
        value: undefined,
        key: undefined
      });
    }
    if (values.district === null) {
      setSelectedDistrict({
        value: null,
        key: null
      });
    }
  }, [selectedCity]);
  
  
  const loadOptions = async (
    search: string,
    prevOptions: any,
    {page}: any,
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
    
    if (!service) console.error('search select with undefined service')
    const entities = await service.GetAll({queryProps, paginationProps});
    const count = entities.entity.length;
    
    const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);
    
    return {
      options: entities.entity.map((e: any) => {
        return {label: e[keyField], value: e._id};
      }),
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  };
  
  const treeLoadOptions = async (
    service: any,
  ) => {
    const queryProps: any = {};
    // queryProps[keyField] = search;
    // queryProps = 
    
    if (!service) console.error('search select with undefined service')
    const entities = await service.GetAll(
      {}
    );
    return entities.entity;
  };
  
  return (
    <>
      {modifyModel && modifyModel.title && <h6 className="text-primary">{modifyModel.title.toUpperCase()}</h6>}
      {modifyModel && modifyModel.entity && Object.keys(modifyModel.entity).map(key => {
        switch (modifyModel.entity[key].type) {
          case 'string':
            return (
              <div className="mt-3" key={key}>
                <Field
                  name={key}
                  component={MainInput}
                  placeholder={modifyModel.entity[key].placeholder}
                  withFeedbackLabel
                  labelWidth={4}
                  isHorizontal
                  label={modifyModel.entity[key].label}
                  disabled={modifyModel.entity[key].disabled}
                  required={modifyModel.entity[key].required}
                />
              </div>
            );
          case 'number':
            return (
              <div className="mt-3" key={`${key}`}>
                <Field
                  name={key}
                  type="number"
                  component={MainInput}
                  isHorizontal
                  withFeedbackLabel
                  labelWidth={4}
                  placeholder={modifyModel.entity[key].placeholder}
                  label={modifyModel.entity[key].label}
                  required={modifyModel.entity[key].required}
                />
              </div>
            );
          
          
          case 'stateSelect':
            const labelWidth = 4;
            const isHorizontal = true;
            const label = modifyModel.entity[key].label;
            const withFeedbackLabel = true;
            const placeholder = modifyModel.entity[key].placeholder
            const required = modifyModel.entity[key].required;
            return (selectedState.value || (selectedState.key === null && selectedState.value === null)) && (
              <div className="mt-3" key={`${key}`}>
                <div className="row">
                  
                  <Field name="state">
                    {({
                        field, // { name, value, onChange, onBlur }
                        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: {
                        field: any;
                        form: any;
                        meta: any;
                      }
                    ) =>
                      (
                        <>
                          <div className={'col-md-4 col-xl-4 col-12'}>
                            {label && (
                              <label className={isHorizontal && 'mb-0 input-label mt-2'}>
                                {label} {withFeedbackLabel && <span className="text-danger">*</span>}
                              </label>
                            )}
                          </div>
                          <div className={'col-md-8 col-xl-7 col-12'}>
                            <Select
                              placeholder={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                              suffixIcon={<SelectDropDownIcon/>}
                              defaultValue={selectedState.value}
                              onChange={(value: any) => {
                                const key = getCodeFromName(Object.values(STATE_LIST), value)
                                // const selectedIndex = e.target.options.selectedIndex;
                                // const key = e.target.options[selectedIndex].getAttribute('data-code')
                                setSelectedState({value: value, key: key})
                                setSelectedCity({value: '', key: ''})
                                setSelectedDistrict({value: '', key: ''})
                                setFieldValue('state', value);
                                setFieldValue('city', intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'}));
                                setFieldValue('district', intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'}));
                              }
                              }
                              className={(errors[key] && touched[key]) ? 'is-invalid' : ''}
                            >
                              <Option children=''
                                      value={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                                      hidden></Option>
                              {
                                Object.values(STATE_LIST).map((state: any) => {
                                  return (
                                    <Option key={state.code} data-code={state.code}
                                            value={state.name}>{state.name}</Option>
                                  )
                                })
                              }
                            </Select>
                            {
                              (errors[key] && touched[key]) && (
                                <div className="invalid-feedback">{errors[key]}</div>
                              )
                            }
                          </div>
                        </>
                      )}
                  </Field>
                </div>
              </div>
            );
          
          case 'citySelect':
            return (selectedCity.value || (selectedCity.key === null && selectedCity.value === null)) && (
              <div className="mt-3" key={`${key}`}>
                <div className="row">
                  <div className={'col-md-4 col-xl-4 col-12'}>
                    {modifyModel.entity[key].label && (
                      <label className={'mb-0 input-label mt-2'}>
                        {modifyModel.entity[key].label} {<span className="text-danger">*</span>}
                      </label>
                    )}
                  </div>
                  <div className={'col-md-8 col-xl-7 col-12'}>
                    <Select
                      placeholder={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                      suffixIcon={<SelectDropDownIcon/>}
                      defaultValue={selectedCity.value}
                      onChange={(value: any) => {
                        // const selectedIndex = e.target.options.selectedIndex;
                        // const key = e.target.options[selectedIndex].getAttribute('data-code')
                        const key = getCodeFromName(Object.values(CITY_LIST).filter((city: any) => {
                          return city.parent_code === selectedState.key
                        }), value);
                        setSelectedCity({value: value, key: key})
                        setSelectedDistrict({value: '', key: ''})
                        setFieldValue('city', value);
                        setFieldValue('district', intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'}));
                      }
                      }
                      className={(errors[key] && touched[key]) ? 'is-invalid' : ''}
                    >
                      <Option children='' value={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                              hidden></Option>
                      {(selectedState && selectedState.key) ?
                        Object.values(CITY_LIST).filter((city: any) => {
                          return city.parent_code === selectedState.key
                        }).map((city: any) => {
                          return (
                            <Option key={city.code} data-code={city.code} value={city.name}>{city.name}</Option>
                          )
                        })
                        :
                        (<></>)
                      }
                    </Select>
                    {
                      (errors[key] && touched[key]) && (
                        <div className="invalid-feedback">{errors[key]}</div>
                      )
                    }
                  </div>
                </div>
              </div>
            );
          
          case 'districtSelect':
            return (selectedDistrict.value || (selectedDistrict.key === null && selectedDistrict.value === null)) && (
              <div className="mt-3" key={`${key}`}>
                <div className="row">
                  <div className={'col-md-4 col-xl-4 col-12 '}>
                    {modifyModel.entity[key].label && (
                      <label className={'mb-0 input-label mt-2'}>
                        {modifyModel.entity[key].label} {<span className="text-danger">*</span>}
                      </label>
                    )}
                  </div>
                  <div className={'col-md-8 col-xl-7 col-12'}>
                    <Select
                      placeholder={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                      suffixIcon={<SelectDropDownIcon/>}
                      defaultValue={values.district}
                      onChange={(value: any) => {
                        // const selectedIndex = e.target.options.selectedIndex;
                        // const key = e.target.options[selectedIndex].getAttribute('data-code')
                        const key = getCodeFromName(Object.values(DISTRICT_LIST).filter((district: any) => {
                          return district.parent_code === selectedCity.key
                        }), value);
                        setFieldValue('district', value);
                        setSelectedDistrict({value: value, key: key})
                        // setFieldValue('district', e.target.value);
                      }
                      }
                      className={(errors[key] && touched[key]) ? 'is-invalid' : ''}
                    >
                      <Option children='' value={intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}
                              hidden></Option>
                      {(selectedCity && selectedCity.key) ?
                        Object.values(DISTRICT_LIST).filter((district: any) => {
                          return district.parent_code === selectedCity.key
                        }).map((district: any) => {
                          return (
                            <Option key={district.code} data-code={district.code}
                                    value={district.name}>{district.name}</Option>
                          )
                        })
                        :
                        (<></>)
                      }
                    </Select>
                    {
                      (errors[key] && touched[key]) && (
                        <div className="invalid-feedback">{errors[key]}</div>
                      )
                    }
                  </div>
                </div>
              </div>
            );
          
          // handle shippingAddress
          case 'array':
            const shippingAddresses = formValues[key];
            return shippingAddresses ?
              shippingAddresses.map((el: any, innerkey: any) => {
                return (
                  <div className="mt-3" key={`${innerkey}`}>
                    <Field
                      name={key}
                      value={
                        shippingAddresses[innerkey].address + ', ' +
                        shippingAddresses[innerkey].district + ', ' +
                        shippingAddresses[innerkey].city + ', ' +
                        shippingAddresses[innerkey].state
                      }
                      component={MainInput}
                      isHorizontal
                      withFeedbackLabel
                      labelWidth={4}
                      placeholder={modifyModel.entity[key].placeholder}
                      label={modifyModel.entity[key].label}
                      required={modifyModel.entity[key].required}
                    />
                  </div>
                )
              })
              : <></>
            break;
          case 'Datetime':
            return (
              <div className="mt-3" key={key}>
                <DatePickerField
                  name={key}
                  isHorizontal
                  label={modifyModel.entity[key].label}
                  labelWidth={4}
                  type="Datetime"
                  required={modifyModel.entity[key].required}
                  checkTouched={true}
                />
              </div>
            );
          case 'radioGroup':
            const _shippingAddresses = formValues['shippingAddress'] ? formValues['shippingAddress'].map((addr: any, key: number) => {
                return {...addr, _id: key};
              })
              : [];
            formValues['shippingAddress'] = _shippingAddresses;
            return (
              <FormikRadioGroup
                handleAddButton={handleAddButton}
                handleEditButton={handleEditButton}
                handleDeleteButton={handleDeleteButton}
                setShippingAddressEntity={setShippingAddressEntity}
                ariaLabel='defaultShippingAddress'
                name='defaultShippingAddress'
                addresses={_shippingAddresses}
                currentAddress={currentAddress}
                setCurrentAddress={setCurrentAddress}
              />
            );
          case 'image':
            return (
              <Field name={key}>
                {({
                    field, // { name, value, onChange, onBlur }
                    form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: {
                    field: any;
                    form: any;
                    meta: any;
                  }
                ) =>
                  (
                    <div className="mt-3" key={key}>
                      <CustomImageUpload
                        value={images[key]}
                        label={modifyModel.entity[key].label}
                        labelWidth={4}
                        required={modifyModel.entity[key].required}
                        name={key}
                      />
                    </div>
                  )
                }
              </Field>)
              ;
          case 'boolean':
            return (
              <div className="mt-3" key={`${key}`}>
                
                <Field
                  name={key}
                  component={SwitchField}
                  isHorizontal
                  withFeedbackLabel
                  labelWidth={4}
                  placeholder={modifyModel.entity[key].placeholder}
                  label={modifyModel.entity[key].label}
                  required={modifyModel.entity[key].required}
                />
              </div>
            );
          case 'option':
            return values.gender !== undefined ? (
              <div className="mt-3" key={`${key}`}>
                <Field
                  name={key}
                  component={RadioField}
                  isHorizontal
                  withFeedbackLabel
                  labelWidth={4}
                  placeholder={modifyModel.entity[key].placeholder}
                  label={modifyModel.entity[key].label}
                  required={modifyModel.entity[key].required}
                />
                {/* <RadioField 
                  defaultValue={values.gender}
                /> */}
              </div>
            ) : (<></>)
          
          case 'object':
            return (
              <div className="mt-3" key={key}>
                {Object.keys(modifyModel.entity[key]).map(childKey => {
                  switch (modifyModel.entity[key][childKey].type) {
                    case 'string':
                      return (
                        <div className="mt-3" key={childKey}>
                          <Field
                            name={`${key}.${childKey}`}
                            component={MainInput}
                            placeholder={modifyModel.entity[key][childKey].placeholder}
                            withFeedbackLabel
                            labelWidth={4}
                            isHorizontal
                            label={modifyModel.entity[key][childKey].label}
                            disabled={modifyModel.entity[key][childKey].disabled}
                            required={modifyModel.entity[key][childKey].required}
                          />
                        </div>
                      );
                    case 'number':
                      return (
                        <div className="mt-3" key={`${childKey}`}>
                          <Field
                            name={`${key}.${childKey}`}
                            type="number"
                            component={MainInput}
                            isHorizontal
                            withFeedbackLabel
                            labelWidth={4}
                            placeholder={modifyModel.entity[key][childKey].placeholder}
                            label={modifyModel.entity[key][childKey].label}
                            required={modifyModel.entity[key][childKey].required}
                          />
                        </div>
                      );
                  }
                })}
              </div>
            );
          
          case 'SearchSelect':
            // setTouched({[key]: true})
            return searchSelect && (
              <div className="mt-3" key={key}>
                <InfiniteSelect
                  label={modifyModel.entity[key].label}
                  mode={'horizontal'}
                  value={searchSelect} // value={search[key]}
                  onChange={(value: any) => {
                    setSearchSelect(value);
                  }}
                  loadOptions={(search: string, prevOptions: any, {page}: any) => {
                    // setSearchSelect(values[key])
                    return loadOptions(
                      search,
                      prevOptions,
                      {page},
                      modifyModel.entity[key].service,
                      modifyModel.entity[key].keyField,
                      key,
                    )
                  }
                  }
                  additional={{
                    page: DefaultPagination.page,
                  }}
                  name={key}
                  placeholder={modifyModel.entity[key].placeholder}
                  required={modifyModel.entity[key].required}
                  keyField={'aa'}/>
              </div>
            );
          //
          // case 'TreeSelect':
          //   return treeData ? (
          //     <div className="mt-3" key={key}>
          //       <CustomTreeSelect
          //         label={modifyModel.entity[key].label}
          //         placeholder={modifyModel.entity[key].placeholder}
          //         required={modifyModel.entity[key].required}
          //         labelWidth={4}
          //         data={treeData}
          //         value={treeSelectValue}
          //         isHorizontal
          //         onChange={(value: any) => {
          //             setTreeSelectValue(value)
          //           }
          //         }
          //         name={key}
          //       />
          //     </div>
          //   ) : (
          //     <></>
          //   );
          
          
          case 'tag':
            return (
              <div className="mt-3" key={key}>
                <TagInput
                  label={modifyModel.entity[key].label}
                  isHorizontal={true}
                  name={key}
                  handleChange={handleChangeTag}
                  isRequired
                  labelWidth={4}
                />
              </div>
            );
          
          case 'gallery':
            return (
              <div className="mt-3" key={key}>
                <ImgGallery
                  label='Image Gallery'
                  labelWidth={4}
                  name={key}
                  isHorizontal
                  mode='multiple'
                  photos={[{
                    path: 'https://source.unsplash.com/aZjw7xI3QAA/1144x763',
                    author: 'Nguyễn Minh Hiếu',
                    time: '26/09/2020 9:00',
                    location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
                    thumbnail: 'https://source.unsplash.com/aZjw7xI3QAA/100x67',
                  },
                    {
                      path: 'https://source.unsplash.com/c77MgFOt7e0/1144x763',
                      author: 'Nguyễn Minh Hiếu',
                      time: '26/09/2020 9:00',
                      location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
                      thumbnail: 'https://source.unsplash.com/c77MgFOt7e0/100x67',
                    },
                    {
                      path: 'https://source.unsplash.com/QdBHnkBdu4g/1144x763',
                      author: 'Nguyễn Minh Hiếu',
                      time: '26/09/2020 9:00',
                      location: {coordinates: [`21°01'10.1"N 105°47'28.6"E`]},
                      thumbnail: 'https://source.unsplash.com/QdBHnkBdu4g/100x67',
                    },]}
                />
              </div>
            );
        }
      })}
    </>
  );
}

export default FormTemplate;

export const getCodeFromName = (arr: any[], name: string): number => {
  const index: number = arr.findIndex(el => el.name === name);
  if (index === -1) return 10;
  return arr[index].code;
};

export const getNameFromCode = (arr: any[], code: number | string) => {
  const index: number = arr.findIndex(el => el.code === code);
  if (index === -1) return '';
  return arr[index].name;
};
