import React, { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { MainInput } from '../../../common-library/forms/main-input';
import { DatePickerField } from '../../../common-library/forms/date-picker-field';
import { Switch } from '@material-ui/core';
import TagInput from '../../../common-library/forms/tag-input';
import { InfiniteSelect } from '../../../common-library/forms/infinite-select';
import CustomImageUpload from '../../../common-library/forms/custom-image-upload';
import { DefaultPagination } from '../../../common-library/common-consts/const';
import ImgGallery from '../../../common-library/forms/image-gallery';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { FormikRadioGroup } from '../../../common-library/forms/radio-group-field';
import { SwitchField } from '../../../common-library/forms/switch-field';
import { RadioField } from '../../../common-library/forms/radio-field';
import { DisplayField } from '../../../common-library/forms/display-field';
import { SelectField } from '../../../common-library/forms/select-field';
import STATE_LIST from '../../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../../_metronic/AdministrativeDivision/district.json';
import { useIntl } from 'react-intl';


const FormTemplate = ({
  // entity,
  // onModify,
  // title,
  modifyModel,
  // reduxModel,
  // code,
  // get,
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
}: {
  modifyModel: any;
  // title: string;
  // entity: T;
  // onModify: (values: any) => void;
  // reduxModel: string;
  // code: string | null;
  // get: (code: string) => any | null;
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
}) => {

  const { values, setFieldValue } = useFormikContext<any>();

  const [ search, setSearch ] = useState<any>(formValues);

  

  const [ address, setAddress ] = useState<any>({
    state: {key: '', value: ''},
    city: {key: '', value: ''},
    district: {key: '', value: ''},
  });

  const [ selectedState, setSelectedState ] = useState<any>({key: '', value: ''});
  const [ selectedCity, setSelectedCity ] = useState<any>({key: '', value: ''});
  const [ selectedDistrict, setSelectedDistrict ] = useState<any>({key: '', value: ''});

  
  const [ stateValues, setStateValues ] = useState<any>();
  const [ cityValues, setCityValues ] = useState<any>();
  const [ districtValues, setDistrictValues ] = useState<any>( );

  const intl = useIntl();

  

  

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



  const dataT: any = [
    {
      _id: 'abc',
      code: '000001',
      name: 'Rau muống',
      barcode: '8930000001',
      imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
      growingDays: 15,
      plantingDays: 30,
      expiryDays: 30,
    },
    {
      _id: 'abcd',
      code: '000003',
      name: 'Rau cải',
      barcode: '8930000003',
      imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
      growingDays: 15,
      plantingDays: 30,
      expiryDays: 60,
    },
    {
      _id: 'abce',
      code: '000004',
      name: 'Rau muống',
      barcode: '8930000004',
      imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
      growingDays: 15,
      plantingDays: 30,
      expiryDays: 17,
    },
    {
      _id: 'abcf',
      code: '000005',
      name: 'Rau muống',
      barcode: '8930000005',
      imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
      growingDays: 15,
      plantingDays: 30,
      expiryDays: 19,
    },
    {
      _id: 'abdacf',
      code: '000009',
      name: 'Rau cần',
      barcode: '8930000009',
      imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
      growingDays: 15,
      plantingDays: 30,
      expiryDays: 19,
    },
  ];

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

    if(!service) console.error('search select with undefined service')
    const entities = await service.GetAll({ queryProps, paginationProps });
    // console.log(entities)
    // const count = await service.Count({ queryProps });
    const count = entities.data.length;
    // console.log(count)

    const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);

    // const entities = await service.GetAll({ queryProps, paginationProps });
    // // const count = onCount ? await onCount({ queryProps }) : await service.Count({ queryProps });
    // const count = entities.data.paging.total
    // const hasMore = prevOptions.length < count - (DefaultPagination.limit ?? 0);

    // setSearchTerm({ ...searchTerm, [key]: search });

    // const data = [...new Set(entities.data)];
    // console.log(data)

    return {
      options: entities.data.map((e: any) => {
        return { label: e[keyField], value: e._id };
      }),
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <>
    {modifyModel && modifyModel.title && <h6 className="text-primary">{modifyModel.title.toUpperCase()}</h6>}
      {modifyModel && modifyModel.data && Object.keys(modifyModel.data).map(key => {
        switch (modifyModel.data[key].type) {
          case 'string':
            return (
              <div className="mt-3" key={key}>
                <Field
                  name={key}
                  component={MainInput}
                  placeholder={modifyModel.data[key].placeholder}
                  withFeedbackLabel
                  labelWidth={4}
                  isHorizontal
                  label={modifyModel.data[key].label}
                  disabled={modifyModel.data[key].disabled}
                  required={modifyModel.data[key].required}
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
                  placeholder={modifyModel.data[key].placeholder}
                  label={modifyModel.data[key].label}
                  required={modifyModel.data[key].required}
                />
              </div>
            );


          case 'stateSelect':
            // const stateValues = Object.values(STATE_LIST).map((state: any) => {return {value: state.name, key: state.code}});
            const labelWidth = 4;
            const isHorizontal = true;
            const label = modifyModel.data[key].label;
            const withFeedbackLabel = true;
            const placeholder = modifyModel.data[key].placeholder
            const required = modifyModel.data[key].required;
            return (
              <div className="mt-3" key={`${key}`}>
                <div className="row">
                <div className={'col-md-4 col-xl-4 col-12'}>
                  {label && (
                    <label  className={isHorizontal && 'mb-0 input-label mt-2'}>
                      {label} {withFeedbackLabel && <span className="text-danger">*</span>}
                    </label>
                  )}
                </div>
                <select
                  onChange={(e: any) => {
                      const selectedIndex = e.target.options.selectedIndex;
                      const key = e.target.options[selectedIndex].getAttribute('data-code')
                      setSelectedState({value: e.target.value, key: key})
                      setSelectedCity({value: '', key: ''})
                      setSelectedDistrict({value: '', key: ''})
                      setFieldValue('state', e.target.value);
                    }
                  }
                  className={'col-md-8 col-xl-7 col-12 form-control'}
                  >
                  <option hidden>{intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}</option>
                  {1 ?
                    Object.values(STATE_LIST).map((state: any) => {
                      return (
                        <option key={state.code} data-code={state.code} value={state.name}>{state.name}</option>
                      )
                    })
                    :
                    (<></>)
                  }
                </select>
                </div>
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

            return (
              <div className="mt-3" key={`${key}`}>
                <div className="row">
                <div className={'col-md-4 col-xl-4 col-12'}>
                  {modifyModel.data[key].label && (
                    <label  className={'mb-0 input-label mt-2'}>
                      {modifyModel.data[key].label} {<span className="text-danger">*</span>}
                    </label>
                  )}
                </div>
                <select
                    onChange={(e: any) => {
                      const selectedIndex = e.target.options.selectedIndex;
                      const key = e.target.options[selectedIndex].getAttribute('data-code')
                      setSelectedCity({value: e.target.value, key: key})
                      setSelectedDistrict({value: '', key: ''})
                      setFieldValue('city', e.target.value);
                    }
                  }
                  className={'col-md-8 col-xl-7 col-12 form-control'}
                  >
                  <option hidden>{intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}</option>
                  {1 ?
                    Object.values(CITY_LIST).filter((city: any) => {return city.parent_code === selectedState.key}).map((city: any) => {
                      return (
                        <option key={city.code} data-code={city.code} value={city.name}>{city.name}</option>
                      )
                    })
                    :
                    (<></>)
                  }
                </select>
                </div>
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
            const districtValues = Object.values(DISTRICT_LIST).map((district: any) => {return district.name});
            return (
              <div className="mt-3" key={`${key}`}>
                <div className="row">
                <div className={'col-md-4 col-xl-4 col-12 '}>
                  {modifyModel.data[key].label && (
                    <label  className={'mb-0 input-label mt-2'}>
                      {modifyModel.data[key].label} {<span className="text-danger">*</span>}
                    </label>
                  )}
                </div>
                <select
                    onChange={(e: any) => {
                      const selectedIndex = e.target.options.selectedIndex;
                      const key = e.target.options[selectedIndex].getAttribute('data-code')
                      setSelectedDistrict({value: e.target.value, key: key})
                      setFieldValue('district', e.target.value);
                    }
                  }
                  className={'col-md-8 col-xl-7 col-12 form-control'}
                  >
                  <option hidden>{intl.formatMessage({id: 'COMMON_COMPONENT.SELECT.PLACEHOLDER'})}</option>
                  {1 ?
                    Object.values(DISTRICT_LIST).filter((district: any) => {return district.parent_code === selectedCity.key}).map((district: any) => {
                      return (
                        <option key={district.code} data-code={district.code} value={district.name}>{district.name}</option>
                      )
                    })
                    :
                    (<></>)
                  }
                </select>
                </div>
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
                    placeholder={modifyModel.data[key].placeholder}
                    label={modifyModel.data[key].label}
                    required={modifyModel.data[key].required}
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
                  label={modifyModel.data[key].label}
                  labelWidth={4}
                  type="Datetime"
                  required={modifyModel.data[key].required}
                />
              </div>
            );
          case 'radioGroup':
            const _shippingAddresses = formValues['shippingAddress'] ? formValues['shippingAddress'] : [];
            return (
              <FormikRadioGroup
                handleAddButton={handleAddButton}
                handleEditButton={handleEditButton}
                handleDeleteButton={handleDeleteButton}
                setShippingAddressEntity={setShippingAddressEntity}
                ariaLabel='defaultShippingAddress'
                name='defaultShippingAddress'
                addresses={_shippingAddresses}
              />
            );
          case 'image':
            return (
              <div className="mt-3" key={key}>
                <CustomImageUpload
                  images={images[key]}
                  onChange={(imageList: any, addUpdateIndex: any) => {
                    onChange(imageList, addUpdateIndex, key);
                  }}
                  label={modifyModel.data[key].label}
                  labelWidth={4}
                  isHorizontal={true}
                  required={modifyModel.data[key].required}
                />
              </div>
            );
          case 'boolean':
            return (
              <div className="mt-3" key={`${key}`}>
                          
                <Field
                  name={key}
                  component={SwitchField}
                  isHorizontal
                  withFeedbackLabel
                  labelWidth={4}
                  placeholder={modifyModel.data[key].placeholder}
                  label={modifyModel.data[key].label}
                  required={modifyModel.data[key].required}
                />
              </div>
            );  
          
          case 'display':
            return values && values[key] ?
            (
              <div className="mt-3" key={`${key}`}>
                          
                <Field
                  name={key}
                  displayValue={values[key]}
                  component={DisplayField}
                  isHorizontal
                  withFeedbackLabel
                  labelWidth={4}
                  placeholder={modifyModel.data[key].placeholder}
                  label={modifyModel.data[key].label}
                  required={modifyModel.data[key].required}
                />
              </div>
            ) :
            (<></>);
          
          case 'option':
            return values.gender ? (
              <div className="mt-3" key={`${key}`}>
                <Field
                  name={key}
                  component={RadioField}
                  isHorizontal
                  withFeedbackLabel
                  labelWidth={4}
                  placeholder={modifyModel.data[key].placeholder}
                  label={modifyModel.data[key].label}
                  required={modifyModel.data[key].required}
                />
                {/* <RadioField 
                  defaultValue={values.gender}
                /> */}
            </div>
            ) : (<></>)

          case 'object':
            return (
              <div className="mt-3" key={key}>
                {Object.keys(modifyModel.data[key]).map(childKey => {
                  switch (modifyModel.data[key][childKey].type) {
                    case 'string':
                      return (
                        <div className="mt-3" key={childKey}>
                          <Field
                            name={`${key}.${childKey}`}
                            component={MainInput}
                            placeholder={modifyModel.data[key][childKey].placeholder}
                            withFeedbackLabel
                            labelWidth={4}
                            isHorizontal
                            label={modifyModel.data[key][childKey].label}
                            disabled={modifyModel.data[key][childKey].disabled}
                            required={modifyModel.data[key][childKey].required}
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
                            placeholder={modifyModel.data[key][childKey].placeholder}
                            label={modifyModel.data[key][childKey].label}
                            required={modifyModel.data[key][childKey].required}
                          />
                        </div>
                      );
                  }
                })}
              </div>
            );

          case 'SearchSelect':
            return (
              <div className="mt-3" key={key}>
                <InfiniteSelect
                  label={modifyModel.data[key].label}
                  isHorizontal={true}
                  value={search[key]}
                  onChange={(value: any) => {
                    setSearch({ ...search, [key]: value });
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
                      modifyModel.data[key].service,
                      modifyModel.data[key].keyField,
                      key,
                    )
                  }
                  refs={modifyModel.data[key].ref}
                  additional={{
                    page: DefaultPagination.page,
                  }}
                  name={key}
                  placeholder={modifyModel.data[key].placeholder}
                />
              </div>
            );

          case 'tag':
            return (
              <div className="mt-3" key={key}>
                <TagInput
                  label={modifyModel.data[key].label}
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
                  photos={[{
                    src: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
                    author: "Nguyễn Minh Hiếu",
                    time: "26/09/2020 9:00",
                    location: `21°01'10.1"N 105°47'28.6"E`,
                    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
                  }, {
                    src: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
                    author: "Nguyễn Minh Hiếu",
                    time: "26/09/2020 9:00",
                    location: `21°01'10.1"N 105°47'28.6"E`,
                    thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
                  }, {
                    src: "https://source.unsplash.com/QdBHnkBdu4g/1144x763",
                    author: "Nguyễn Minh Hiếu",
                    time: "26/09/2020 9:00",
                    location: `21°01'10.1"N 105°47'28.6"E`,
                    thumbnail: "https://source.unsplash.com/QdBHnkBdu4g/100x67",
                  }]}
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