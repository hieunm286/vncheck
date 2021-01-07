import React from 'react';
import {SortColumn} from '../../../common-library/common-consts/const';
import {
  MasterBodyColumns,
  RenderInfoDetail,
  RenderInfoDetailColumn
} from '../../../common-library/common-types/common-type';
import {
  Display3Info,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDate,
  DisplayDateTime,
  DisplayImage,
  DisplayInnerLink,
  DisplayPercent,
  DisplayPersonName,
  DisplayPersonNameByArray,
  DisplayTable
} from '../../../common-library/helpers/detail-helpers';

const seedingCode: RenderInfoDetailColumn = {
  'seeding.code': {
    title: 'SEEDING.CODE',
    formatter: (e, entity) => DisplayInnerLink(`/production-plan/seeding/${entity._id}`, e)
  }
};
const plantingCode: RenderInfoDetailColumn = {
  'planting.code': {
    title: 'PRODUCTION_PLAN.PLANT_CODE',
    formatter: (e, entity) => DisplayInnerLink(`/production-plan/planting/${entity._id}`, e)
  },
};
const harvestingCode: RenderInfoDetailColumn = {
  'harvesting.code': {
    title: 'PRODUCTION_PLAN.HARVESTING_CODE',
    formatter: (e, entity) => DisplayInnerLink(`/production-management/harvesting/${entity._id}`, e)
  },
};
const preliminaryTreatmentCode: RenderInfoDetailColumn = {
  'preliminaryTreatment.code': {
    title: 'PRODUCTION_PLAN.PRELIMINARY_TREATMENT_CODE',
    formatter: (e, entity) => DisplayInnerLink(`/production-management/preliminaryTreatment/${entity._id}`, e)
  },
};
const cleaningCode: RenderInfoDetailColumn = {
  'cleaning.code': {
    title: 'PRODUCTION_PLAN.CLEANING_CODE',
    formatter: (e, entity) => DisplayInnerLink(`/production-management/cleaning/${entity._id}`, e)
  },
};
const packingCode: RenderInfoDetailColumn = {
  'packing.code': {
    title: 'PRODUCTION_PLAN.PACKING_CODE',
    formatter: (e, entity) => DisplayInnerLink(`/production-management/packing/${entity._id}`, e)
  },
};

