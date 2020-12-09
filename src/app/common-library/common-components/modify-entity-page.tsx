import React, { useEffect, useState } from 'react';
import { ModifyModel } from '../common-types/common-type';
import { useIntl } from 'react-intl';
import { generateInitForm, getField, getNewImage, getOnlyFile } from '../helpers/common-function';
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
import { FormikRadioGroup } from '../forms/radio-group-field';
import { SwitchField } from '../forms/switch-field';
import { InfiniteSelectV2 } from '../forms/infinite-select-v2';
import { isArray } from 'lodash';

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
  values,
  tagData,
  entityForEdit
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
  values?: any;
  tagData?: any;
  entityForEdit?: any
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

  const renderForm = (value: any, prevKey: string) => {
    return (
      <>
        {Object.keys(value.data).map(key => {

          switch (value.data[key].type) {
            case 'string':
              return (
                <div className="mt-3" key={key}>
                  <Field
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    component={MainInput}
                    placeholder={
                      value.data[key].placeholder === ''
                        ? value.data[key].placeholder
                        : intl.formatMessage({ id: value.data[key].placeholder })
                    }
                    withFeedbackLabel
                    labelWidth={4}
                    isHorizontal
                    label={intl.formatMessage({ id: value.data[key].label })}
                    disabled={value.data[key].disabled}
                    required={value.data[key].required}
                  />
                </div>
              );
            case 'number':
              return (
                <div className="mt-3" key={`${key}`}>
                  <Field
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    type="number"
                    component={MainInput}
                    isHorizontal
                    withFeedbackLabel
                    labelWidth={4}
                    placeholder={intl.formatMessage({ id: value.data[key].placeholder })}
                    label={intl.formatMessage({ id: value.data[key].label })}
                    required={value.data[key].required}
                    disabled={value.data[key].disabled}
                  />
                </div>
              );
            // handle shippingAddress
            case 'array':
              const shippingAddresses = values[key];
              return shippingAddresses
                ? shippingAddresses.map((el: any, innerkey: any) => {
                    return (
                      <div className="mt-3" key={`${innerkey}`}>
                        <Field
                          name={key}
                          value={
                            shippingAddresses[innerkey].address +
                            ', ' +
                            shippingAddresses[innerkey].district +
                            ', ' +
                            shippingAddresses[innerkey].city +
                            ', ' +
                            shippingAddresses[innerkey].state
                          }
                          component={MainInput}
                          isHorizontal
                          withFeedbackLabel
                          labelWidth={4}
                          placeholder={intl.formatMessage({ id: value.data[key].placeholder })}
                          label={intl.formatMessage({ id: value.data[key].label })}
                          required={value.data[key].required}
                        />
                      </div>
                    );
                  })
                : console.log(shippingAddresses);
              break;
            case 'Datetime':
              return (
                <div className="mt-3" key={key}>
                  <DatePickerField
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    isHorizontal
                    label={intl.formatMessage({ id: value.data[key].label })}
                    labelWidth={4}
                    type="Datetime"
                    required={value.data[key].required}
                    disabled={value.data[key].disabled}
                  />
                </div>
              );
            case 'radioGroup':
              const _shippingAddresses = values['shippingAddress'];
              return _shippingAddresses ? (
                <FormikRadioGroup
                  ariaLabel="defaultShippingAddress"
                  name="defaultShippingAddress"
                  addresses={_shippingAddresses}
                />
              ) : (
                <></>
              );
            case 'image':
              return (
                <div className="mt-3" key={key}>
                  <CustomImageUpload
                    images={images[key]}
                    // onChange={(imageList: any, addUpdateIndex: any) => {
                    //   onChange(imageList, addUpdateIndex, key);
                    // }}
                    label={intl.formatMessage({ id: value.data[key].label })}
                    labelWidth={4}
                    isHorizontal={true}
                    required={value.data[key].required}
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                  />
                </div>
              );
            case 'boolean':
              return (
                <div className="mt-3" key={`${key}`}>
                  <Field
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    component={SwitchField}
                    isHorizontal
                    withFeedbackLabel
                    labelWidth={4}
                    placeholder={intl.formatMessage({ id: value.data[key].placeholder })}
                    label={intl.formatMessage({ id: value.data[key].label })}
                    required={value.data[key].required}
                  />
                </div>
              );

            case 'object':
              return (
                <div className="mt-3" key={key}>
                  {renderForm(value.data[key], prevKey ? `${prevKey}.${key}` : key)}
                  {/* {Object.keys(value.data[key].data).map(childKey => {
                          console.log(value.data[key].data[childKey].type)
                          switch (value.data[key].data[childKey].type) {
                            case 'string':
                              return (
                                <div className="mt-3" key={childKey}>
                                  <Field
                                    name={`${key}.${childKey}`}
                                    component={MainInput}
                                    placeholder={intl.formatMessage({ id: value.data[key].data[childKey].placeholder })}
                                    withFeedbackLabel
                                    labelWidth={4}
                                    isHorizontal
                                    label={intl.formatMessage({ id: value.data[key].data[childKey].placeholder })}
                                    disabled={value.data[key].data[childKey].disabled}
                                    required={value.data[key].data[childKey].required}
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
                                    placeholder={intl.formatMessage({ id: value.data[key].data[childKey].placeholder })}
                                    label={intl.formatMessage({ id: value.data[key].data[childKey].placeholder })}
                                    required={value.data[key].data[childKey].required}
                                  />
                                </div>
                              );
                          }
                        })} */}
                </div>
              );

            case 'SearchSelect':
              return (
                <div className="mt-3" key={key}>
                  <InfiniteSelect
                    label={intl.formatMessage({ id: value.data[key].label })}
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
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    placeholder={intl.formatMessage({ id: value.data[key].placeholder })}
                  />
                </div>
              );

            case 'SearchSelectV2':
              return (
                <div className="mt-3" key={key}>
                  <InfiniteSelectV2
                    label={intl.formatMessage({ id: value.data[key].label })}
                    isHorizontal={true}
                    value={value.data[key].fillField ? search[key][value.data[key].fillField] : search[key]}
                    onChange={(value: any) => {
                      setSearch({ ...search, [key]: value });
                      // setSearchTerm({
                      //   ...searchTerm,
                      //   [key]: searchM[key].ref ? value.value : value.label,
                      // });
                    }}
                    service={value.data[key].service}
                    keyField={value.data[key].keyField}
                    dataField={entityForEdit[value.data[key].rootField][value.data[key].keyField]}
                    display={value.data[key].display}
                    refs={value.data[key].ref}
                    additional={{
                      page: DefaultPagination.page,
                    }}
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    placeholder={intl.formatMessage({ id: value.data[key].placeholder })}
                  />
                </div>
              );

            case 'tag':
              const defaultTag = (getField(entityForEdit, prevKey ? `${prevKey}.${key}` : key))
              return (
                <div className="mt-3" key={key}>
                  <TagInput
                    label={intl.formatMessage({ id: value.data[key].label })}
                    isHorizontal={true}
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    handleChange={handleChangeTag}
                    isRequired
                    labelWidth={4}
                    disabled={value.data[key].disabled}
                    data={isArray(defaultTag) ? defaultTag : []}
                    tagData={tagData}
                    root={value.data[key].root}
                  />
                </div>
              );

            case 'gallery':
              return (
                <div className="mt-3" key={key}>
                  <ImgGallery
                    label={intl.formatMessage({ id: value.data[key].label })}
                    labelWidth={4}
                    name={prevKey !== '' ? `${prevKey}.${key}` : key}
                    isHorizontal
                    photos={[
                      {
                        src: 'https://source.unsplash.com/aZjw7xI3QAA/1144x763',
                        author: 'Nguyễn Minh Hiếu',
                        time: '26/09/2020 9:00',
                        location: `21°01'10.1"N 105°47'28.6"E`,
                        thumbnail: 'https://source.unsplash.com/aZjw7xI3QAA/100x67',
                      },
                      {
                        src: 'https://source.unsplash.com/c77MgFOt7e0/1144x763',
                        author: 'Nguyễn Minh Hiếu',
                        time: '26/09/2020 9:00',
                        location: `21°01'10.1"N 105°47'28.6"E`,
                        thumbnail: 'https://source.unsplash.com/c77MgFOt7e0/100x67',
                      },
                      {
                        src: 'https://source.unsplash.com/QdBHnkBdu4g/1144x763',
                        author: 'Nguyễn Minh Hiếu',
                        time: '26/09/2020 9:00',
                        location: `21°01'10.1"N 105°47'28.6"E`,
                        thumbnail: 'https://source.unsplash.com/QdBHnkBdu4g/100x67',
                      },
                    ]}
                  />
                </div>
              );
          }
          return <></>;
        })}
      </>
    );
  };

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
              {renderForm(value, '')}
            </div>
          ))}
      </div>
    </>
  );
}

export default ModifyEntityPage;
