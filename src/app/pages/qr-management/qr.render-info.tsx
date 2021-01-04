import React from "react";
import {RenderInfoDetail} from "../../common-library/common-types/common-type";
import {
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime, DisplayImage,
  DisplayLink, DisplayPercent
} from "../../common-library/helpers/detail-helpers";

const producerInfo: RenderInfoDetail = [{
  header: 'Doanh nghiệp sản xuất',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    '_name': {title: 'Tên doanh nghiệp', formatter: (input: any) => (<>UniFarm</>)},
    '_tax': {title: 'Mã số thuế', formatter: (input: any) => (<>0123456789</>)},
    '_addr': {title: 'Địa chỉ', formatter: (input: any) => (<>123 Trung Kính, Cầu Giấy</>)},
    '_representer': {title: 'Người đại diện', formatter: (input: any) => (<>Nguyễn Văn A</>)},
    '_gln': {title: 'GLN', formatter: (input: any) => (<>123456</>)},
  }
}]

const commonInfo: RenderInfoDetail = [{
  header: 'Thông tin chung',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'seeding.species.name': {title: 'SEEDING.SPECIES_NAME',},
    'seeding.species.barcode': {title: 'SEEDING.GTIN',},
  }
}]
const seedingInfo: RenderInfoDetail = [{
  header: 'Thông tin gieo giống',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'seeding.certificates': {
      title: 'SEEDING.CERTIFICATE',
      formatter: (input)=>DisplayLink(input,'path')
    },
    'seeding.buyInvoice': {
      title: 'SEEDING.INVOICE',
      formatter: (input)=>DisplayLink(input,'path')
    },
    'seeding.seedingTime': {
      title: 'SEEDING.SEEDING_TIME',
      formatter: (input) => DisplayDateTime(input)
    },
    'seeding.farmLocation.[coordinates]': {
      title: 'SEEDING.FARM_LOCATION',
      formatter: DisplayCoordinates
    },
    'seeding.numberOfSeed': {title: 'SEEDING.NUMBER_OF_SEED',},
    'seeding.landLot.code': {title: 'SEEDING.LAND_LOT',},
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
    'planting.imageAfter': {
      title: 'Hình ảnh trước khi đưa vào nuôi trồng',
      formatter: DisplayImage
    },
    'seeding.landLotImage': {
      title: 'Hình ảnh định vị lô luống',
      formatter: DisplayImage
    },
    'planting.manager.fullName': {
      title: 'Thông tin Giám đốc/TGĐ',
    },
    'planting.[leader].fullName': {
      title: 'Tổ trưởng gieo trồng',
      formatter: (input) => DisplayArray(input)
    },
    'planting.[worker].fullName': {
      title: 'Công nhân gieo trồng',
      formatter: (input) => DisplayArray(input)
    },
  }
}]
const plantingInfo: RenderInfoDetail = [{
  header: 'Thông tin gieo trồng',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'planting.numberOfPlants': {
      title: 'Số cây con trồng',
    },
    'planting.area': {
      title: 'Diện tích gieo trồng',
    },
    'planting.farmLocation.[coordinates]': {
      title: 'Địa chỉ farm trồng',
      formatter: DisplayCoordinates
    },
    'seeding.seedingTime': {
      title: 'SEEDING.SEEDING_TIME',
      formatter: (input) => DisplayDateTime(input)
    },
    'seeding.farmLocation.[coordinates]': {
      title: 'SEEDING.FARM_LOCATION',
      formatter: DisplayCoordinates
    },
    'seeding.numberOfSeed': {title: 'SEEDING.NUMBER_OF_SEED',},
    'seeding.landLot.code': {title: 'SEEDING.LAND_LOT',},
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
    'planting.imageAfter': {
      title: 'Hình ảnh trước khi đưa vào nuôi trồng',
      formatter: DisplayImage
    },
    'seeding.landLotImage': {
      title: 'Hình ảnh định vị lô luống',
      formatter: DisplayImage
    },
    'planting.manager.fullName': {
      title: 'Thông tin Giám đốc/TGĐ',
    },
    'planting.[leader].fullName': {
      title: 'Tổ trưởng gieo trồng',
      formatter: (input) => DisplayArray(input)
    },
    'planting.[worker].fullName': {
      title: 'Công nhân gieo trồng',
      formatter: (input) => DisplayArray(input)
    },
  }
}]


export const QrRenderDetail = [...producerInfo, ...commonInfo, ...seedingInfo];