import React from 'react';
import { SortColumn } from '../../../common-library/common-consts/const';
import { MasterBodyColumns, RenderInfoDetail } from '../../../common-library/common-types/common-type';
import { DisplayCelcius, DisplayCoordinates, DisplayDateTime, DisplayImage, DisplayPercent, DisplayPersonNameByArray, DisplayTable } from '../../../common-library/helpers/detail-helpers';

export const harvestingDetail: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': { title: 'Mã gieo giống' },
      'planting.estimatedHarvestTime': { title: 'Thời gian thu hoạch dự kiến' },
      'planting.code': { title: 'Mã gieo trồng' },
      'planting.farmLocation.[coordinates]': { title: 'Địa điểm thu hoạch', formatter: DisplayCoordinates, },
      'harvesting.code': { title: 'Mã thu hoạch' },
      'planting.landLot.code': {
        title: 'Lô gieo trồng',
        formatter: (cell: any, row: any) => cell.toUpperCase(),
      },
      'planting.species.name': { title: 'Tên chủng loại' },
      'planting.expectedQuantity': { title: 'Sản lượng dự kiến' },
      'planting.species.barcode': { title: 'GTIN' },
    },
  },
  {
    header: 'THÔNG TIN MÔI TRƯỜNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.temperature': { title: 'Nhiệt độ', formatter: DisplayCelcius, },
      'planting.humidity': { title: 'Độ ẩm', formatter: DisplayPercent, },
      'planting.porosity': { title: 'Độ xốp', formatter: DisplayPercent, },
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.[leader]': { title: 'Tổ trưởng thu hoạch', formatter: DisplayPersonNameByArray, },
      'planting.[worker]': { title: 'Nông dân thu hoạch', formatter: DisplayPersonNameByArray, },
      'planting.[technical]': { title: 'Nhân viên kỹ thuật', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'planting.imageBefore': { title: 'Hình ảnh trước thu hoạch', formatter: DisplayImage, },
      'planting.imageAfter': { title: 'Hình ảnh sau khi thu hoạch', formatter: DisplayImage, },
      'planting.imageInProgress': { title: 'Hình ảnh trong khi thu hoạch', formatter: DisplayImage, },
    },
  },
];

export const PreliminaryTreatmentDetail: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': { title: 'Mã gieo giống' },
      'planting.species.name': { title: 'Tên chủng loại' },
      'planting.code': { title: 'Mã gieo trồng' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'Mã thu hoạch' },
      'preliminaryTreatment.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': { title: 'Mã sơ chế' },
      'planting.farmLocation.[coordinates]': { title: 'Địa điểm thu hoạch', formatter: DisplayCoordinates, },
      '': { title: 'EMPTY' },
      'planting.estimatedQuantity': { title: 'Sản lượng sơ chế (dự kiến)' },
      
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.[leader]': { title: 'Tổ trưởng sơ chế', formatter: DisplayPersonNameByArray, },
      'preliminaryTreatment.[worker]': { title: 'Nông dân sơ chế', formatter: DisplayPersonNameByArray, },
      'preliminaryTreatment.[technical]': { title: 'Nhân viên kỹ thuật', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preliminaryTreatment.imageBefore': { title: 'Hình ảnh trước sơ chế', formatter: DisplayImage, },
      'preliminaryTreatment.imageAfter': { title: 'Hình ảnh sau khi sơ chế', formatter: DisplayImage, },
      'preliminaryTreatment.imageInProgress': { title: 'Hình ảnh trong khi sơ chế', formatter: DisplayImage, },
    },
  },
];

