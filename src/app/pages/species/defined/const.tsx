import { SearchModel } from '../../../common-library/common-types/common-type';
import { GenerateAllFormField, getField } from '../../../common-library/helpers/common-function';
import { ProductTypeModifyModelDetail } from '../species.model';
import {GetAll} from "../species.service";

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
    onSearch: GetAll,
    keyField: 'code',
  },
  name: {
    type: 'string',
    placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
    label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
    onSearch: GetAll,
    keyField: 'name',
  },
};

export const modifyModel: ProductTypeModifyModelDetail[] = [
  {
    title: 'THÔNG TIN CHUNG',
    data: {
      code: {
        type: 'string',
        placeholder: '',
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
      images: {
        type: 'image',
        placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
        label: 'Album 1',
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

interface FieldProp {
  field: string;
  ref?: { prop: string; key: string };
}

export const ConvertProductionPlan = (entity: any, keyField?: FieldProp[]) => {
  if (!entity) return;

  const convertEntity = { ...entity };

  if (keyField && keyField.length > 0) {
    keyField.forEach(({ field, ref }: FieldProp) => {
      if (ref && convertEntity[ref.prop]) {
        convertEntity[field] = {
          label: getField(convertEntity[ref.prop], ref.key),
          value: entity._id,
        };
      } else {
        convertEntity[field] = { label: convertEntity[field], value: entity._id };
      }
    });

    return convertEntity;
  }

  return convertEntity;
};
