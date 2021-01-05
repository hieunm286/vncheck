import React from 'react';
import { SortColumn } from '../../../common-library/common-consts/const';
import { MasterBodyColumns, RenderInfoDetail } from '../../../common-library/common-types/common-type';
import { DisplayCelcius, DisplayCoordinates, DisplayDateTime, DisplayImage, DisplayPercent, DisplayPersonNameByArray, DisplayTable } from '../../../common-library/helpers/detail-helpers';

export const harvestingDetail: RenderInfoDetail = [
  {
    header: 'GENERAL_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': { title: 'SEEDING.CODE' },
      'planting.estimatedHarvestTime': { title: 'PRODUCTION_PLAN.HARVEST_DATE' },
      'planting.code': { title: 'PRODUCTION_PLAN.PLANT_CODE' },
      'planting.farmLocation.[coordinates]': { title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates, },
      'harvesting.code': { title: 'PRODUCTION_PLAN.HARVESTING_CODE' },
      'planting.landLot.code': {
        title: 'PLANTING_LAND_LOT',
        formatter: (cell: any, row: any) => cell.toUpperCase(),
      },
      'planting.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      'planting.expectedQuantity': { title: 'SEEDING.EXPECTED_QUANTITY' },
      'planting.species.barcode': { title: 'GTIN' },
    },
  },
  {
    header: 'ENVIRONMENT_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.temperature': { title: 'TEMPERATURE', formatter: DisplayCelcius, },
      'planting.humidity': { title: 'HUMIDITY', formatter: DisplayPercent, },
      'planting.porosity': { title: 'POROSITY', formatter: DisplayPercent, },
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.[leader]': { title: 'HARVESTING_LEADER', formatter: DisplayPersonNameByArray, },
      'planting.[worker]': { title: 'HARVESTING_WORKER', formatter: DisplayPersonNameByArray, },
      'planting.[technical]': { title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.imageBefore': { title: 'HARVESTING_IMAGE_BEFORE', formatter: DisplayImage, },
      'planting.imageAfter': { title: 'HARVESTING_IMAGE_AFTER', formatter: DisplayImage, },
      'planting.imageInProgress': { title: 'HARVESTING_IMAGE_PROCESSING', formatter: DisplayImage, },
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
      'seeding.code': { title: 'SEEDING.CODE' },
      'planting.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      'planting.code': { title: 'PRODUCTION_PLAN.PLANT_CODE' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'PRODUCTION_PLAN.HARVESTING_CODE' },
      'preliminaryTreatment.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': { title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE' },
      'planting.farmLocation.[coordinates]': { title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates, },
      '': { title: 'EMPTY' },
      'planting.estimatedQuantity': { title: 'PRELIMINARY_TREATMENT' },
      
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.[leader]': { title: 'PRELIMINARY_TREATMENT_LEADER', formatter: DisplayPersonNameByArray, },
      'preliminaryTreatment.[worker]': { title: 'PRELIMINARY_TREATMENT_WORKER', formatter: DisplayPersonNameByArray, },
      'preliminaryTreatment.[technical]': { title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.imageBefore': { title: 'PRELIMINARY_TREATMENT_IMAGE_BEFORE', formatter: DisplayImage, },
      'preliminaryTreatment.imageAfter': { title: 'PRELIMINARY_TREATMENT_IMAGE_AFTER', formatter: DisplayImage, },
      'preliminaryTreatment.imageInProgress': { title: 'PRELIMINARY_TREATMENT_IMAGE_PROCESSING', formatter: DisplayImage, },
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
      'seeding.code': { title: 'SEEDING.CODE' },
      'planting.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      'planting.code': { title: 'PRODUCTION_PLAN.PLANT_CODE' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'PRODUCTION_PLAN.HARVESTING_CODE' },
      'cleaning.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': { title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE' },
      'planting.farmLocation.[coordinates]': { title: 'HARVESTING_LOCATION', formatter: DisplayCoordinates, },
      'cleaning.code': { title: 'PRODUCTION_PLAN.CLEANING.CODE' },
      'planting.estimatedQuantity': { title: 'PRELIMINARY_TREATMENT' },
      
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.[leader]': { title: 'CLEANING_LEADER', formatter: DisplayPersonNameByArray, },
      'cleaning.[worker]': { title: 'CLEANING_WORKER', formatter: DisplayPersonNameByArray, },
      'cleaning.[technical]': { title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.imageBefore': { title: 'CLEANING_IMAGE_BEFORE', formatter: DisplayImage, },
      'cleaning.imageAfter': { title: 'CLEANING_IMAGE_AFTER', formatter: DisplayImage, },
      'cleaning.imageInProgress': { title: 'CLEANING_IMAGE_PROCESSING', formatter: DisplayImage, },
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
      'seeding.code': { title: 'SEEDING.CODE' },
      'planting.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },
      'planting.code': { title: 'PRODUCTION_PLAN.PLANT_CODE' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'PRODUCTION_PLAN.HARVESTING_CODE' },
      'cleaning.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': { title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE' },
      'planting.farmLocation.[coordinates]': { title: 'PACKING_LOCATION', formatter: DisplayCoordinates, },
      'cleaning.code': { title: 'PRODUCTION_PLAN.CLEANING.CODE' },
      'packing.packing.weight': { title: 'PRODUCT_PACKAGING.MODULE_NAME' },
      'packing.code': { title: 'PRODUCTION_PLAN.PACKING.CODE' },
      'packing.estimatedQuantity': { title: 'PACKING_REAL_QUANTITY' },
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.[leader]': { title: 'PACKING_LEADER', formatter: DisplayPersonNameByArray, },
      'packing.[worker]': { title: 'PERSON_ASSIGN_QR', formatter: DisplayPersonNameByArray, },
      'packing.[technical]': { title: 'KCS_ACTIVE_QR', formatter: DisplayPersonNameByArray, },
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
              style: { paddingTop: 20 },
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
              ...SortColumn,
            },
            {
              dataField: 'planting.estimatedHarvestTime',
              text: `Ngày gán mã QR`,
              formatter: (cell: any, row: any, rowIndex: number) => (
                <span>
                  {/* {new Intl.DateTimeFormat('en-GB').format(
                    new Date(row.planting.estimatedHarvestTime),
                  )} */}
                  {new Intl.DateTimeFormat('en-GB').format(new Date())}
                </span>
              ),
              ...SortColumn,
            },
            {
              dataField: 'lastName',
              text: `PERSON_ASSIGN_QR`,
              align: 'center',
              ...SortColumn,
            },
            {
              dataField: 'planting.createdAt',
              text: `Ngày gán mã QR`,
              formatter: (cell: any, row: any, rowIndex: number) => (
                <span>
                  {/* {new Intl.DateTimeFormat('en-GB').format(
                      new Date(row.planting.estimatedHarvestTime),
                    )} */}
                  {new Intl.DateTimeFormat('en-GB').format(new Date())}
                </span>
              ),
              ...SortColumn,
            },
            {
              dataField: 'lastName',
              text: `Người kích hoạt`,
              align: 'center',
              ...SortColumn,
            },
            {
              dataField: 'planting.createdAt',
              text: `Ngày gán mã QR`,
              formatter: (cell: any, row: any, rowIndex: number) => (
                <span>
                  {/* {new Intl.DateTimeFormat('en-GB').format(
                      new Date(row.planting.estimatedHarvestTime),
                    )} */}
                  {new Intl.DateTimeFormat('en-GB').format(new Date())}
                </span>
              ),
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
      'packing.sampleImage': { title: 'PACKING_EXAMPLE_PRODUCTION', formatter: DisplayImage, },
      'packing.packingImage': { title: 'PACKING_IMAGE', formatter: DisplayImage, },
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
      'seeding.code': { title: 'SEEDING.CODE' },     
      'planting.species.name': { title: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' },

      'planting.code': { title: 'PRODUCTION_PLAN.PLANT_CODE' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'PRODUCTION_PLAN.HARVESTING_CODE' },
      'preservation.estimatedStartTime': {
        title: 'PRESERVATION_ESTIMATED_TIME_START',
        formatter: input => DisplayDateTime(input),
      },

      'preliminaryTreatment.code': { title: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE' },
      'preservation.estimatedEndTime': {
        title: 'PRESERVATION_ESTIMATED_TIME_END',
        formatter: input => DisplayDateTime(input),
      },

      'cleaning.code': { title: 'PRODUCTION_PLAN.CLEANING.CODE' },
      'planting.farmLocation.[coordinates]': { title: 'PRESERVATION_LOCATION', formatter: DisplayCoordinates, },

      'packing.code': { title: 'PRODUCTION_PLAN.PACKING.CODE' },
      'preservation.temperature': { title: 'PRODUCTION_MANAGEMENT.PRESERVATION.TEMPERATURE', formatter: DisplayCelcius },
      'preservation.code': { title: 'PRODUCTION_PLAN.PRESERVATION.CODE' },
            
    },
  },
  {
    header: 'ADMIN_INFO',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.[worker]': { title: 'PRESERVATION_WORKER', formatter: DisplayPersonNameByArray, },
      'preservation.[technical]': { title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'IMAGE_STORAGE',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.storageImage': { title: 'PRESERVATION_IMAGE', formatter: DisplayImage, },
    },
  },
];
