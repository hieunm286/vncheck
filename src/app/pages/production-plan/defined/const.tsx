import { SearchModel } from '../../../common-library/common-types/common-type';
import { GenerateAllFormField } from '../../../common-library/helpers/common-function';
import * as ProductionPlanService from '../production-plan.service';
import * as ProductPackagingService from '../../product-packaging/product-packaging.service';
import * as ProductTypeService from '../../product-type/product-type.service';

import '../style/production-plan.scss';

export const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
export const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
export const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
export const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
export const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
export const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
export const homeURL = `${window.location.pathname}`;

export const productPlanSearchModel1: SearchModel = {
  plantCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PLANT_CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'code',
  },
  growCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.GROW_CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'name',
  },
  speciesName: {
    type: 'SearchSelect',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'speciesName',
    ref: true,
  },
  date: {
    type: 'Datetime',
    label: 'PRODUCTION_PLAN.HARVEST_DATE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'agencyAddress',
  },
};

export const productPlanSearchModel2: SearchModel = {
  planCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'planCode',
  },
  plantCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PLANT_CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'plantCode',
  },
  growCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.GROW_CODE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'growCode',
  },
  speciesName: {
    type: 'SearchSelect',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'speciesName',
    ref: true,
  },
  date: {
    type: 'Datetime',
    label: 'PRODUCTION_PLAN.HARVEST_DATE',
    placeholder: 'PRODUCTION_PLAN.INPUT',
    service: ProductionPlanService,
    keyField: 'agencyAddress',
  },
};

export const modifyModel: any[] = [
  {
    title: 'THÔNG TIN CHUNG',
    data: {
      code: {
        type: 'string',
        placeholder: 'Mã kế hoạch',
        label: 'Mã kế hoạch',
        required: true,
        disabled: true,
      },
      seeding: {
        type: 'string',
        placeholder: 'Mã gieo giống',
        required: true,
        label: 'Mã gieo giống',
        disabled: true,
      },
      planting: {
        type: 'object',
        data: {
          code: {
            type: 'string',
            placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
            required: true,
            label: 'Mã gieo trồng',
            disabled: true,
          },
          estimatedPlantingTime: {
            type: 'string',
            placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
            label: 'Thời gian trồng',
            disabled: true,
          },
          landLot: {
            type: 'string',
            placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
            required: true,
            label: 'Lô gieo trồng',
            disabled: true,
          },
        },
      },
      // certificates: {
      //   type: 'string',
      //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      //   label: 'Giấy chứng nhận giống',
      //   disabled: true,
      // },
      // bill: {
      //   type: 'string',
      //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      //   label: 'Hóa đơn mua hàng',
      //   disabled: true,
      // },
      // plantTime: {
      //   type: 'string',
      //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      //   label: 'Thời gian gieo',
      //   disabled: true,
      // },
    },
  },
  {
    title: '\u00A0',
    data: {
      planting: {
        type: 'object',
        data: {
          farmLocation: {
            type: 'object',
            data: {
              coordinates: {
                type: 'string',
                placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
                label: 'Địa chỉ farm',
                disabled: true,
              },
            },
          },
          species: {
            type: 'object',
            data: {
              name: {
                type: 'string',
                placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
                label: 'Tên chủng loại',
                disabled: true,
              },
              barcode: {
                type: 'string',
                placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
                label: 'GTIN',
                disabled: true,
              },
            },
          },
          area: {
            type: 'string',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
            label: 'Diện tích gieo ươm',
            disabled: true,
          },
          numberOfPlants: {
            type: 'string',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
            label: 'Số cây con giống',
            disabled: true,
          },
        },
      },

      // growArea: {
      //   type: 'string',
      //   placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
      //   label: 'Diện tích gieo trồng',
      //   disabled: true,
      // },

      // numberOfGrows: {
      //   type: 'string',
      //   placeholder: 'Số cây con trồng',
      //   label: 'GTIN',
      //   disabled: true,
      // },
      // plantLocation: {
      //   type: 'string',
      //   placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
      //   label: 'Địa điểm Farm giống',
      //   disabled: true,
      // },
      // growLocation: {
      //   type: 'string',
      //   placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
      //   label: 'Địa điểm Farm trồng',
      //   disabled: true,
      // },
    },
  },
];

