import { SearchModel } from '../../../common-library/common-types/common-type';
import {
  GenerateAllFormField,
  
} from '../../../common-library/helpers/common-function';
import { ProductTypeModifyModelDetail } from '../product-type.model';
import * as ProductTypeService from '../product-type.service';

export const masterEntityDetailDialog = [
    {
      header: 'THÔNG TIN 1',
      data: {
        code: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.CODE' },
        name: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.NAME' },
        barcode: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.BARCODE' },
        growingDays: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' },
        plantingDays: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' },
        expiryDays: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY' },
      },
    },
  ];

  export const productTypeSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      service: ProductTypeService,
      keyField: 'code',
    },
    name: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      service: ProductTypeService,
      keyField: 'name',
    },
  };

  export const modifyModel: ProductTypeModifyModelDetail[] = [
    {
      title: 'THÔNG TIN CHUNG',
      data: {
        code: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
          required: true,
          disabled: true,
        },
        name: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
        },
        barcode: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          required: true,
          label: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
        },
        image: {
          type: 'image',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Album 1',
        },
        image2: {
          type: 'image',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Album 2',
        },
      },
    },
    {
      title: 'THÔNG TIN VÒNG ĐỜI',
      data: {
        growingDays: {
          type: 'number',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        },
        plantingDays: {
          type: 'number',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
        },
        expiryDays: {
          type: 'number',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
        },
      },
    },
  ];

  export const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
      header: 'CHỦNG LOẠI',
    },
  };

  export const allFormField: any = {
    ...GenerateAllFormField(modifyModel),
  };
 