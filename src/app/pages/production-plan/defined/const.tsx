import React from 'react';
import {
  ModifyForm,
  ModifyPanel,
  RenderInfoDetail,
  SearchModel,
} from '../../../common-library/common-types/common-type';
import {GenerateAllFormField} from '../../../common-library/helpers/common-function';
import * as ProductPackagingService from '../../product-packaging/product-packaging.service';
import * as SpeciesService from '../../species/species.service';
import * as Yup from 'yup';

import '../style/production-plan.scss';
import _ from 'lodash';
import {useIntl} from 'react-intl';
import {
  Display3Info,
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime,
  DisplayDownloadLink,
  DisplayImage,
  DisplayPercent,
  DisplayPersonNameByArray,
  DisplayUnit,
} from '../../../common-library/helpers/detail-helpers';

export const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
export const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
export const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
export const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
export const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
export const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
export const homeURL = `${window.location.pathname}`;

export const Fix = ({title}: { title: string }) => {
  const intl = useIntl();
  return <div style={{minWidth: 174}}>{intl.formatMessage({id: title})}</div>;
};

export const basicUnit = [1, 1000, 10000, 100000, 1000000]

export const productPlanSearchModel1: SearchModel = {
  seedingCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.SEEDING_CODE',
    name: 'seeding.code',
  },
  plantCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PLANT_CODE',
    name: 'planting.code',
  },
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    onSearch: SpeciesService.GetAll,
    keyField: 'name',
    name: 'seeding.species',
  },
  estimatedHarvestTime: {
    type: 'date-time',
    name: 'planting.estimatedHarvestTime',
    label: 'PRODUCTION_PLAN.HARVEST_DATE',
  },
};

