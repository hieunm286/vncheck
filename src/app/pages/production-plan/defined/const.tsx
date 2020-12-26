import {
  ModifyForm,
  ModifyPanel,
  SearchModel,
} from '../../../common-library/common-types/common-type';
import { GenerateAllFormField } from '../../../common-library/helpers/common-function';
import * as ProductPackagingService from '../../product-packaging/product-packaging.service';
import * as SpeciesService from '../../species/species.service';
import * as Yup from 'yup';

import '../style/production-plan.scss';
import _ from 'lodash';
import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { ProductPackagingModel } from '../../product-packaging/product-packaging.model';
import store from '../../../../redux/store';

export const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
export const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
export const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
export const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
export const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
export const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
export const homeURL = `${window.location.pathname}`;
const Fix = ({ title }: { title: string }) => {
  const intl = useIntl();
  return <div style={{ minWidth: 174 }}>{intl.formatMessage({ id: title })}</div>;
};

const { users } = store.getState();

const userData = users.entities

export const productPlanSearchModel1: SearchModel = {
  seedingCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.SEEDING_CODE',
  },
  plantCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PLANT_CODE',
  },
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    onSearch: SpeciesService.GetAll,
    keyField: 'name',
  },
  estimatedHarvestTime: {
    type: 'date-time',
    name: 'planting.estimatedHarvestTime',
    label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
  },
};

export const productPlanSearchModel2: SearchModel = {
  seedingCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    keyField: 'planCode',
  },
  plantCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.SEEDING_CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    keyField: 'plantCode',
  },
  growCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PLANT_CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    keyField: 'growCode',
  },
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    onSearch: SpeciesService.GetAll,
    keyField: 'name',
  },
  estimatedHarvestTime: {
    type: 'date-time',
    name: 'planting.estimatedHarvestTime',
    label: 'PRODUCTION_PLAN.HARVEST_DATE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
  },
};

export const modifyModel: ModifyPanel = {
  _title: '',
  commonInfo: {
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    code: {
      _type: 'string',
      // placeholder: 'Mã kế hoạch',
      label: 'Mã kế hoạch',
      required: true,
      disabled: true,
    },
    seeding: {
      _type: 'object',
      code: {
        _type: 'string',
        // placeholder: 'Mã gieo giống',
        required: true,
        label: 'Mã gieo giống',
        disabled: true,
      },
      certificates: {
        _type: 'object',
        path: {
          _type: 'string',
          // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Giấy chứng nhận giống',
          required: true,
          disabled: true,
        },
      },
      buyInvoice: {
        _type: 'object',
        path: {
          _type: 'string',
          // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Hóa đơn mua hàng',
          required: true,
          disabled: true,
        },
      },
      seedingTime: {
        _type: 'date-time',
        // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
        required: true,
        label: 'Thời gian gieo',
        disabled: true,
      },
      landLot: {
        _type: 'object',
        code: {
          _type: 'string',
          // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          required: true,
          label: 'Lô gieo ươm',
          disabled: true,
        },
        // bill: {
        //   type: 'string',
        //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
        //   label: 'Hóa đơn mua hàng',
        //   disabled: true,
        // },
      },
    },
    planting: {
      _type: 'object',
      code: {
        _type: 'string',
        // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
        required: true,
        label: 'Mã gieo trồng',
        disabled: true,
      },
      estimatedPlantingTime: {
        _type: 'date-time',
        // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
        label: 'Thời gian trồng',
        disabled: true,
        required: true,
      },
      landLot: {
        _type: 'object',
        code: {
          type: 'string',
          // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          required: true,
          label: 'Lô gieo trồng',
          disabled: true,
        },
      },
    },

    // plantTime: {
    //   type: 'string',
    //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    //   label: 'Thời gian gieo',
    //   disabled: true,
    // },
  },
  masterInfo: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    seeding: {
      _type: 'object',
      species: {
        _type: 'object',
        name: {
          _type: 'string',
          // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tên chủng loại',
          disabled: true,
          required: true,
        },
        barcode: {
          _type: 'string',
          // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'GTIN',
          disabled: true,
          required: true,
        },
      },
      area: {
        _type: 'string',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
        label: 'Diện tích gieo ươm',
        disabled: true,
        required: true,
      },
      numberOfSeed: {
        _type: 'string',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
        label: 'Số cây con giống',
        disabled: true,
        required: true,
      },
      farmLocation: {
        _type: 'object',
        coordinates: {
          _type: 'string',
          // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Địa chỉ farm giống',
          disabled: true,
          required: true,
        },
      },
    },
    planting: {
      _type: 'object',
      area: {
        _type: 'string',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
        label: 'Diện tích gieo trồng',
        disabled: true,
        required: true,
      },
      numberOfPlants: {
        _type: 'string',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
        label: 'Số cây con trồng',
        disabled: true,
        required: true,
      },
      farmLocation: {
        _type: 'object',
        coordinates: {
          _type: 'string',
          // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Địa chỉ farm trồng',
          disabled: true,
          required: true,
        },
      },
    },
  },
};

