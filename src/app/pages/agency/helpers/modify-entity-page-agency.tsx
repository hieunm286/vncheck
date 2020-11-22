import React, { useEffect, useState } from 'react';
import { ModifyModel } from '../../../common-library/common-types/common-type';
import { useIntl } from 'react-intl';
import { generateInitForm, getNewImage, getOnlyFile } from '../../../common-library/helpers/common-function';
import { Field, Form, Formik } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../../../common-library/forms/main-input';
import { DefaultPagination, iconStyle } from '../../../common-library/common-consts/const';
import { Link, useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../../../common-library/forms/custom-image-upload';
import { uploadImage } from '../../purchase-order/purchase-order.service';
import { Card, CardBody } from '../../../common-library/card';
import { DatePickerField } from '../../../common-library/forms/date-picker-field';
import { Switch } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { InfiniteSelect } from '../../../common-library/forms/infinite-select';
import TagInput from '../../../common-library/forms/tag-input';
import ImgGallery from '../../../common-library/forms/image-gallery';
import { FormikRadioGroup } from '../../../common-library/forms/radio-group-field';
import FormTemplate from './form-template';

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

function ModifyEntityPageAgency<T>({
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

    console.log(keyField);
    console.log(key);

    // const entities = await service.GetAll({ queryProps, paginationProps });
    // const count = await service.Count({ queryProps });

    // const hasMore = prevOptions.length < count.data - (DefaultPagination.limit ?? 0);

    // // setSearchTerm({ ...searchTerm, [key]: search });

    const data = [...new Set(dataT)];

    return {
      options: data.map((e: any) => {
        console.log(e);
        return { label: e[keyField], value: e._id };
      }),
      hasMore: false,
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
                <FormTemplate 
                  values={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel}
                  column={column}
                  value={value}
                />
            </div>
          ))}
      </div>
    </>
  );
}

export default ModifyEntityPageAgency;