export const productPlanSearchModel2: SearchModel = {
  code: {
    type: 'string',
    label: 'PRODUCTION_PLAN.CODE',
  },
  seedingCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.SEEDING_CODE',
    name: 'seeding.code',
  },
  plantCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PLANT_CODE',
    name: 'planting.code',
  },
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    onSearch: SpeciesService.GetAll,
    keyField: 'name',
    name: 'seeding.species',
  },
  estimatedHarvestTime: {
    type: 'date-time',
    name: 'planting.estimatedHarvestTime',
    label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'}/>,
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
        // tagData: userData,
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
        // tagData: userData,
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

export const PlantingDetailDialog: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': {
        title: 'SEEDING.CODE',
        // formatter: input => DisplayLink(input, '/production-plan/seeding'),
      },
      'seeding.species.name': {title: 'SEEDING.SPECIES_NAME'},
      
      'planting.code': {title: 'PLANTING.CODE'},
      'planting.species.barcode': {title: 'SEEDING.GTIN'},
      'planting.estimatedPlantingTime': {
        title: 'Thời gian trồng dự kiến',
        formatter: input => <DisplayDateTime input={input} />,
      },
      
      'planting.area': {title: 'SEEDING.SEEDING_AREA'},
      
      'planting.estimatedHarvestTime': {
        title: 'Thời gian thu hoạch dự kiến',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'planting.numberOfPlants': {title: 'SEEDING.NUMBER_OF_SEED'},
      'planting.landLot.code': {title: 'SEEDING.LAND_LOT'},
      'planting.expectedQuantity': {title: 'Sản lượng dự kiến'},
      
      'planting.farmLocation.[coordinates]': {
        title: 'PLANTING.FARM_LOCATION',
        formatter: DisplayCoordinates,
      },
    },
  },
  {
    header: 'THÔNG TIN MÔI TRƯỜNG',
    className: 'col-12',
    titleClassName: 'col-2 mb-10',
    dataClassName: 'col-4 mb-10 pl-5',
    data: {
      'planting.temperature': {
        title: 'Nhiệt độ',
        formatter: DisplayCelcius,
      },
      'planting.humidity': {
        title: 'Độ ẩm',
        formatter: DisplayPercent,
      },
      'planting.porosity': {
        title: 'Độ xốp',
        formatter: DisplayPercent,
      },
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-2 mb-10',
    dataClassName: 'col-4 mb-10 pl-5',
    data: {
      'planting.manager.fullName': {
        title: 'Thông tin Giám đốc/TGĐ',
      },
      'planting.[leader].fullName': {
        title: 'Tổ trưởng gieo trồng',
        formatter: input => DisplayArray(input),
      },
      'planting.[worker].fullName': {
        title: 'Công nhân gieo trồng',
        formatter: input => DisplayArray(input),
      },
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-2 mb-10',
    dataClassName: 'col-4 mb-10 pl-5',
    data: {
      'planting.imageBefore': {
        title: 'Hình ảnh trước khi nuôi trồng',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'planting.imageAfter': {
        title: 'Hình ảnh khi nuôi trồng',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
    },
  },
];

export const SeedingDetailDialog: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': {title: 'SEEDING.CODE'},
      'seeding.farmLocation.[coordinates]': {
        title: 'SEEDING.FARM_LOCATION',
        formatter: DisplayCoordinates,
      },
      'seeding.certificates': {
        title: 'SEEDING.CERTIFICATE',
        formatter: input => DisplayDownloadLink(input, 'path'),
      },
      'seeding.species.name': {title: 'SEEDING.SPECIES_NAME'},
      
      'seeding.buyInvoice': {
        title: 'SEEDING.INVOICE',
        formatter: input => DisplayDownloadLink(input, 'path'),
      },
      'seeding.species.barcode': {title: 'SEEDING.GTIN'},
      
      'seeding.seedingTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'seeding.area': {title: 'SEEDING.SEEDING_AREA'},
      
      'seeding.estimatedPlantingTime': {
        title: 'SEEDING.ESTIMATED_PLANTING_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'seeding.numberOfSeed': {title: 'SEEDING.NUMBER_OF_SEED'},
      
      'seeding.landLot.code': {title: 'SEEDING.LAND_LOT'},
      
      'seeding.expectedQuantity': {title: 'SEEDING.EXPECTED_QUANTITY'},
    },
  },
  {
    header: 'THÔNG TIN MÔI TRƯỜNG',
    className: 'col-12',
    titleClassName: 'col-2 mb-10',
    dataClassName: 'col-4 mb-10 pl-5',
    data: {
      'seeding.temperature': {
        title: 'Nhiệt độ',
        formatter: DisplayCelcius,
      },
      'seeding.humidity': {
        title: 'Độ ẩm',
        formatter: DisplayPercent,
      },
      'seeding.porosity': {
        title: 'Độ xốp',
        formatter: DisplayPercent,
      },
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-2 mb-10',
    dataClassName: 'col-4 mb-10 pl-5',
    data: {
      'seeding.manager.fullName': {
        title: 'Thông tin Giám đốc/TGĐ',
      },
      'seeding.[leader].fullName': {
        title: 'Tổ trưởng gieo trồng',
        formatter: input => DisplayArray(input),
      },
      'seeding.[worker].fullName': {
        title: 'Công nhân gieo trồng',
        formatter: input => DisplayArray(input),
      },
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-2 mb-10',
    dataClassName: 'col-4 mb-10 pl-5',
    data: {
      'seeding.landLotImage': {
        title: 'Hình ảnh định vị lô luống',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'seeding.seedingImage': {
        title: 'Hình ảnh trước khi đưa vào nuôi trồng',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
    },
  },
  // {
  //   header: 'Thử nghiệm bảng',
  //   className: 'col-12',
  //   titleClassName: 'col-0 hidden',
  //   dataClassName: 'col-12',
  //   data: {
  //     'comments': {
  //       formatter: (entities: any[]) => {
  //         const columns: MasterBodyColumns = [{
  //           dataField: 'content',
  //           text: 'QR.MASTER.TABLE.NAME',
  //           ...SortColumn,
  //           align: 'center',
  //         }, {
  //           dataField: '_id',
  //           text: 'QR.MASTER.TABLE.CODE',
  //           ...SortColumn,
  //           align: 'center',
  //         }]
  //         return <DisplayTable entities={entities} columns={columns}/>
  //       },
  //     },
  //   },
  // }
];

export const masterEntityDetailDialog2: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      code: {title: 'PRODUCTION_PLAN.CODE'},
      farmLocation: {
        title: 'EMPTY',
      },
      'seeding.code': {title: 'SEEDING.CODE'},
      'seeding.species.name': {title: 'SEEDING.SPECIES_NAME'},
      'planting.code': {title: 'PRODUCTION_PLAN.PLANT_CODE'},
      'seeding.species.barcode': {title: 'SEEDING.GTIN'},
      
      'seeding.certificates': {
        title: 'SEEDING.CERTIFICATE',
        formatter: input => DisplayDownloadLink(input, 'path'),
      },
      'seeding.area': {title: 'SEEDING.SEEDING_AREA'},
      
      'seeding.buyInvoice': {
        title: 'SEEDING.INVOICE',
        formatter: input => DisplayDownloadLink(input, 'path'),
      },
      'planting.area': {title: 'PLANTING_AREA'},
      
      'seeding.seedingTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'seeding.numberOfSeed': {title: 'SEEDING.NUMBER_OF_SEED'},
      
      'seeding.estimatedPlantingTime': {
        title: 'SEEDING.ESTIMATED_PLANTING_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      
      'planting.numberOfPlants': {title: 'PLATING_QUANTITY'},
      
      'seeding.landLot.code': {title: 'SEEDING.LAND_LOT'},
      
      'seeding.farmLocation.[coordinates]': {
        title: 'SEEDING.FARM_LOCATION',
        formatter: DisplayCoordinates,
      },
      
      'planting.landLot.code': {title: 'PLANTING.LAND_LOT'},
      
      'planting.farmLocation.[coordinates]': {
        title: 'FARM_LOCATION',
        formatter: DisplayCoordinates,
      },
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.manager.fullName': {title: 'Thông tin Giám đốc/TGĐ'},
      'planting.manager.fullName': {title: 'Người lập kế hoạch'},
      'seeding.[leader]': {
        title: 'ADMIN_SEEDING_LEADER',
        formatter: DisplayPersonNameByArray,
      },
      'planting.[leader]': {
        title: 'ADMIN_PLANTING_LEADER',
        formatter: DisplayPersonNameByArray,
      },
    },
  },
  {
    header: 'THÔNG TIN THU HOẠCH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.estimatedHarvestTime': {
        title: 'Thời gian thu hoạch (dự kiến)',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'harvesting.[technical]': {
        title: 'Nhân viên kỹ thuật thu hoạch',
        formatter: DisplayPersonNameByArray,
      },
      'planting.expectedQuantity': {title: 'Sản lượng thu hoạch (dự kiến)'},
      
      'harvesting.[leader]': {
        title: 'Tổ trưởng thu hoạch',
        formatter: DisplayPersonNameByArray,
      },

      'unit': {title: 'Đơn vị tính', formatter: input => <DisplayUnit input={input} />}
    },
  },
  {
    header: 'THÔNG TIN SƠ CHẾ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.estimatedTime': {
        title: 'PRODUCTION_PLAN_FORM_PRELIMINARY_TREATMENT_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'preliminaryTreatment.[technical]': {
        title: 'Nhân viên kỹ thuật sơ chế',
        formatter: DisplayPersonNameByArray,
      },
      'preliminaryTreatment.estimatedQuantity': {title: 'Sản lượng sau sơ chế (dự kiến)'},
      
      'preliminaryTreatment.[leader]': {
        title: 'Tổ trưởng sơ chế',
        formatter: DisplayPersonNameByArray,
      },

      'unit': {title: 'Đơn vị tính', formatter: input => <DisplayUnit input={input} />}
    },
  },
  {
    header: 'THÔNG TIN LÀM SẠCH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.estimatedTime': {
        title: 'PRODUCTION_PLAN_CLEANING_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'cleaning.[technical]': {
        title: 'Nhân viên kỹ thuật làm sạch',
        formatter: DisplayPersonNameByArray,
      },
      'cleaning.estimatedQuantity': {title: 'Sản lượng sau làm sạch (dự kiến)'},
      
      'cleaning.[leader]': {
        title: 'Tổ trưởng làm sạch',
        formatter: DisplayPersonNameByArray,
      },

      'unit': {title: 'Đơn vị tính', formatter: input => <DisplayUnit input={input} />}
    },
  },
  {
    header: 'THÔNG TIN ĐÓNG GÓI',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.estimatedTime': {
        title: 'Thời gian đóng gói (dự kiến)',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'packing.estimatedQuantity': {title: 'PACKING_QUANTITY'},
      'packing.estimatedExpireTimeStart': {
        title: 'Hạn sử dụng (từ ngày)',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'packing.[technical]': {
        title: 'KCS',
        formatter: DisplayPersonNameByArray,
      },
      'packing.estimatedExpireTimeEnd': {
        title: 'Hạn sử dụng (đến ngày)',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'packing.[leader]': {
        title: 'Tổ trưởng đóng gói',
        formatter: DisplayPersonNameByArray,
      },
      'packing.packing.weight': {
        title: 'Quy cách đóng gói',
      },
    },
  },
  {
    header: 'THÔNG TIN BẢO QUẢN',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.estimatedStartTime': {
        title: 'Thời gian bảo quản (từ ngày)',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'preservation.[technical]': {
        title: 'Nhân viên kỹ thuật bảo quản',
        formatter: DisplayPersonNameByArray,
      },
      'preservation.estimatedEndTime': {
        title: 'Thời gian bảo quản (đến ngày)',
        formatter: input => <DisplayDateTime input={input} />,
      },
    },
  },
  
  // {
  //   header: 'THÔNG TIN ĐÓNG GÓI',
  //   data: [
  //     [
  //       {
  //         type: 'date-time',
  //         title: 'Thời gian đóng gói (dự kiến)',
  //         keyField: 'packing.estimatedTime',
  //       },
  //       {
  //         type: 'date-time',
  //         title: 'Hạn sử dụng bắt đầu (dự kiến)',
  //         keyField: 'packing.estimatedExpireTimeStart',
  //       },
  //       {
  //         type: 'date-time',
  //         title: 'Hạn sử dụng kết thúc (dự kiến)',
  //         keyField: 'packing.estimatedExpireTimeEnd',
  //       },
  //       {
  //         type: 'string',
  //         title: 'Quy cách đóng gói',
  //         keyField: 'packing.packing.weight',
  //       },
  //     ],
  //     [
  //       {
  //         type: 'string',
  //         title: 'Số lượng đóng gói dự kiến',
  //         keyField: 'packing.estimatedQuantity',
  //       },
  //       {
  //         type: 'array',
  //         title: 'KCS',
  //         keyField: 'packing.technical',
  //         target: 'user.fullName',
  //       },
  //       {
  //         type: 'array',
  //         title: 'Tổ trưởng đóng gói',
  //         keyField: 'packing.leader',
  //         target: 'user.fullName',
  //       },
  //     ],
  //   ],
  // },
  // {
  //   header: 'THÔNG TIN BẢO QUẢN',
  //   data: [
  //     [
  //       {
  //         type: 'date-time',
  //         title: 'Thời gian bắt đầu bảo quản (dự kiến)',
  //         keyField: 'preservation.estimatedStartTime',
  //       },
  //       {
  //         type: 'date-time',
  //         title: 'Thời gian kết thúc bảo quản (dự kiến)',
  //         keyField: 'preservation.estimatedEndTime',
  //       },
  //     ],
  //     [
  //       {
  //         type: 'array',
  //         title: 'Nhân viên kĩ thuật bảo quản',
  //         keyField: 'preservation.technical',
  //         target: 'user.fullName',
  //       },
  //     ],
  //   ],
];

export const addInitField = (obj1: any, obj2: any) => {
  const rs = {...obj1};
  
  Object.keys(obj2).forEach(key => {
    if (!rs[key]) {
      rs[key] = obj2[key]
    } 
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
  harvesting: {
    leader: [],
    technical: []
  },
  preliminaryTreatment: {
    estimatedTime: null,
    estimatedQuantity: undefined,
    leader: [],
    technical: []
  },
  cleaning: {
    estimatedTime: null,
    estimatedQuantity: undefined,
    leader: [],
    technical: []
  },
  packing: {
    estimatedTime: null,
    estimatedExpireTimeStart: null,
    estimatedExpireTimeEnd: null,
    estimatedQuantity: undefined,
    packing: null,
    leader: [],
    technical: []
  },
  preservation: {
    estimatedStartTime: null,
    estimatedEndTime: null,
    technical: []
  },
  unit: 1000
};

export const halfValidate = {
  estimatedHarvestTime: Yup.mixed(),
  expectedQuantity: Yup.number(),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    console.log(this.schema);
    console.log(this.path);
    console.log(this.options);
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.expectedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        value.length > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        this.parent?.expectedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
        value.length > 0) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        this.parent?.expectedQuantity > 0 &&
        this.parent?.estimatedHarvestTime &&
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
  estimatedTime: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        value) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        !value) ||
      (value)
    );
  }),
  estimatedQuantity: Yup.number().test('oneOfRequired', 'ESTIMATED_QUANTITY_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedTime &&
        value > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value === 0)) ||
      (value)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    console.log(value);
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        value.length > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        value.length > 0) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const packingValidate = {
  estimatedTime: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedExpireTimeStart &&
        this.parent?.estimatedExpireTimeEnd &&
        this.parent?.packing &&
        // _.isString(this.parent?.packing) &&
        // this.parent?.packing !== '' &&
        value) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        // !this.parent?.packing.label &&
        // !_.isString(this.parent?.packing) &&
        !this.parent?.packing &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedExpireTimeStart || this.parent?.estimatedExpireTimeStart === '') &&
        (!this.parent?.estimatedExpireTimeEnd || this.parent?.estimatedExpireTimeEnd === '') &&
        !value) ||
      (value)
    );
  }),
  
  estimatedExpireTimeStart: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (
    value: any,
  ) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        this.parent?.estimatedExpireTimeEnd &&
        this.parent?.packing &&
        // _.isString(this.parent?.packing) &&
        // this.parent?.packing !== '' &&
        value) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        // !this.parent?.packing.label &&
        // !_.isString(this.parent?.packing) &&
        !this.parent?.packing &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!this.parent?.estimatedExpireTimeEnd || this.parent?.estimatedExpireTimeEnd === '') &&
        !value) ||
      (value)
    );
  }),
  
  estimatedExpireTimeEnd: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedExpireTimeStart &&
        this.parent?.estimatedTime &&
        this.parent?.packing &&
        // _.isString(this.parent?.packing) &&
        // this.parent?.packing !== '' &&
        value) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        // !this.parent?.packing.label &&
        // !_.isString(this.parent?.packing) &&
        !this.parent?.packing &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedExpireTimeStart || this.parent?.estimatedExpireTimeStart === '') &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        !value) ||
      (value)
    );
  }),
  
  packing: Yup.mixed().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    console.log(value);
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        this.parent?.estimatedExpireTimeStart &&
        this.parent?.estimatedExpireTimeEnd &&
        value) ||
      // && _.isString(value))
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        !this.parent?.estimatedTime &&
        !this.parent?.estimatedExpireTimeStart &&
        !this.parent?.estimatedExpireTimeEnd &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        !value) ||
      // !value.label)
      value
      // && _.isString(value)) ||
      // (!_.isString(value) && value.label)
    );
  }),
  
  estimatedQuantity: Yup.number().test('oneOfRequired', 'ESTIMATED_QUANTITY_VALIDATE', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.technical?.length > 0 &&
        this.parent?.estimatedTime &&
        this.parent?.estimatedExpireTimeStart &&
        this.parent?.estimatedExpireTimeEnd &&
        this.parent?.packing &&
        // _.isString(this.parent?.packing) &&
        // this.parent?.packing !== '' &&
        value > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        (!this.parent?.technical || this.parent?.technical.length === 0) &&
        // !this.parent?.packing.label &&
        // !_.isString(this.parent?.packing) &&
        !this.parent?.packing &&
        !this.parent?.estimatedExpireTimeStart &&
        !this.parent?.estimatedExpireTimeEnd &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value === 0)) ||
      (value)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.leader?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        this.parent?.estimatedExpireTimeStart &&
        this.parent?.estimatedExpireTimeEnd &&
        this.parent?.packing &&
        // _.isString(this.parent?.packing) &&
        // this.parent?.packing !== '' &&
        value.length > 0) ||
      ((!this.parent?.leader || this.parent?.leader.length === 0) &&
        // !this.parent?.packing.label &&
        // !_.isString(this.parent?.packing) &&
        !this.parent?.packing &&
        !this.parent?.estimatedExpireTimeStart &&
        !this.parent?.estimatedExpireTimeEnd &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
  leader: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedQuantity > 0 &&
        this.parent?.estimatedTime &&
        this.parent?.estimatedExpireTimeStart &&
        this.parent?.estimatedExpireTimeEnd &&
        this.parent?.packing &&
        // _.isString(this.parent?.packing) &&
        // this.parent?.packing !== '' &&
        value.length > 0) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        // !this.parent?.packing.label &&
        // !_.isString(this.parent?.packing) &&
        !this.parent?.packing &&
        (!this.parent?.estimatedQuantity || this.parent?.estimatedQuantity === 0) &&
        !this.parent?.estimatedExpireTimeStart &&
        !this.parent?.estimatedExpireTimeEnd &&
        (!this.parent?.estimatedTime || this.parent?.estimatedTime === '') &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};

export const preservationValidate = {
  estimatedStartTime: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedEndTime &&
        value) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        !this.parent?.estimatedEndTime &&
        !value) ||
      (value)
    );
  }),
  estimatedEndTime: Yup.mixed().test('oneOfRequired', 'DATE_VALIDATE', function (value: any) {
    return (
      (this.parent?.technical?.length > 0 &&
        this.parent?.estimatedStartTime &&
        value) ||
      ((!this.parent?.technical || this.parent?.technical.length === 0) &&
        !this.parent?.estimatedStartTime &&
        !value) ||
      (value)
    );
  }),
  technical: Yup.array().test('oneOfRequired', 'INPUT_ALL', function (value: any) {
    return (
      (this.parent?.estimatedStartTime && this.parent?.estimatedEndTime && value.length > 0) ||
      (!this.parent?.estimatedStartTime &&
        !this.parent?.estimatedEndTime &&
        (!value || value.length === 0)) ||
      value.length > 0
    );
  }),
};