export const modifyModel2: ModifyPanel = {
  _title: '',
  managementInfo: {
    _subTitle: 'THÔNG TIN QUẢN TRỊ',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    seeding: {
      _type: 'object',
      manager: {
        _type: 'object',
        fullName: {
          _type: 'string',
          // placeholder: 'Mã gieo giống',
          label: 'Thông tin Giám đốc/TGĐ',
          required: true,
          disabled: true,
        },
      },
      leader: {
        _type: 'object',
        lastName: {
          _type: 'tag',
          // placeholder: 'Mã gieo giống',
          required: true,
          label: 'Tổ trưởng gieo giống',
          disabled: true,
        },
      },
    },
  },
  seedingInfo: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    planting: {
      _type: 'object',
      manager: {
        _type: 'object',
        fullName: {
          _type: 'string',
          // placeholder: 'Mã gieo giống',
          label: 'Người lập kế hoạch',
          required: true,
          disabled: true,
        },
      },
      leader: {
        _type: 'object',
        lastName: {
          _type: 'tag',
          // placeholder: 'Mã gieo giống',
          required: true,
          label: 'Tổ trưởng gieo trồng',
          disabled: true,
        },
      },
    },
  },
};

export const modifyModel3: ModifyPanel = {
  _title: '',
  group1: {
    _subTitle: 'THÔNG TIN THU HOẠCH',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    planting: {
      _type: 'object',
      estimatedHarvestTime: {
        _type: 'date-time',
        label: 'Thời gian thu hoạch (dự kiến)',
        required: true,
        disabled: true,
      },
    },
    harvesting: {
      _type: 'object',
      quantity: {
        _type: 'number',
        // placeholder: 'Mã gieo giống',
        required: true,
        label: 'Sản lượng thu hoạch dự kiến (kg)',
        disabled: true,
      },
    },
  },
  group2: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    harvesting: {
      _type: 'object',
      technical: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Nhân viên kỹ thuật thu hoạch',
        tagData: userData,
        required: true,
        process: '2',
      },
      leader: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Tổ trưởng thu hoạch',
        required: true,
        process: '2',
      },
    },
  },
};

export const modifyModel4: ModifyPanel = {
  _title: '',
  group1: {
    _subTitle: 'THÔNG TIN SƠ CHẾ',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    preliminaryTreatment: {
      _type: 'object',
      estimatedTime: {
        _type: 'date-time',
        // placeholder: 'Mã gieo giống',
        label: 'Thời gian sơ chế (dự kiến)',
        process: '3',
      },
      estimatedQuantity: {
        _type: 'number',
        // placeholder: 'Mã gieo giống',
        label: 'Sản lượng sau sơ chế dự kiến (kg)',
        process: '3',
      },
    },
  },
  group2: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    preliminaryTreatment: {
      _type: 'object',
      technical: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        tagData: userData,
        label: 'Nhân viên kỹ thuật sơ chế',
        process: '3',
      },
      leader: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Tổ trưởng sơ chế',
        process: '3',
      },
    },
  },
};