export const harvestingDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'harvesting.time': {
        keyField: 'harvesting', title: 'PRODUCTION_PLAN.HARVEST_DATE', formatter: (e) => {
          return (<>{DisplayDateTime(e.startTime)} {e.endTime && (<> - {DisplayDateTime(e.endTime)}</>)}</>);
        }
      },
      // 'planting.estimatedHarvestTime': { title: 'PRODUCTION_PLAN.HARVEST_DATE' },
      ...plantingCode,
      'harvesting.address': {
        keyField: 'harvesting.imageInProgress', title: 'PRODUCTION_PLAN.HARVESTING_ADDRESS',
        formatter: (e) => (<>{e && e[0]?.location && DisplayCoordinates(e[0].location)}</>)
      },
      // 'planting.farmLocation.[coordinates]': { title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates, },
      'harvesting.code': {title: 'PRODUCTION_PLAN.HARVESTING_CODE'},
      'planting.landLot.code': {
        title: 'PLANTING_LAND_LOT',
        formatter: (cell: any, row: any) => cell.toUpperCase(),
      },
      'planting.species.name': {title: 'PRODUCTION_PLAN.SPECIES_NAME'},
      'planting.expectedQuantity': {title: 'SEEDING.EXPECTED_QUANTITY'},
      'planting.species.barcode': {title: 'GTIN'},
    },
  },
  {
    header: 'ENVIRONMENT_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.temperature': {title: 'TEMPERATURE', formatter: DisplayCelcius,},
      'planting.humidity': {title: 'HUMIDITY', formatter: DisplayPercent,},
      'planting.porosity': {title: 'POROSITY', formatter: DisplayPercent,},
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.[leader]': {title: 'HARVESTING_LEADER', formatter: DisplayPersonNameByArray,},
      'planting.[worker]': {title: 'HARVESTING_WORKER', formatter: DisplayPersonNameByArray,},
      'planting.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.imageBefore': {
        title: 'HARVESTING_IMAGE_BEFORE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'planting.imageAfter': {
        title: 'HARVESTING_IMAGE_AFTER', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'planting.imageInProgress': {
        title: 'HARVESTING_IMAGE_PROCESSING', formatter: (image, entity) => {
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

export const PreliminaryTreatmentDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'planting.species.name': {title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'},
      ...plantingCode,
      'planting.species.barcode': {title: 'GTIN'},
      ...harvestingCode,
      'preliminaryTreatment.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': {title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE'},
      'planting.farmLocation.[coordinates]': {title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates,},
      '': {title: 'EMPTY'},
      'planting.estimatedQuantity': {title: 'PRELIMINARY_TREATMENT'},
  
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.[leader]': {title: 'PRELIMINARY_TREATMENT_LEADER', formatter: DisplayPersonNameByArray,},
      'preliminaryTreatment.[worker]': {title: 'PRELIMINARY_TREATMENT_WORKER', formatter: DisplayPersonNameByArray,},
      'preliminaryTreatment.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.imageBefore': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_BEFORE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'preliminaryTreatment.imageAfter': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_AFTER', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'preliminaryTreatment.imageInProgress': {
        title: 'PRELIMINARY_TREATMENT_IMAGE_PROCESSING',
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

export const CleaningDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'planting.species.name': {title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'},
      ...plantingCode,
      'planting.species.barcode': {title: 'GTIN'},
      ...harvestingCode,
      'cleaning.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      ...preliminaryTreatmentCode,
      'planting.farmLocation.[coordinates]': {title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates,},
      'cleaning.code': {title: 'PRODUCTION_PLAN.CLEANING.CODE'},
      'planting.estimatedQuantity': {title: 'PRELIMINARY_TREATMENT'},
  
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.[leader]': {title: 'CLEANING_LEADER', formatter: DisplayPersonNameByArray,},
      'cleaning.[worker]': {title: 'CLEANING_WORKER', formatter: DisplayPersonNameByArray,},
      'cleaning.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.imageBefore': {
        title: 'CLEANING_IMAGE_BEFORE', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'cleaning.imageAfter': {
        title: 'CLEANING_IMAGE_AFTER', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'cleaning.imageInProgress': {
        title: 'CLEANING_IMAGE_PROCESSING', formatter: (image, entity) => {
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

export const PackingDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'planting.species.name': {title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'},
      ...plantingCode,
      'planting.species.barcode': {title: 'GTIN'},
      ...harvestingCode,
      'cleaning.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      ...preliminaryTreatmentCode,
      'planting.farmLocation.[coordinates]': {title: 'PACKING_LOCATION', formatter: DisplayCoordinates,},
      ...cleaningCode,
      'packing.packing.weight': {title: 'PRODUCT_PACKAGING.MODULE_NAME'},
      'packing.code': {title: 'PRODUCTION_PLAN.PACKING.CODE'},
      'packing.estimatedQuantity': {title: 'PACKING_REAL_QUANTITY'},
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.[leader]': {title: 'PACKING_LEADER', formatter: DisplayPersonNameByArray,},
      'packing.[worker]': {title: 'PERSON_ASSIGN_QR', formatter: DisplayPersonNameByArray,},
      'packing.[technical]': {title: 'KCS_ACTIVE_QR', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'PRODUCTION_INFO',
    className: 'col-12',
    titleClassName: 'col-0 hidden',
    dataClassName: 'col-12',
    data: {
      'comments': {
        formatter: (entities: any[]) => {
          const columns: MasterBodyColumns = [
            {
              dataField: '_id',
              text: 'STT',
              formatter: (cell: any, row: any, rowIndex: number) => <p>{rowIndex + 1}</p>,
              style: {paddingTop: 20},
            },
            {
              dataField: 'firstName',
              text: `Mã định danh`,
              align: 'center',
              ...SortColumn,
            },
            {
              dataField: 'lastName',
              text: `Mã QR`,
              align: 'center',
              formatter: (input) => DisplayInnerLink(input, input),
              ...SortColumn,
            },
            {
              dataField: 'planting.estimatedHarvestTime',
              text: `Ngày gán mã QR`,
              formatter: (cell: any, row: any, rowIndex: number) => DisplayDate(cell),
              ...SortColumn,
            },
            {
              dataField: 'lastName',
              text: `PERSON_ASSIGN_QR`,
              align: 'center',
              formatter: (cell: any, row: any, rowIndex: number) => DisplayPersonName(cell),
              ...SortColumn,
            },
            {
              dataField: 'planting.createdAt',
              text: `Ngày gán mã QR`,
              formatter: (cell: any, row: any, rowIndex: number) => DisplayDate(cell),
              ...SortColumn,
            },
            {
              dataField: 'lastName',
              text: `Người kích hoạt`,
              align: 'center',
              formatter: (cell: any, row: any, rowIndex: number) => DisplayPersonName(cell),
              ...SortColumn,
            },
            {
              dataField: 'planting.createdAt',
              text: `Ngày gán mã QR`,
              formatter: (cell: any, row: any, rowIndex: number) => DisplayDate(cell),
              ...SortColumn,
            },
          ]
          return <DisplayTable entities={entities} columns={columns}/>
        },
      },
    },
  },
  
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.sampleImage': {
        title: 'PACKING_EXAMPLE_PRODUCTION', formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info
          }
          return DisplayImage(image, renderInfo)
        }
      },
      'packing.packingImage': {
        title: 'PACKING_IMAGE', formatter: (image, entity) => {
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

export const PreservationDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      ...seedingCode,
      'planting.species.name': {title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'},
      ...plantingCode,
      'planting.species.barcode': {title: 'GTIN'},
      ...harvestingCode,
      'preservation.estimatedStartTime': {
        title: 'PRESERVATION_ESTIMATED_TIME_START',
        formatter: input => DisplayDateTime(input),
      },
      ...preliminaryTreatmentCode,
      'preservation.estimatedEndTime': {
        title: 'PRESERVATION_ESTIMATED_TIME_END',
        formatter: input => DisplayDateTime(input),
      },
      ...cleaningCode,
      'planting.farmLocation.[coordinates]': {title: 'PRESERVATION_LOCATION', formatter: DisplayCoordinates,},
      ...packingCode,
      'preservation.temperature': {title: 'PRODUCTION_MANAGEMENT.PRESERVATION.TEMPERATURE', formatter: DisplayCelcius},
      'preservation.code': {title: 'PRODUCTION_PLAN.PRESERVATION.CODE'},
  
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.[worker]': {title: 'PRESERVATION_WORKER', formatter: DisplayPersonNameByArray,},
      'preservation.[technical]': {title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray,},
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.storageImage': {
        title: 'PRESERVATION_IMAGE', formatter: (image, entity) => {
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
