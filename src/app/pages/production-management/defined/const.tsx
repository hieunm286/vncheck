import React from 'react';
import {SortColumn} from '../../../common-library/common-consts/const';
import {RenderInfoDetail} from "../../../common-library/common-types/common-type";

export const harvestingDetail: RenderInfoDetail = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'row',
    data: {
      'seeding.code': {title: 'Mã gieo giống',},
      'planting.code': {title: 'Mã gieo trồng',},
      'harvesting.code': {title: 'Mã thu hoạch',},
      'planting.species.name': {title: 'Tên chủng loại',},
      'planting.species.barcode': {title: 'GTIN',},
      'planting.estimatedHarvestTime': {title: 'Thời gian thu hoạch dự kiến',},
      'planting.landLot.code': {
        title: 'Lô gieo trồng',
        formatter: (cell: any, row: any, rowIndex: any) => cell.toUpperCase(),
      },
      'planting.expectedQuantity': {title: 'Sản lượng dự kiến',},
    }
  },
  {
    header: 'THÔNG TIN MÔI TRƯỜNG',
    className: 'row',
    data: {
      'planting.temperature': {title: 'Nhiệt độ',},
      'planting.humidity': {title: 'Độ ẩm',},
      'planting.porosity': {title: 'Độ xốp',},
    },
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'row',
    data: {
      'planting.[leader].lastName': {title: 'Tổ trưởng thu hoạch',},
      'planting.[worker].lastName': {title: 'Nông dân thu hoạch',},
      'planting.[technical].lastName': {title: 'Nhân viên kỹ thuật',},
    },
  },
  {
    header: 'HÌNH ẢNH',
    className: 'row',
    data: {
      'planting.imageBefore': {title: 'Hình ảnh trước thu hoạch',},
      'planting.imageAfter': {title: 'Hình ảnh sau khi thu hoạch',},
    },
  },
];

export const PreliminaryTreatmentDetail:any = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'row',
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
          type: 'link',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
          path: '/production-plan/planting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã thu hoạch',
          keyField: 'harvesting.code',
          path: '/production-management/harvesting',
          params: '_id',
        },
        {
          type: 'string',
          title: 'Mã sơ chế',
          keyField: 'preliminaryTreatment.code',
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
          type: 'date-time',
          title: 'Thời gian sơ chế',
          keyField: 'preliminaryTreatment.createdAt',
        },
        {
          type: 'string',
          title: 'Sản lượng sau sơ chế',
          keyField: 'preliminaryTreatment.quantity',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'row',
    data: [
      [
        {
          type: 'string',
          title: 'Tổ trưởng sơ chế',
          keyField: 'preliminaryTreatment.[leader].lastName',
        },
        {
          type: 'string',
          title: 'Nông dân sơ chế',
          keyField: 'preliminaryTreatment.[worker].lastName',
        },
        {
          type: 'string',
          title: 'Nhân viên sơ chế',
          keyField: 'preliminaryTreatment.[technical].lastName',
        },
      ],
      [],
    ],
  },
  {
    header: 'HÌNH ẢNH',
    className: 'row',
    data: [
      [
        {
          type: 'image',
          title: 'Hình ảnh trước sơ chế',
          keyField: 'planting.imageBefore',
        },
        {
          type: 'image',
          title: 'Hình ảnh thực hiện sơ chế',
          keyField: 'planting.imageBefore',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh sau khi sơ chế',
          keyField: 'planting.imageAfter',
        },
      ],
    ],
  },
];

export const CleaningDetail :any= [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'row',
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
          type: 'link',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
          path: '/production-plan/planting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã thu hoạch',
          keyField: 'harvesting.code',
          path: '/production-management/harvesting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã sơ chế',
          keyField: 'harvesting.code',
          path: '/production-management/preliminaryTreatment',
          params: '_id',
        },
        {
          type: 'string',
          title: 'Mã làm sạch',
          keyField: 'cleaning.code',
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
          type: 'date-time',
          title: 'Thời gian làm sạch',
          keyField: 'cleaning.createdAt',
        },
        {
          type: 'string',
          title: 'Sản lượng sau sơ chế',
          keyField: 'cleaning.quantity',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'row',
    data: [
      [
        {
          type: 'string',
          title: 'Tổ trưởng làm sạch',
          keyField: 'cleaning.[leader].lastName',
        },
        {
          type: 'string',
          title: 'Nông dân làm sạch',
          keyField: 'cleaning.[worker].lastName',
        },
        {
          type: 'string',
          title: 'Nhân viên làm sạch',
          keyField: 'cleaning.[technical].lastName',
        },
      ],
      [],
    ],
  },
  {
    header: 'HÌNH ẢNH',
    className: 'row',
    data: [
      [
        {
          type: 'image',
          title: 'Hình ảnh trước làm sạch',
          keyField: 'planting.imageBefore',
        },
        {
          type: 'image',
          title: 'Hình ảnh thực hiện làm sạch',
          keyField: 'planting.imageBefore',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh sau khi làm sạch',
          keyField: 'planting.imageAfter',
        },
      ],
    ],
  },
];

