import {ModifyModel, RenderInfoDetailDialog, SearchModel} from '../../../common-library/common-types/common-type';
import {GenerateAllFormField, getField} from '../../../common-library/helpers/common-function';
import {GetAll} from "../species.service";
import React from "react";

export const masterEntityDetailDialog: RenderInfoDetailDialog = [
  {
    data: {
      image: {
        formatter: (data) => (
          <img src={data ? data.path : ''} alt="rau" className="border border-primary" width="200px"
               height="200px"/>
        )
      }
    },
    className: 'col-5 d-flex justify-content-center align-items-center ml-10',
    dataClassName: 'd-flex',
  },
  {
    data: {
      code: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.CODE'},
      name: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.NAME'},
      barcode: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.BARCODE'},
      growingDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW'},
      plantingDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING'},
      expiryDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY'},
    },
    className: 'col-6',
  },
];

export const productTypeSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
  },
  name: {
    type: 'string',
    label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
  },
};


export const modifyModel: any = [
  {
    title: 'THÔNG TIN CHUNG',
    data: {
      code: {
        type: 'string',
        label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
        required: true,
        disabled: true,
      },
      name: {
        type: 'string',
        required: true,
        label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      },
      barcode: {
        type: 'string',
        required: true,
        label: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
      },
      images: {
        type: 'image',
        // value: null,
        label: 'PRODUCT_TYPE.MASTER.IMAGE',
        multiple: false
      },
      // avatar: {
      //   type: 'image',
      //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      //   label: 'Album 2',
      // },
    },
  },
  {
    title: 'THÔNG TIN VÒNG ĐỜI',
    data: {
      growingDays: {
        type: 'number',
        label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
      },
      plantingDays: {
        type: 'number',
        label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
      },
      expiryDays: {
        type: 'number',
        label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
      },
    },
  },
];

export const models: any = {
  header: 'CHỦNG LOẠI',
  form_1: {
    title: '',
    modifyModel: modifyModel,
  },
};

export const allFormField: any = {
  ...GenerateAllFormField(modifyModel),
};

interface FieldProp {
  field: string;
  ref?: { prop: string; key: string };
}

export const ConvertProductionPlan = (entity: any, keyField?: FieldProp[]) => {
  if (!entity) return;
  
  const convertEntity = {...entity};
  
  if (keyField && keyField.length > 0) {
    keyField.forEach(({field, ref}: FieldProp) => {
      if (ref && convertEntity[ref.prop]) {
        convertEntity[field] = {
          label: getField(convertEntity[ref.prop], ref.key),
          value: entity._id,
        };
      } else {
        convertEntity[field] = {label: convertEntity[field], value: entity._id};
      }
    });
    
    return convertEntity;
  }
  
  return convertEntity;
};