export const CleaningDetail: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': { title: 'Mã gieo giống' },
      'planting.species.name': { title: 'Tên chủng loại' },
      'planting.code': { title: 'Mã gieo trồng' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'Mã thu hoạch' },
      'cleaning.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': { title: 'Mã sơ chế' },
      'planting.farmLocation.[coordinates]': { title: 'Địa điểm thu hoạch', formatter: DisplayCoordinates, },
      'cleaning.code': { title: 'Mã làm sạch' },
      'planting.estimatedQuantity': { title: 'Sản lượng sơ chế (dự kiến)' },
      
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.[leader]': { title: 'Tổ trưởng làm sạch', formatter: DisplayPersonNameByArray, },
      'cleaning.[worker]': { title: 'Nông dân làm sạch', formatter: DisplayPersonNameByArray, },
      'cleaning.[technical]': { title: 'Nhân viên kỹ thuật', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'cleaning.imageBefore': { title: 'Hình ảnh trước làm sạch', formatter: DisplayImage, },
      'cleaning.imageAfter': { title: 'Hình ảnh sau khi làm sạch', formatter: DisplayImage, },
      'cleaning.imageInProgress': { title: 'Hình ảnh trong khi làm sạch', formatter: DisplayImage, },
    },
  },
];

export const PackingDetail: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': { title: 'Mã gieo giống' },
      'planting.species.name': { title: 'Tên chủng loại' },
      'planting.code': { title: 'Mã gieo trồng' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'Mã thu hoạch' },
      'cleaning.estimatedTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => DisplayDateTime(input),
      },
      'preliminaryTreatment.code': { title: 'Mã sơ chế' },
      'planting.farmLocation.[coordinates]': { title: 'Địa điểm đóng gói', formatter: DisplayCoordinates, },
      'cleaning.code': { title: 'Mã làm sạch' },
      'packing.packing.weight': { title: 'Quy cách đóng gói' },
      'packing.code': { title: 'Mã đóng gói' },
      'packing.estimatedQuantity': { title: 'Số lượng gói/lô thực tế' },
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.[leader]': { title: 'Tổ trưởng đóng gói', formatter: DisplayPersonNameByArray, },
      'packing.[worker]': { title: 'Người gán mã QR', formatter: DisplayPersonNameByArray, },
      'packing.[technical]': { title: 'Người kích hoạt mã QR (KCS)', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'THÔNG TIN SẢN PHẨM',
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
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            {
              dataField: 'lastName',
              text: `Mã QR`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
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
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            {
              dataField: 'lastName',
              text: `Người gán mã QR`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
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
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            {
              dataField: 'lastName',
              text: `Người kích hoạt`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
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
              classes: 'text-center',
              headerClasses: 'text-center',
            },
          ]
          return <DisplayTable entities={entities} columns={columns}/>
        },
      },
    },
  },
  
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'packing.sampleImage': { title: 'Sản phẩm đại diện', formatter: DisplayImage, },
      'packing.packingImage': { title: 'Hình ảnh đóng gói', formatter: DisplayImage, },
    },
  },
];

export const PreservationDetail: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'seeding.code': { title: 'Mã gieo giống' },     
      'planting.species.name': { title: 'Tên chủng loại' },

      'planting.code': { title: 'Mã gieo trồng' },
      'planting.species.barcode': { title: 'GTIN' },
      
      'harvesting.code': { title: 'Mã thu hoạch' },
      'preservation.estimatedStartTime': {
        title: 'Thời gian bảo quản dự kiến (từ ngày)',
        formatter: input => DisplayDateTime(input),
      },

      'preliminaryTreatment.code': { title: 'Mã sơ chế' },
      'preservation.estimatedEndTime': {
        title: 'Thời gian bảo quản dự kiến (đến ngày)',
        formatter: input => DisplayDateTime(input),
      },

      'cleaning.code': { title: 'Mã làm sạch' },
      'planting.farmLocation.[coordinates]': { title: 'Địa điểm bảo quản', formatter: DisplayCoordinates, },

      'packing.code': { title: 'Mã đóng gói' },
      'preservation.temperature': { title: 'Nhiệt độ bảo quản', formatter: DisplayCelcius },
      'preservation.code': { title: 'Mã bảo quản' },
            
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.[worker]': { title: 'Nhân viên bảo quản', formatter: DisplayPersonNameByArray, },
      'preservation.[technical]': { title: 'Nhân viên kỹ thuật', formatter: DisplayPersonNameByArray, },
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'col-12',
    titleClassName: 'col-md-2 col-4 mb-10',
    dataClassName: 'col-md-4 col-8 mb-10 pl-5',
    data: {
      'preservation.storageImage': { title: 'Hình ảnh kho lạnh', formatter: DisplayImage, },
    },
  },
];
