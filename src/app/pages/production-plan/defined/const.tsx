import { SearchModel } from '../../../common-library/common-types/common-type';
import {
  GenerateAllFormField,
} from '../../../common-library/helpers/common-function';
import * as ProductionPlanService from '../production-plan.service';
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
        planCode: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
          label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
          required: true,
          disabled: true,
        },
        plantCode: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          disabled: true,
        },
        growCode: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          required: true,
          label: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          disabled: true,
        },
        certificates: {
          type: 'string',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Giấy chứng nhận giống',
          disabled: true,
        },
        bill: {
          type: 'string',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Hóa đơn mua hàng',
          disabled: true,
        },
        plantTime: {
          type: 'string',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Thời gian gieo',
          disabled: true,
        },
        growTime: {
          type: 'string',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Thời gian trồng',
          disabled: true,
        },
        plantLand: {
          type: 'string',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Lô gieo ươm',
          disabled: true,
        },
        growLand: {
          type: 'string',
          placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
          label: 'Lô gieo trồng',
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        farmLocation: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'Địa chỉ Farm',
          disabled: true,
        },
        speciesName: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tên chủng loại',
          disabled: true,
        },
        barcode: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
         
          label: 'GTIN',
          disabled: true,
        },
        plantArea: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          label: 'Diện tích gieo ươm',
          disabled: true,
        },
        growArea: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          label: 'Diện tích gieo trồng',
          disabled: true,
        },
        numberOfPlants: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          label: 'Số cây con giống',
          disabled: true,
        },
        numberOfGrows: { 
          type: 'string',
          placeholder: 'Số cây con trồng',
          label: 'GTIN',
          disabled: true,
        },
        plantLocation: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          label: 'Địa điểm Farm giống',
          disabled: true,
        },
        growLocation: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          label: 'Địa điểm Farm trồng',
          disabled: true,
        },
      },
    },
  ];

  export const modifyModel2: any[] = [
    {
      title: 'THÔNG TIN QUẢN TRỊ',
      data: {
        manager: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          label: 'Thông tin Giám đốc/TGĐ',
          required: true,
          disabled: true,
        },
        plantLeader: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'Tổ trưởng gieo trồng',
          disabled: true,
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
        },
        growLeader: {
          type: 'string',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tổ trưởng gieo trồng',
        },
      },
    },
  ];

  export const modifyModel3: any[] = [
    {
      title: 'THÔNG TIN THU HOẠCH',
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
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'Sản lượng thu hoạch dự kiến (kg)',
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        worker: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'Nhân viên kỹ thuật thu hoạch',
        },
        harvestLeader: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tổ trưởng thu hoạch',
        },
      },
    },
  ];

  export const modifyModel4: any[] = [
    {
      title: 'THÔNG TIN THU HOẠCH',
      data: {
        estimatedPTTime: {
          type: 'Datetime',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          label: 'Thời gian thu hoạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expectedPTQuantity: {
          type: 'number',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'Sản lượng sau sơ chế dự kiến',
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        workerPT: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'Nhân viên kỹ thuật sơ chế',
        },
        PTLeader: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tổ trưởng sơ chế',
        },
      },
    },
  ];

  export const modifyModel5: any[] = [
    {
      title: 'THÔNG TIN LÀM SẠCH',
      data: {
        estimatedCleanTime: {
          type: 'Datetime',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          label: 'Thời gian làm sạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expectedCleanQuantity: {
          type: 'number',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'Sản lượng sau làm sạch dự kiến',
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        workerClean: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'Nhân viên kỹ thuật làm sạch',
        },
        cleanLeader: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tổ trưởng làm sạch',
        },
      },
    },
  ];

  export const modifyModel6: any[] = [
    {
      title: 'THÔNG TIN ĐÓNG GÓI',
      data: {
        estimatedCleanTime: {
          type: 'Datetime',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          label: 'Thời gian làm sạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expiryDate: {
          type: 'Datetime',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          label: 'Hạn sử dụng (dự kiến)',
          required: true,
          disabled: true,
        },
        packing: {
          type: 'SearchSelect',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          required: true,
          label: 'Sản lượng sau làm sạch dự kiến',
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        estimatedPackingQuantity: {
          type: 'number',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'Số lượng đóng gói dự kiến ',
        },
        KCS: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'KCS',
        },
        packingLeader: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
          label: 'Tổ trưởng đóng gói',
        },
      },
    },
  ];

  export const modifyModel7: any[] = [
    {
      title: 'THÔNG TIN BẢO QUẢN',
      data: {
        estimatedCleanTime: {
          type: 'Datetime',
          placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
          label: 'Thời gian làm sạch (dự kiến)',
          required: true,
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        workerPreservation: {
          type: 'tag',
          placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
          label: 'Nhân viên kỹ thuật bảo quản',
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


  export const masterEntityDetailDialog = [
    {
      header: 'THÔNG TIN 1',
      data: [
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantCode: {
            type: 'string',
            title: 'Mã gieo giống',
          },
          growCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          certificates: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          bill: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantTime: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          growTime: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          growLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          image: {
            type: 'image',
            title: 'Hình ảnh',
          },
        },
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
          image: {
            type: 'string',
            title: 'Hình ảnh',
          },
        },
      ],
    },
    {
      header: 'THÔNG TIN 2',
      data: [
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantCode: {
            type: 'string',
            title: 'Mã gieo giống',
          },
          growCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
        },
        {}
      ],
    },
    {
      header: 'THÔNG TIN THU HOẠCH',
      data: [
        {
          imagePrev: {
            type: 'image',
            title: 'Hình ảnh trước thu hoạch',
          },  
        },
        {
          imageAfter: {
            type: 'image',
            title: 'Hình ảnh sau thu hoạch',
          },  
        },
      ],
    },
  ];

  export const masterEntityDetailDialog2 = [
    {
      header: 'THÔNG TIN CHUNG',
      data: [
        {
         
         
          plantLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          growLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          image: {
            type: 'image',
            title: 'Hình ảnh',
          },
        },
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
          image: {
            type: 'string',
            title: 'Hình ảnh',
          },
        },
      ],
    },
    {
      header: 'THÔNG TIN 2',
      data: [
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantCode: {
            type: 'string',
            title: 'Mã gieo giống',
          },
          growCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
        },
        {}
      ],
    },
    {
      header: 'THÔNG TIN THU HOẠCH',
      data: [
        {
          imagePrev: {
            type: 'image',
            title: 'Hình ảnh trước thu hoạch',
          },  
        },
        {
          imageAfter: {
            type: 'image',
            title: 'Hình ảnh sau thu hoạch',
          },  
        },
      ],
    },
  ];