export const PackingDetail:any = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'row',
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
          type: 'link',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
          path: '/production-plan/planting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã thu hoạch',
          keyField: 'harvesting.code',
          path: '/production-management/harvesting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã sơ chế',
          keyField: 'harvesting.code',
          path: '/production-management/preliminaryTreatment',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã làm sạch',
          keyField: 'harvesting.code',
          path: '/production-management/cleaning',
          params: '_id',
        },
        {
          type: 'string',
          title: 'Mã đóng gói',
          keyField: 'packing.code',
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
          type: 'date-time',
          title: 'Thời gian đóng gói',
          keyField: 'cleaning.createdAt',
        },
        {
          type: 'string',
          title: 'Quy cách đóng gói',
          keyField: 'packing.packing.weight',
        },
        {
          type: 'string',
          title: 'Số lượng gói/lô thực tế',
          keyField: 'packing.quantity',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'row',
    data: [
      [
        {
          type: 'string',
          title: 'Tổ trưởng làm sạch',
          keyField: 'cleaning.[leader].lastName',
        },
        {
          type: 'string',
          title: 'Nông dân làm sạch',
          keyField: 'cleaning.[worker].lastName',
        },
        {
          type: 'string',
          title: 'Nhân viên làm sạch',
          keyField: 'cleaning.[technical].lastName',
        },
      ],
      [],
    ],
  },
  {
    header: 'THÔNG TIN SẢN PHẨM',
    data: [
      [
        {
          type: 'table',
          title: 'Thông tin Giám đốc/TGĐ',
          keyField: 'planting.worker',
          columns: {
            _id: {
              dataField: '_id',
              text: 'STT',
              formatter: (cell: any, row: any, rowIndex: number) => <p>{rowIndex + 1}</p>,
              style: {paddingTop: 20},
            },
            madinhdanh: {
              dataField: 'firstName',
              text: `Mã định danh`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            lastName: {
              dataField: 'lastName',
              text: `Mã QR`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            fullName: {
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
            createdBy: {
              dataField: 'lastName',
              text: `Người gán mã QR`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            activeDate: {
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
            activeBy: {
              dataField: 'lastName',
              text: `Người kích hoạt`,
              align: 'center',
              ...SortColumn,
              classes: 'text-center',
              headerClasses: 'text-center',
            },
            expiryDate: {
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
          },
        },
      ],
      [],
    ],
  },
  {
    header: 'HÌNH ẢNH',
    className: 'row',
    data: [
      [
        {
          type: 'image',
          title: 'Hình ảnh trước làm sạch',
          keyField: 'planting.imageBefore',
        },
        {
          type: 'image',
          title: 'Hình ảnh thực hiện làm sạch',
          keyField: 'planting.imageBefore',
        },
      ],
      [
        {
          type: 'image',
          title: 'Hình ảnh sau khi làm sạch',
          keyField: 'planting.imageAfter',
        },
      ],
    ],
  },
];

export const PreservationDetail:any = [
  {
    header: 'THÔNG TIN CHUNG',
    className: 'row',
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
          type: 'link',
          title: 'Mã gieo trồng',
          keyField: 'planting.code',
          path: '/production-plan/planting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã thu hoạch',
          keyField: 'harvesting.code',
          path: '/production-management/harvesting',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã sơ chế',
          keyField: 'harvesting.code',
          path: '/production-management/preliminaryTreatment',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã làm sạch',
          keyField: 'harvesting.code',
          path: '/production-management/cleaning',
          params: '_id',
        },
        {
          type: 'link',
          title: 'Mã đóng gói',
          keyField: 'harvesting.code',
          path: '/production-management/packing',
          params: '_id',
        },
        {
          type: 'string',
          title: 'Mã bảo quản',
          keyField: 'preservation.code',
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
          type: 'date-time',
          title: 'Thời gian bảo quản dự kiến',
          keyField: 'preservation.createdAt',
        },
        {
          type: 'string',
          title: 'Nhiệt độ bảo quản',
          keyField: 'preservation.temperature',
        },
      ],
    ],
  },
  {
    header: 'THÔNG TIN QUẢN TRỊ',
    className: 'row',
    data: [
      [
        {
          type: 'string',
          title: 'Nhân viên bảo quản',
          keyField: 'preservation.[worker].lastName',
        },
        {
          type: 'string',
          title: 'Nhân viên kỹ thuật',
          keyField: 'preservation.[technical].lastName',
        },
      ],
      [],
    ],
  },
  {
    header: 'HÌNH ẢNH',
    className: 'row',
    data: [
      [
        {
          type: 'image',
          title: 'Hình ảnh kho lạnh',
          keyField: 'planting.imageBefore',
        },
      ],
      [],
    ],
  },
];
  