export const modifyModel2: any[] = [
  {
    title: 'THÔNG TIN QUẢN TRỊ',
    data: {
      planting: {
        type: 'object',
        data: {
          manager: {
            type: 'string',
            placeholder: 'Mã gieo giống',
            label: 'Thông tin Giám đốc/TGĐ',
            required: true,
            disabled: true,
          },
          leader: {
            type: 'string',
            placeholder: 'Mã gieo giống',
            required: true,
            label: 'Tổ trưởng gieo trồng',
            disabled: true,
          },
        },
      },
    },
  },
  {
    title: '\u00A0',
    data: {
      planHuman: {
        type: 'string',
        placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
        label: 'Người lập kế hoạch',
        disabled: true,
      },
      growLeader: {
        type: 'string',
        placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
        label: 'Tổ trưởng gieo trồng',
        disabled: true,
      },
    },
  },
];

export const modifyModel3: any[] = [
  {
    title: 'THÔNG TIN THU HOẠCH',
    data: {
      planting: {
        type: 'object',
        data: {
          estimatedHarvestTime: {
            type: 'Datetime',
            placeholder: '',
            label: 'Thời gian thu hoạch (dự kiến)',
            required: true,
            disabled: true,
          },
          expectedQuantity: {
            type: 'number',
            placeholder: 'Mã gieo giống',
            required: true,
            label: 'Sản lượng thu hoạch dự kiến (kg)',
            disabled: true,
          },
        },
      },
    },
  },
  {
    title: '\u00A0',
    data: {
      harvesting: {
        type: 'object',
        data: {
          leader: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Nhân viên kỹ thuật thu hoạch',
          },
          technical: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Nhân viên kỹ thuật thu hoạch',
          },
        },
      },
    },
  },
];

export const modifyModel4: any[] = [
  {
    title: 'THÔNG TIN SƠ CHẾ',
    data: {
      preliminaryTreatment: {
        type: 'object',
        data: {
          estimatedTime: {
            type: 'Datetime',
            placeholder: 'Mã gieo giống',
            label: 'Thời gian thu hoạch (dự kiến)',
            required: true,
          },
          estimatedQuantity: {
            type: 'number',
            placeholder: 'Mã gieo giống',
            required: true,
            label: 'Sản lượng sau sơ chế dự kiến',
          },
        },
      },
    },
  },
  {
    title: '\u00A0',
    data: {
      preliminaryTreatment: {
        type: 'object',
        data: {
          leader: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Tổ trưởng sơ chế',
          },
          technical: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Nhân viên kỹ thuật sơ chế',
          },
        },
      },
    },
  },
];

export const modifyModel5: any[] = [
  {
    title: 'THÔNG TIN LÀM SẠCH',
    data: {
      cleaning: {
        type: 'object',
        data: {
          estimatedTime: {
            type: 'Datetime',
            placeholder: 'Mã gieo giống',
            label: 'Thời gian làm sạch (dự kiến)',
            required: true,
          },
          estimatedQuantity: {
            type: 'number',
            placeholder: 'Mã gieo giống',
            required: true,
            label: 'Sản lượng sau làm sạch dự kiến',
          },
        },
      },
    },
  },
  {
    title: '\u00A0',
    data: {
      cleaning: {
        type: 'object',
        data: {
          leader: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Nhân viên kỹ thuật làm sạch',
          },
          technical: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Nhân viên kỹ thuật làm sạch',
          },
        },
      },
    },
  },
];

export const modifyModel6: any[] = [
  {
    title: 'THÔNG TIN ĐÓNG GÓI',
    data: {
      packing: {
        type: 'object',
        data: {
          estimatedTime: {
            type: 'Datetime',
            placeholder: 'Mã gieo giống',
            label: 'Thời gian làm sạch (dự kiến)',
            required: true,
          },
          estimatedExpireTimeStart: {
            type: 'Datetime',
            placeholder: 'Hạn sử dụng',
            label: 'Thời gian làm sạch (dự kiến)',
            required: true,
          },
          estimatedExpireTimeEnd: {
            type: 'Datetime',
            placeholder: 'Hạn sử dụng',
            label: 'Thời gian làm sạch (dự kiến)',
            required: true,
          },
          packing: {
            type: 'SearchSelectV2',
            placeholder: 'Quy cách',
            required: true,
            label: 'Quy cách đóng gói',
            service: ProductPackagingService,
            keyField: 'species',
            rootField: 'planting',
            fillField: 'packing',
            display: 'weight',
            ref: true
          },
        },
      },
    },
  },
  {
    title: '\u00A0',
    data: {
      packing: {
        type: 'object',
        data: {
          estimatedQuantity: {
            type: 'number',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Số lượng đóng gói dự kiến ',
          },
          technical: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
            label: 'KCS',
          },
          leader: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
            label: 'Tổ trưởng đóng gói',
          },
        },
      },
    },
  },
];

