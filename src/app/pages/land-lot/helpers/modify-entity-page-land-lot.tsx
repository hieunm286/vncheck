import React, { ChangeEvent, useEffect, useState } from 'react';
import { ModifyModel } from '../../../common-library/common-types/common-type'
import { generateInitForm, getNewImage, getOnlyFile } from '../../../common-library/helpers/common-function';
import { Field, Form, Formik } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
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
import { useIntl } from 'react-intl';
import { SelectField } from '../../../common-library/forms/select-field';


function ModifyEntityPageLandLot<T>({
  // entity,
  // onModify,
  // title,
  modifyModel,
  values,
  // reduxModel,
  // code,
  // get,
  images,
  onChange,
  title,
  column,
  search,
  setSearch,
  handleChange,
  handleChangeTag,
  setFieldValue
}: {
  modifyModel: any;
  values: any;
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
  search?: any;
  setSearch?: any;
  handleChange?: any;
  handleChangeTag?: any;
  setFieldValue?: any;
}) {
  const intl = useIntl();
  // const initForm = generateInitForm(modifyModel);
  const modifyM = { ...modifyModel } as any;
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

  function genCharArray(charA: any, charZ: any) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
  }

  function genNumberArray(start: number, end: number) {
    let numberArray: any[] = [];
    for(let i = start; i <= end; i++) {
      let formattedNumber = ("0" + i).slice(-2);
      numberArray.push(formattedNumber)
    }
    return numberArray;
  }

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


    // const entities = await service.GetAll({ queryProps, paginationProps });
    // const count = await service.Count({ queryProps });

    // const hasMore = prevOptions.length < count.data - (DefaultPagination.limit ?? 0);

    // setSearchTerm({ ...searchTerm, [key]: search });

    // const data = [...new Set(dataT)];
    let data = [];

    if(key === "lot") {
      data = genCharArray('A', 'Z'); // ["a", ..., "z"]
    } else if(key === "subLot") {
      data = genNumberArray(0, 99);
    } else {
      data = [];
    }
    return {
      options: data
        .filter((value: string)  => {
          return value.startsWith(search.toString().toUpperCase());
        })
        .map((value: any) => {
          return { label: value, value: value };
        }),
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <>
      {title && <h6 className="text-primary">{title.toUpperCase()}</h6>}
      <div className={(column ? column : 1) > 1 ? 'row' : ''}>
        {modifyModel &&
          modifyModel.map((value: any, key: any) => (
            <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={key}>
              {value.title && <h6 className="text-primary">{value.title.toUpperCase()}</h6>}
              {Object.keys(value.data).map(key => {
                switch (value.data[key].type) {
                  case 'string':
                    return (
                      <div className="mt-3" key={key}>
                        <Field
                          name={key}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const enteredValue = e.target.value.toUpperCase();
                            if(key === 'lot' 
                              && enteredValue.length <= 1
                              && 'A' <= enteredValue
                              && enteredValue <= 'Z'
                            ) {
                              setSearch({...search, [key]: enteredValue});
                              handleChange(e);
                              setFieldValue('lot', enteredValue.toUpperCase());
                              setFieldValue('code', enteredValue + values.subLot);
                            }
                            if(key === 'subLot'
                              &&  (enteredValue.length <=2
                                    && '00' <= enteredValue
                                    && enteredValue <= '99')
                              || enteredValue === ''
                            ) {
                              setSearch({...search, [key]: enteredValue});
                              setFieldValue('code', values.lot + enteredValue);
                              handleChange(e);
                            }
                            
                          }}
                          component={MainInput}
                          placeholder={value.data[key].placeholder}
                          withFeedbackLabel
                          labelWidth={4}
                          isHorizontal
                          label={value.data[key].label}
                          disabled={value.data[key].disabled}
                          required={value.data[key].required}
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
                          placeholder={value.data[key].placeholder}
                          label={value.data[key].label}
                          required={value.data[key].required}
                        />
                      </div>
                    );
                  case 'select':
                    return values[key] ?
                    (
                      <div className="mt-3" key={`${key}`}>
                        <Field
                          name={key}
                          type="number"
                          children={["a", "b"]}
                          component={SelectField}
                          isHorizontal
                          withFeedbackLabel
                          labelWidth={4}
                          placeholder={value.data[key].placeholder}
                          label={value.data[key].label}
                          required={value.data[key].required}
                        />
                      </div>
                    ) : (
                      <></>
                    )
                  case 'Datetime':
                    return (
                      <div className="mt-3" key={key}>
                        <DatePickerField
                          name={key}
                          isHorizontal
                          label={value.data[key].label}
                          labelWidth={4}
                          type="Datetime"
                          required={value.data[key].required}
                        />
                      </div>
                    );
                  case 'image':
                    return (
                      <div className="mt-3" key={key}>
                        <CustomImageUpload
                          images={images[key]}
                          onChange={(imageList: any, addUpdateIndex: any) => {
                            onChange(imageList, addUpdateIndex, key);
                          }}
                          label={value.data[key].label}
                          labelWidth={4}
                          isHorizontal={true}
                          required={value.data[key].required}
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
                            placeholder={value.data[key].placeholder}
                            label={value.data[key].label}
                            required={value.data[key].required}
                          />
                        </div>
                      );  

                  case 'object':
                    return (
                      <div className="mt-3" key={key}>
                        {Object.keys(value.data[key]).map(childKey => {
                          switch (value.data[key][childKey].type) {
                            case 'string':
                              return (
                                <div className="mt-3" key={childKey}>
                                  <Field
                                    name={`${key}.${childKey}`}
                                    component={MainInput}
                                    placeholder={value.data[key][childKey].placeholder}
                                    withFeedbackLabel
                                    labelWidth={4}
                                    isHorizontal
                                    label={value.data[key][childKey].label}
                                    disabled={value.data[key][childKey].disabled}
                                    required={value.data[key][childKey].required}
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
                                    placeholder={value.data[key][childKey].placeholder}
                                    label={value.data[key][childKey].label}
                                    required={value.data[key][childKey].required}
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
                              label={value.data[key].label}
                              isHorizontal={true}
                              value={search[key]}
                              onChange={(value: any) => {
                                const enteredValue = value.value;
                                if(key === 'lot' 
                                  && enteredValue.length <= 1
                                  && 'A' <= enteredValue
                                  && enteredValue <= 'Z'
                                ) {
                                  setSearch({...search, [key]: {label: enteredValue, name: enteredValue}});
                                  // handleChange(e);
                                  setFieldValue('lot', {label: enteredValue, name: enteredValue});
                                  if(values.subLot) {
                                    setFieldValue('code', enteredValue + values.subLot);
                                  } else {
                                    setFieldValue('code', enteredValue);
                                  }
                                }
                                else if(key === 'subLot'
                                  &&  (enteredValue.length <=2
                                        && '00' <= enteredValue
                                        && enteredValue <= '99')
                                  || enteredValue === ''
                                ) {
                                  setSearch({...search, [key]: {label: enteredValue, name: enteredValue}});
                                  setFieldValue('code', values.lot + enteredValue);
                                  // handleChange(e);
                                }
                                else {
                                  setSearch({ ...search, [key]: value });
                                }
                            
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
                                  value.data[key].service,
                                  value.data[key].keyField,
                                  key,
                                )
                              }
                              refs={value.data[key].ref}
                              additional={{
                                page: DefaultPagination.page,
                              }}
                              name={key}
                              placeholder={value.data[key].placeholder}
                            />
                          </div>
                        );
                        
          case 'tag':
            return (
              <div className="mt-3" key={key}>
                <TagInput
                  label={value.data[key].label}
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
            );          }
                return <></>;
              })}
            </div>
          ))}
      </div>

    </>
  );
}

export default ModifyEntityPageLandLot;
