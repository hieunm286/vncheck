import React, { useEffect, Fragment, useState } from "react";
import * as Yup from "yup";
import { ModifyModel, SearchModel } from "../../../common-library/common-types/common-type";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { AgencyModel } from "../agency.model";
import validDataUrl from 'valid-data-url';


import { createIntl, createIntlCache } from 'react-intl';
import viMessage from '../../../layout/i18n/messages/vi.json';

const cache = createIntlCache();
const intl = createIntl({ locale: 'vi-VN', messages: viMessage, }, cache);

export const agencySearchModel: SearchModel = {
  code: {
    type: 'string',
    placeholder: 'AGENCY.MASTER.HEADER.AGENCY_CODE.PLACEHOLDER',
    label: 'AGENCY.MASTER.HEADER.AGENCY_CODE.LABEL',
    keyField: 'code'
  }, 
  name: {
    type: 'string',
    placeholder: 'AGENCY.MASTER.HEADER.AGENCY_NAME.PLACEHOLDER',
    label: 'AGENCY.MASTER.HEADER.AGENCY_NAME.LABEL',
    keyField: 'name'
  }, 
  storeLevel: {
    type: 'TreeSelect',
    placeholder: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL',
    label: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL',
    keyField: 'name'
  }, 
  address: {
    type: 'nested',
    data: {
      state: {
        type: 'string',
        placeholder: 'AGENCY.EDIT.PLACEHOLDER.STATE',
        label: 'AGENCY.EDIT.LABEL.STATE',
      },
      city: {
        type: 'string',
        placeholder: 'AGENCY.EDIT.PLACEHOLDER.CITY',
        label: 'AGENCY.EDIT.LABEL.CITY',
        keyField: 'name'
      },
      district: {
        type: 'string',
        placeholder: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT',
        label: 'AGENCY.EDIT.LABEL.DISTRICT',
        keyField: 'name'
      }
    }
  }, 
  
};