export const modifyModel7: any[] = [
  {
    title: 'THÔNG TIN BẢO QUẢN',
    data: {
      preservation: {
        type: 'object',
        data: {
          estimatedStartTime: {
            type: 'Datetime',
            placeholder: 'Mã gieo giống',
            label: 'Thời gian làm sạch (dự kiến)',
            required: true,
          },
          estimatedEndTime: {
            type: 'Datetime',
            placeholder: 'Mã gieo giống',
            label: 'Thời gian làm sạch (dự kiến)',
            required: true,
          },
        },
      },
    },
  },
  {
    title: '\u00A0',
    data: {
      preservation: {
        type: 'object',
        data: {
          technical: {
            type: 'tag',
            placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'Nhân viên kỹ thuật bảo quản',
          },
        },
      },
    },
  },
];

export const formPart: any = {
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
    modifyModel: modifyModel3,
  },
  form_4: {
    title: '',
    modifyModel: modifyModel4,
  },
  form_5: {
    title: '',
    modifyModel: modifyModel5,
  },
  form_6: {
    title: '',
    modifyModel: modifyModel6,
  },
  form_7: {
    title: '',
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
          params: '_id'
        },
        {
          type: 'string',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
        },
        {
          type: 'string',
          title: 'Thời gian gieo trồng dự kiến',
          keyField: 'planting.estimatedPlantingTime',
        },
        {
          type: 'string',
          title: 'Thời gian thu hoạch dự kiến',
          keyField: 'planting.estimatedHarvestTime',
        },
        {
          type: 'string',
          title: 'Lô gieo trồng',
          keyField: 'planting.landLot',
        },
        {
          type: 'string',
          title: 'Địa điểm Farm trồng',
          keyField: 'planting.farmLocation.coordinates',
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
          keyField: 'planting.manager',
        },
        {
          type: 'string',
          title: 'Tổ trưởng gieo trồng',
          keyField: 'planting.leader',
        },
        {
          type: 'string',
          title: 'Công nhân gieo trồng',
          keyField: 'planting.worker',
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
          keyField: 'planting.imageBefore.path',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh sau nuôi trồng',
          keyField: 'planting.imageAfter.path',
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
          keyField: 'seeding.certificates.path',
        },
        {
          type: 'image',
          title: 'Hóa đơn mua giống',
          keyField: 'seeding.buyInvoice.path',
        },
        {
          type: 'string',
          title: 'Thời gian xuống giống',
          keyField: 'seeding.seedingTime',
        },
        {
          type: 'string',
          title: 'Thời gian trồng dự kiến',
          keyField: 'seeding.estimatedPlantingTime',
        },
        {
          type: 'string',
          title: 'Lô gieo ươm',
          keyField: 'seeding.landLot',
        },
      ],
      [
        {
          type: 'string',
          title: 'Địa điểm Farm giống',
          keyField: 'seeding.farmLocation.coordinates',
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
          keyField: 'planting.manager',
        },
        {
          type: 'string',
          title: 'Tổ trưởng gieo trồng',
          keyField: 'planting.leader',
        },
        {
          type: 'string',
          title: 'Công nhân gieo trồng',
          keyField: 'planting.worker',
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
          keyField: 'planting.imageBefore.path',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh sau nuôi trồng',
          keyField: 'planting.imageAfter.path',
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
          title: 'Mã kế hoạch',
          keyField: 'estimatedPlantingTime',
        },
        {
          type: 'image',
          title: 'Hình ảnh',
          keyField: 'estimatedHarvestTime',
        },
      ],
    ],
  },
];