export const modifyModel5: ModifyPanel = {
  _title: '',
  cleaning: {
    _subTitle: 'THÔNG TIN LÀM SẠCH',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    cleaning: {
      _type: 'object',
      estimatedTime: {
        _type: 'date-time',
        // placeholder: 'Mã gieo giống',
        label: 'Thời gian làm sạch (dự kiến)',
        process: '4',
      },
      estimatedQuantity: {
        _type: 'number',
        // placeholder: 'Mã gieo giống',
        label: 'Sản lượng sau làm sạch dự kiến (kg)',
        process: '4',
      },
    },
  },
  cleaningInfo: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    cleaning: {
      _type: 'object',
      technical: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Nhân viên kỹ thuật làm sạch',
        root: 'cleaning',
        process: '4',
      },
      leader: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Tổ trưởng làm sạch',
        root: 'cleaning',
        process: '4',
      },
    },
  },
};

export const modifyModel6: ModifyPanel = {
  _title: '',
  group1: {
    _subTitle: 'THÔNG TIN ĐÓNG GÓI',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    packing: {
      _type: 'object',
      estimatedTime: {
        _type: 'date-time',
        // placeholder: 'Mã gieo giống',
        label: 'Thời gian đóng gói (dự kiến)',
        process: '5',
      },
      estimatedExpireTimeStart: {
        _type: 'date-time',
        // placeholder: 'Hạn sử dụng',
        label: 'Hạn sử dụng bắt đầu (dự kiến)',
        process: '5',
      },
      estimatedExpireTimeEnd: {
        _type: 'date-time',
        // placeholder: 'Hạn sử dụng',
        label: 'Hạn sử dụng kết thúc (dự kiến)',
        process: '5',
      },
      packing: {
        _type: 'search-select',
        // placeholder: 'Quy cách',
        label: 'Quy cách đóng gói',
        onSearch: ProductPackagingService.GetAll,
        keyField: 'weight',
        // onDisplayOptions: (e:ProductPackagingModel)=> e.species.weight,
        // rootField: 'seeding',
        // fillField: 'packing',
        // display: 'weight',
      },
    },
  },
  group2: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    packing: {
      _type: 'object',
      estimatedQuantity: {
        _type: 'number',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Số lượng đóng gói dự kiến',
        process: '5',
      },
      technical: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
        label: 'KCS',
        process: '5',
      },
      leader: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
        label: 'Tổ trưởng đóng gói',
        process: '5',
      },
    },
  },
};

export const modifyModel7: ModifyPanel = {
  _title: '',
  group1: {
    _subTitle: 'THÔNG TIN BẢO QUẢN',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    preservation: {
      _type: 'object',
      estimatedStartTime: {
        _type: 'date-time',
        // placeholder: 'Mã gieo giống',
        label: 'Thời gian bắt đầu bảo quản (dự kiến)',
        process: '6',
      },
      estimatedEndTime: {
        _type: 'date-time',
        // placeholder: 'Mã gieo giống',
        label: 'Thời gian kết thúc bảo quản (dự kiến)',
        process: '6',
      },
    },
  },
  group2: {
    _subTitle: '\u00A0',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    preservation: {
      _type: 'object',
      technical: {
        _type: 'tag',
        // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Nhân viên kỹ thuật bảo quản',
        process: '6',
      },
    },
  },
};

export const updateForm: ModifyForm = {
  _header: 'test',
  panel1: modifyModel,
  panel2: modifyModel2,
  panel3: modifyModel3,
  panel4: modifyModel4,
  panel5: modifyModel5,
  panel6: modifyModel6,
  panel7: modifyModel7,
};

export const formPart = {
  form_1: {
    title: '',
    modifyModel: modifyModel,
    header: 'KẾ HOẠCH',
  },
  form_2: {
    title: '',
    modifyModel: modifyModel2,
  },
  form_3: {
    title: '',
    keyField: 'harvesting',
    modifyModel: modifyModel3,
  },
  form_4: {
    title: '',
    keyField: 'preliminaryTreatment',
    modifyModel: modifyModel4,
  },
  form_5: {
    title: '',
    keyField: 'cleaning',
    modifyModel: modifyModel5,
  },
  form_6: {
    title: '',
    keyField: 'packing',
    modifyModel: modifyModel6,
  },
  form_7: {
    title: '',
    keyField: 'preservation',
    modifyModel: modifyModel7,
  },
};

