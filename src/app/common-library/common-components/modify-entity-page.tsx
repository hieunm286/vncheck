import React, { useEffect, useState } from 'react';
import { ModifyModel } from '../common-types/common-type';
import { useIntl } from 'react-intl';
import { generateInitForm, getNewImage, getOnlyFile } from '../helpers/common-function';
import { Field, Form, Formik } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../forms/main-input';
import { DefaultPagination, iconStyle } from '../common-consts/const';
import { Link, useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../forms/custom-image-upload';
import { uploadImage } from '../../pages/purchase-order/purchase-order.service';
import { Card, CardBody } from '../card';
import { DatePickerField } from '../forms/date-picker-field';
import { Switch } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { InfiniteSelect } from '../forms/infinite-select';
import TagInput from '../forms/tag-input';
import ImgGallery from '../forms/image-gallery';

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

function ModifyEntityPage<T>({
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
  search,
  setSearch,
  handleChangeTag,
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
  search?: any;
  setSearch?: any;
  handleChangeTag?: any;
}) {
  const intl = useIntl();
  // const initForm = generateInitForm(modifyModel);
  const modifyM = { ...modifyModel } as any;

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
    // const count = onCount ? await onCount({ queryProps }) : await service.Count({ queryProps });
    const count = entities.data.paging.total
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

  // const sleep = (ms: any) =>
  // new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve();
  //   }, ms);
  // });

  // const loadOptions = async (search: any, prevOptions: any) => {
  //   await sleep(1000);

  //   let filteredOptions;
  //   if (!search) {
  //     filteredOptions = data;
  //   } else {
  //     const searchLower = search.toLowerCase();
  //     console.log(data)
  //     filteredOptions = data.filter(({ name }: any) =>
  //       name.toLowerCase().includes(searchLower)
  //     );
  //   }

  //   const hasMore = filteredOptions.length > prevOptions.length + 10;
  //   const slicedOptions = filteredOptions.slice(
  //     prevOptions.length,
  //     prevOptions.length + 10
  //   );

  //   return {
  //     options: slicedOptions,
  //     hasMore
  //   };
  // };

  return (
    // <Card>
    //   <CardBody>
    //     <Formik
    //       enableReinitialize={true}
    //       initialValues={entityForEdit || initForm}
    //       // validationSchema={PurchaseOrderSchema}
    //       onSubmit={values => {
    //         onModify(values);
    //         history.push('/purchase-order');
    //       }}>
    //       {({ handleSubmit }) => (
    <>
      {/* <Form className="form form-label-right"> */}
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
                          name={key}
                        />
                      </div>
                    );
                  case 'boolean':
                    return (
                      <div className="mt-3" key={`${key}`}>
                        <Switch 
                          // style={{color: "#1DBE2D"}}
                          color="primary"
                          checkedIcon={<CheckCircleOutlinedIcon style={{backgroundColor: "#FFFFFF"}} />}
                          // icon={<CheckCircleIcon />}
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
                    );
                }
                return <></>;
              })}
            </div>
          ))}
      </div>
      {/* {modifyModel ? (
        Object.keys(modifyM).map(key => {
          switch (modifyM[key].type) {
            case 'string':
              return (
                <div className="mt-3" key={key}>
                  <Field
                    name={key}
                    component={MainInput}
                    placeholder={modifyM[key].placeholder}
                    withFeedbackLabel
                    labelWidth={4}
                    isHorizontal
                    label={modifyM[key].label}
                    disabled={modifyM[key].disabled}
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
                    placeholder={modifyM[key].placeholder}
                    label={modifyM[key].label}
                  />
                </div>
              );
            case 'Datetime':
              return (
                <div className="mt-3" key={key}>
                  <DatePickerField
                    name="date"
                    isHorizontal
                    label={modifyM[key].label}
                    labelWidth={4}
                  />
                </div>
              );
            case 'image':
              return (
                <div className="mt-3" key={key}>
                  <CustomImageUpload
                    images={images}
                    onChange={onChange}
                    label={modifyM[key].label}
                    labelWidth={4}
                    isHorizontal={true}
                    isRequired
                  />
                </div>
              );
          }
          return <></>;
        })
      ) : (
        <></>
      )} */}
      {/* </Form> */}
      {/* 
              <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary mr-2">
                <SaveOutlinedIcon style={iconStyle} /> Lưu
              </button>

              <Link to="/purchase-order">
                <button type="button" className="btn btn-outline-primary">
                  <CancelOutlinedIcon style={iconStyle} /> Hủy
                </button>
              </Link>
            </>
          )}
        </Formik>
      </CardBody>
    </Card> */}
    </>
  );
}

export default ModifyEntityPage;