export const agencySchema = Yup.object<AgencyModel>().shape({
  // code: Yup.string().required('Vui lòng nhập mã đơn vị'),
  // agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
  // phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),

  code: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_CODE.REQUIRED'}))
    // .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_CODE.MAX_LENGTH_EXCEEDED'}))
    ,
  name: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_NAME.REQUIRED'}))
    .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_NAME.MAX_LENGTH_EXCEEDED'})),
  storeLevel: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.STORE_LEVEL.REQUIRED'}))
    .nullable(),
  state: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.STATE.REQUIRED'}))
    .nullable(),
  city: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.CITY.REQUIRED'}))
    .nullable(),
  district: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.DISTRICT.REQUIRED'}))
    .nullable(),
  detailAddress: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.ADDRESS.REQUIRED'})),
  // status: Yup.string()
  //   .required(intl.formatMessage({id: 'AGENCY.VALIDATION.STATUS.REQUIRED'})),
  phoneNumber: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.PHONE_NUMBER.REQUIRED'})),
  taxId: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.TAX_ID.REQUIRED'}))
    .max(100, intl.formatMessage({id: 'AGENCY.VALIDATION.TAX_ID.MAX_LENGTH_EXCEEDED'})),
  image: Yup.array()
    .nullable()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_IMAGE.REQUIRED'}))
    .test('is-correct-file', intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_IMAGE.REQUIRED'}), (files: any) => {return checkIfFilesAreCorrectType(files)}),


  username: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.USER_NAME.REQUIRED'}))
    .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.USER_NAME.MAX_LENGTH_EXCEEDED'})),
  ownerName: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.OWNER_NAME.REQUIRED'}))
    .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.OWNER_NAME.MAX_LENGTH_EXCEEDED'})),
  ownerPhoneNumber: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.OWNER_PHONE_NUMBER.REQUIRED'}))
    // .test('len', 'AGENCY.VALIDATION.OWNWER_PHONE_NUMBER.WRONG_EXACT_LENGTH', (val: any) => {return val.length !== null && val.length !== undefined && val.length === 10 }),
    ,
  email: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.EMAIL.REQUIRED'}))
    .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.EMAIL.MAX_LENGTH_EXCEEDED'})),
  // gender: Yup.string()
  //   .required(intl.formatMessage({id: 'AGENCY.VALIDATION.GENDER.REQUIRED'})),
  birthDay: Yup.date()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.BIRTHDAY.REQUIRED'}))
    .nullable(),
  roleName: Yup.string()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.ROLE_NAME.REQUIRED'}))
    .nullable(),
  avatar: Yup.array()
    .nullable()
    .required(intl.formatMessage({id: 'AGENCY.VALIDATION.AVATAR.REQUIRED'}))
    .test('is-correct-file', intl.formatMessage({id: 'AGENCY.VALIDATION.AVATAR.REQUIRED'}), (files: any) => {return checkIfFilesAreCorrectType(files)}),
});

function checkIfFilesAreCorrectType(files: any): boolean {
  let valid = false
  if (files) {
    files.map((file : any) => {
      // if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      //   valid = false
      // }
      if(file.data_url && validDataUrl(file.data_url)) {
        valid = true
      }
    })
  }
  return valid
}

export const oldModifyModel: ModifyModel = {
  code: {
    type: 'string',
    placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
    label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
  },
  name: {
    type: 'string',
    placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
    label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
  },
  phone: {
    type: 'string',
    placeholder: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
    label: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
  },
  status: {
    type: 'string',
    placeholder: 'AGENCY.MASTER.TABLE.STATUS_COLUMN',
    label: 'AGENCY.MASTER.TABLE.STATUS_COLUMN'
  },
  taxId: {
    type: 'string',
    placeholder: 'AGENCY.MASTER.TABLE.TAXID_COLUMN',
    label: 'AGENCY.MASTER.TABLE.TAXID_COLUMN'
  },
  type: {
    type: 'string',
    placeholder: 'AGENCY.MASTER.TABLE.AGENCY_TYPE',
    label: 'AGENCY.MASTER.TABLE.AGENCY_TYPE'
  },
  // owner: "5f8aae8710bd6f1624b533c7",
  "owner.username": {
    type: 'string',
    placeholder: 'AGENCY.MASTER.TABLE.OWNER',
    label: 'AGENCY.MASTER.TABLE.OWNER'
  },
  // shippingAddress: [],
  shippingAddress:  {
    type: 'string',
    placeholder: 'AGENCY.MASTER.TABLE.SHIPING_ADDRESS',
    label: 'AGENCY.MASTER.TABLE.SHIPPING_ADDRESS'
  },
  imagePath: {
    type: 'string',
    placeholder: 'PURCHASE_ORDER.MASTER.TABLE.IMAGE_PATH',
    label: 'PURCHASE_ORDER.MASTER.TABLE.IMAGE_PATH',
  },
  address: {
    type: 'string',
    placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
  },

};

export const masterEntityDetailDialog = [
  {
    header: 'AGENCY.MASTER.HEADER.AGENCY_INFO',
    data: [
      { keyField: 'code', title: 'AGENCY.VIEW.LABEL.AGENCY_CODE' },
      { keyField: 'name', title: 'AGENCY.VIEW.LABEL.AGENCY_NAME' },
      { keyField: ['address.district', 'address.city', 'address.state'], title: 'AGENCY.VIEW.LABEL.AGENCY_ADDRESS' },
      { keyField: 'phone', title: 'AGENCY.VIEW.LABEL.PHONE' },
      // { keyField: 'taxId', title: 'AGENCY.VIEW.LABEL.AGENCY_NAME.TAX_ID' },
      { keyField: 'status', title: 'AGENCY.VIEW.LABEL.AGENCY_NAME.STATUS' },
      // { keyField: 'type.name', title: 'AGENCY_TYPE.MASTER.TABLE.NAME' },
      // { keyField: 'type.code', title: 'AGENCY_TYPE.MASTER.TABLE.CODE' },
    ]
  },
  {
    header: 'AGENCY.MASTER.HEADER.AGENCY_OWNER_INFO',
    data: [
      { keyField: 'owner.username', title: 'AGENCY.VIEW.LABEL.OWNER_NAME' },
      { keyField: 'owner.email', title: 'AGENCY.VIEW.LABEL.OWNER_EMAIL' },
      { keyField: 'owner.phone', title: 'AGENCY.VIEW.LABEL.OWNER_PHONE' },
    ]
  },
  {
    header: 'AGENCY.VIEW.LABEL.SHIPPING_ADDRESS',
    data: [
      { keyField: 'shippingAddress', title: 'AGENCY.VIEW.LABEL.SHIPPING_ADDRESS' },
    ]
  },  
  

];


export const allFormButton: any = {
  save: {
    role: 'submit',
    type: 'submit',
    linkto: undefined,
    className: 'btn btn-primary mr-2',
    label: intl.formatMessage({id: 'AGENCY.EDIT.BUTTON.SAVE'}),
    icon: <SaveOutlinedIcon />,
  },
  cancel: {
    role: 'popupButton',
    type: 'button',
    // linkto: '/agency',
    className: 'btn btn-outline-primary mr-2',
    label: intl.formatMessage({id: 'AGENCY.EDIT.BUTTON.CANCEL'}),
    icon: <CancelOutlinedIcon />,
  },
};


// const mock_entity: AgencyModel