export const allFormField: any = {
  ...GenerateAllFormField(
    modifyModel,
    modifyModel2,
    modifyModel3,
    modifyModel4,
    modifyModel5,
    modifyModel6,
    modifyModel7,
  ),
};

export const PlantingDetailDialog = [
  {
    header: 'THÔNG TIN CHUNG',
    data: [
      [
        {
          type: 'link',
          title: 'Mã gieo giống',
          keyField: 'seeding.code',
          path: '/production-plan/seeding',
          params: '_id',
        },
        {
          type: 'string',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
        },
        {
          type: 'date-time',
          title: 'Thời gian gieo trồng dự kiến',
          keyField: 'planting.estimatedPlantingTime',
        },
        {
          type: 'date-time',
          title: 'Thời gian thu hoạch dự kiến',
          keyField: 'planting.estimatedHarvestTime',
        },
        {
          type: 'string',
          title: 'Lô gieo trồng',
          keyField: 'planting.landLot.code',
          convertFn: (t: any) => t.toUpperCase(),
        },
        {
          type: 'string',
          title: 'Địa điểm Farm trồng',
          keyField: 'planting.farmLocation.[coordinates]',
        },
      ],
      [
        {
          type: 'string',
          title: 'Tên chủng loại',
          keyField: 'planting.species.name',
        },
        {
          type: 'string',
          title: 'GTIN',
          keyField: 'planting.species.barcode',
        },
        {
          type: 'string',
          title: 'Diện tích gieo trồng',
          keyField: 'planting.area',
        },
        {
          type: 'string',
          title: 'Số cây con đã trồng',
          keyField: 'planting.numberOfPlants',
        },
        {
          type: 'string',
          title: 'Sản lượng dự kiến',
          keyField: 'planting.expectedQuantity',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN MÔI TRƯỜNG',
    data: [
      [
        {
          type: 'string',
          title: 'Nhiệt độ',
          keyField: 'planting.temperature',
        },
        {
          type: 'string',
          title: 'Độ ẩm',
          keyField: 'planting.humidity',
        },
        {
          type: 'string',
          title: 'Độ xốp',
          keyField: 'planting.porosity',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    data: [
      [
        {
          type: 'string',
          title: 'Thông tin Giám đốc/TGĐ',
          keyField: 'planting.manager.lastName',
        },
        {
          type: 'string',
          title: 'Tổ trưởng gieo trồng',
          keyField: 'planting.[leader].lastName',
        },
        {
          type: 'string',
          title: 'Công nhân gieo trồng',
          keyField: 'planting.[worker].lastName',
        },
      ],
    ],
  },
  {
    header: 'HÌNH ẢNH',
    data: [
      [
        {
          type: 'image',
          title: 'Hình ảnh trước nuôi trồng',
          keyField: 'planting.imageBefore',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh sau nuôi trồng',
          keyField: 'planting.imageAfter',
        },
      ],
    ],
  },
];

export const SeedingDetailDialog = [
  {
    header: 'THÔNG TIN CHUNG',
    data: [
      [
        {
          type: 'string',
          title: 'Mã gieo giống',
          keyField: 'seeding.code',
        },
        {
          type: 'image',
          title: 'Giấy chứng nhận giống',
          keyField: 'seeding.certificates',
        },
        {
          type: 'image',
          title: 'Hóa đơn mua giống',
          keyField: 'seeding.buyInvoice',
        },
        {
          type: 'date-time',
          title: 'Thời gian xuống giống',
          keyField: 'seeding.seedingTime',
        },
        {
          type: 'date-time',
          title: 'Thời gian trồng dự kiến',
          keyField: 'seeding.estimatedPlantingTime',
        },
        {
          type: 'string',
          title: 'Lô gieo ươm',
          keyField: 'seeding.landLot.code',
          convertFn: (t: any) => t.toUpperCase(),
        },
      ],
      [
        {
          type: 'string',
          title: 'Địa điểm Farm giống',
          keyField: 'seeding.farmLocation.[coordinates]',
        },
        {
          type: 'string',
          title: 'Tên chủng loại',
          keyField: 'seeding.species.name',
        },
        {
          type: 'string',
          title: 'GTIN',
          keyField: 'seeding.species.barcode',
        },
        {
          type: 'string',
          title: 'Diện tích gieo ươm giống',
          keyField: 'seeding.area',
        },
        {
          type: 'string',
          title: 'Số cây con giống',
          keyField: 'seeding.numberOfSeed',
        },
        {
          type: 'string',
          title: 'Sản lượng dự kiến',
          keyField: 'seeding.expectedQuantity',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN MÔI TRƯỜNG',
    data: [
      [
        {
          type: 'string',
          title: 'Nhiệt độ',
          keyField: 'planting.temperature',
          convertFn: (t: string) => t + '°C',
        },
        {
          type: 'string',
          title: 'Độ ẩm',
          keyField: 'planting.humidity',
          convertFn: (t: string) => t + '%',
        },
        {
          type: 'string',
          title: 'Độ xốp',
          keyField: 'planting.porosity',
          convertFn: (t: string) => t + '%',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    data: [
      [
        {
          type: 'string',
          title: 'Thông tin Giám đốc/TGĐ',
          keyField: 'planting.manager.lastName',
        },
        {
          type: 'string',
          title: 'Tổ trưởng gieo trồng',
          keyField: 'planting.[leader].lastName',
          separator: ', ',
        },
        {
          type: 'string',
          title: 'Công nhân gieo trồng',
          keyField: 'planting.[worker].lastName',
        },
      ],
    ],
  },
  {
    header: 'HÌNH ẢNH',
    data: [
      [
        {
          type: 'image',
          title: 'Hình ảnh định vị lô luống',
          keyField: 'seeding.landLotImage',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh trước khi đưa vào nuôi trồng',
          keyField: 'planting.imageAfter',
        },
      ],
    ],
  },
];

export const masterEntityDetailDialog2 = [
  {
    header: 'THÔNG TIN CHUNG',
    data: [
      [
        {
          type: 'string',
          title: 'Mã kế hoạch',
          keyField: 'code',
        },
        {
          type: 'string',
          title: 'Mã gieo giống',
          keyField: 'seeding.code',
        },
        {
          type: 'string',
          title: 'Giấy chứng nhận giống',
          keyField: 'seeding.certificates.path',
        },
        {
          type: 'string',
          title: 'Hóa đơn mua hàng',
          keyField: 'seeding.buyInvoice.path',
        },
        {
          type: 'date-time',
          title: 'Thời gian gieo',
          keyField: 'seeding.seedingTime',
        },
        {
          type: 'string',
          title: 'Lô gieo ươm',
          keyField: 'seeding.landLot.code',
        },
        {
          type: 'string',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
        },
        {
          type: 'data-time',
          title: 'Thời gian trồng',
          keyField: 'planting.estimatedPlantingTime',
        },
        {
          type: 'string',
          title: 'Lô gieo trồng',
          keyField: 'planting.landLot.code',
        },
      ],
      [
        {
          type: 'string',
          title: 'Tên chủng loại',
          keyField: 'seeding.species.name',
        },
        {
          type: 'string',
          title: 'GTIN',
          keyField: 'seeding.species.barcode',
        },
        {
          type: 'string',
          title: 'Diện tích gieo ươm',
          keyField: 'seeding.area',
        },
        {
          type: 'string',
          title: 'Số cây con giống',
          keyField: 'seeding.numberOfSeed',
        },
        {
          type: 'string',
          title: 'Địa chỉ farm giống',
          keyField: 'seeding.farmLocation.[coordinates]',
        },
        {
          type: 'string',
          title: 'Diện tích gieo trồng',
          keyField: 'planting.area',
        },
        {
          type: 'string',
          title: 'Số cây con trồng',
          keyField: 'planting.numberOfPlants',
        },
        {
          type: 'string',
          title: 'Địa chỉ farm trồng',
          keyField: 'planting.farmLocation.[coordinates]',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    data: [
      [
        {
          type: 'string',
          title: 'Thông tin Giám đốc/TGĐ',
          keyField: 'seeding.manager.fullName',
        },
        {
          type: 'array',
          title: 'Tổ trưởng gieo giống',
          keyField: 'seeding.leader',
          target: 'fullName',
        },
      ],
      [
        {
          type: 'string',
          title: 'Người lập kế hoạch',
          keyField: 'planting.manager.fullName',
        },
        {
          type: 'array',
          title: 'Tổ trưởng gieo trồng',
          keyField: 'planting.leader',
          target: 'fullName',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN THU HOẠCH',
    data: [
      [
        {
          type: 'date-time',
          title: 'Thời gian thu hoạch (dự kiến)',
          keyField: 'planting.estimatedHarvestTime',
        },
        {
          type: 'string',
          title: 'Sản lượng thu hoạch (dự kiến)',
          keyField: 'planting.expectedQuantity',
        },
      ],
      [
        {
          type: 'array',
          title: 'Nhân viên kĩ thuật thu hoạch',
          keyField: 'harvesting.technical',
          target: 'user.lastName',
        },
        {
          type: 'array',
          title: 'Tổ trưởng thu hoạch',
          keyField: 'harvesting.leader',
          target: 'user.lastName',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN SƠ CHẾ',
    data: [
      [
        {
          type: 'date-time',
          title: 'Thời gian sơ chế (dự kiến)',
          keyField: 'preliminaryTreatment.estimatedTime',
        },
        {
          type: 'string',
          title: 'Sản lượng sau sơ chế dự kiến (kg)',
          keyField: 'preliminaryTreatment.estimatedQuantity',
        },
      ],
      [
        {
          type: 'array',
          title: 'Nhân viên kĩ thuật sơ chế',
          keyField: 'preliminaryTreatment.technical',
          target: 'user.lastName',
        },
        {
          type: 'array',
          title: 'Tổ trưởng sơ chế',
          keyField: 'preliminaryTreatment.leader',
          target: 'user.lastName',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN LÀM SẠCH',
    data: [
      [
        {
          type: 'date-time',
          title: 'Thời gian làm sạch (dự kiến)',
          keyField: 'cleaning.estimatedTime',
        },
        {
          type: 'string',
          title: 'Sản lượng sau làm sạch dự kiến (kg)',
          keyField: 'cleaning.estimatedQuantity',
        },
      ],
      [
        {
          type: 'array',
          title: 'Nhân viên kĩ thuật làm sạch',
          keyField: 'cleaning.technical',
          target: 'user.lastName',
        },
        {
          type: 'array',
          title: 'Tổ trưởng làm sạch',
          keyField: 'cleaning.leader',
          target: 'user.lastName',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN ĐÓNG GÓI',
    data: [
      [
        {
          type: 'date-time',
          title: 'Thời gian đóng gói (dự kiến)',
          keyField: 'packing.estimatedTime',
        },
        {
          type: 'date-time',
          title: 'Hạn sử dụng bắt đầu (dự kiến)',
          keyField: 'packing.estimatedExpireTimeStart',
        },
        {
          type: 'date-time',
          title: 'Hạn sử dụng kết thúc (dự kiến)',
          keyField: 'packing.estimatedExpireTimeEnd',
        },
        {
          type: 'string',
          title: 'Quy cách đóng gói',
          keyField: 'packing.packing.weight',
        },
      ],
      [
        {
          type: 'string',
          title: 'Số lượng đóng gói dự kiến',
          keyField: 'packing.estimatedQuantity',
        },
        {
          type: 'array',
          title: 'KCS',
          keyField: 'packing.technical',
          target: 'user.lastName',
        },
        {
          type: 'array',
          title: 'Tổ trưởng đóng gói',
          keyField: 'packing.leader',
          target: 'user.lastName',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN BẢO QUẢN',
    data: [
      [
        {
          type: 'date-time',
          title: 'Thời gian bắt đầu bảo quản (dự kiến)',
          keyField: 'preservation.estimatedStartTime',
        },
        {
          type: 'date-time',
          title: 'Thời gian kết thúc bảo quản (dự kiến)',
          keyField: 'preservation.estimatedEndTime',
        },
      ],
      [
        {
          type: 'array',
          title: 'Nhân viên kĩ thuật bảo quản',
          keyField: 'preservation.technical',
          target: 'user.lastName',
        },
      ],
    ],
  },
];

export const addInitField = (obj1: any, obj2: any) => {
  const rs = { ...obj1 };

  Object.keys(obj2).forEach(key => {
    if (rs[key]) {
      Object.keys(obj2[key]).forEach(keys => {
        if (!rs[key][keys]) {
          rs[key][keys] = obj2[key][keys];
        }
      });
    }
  });

  return rs;
};

export const initProductPlanForm = {
  preliminaryTreatment: {
    estimatedTime: null,
    estimatedQuantity: undefined,
  },
  cleaning: {
    estimatedTime: null,
    estimatedQuantity: undefined,
  },
  packing: {
    estimatedTime: null,
    estimatedExpireTimeStart: null,
    estimatedExpireTimeEnd: null,
    estimatedQuantity: undefined,
  },
  preservation: {
    estimatedStartTime: null,
    estimatedEndTime: null,
  },
};

export const halfValidate = {
  estimatedHarvestTime: Yup.mixed(),
  expectedQuantity: Yup.number(),
  technical: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.expectedQuantity > 0 &&
        this.parent.estimatedHarvestTime &&
        value.length > 0) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        this.parent.expectedQuantity > 0 &&
        this.parent.estimatedHarvestTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedHarvestTime &&
        value.length > 0) ||
      ((!this.parent.technical || this.parent.technical.length === 0) &&
        this.parent.expectedQuantity > 0 &&
        this.parent.estimatedHarvestTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const CompareDate = (date1: Date, date2: Date) => {
  if (!_.isDate(date1) || !_.isDate(date2)) return false;
  return date1.getTime() > date2.getTime();
};

export const validate = {
  estimatedTime: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        value &&
        CompareDate(new Date(value), new Date())) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        !value) ||
      (value && CompareDate(new Date(value), new Date()))
    );
  }),
  estimatedQuantity: Yup.number().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedTime &&
        value > 0) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!value || value === 0)) ||
      (value && value > 0)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    console.log(value);
    return (
      (this.parent.leader.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedTime &&
        value.length > 0) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedTime &&
        value.length > 0) ||
      ((!this.parent.technical || this.parent.technical.length === 0) &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const packingValidate = {
  estimatedTime: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedExpireTimeStart &&
        this.parent.estimatedExpireTimeEnd &&
        this.parent.packing &&
        // _.isString(this.parent.packing) &&
        // this.parent.packing !== '' &&
        value &&
        CompareDate(new Date(value), new Date())) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        // !this.parent.packing.label &&
        // !_.isString(this.parent.packing) &&
        !this.parent.packing &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        (!this.parent.estimatedExpireTimeStart || this.parent.estimatedExpireTimeStart === '') &&
        (!this.parent.estimatedExpireTimeEnd || this.parent.estimatedExpireTimeEnd === '') &&
        !value) ||
      (value && CompareDate(new Date(value), new Date()))
    );
  }),

  estimatedExpireTimeStart: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedTime &&
        this.parent.estimatedExpireTimeEnd &&
        this.parent.packing &&
        // _.isString(this.parent.packing) &&
        // this.parent.packing !== '' &&
        value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(this.parent.estimatedExpireTimeEnd), new Date(value))) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        // !this.parent.packing.label &&
        // !_.isString(this.parent.packing) &&
        !this.parent.packing &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!this.parent.estimatedExpireTimeEnd || this.parent.estimatedExpireTimeEnd === '') &&
        !value) ||
      (value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(this.parent.estimatedExpireTimeEnd), new Date(value)))
    );
  }),

  estimatedExpireTimeEnd: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedExpireTimeStart &&
        this.parent.estimatedTime &&
        this.parent.packing &&
        // _.isString(this.parent.packing) &&
        // this.parent.packing !== '' &&
        value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(value), new Date(this.parent.estimatedExpireTimeStart))) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        // !this.parent.packing.label &&
        // !_.isString(this.parent.packing) &&
        !this.parent.packing &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        (!this.parent.estimatedExpireTimeStart || this.parent.estimatedExpireTimeStart === '') &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        !value) ||
      (value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(value), new Date(this.parent.estimatedExpireTimeStart)))
    );
  }),

  packing: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    console.log(value);
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedTime &&
        this.parent.estimatedExpireTimeStart &&
        this.parent.estimatedExpireTimeEnd &&
        value)
        // && _.isString(value)) 
        ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        !this.parent.estimatedTime &&
        !this.parent.estimatedExpireTimeStart &&
        !this.parent.estimatedExpireTimeEnd &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        !value)
        // !value.label) 
        ||
      (value)
        // && _.isString(value)) ||
      // (!_.isString(value) && value.label)
    );
  }),

  estimatedQuantity: Yup.number().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.technical.length > 0 &&
        this.parent.estimatedTime &&
        this.parent.estimatedExpireTimeStart &&
        this.parent.estimatedExpireTimeEnd &&
        this.parent.packing &&
        // _.isString(this.parent.packing) &&
        // this.parent.packing !== '' &&
        value > 0) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        (!this.parent.technical || this.parent.technical.length === 0) &&
        // !this.parent.packing.label &&
        // !_.isString(this.parent.packing) &&
        !this.parent.packing &&
        !this.parent.estimatedExpireTimeStart &&
        !this.parent.estimatedExpireTimeEnd &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!value || value === 0)) ||
      (value && value > 0)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.leader.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedTime &&
        this.parent.estimatedExpireTimeStart &&
        this.parent.estimatedExpireTimeEnd &&
        this.parent.packing &&
        // _.isString(this.parent.packing) &&
        // this.parent.packing !== '' &&
        value.length > 0) ||
      ((!this.parent.leader || this.parent.leader.length === 0) &&
        // !this.parent.packing.label &&
        // !_.isString(this.parent.packing) &&
        !this.parent.packing &&
        !this.parent.estimatedExpireTimeStart &&
        !this.parent.estimatedExpireTimeEnd &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.technical.length > 0 &&
        this.parent.estimatedQuantity > 0 &&
        this.parent.estimatedTime &&
        this.parent.estimatedExpireTimeStart &&
        this.parent.estimatedExpireTimeEnd &&
        this.parent.packing &&
        // _.isString(this.parent.packing) &&
        // this.parent.packing !== '' &&
        value.length > 0) ||
      ((!this.parent.technical || this.parent.technical.length === 0) &&
        // !this.parent.packing.label &&
        // !_.isString(this.parent.packing) &&
        !this.parent.packing &&
        (!this.parent.estimatedQuantity || this.parent.estimatedQuantity === 0) &&
        !this.parent.estimatedExpireTimeStart &&
        !this.parent.estimatedExpireTimeEnd &&
        (!this.parent.estimatedTime || this.parent.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const preservationValidate = {
  estimatedStartTime: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.technical.length > 0 &&
        this.parent.estimatedEndTime &&
        value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(this.parent.estimatedEndTime), new Date(value))) ||
      ((!this.parent.technical || this.parent.technical.length === 0) &&
        !this.parent.estimatedEndTime &&
        !value) ||
      (value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(this.parent.estimatedEndTime), new Date(value)))
    );
  }),
  estimatedEndTime: Yup.mixed().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.technical.length > 0 &&
        this.parent.estimatedStartTime &&
        value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(value), new Date(this.parent.estimatedStartTime))) ||
      ((!this.parent.technical || this.parent.technical.length === 0) &&
        !this.parent.estimatedStartTime &&
        !value) ||
      (value &&
        CompareDate(new Date(value), new Date()) &&
        CompareDate(new Date(value), new Date(this.parent.estimatedStartTime)))
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'Nhập hết vào', function(value: any) {
    return (
      (this.parent.estimatedStartTime && this.parent.estimatedEndTime && value.length > 0) ||
      (!this.parent.estimatedStartTime &&
        !this.parent.estimatedEndTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};
