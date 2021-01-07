import React from "react";
import {MasterBodyColumns, RenderInfoDetail} from "../../common-library/common-types/common-type";
import {
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime, DisplayDiffTime, DisplayImage,
  DisplayDownloadLink, DisplayPercent, DisplayTable
} from "../../common-library/helpers/detail-helpers";

import { mobileSaleMock } from './qr-mock';

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
}];

const commonInfo: RenderInfoDetail = [{
  header: 'Thông tin chung',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.seeding.species.name': {title: 'SEEDING.SPECIES_NAME',},
    'productPlan.seeding.species.barcode': {title: 'SEEDING.GTIN',},
  }
}]
const seedingInfo: RenderInfoDetail = [{
  header: 'Thông tin gieo giống',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.seeding.certificates': {
      title: 'SEEDING.CERTIFICATE',
      formatter: (input)=>DisplayDownloadLink(input,'path')
    },
    'productPlan.seeding.buyInvoice': {
      title: 'SEEDING.INVOICE',
      formatter: (input)=>DisplayDownloadLink(input,'path')
    },
    'productPlan.seeding.seedingTime': {
      title: 'SEEDING.SEEDING_TIME',
      formatter: (input) => DisplayDateTime(input)
    },
    'productPlan.seeding.farmLocation.[coordinates]': {
      title: 'SEEDING.FARM_LOCATION',
      formatter: DisplayCoordinates
    },
    'productPlan.seeding.numberOfSeed': {title: 'SEEDING.NUMBER_OF_SEED',},
    'productPlan.seeding.landLot.code': {title: 'SEEDING.LAND_LOT',},
    'productPlan.seeding.area': {
      title: 'Diện tích gieo/ươm',
      formatter: (input) => {return (<>{input + 'm2'}</>)},
    },
    'productPlan.seeding.temperature': {
      title: 'Nhiệt độ',
      formatter: DisplayCelcius,
    },
    'productPlan.seeding.humidity': {
      title: 'Độ ẩm',
      formatter: DisplayPercent,
    },
    'productPlan.seeding.porosity': {
      title: 'Độ xốp',
      formatter: DisplayPercent,
    },
    'productPlan.seeding.imageAfter': {
      title: 'Hình ảnh trước khi đưa vào nuôi trồng',
      formatter: DisplayImage
    },
    'productPlan.seeding.landLotImage': {
      title: 'Hình ảnh định vị lô luống',
      formatter: DisplayImage
    },
    'productPlan.seeding.manager.fullName': {
      title: 'Tổng giám đốc',
    },
    'productPlan.seeding.[leader].fullName': {
      title: 'Tổ trưởng',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.seeding.[technical].fullName': {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.seeding.[worker].fullName': {
      title: 'Công nhân thực hiện',
      formatter: (input) => {console.log(input); return DisplayArray(input)}
    },
  }
}];

const plantingInfo: RenderInfoDetail = [{
  header: 'Thông tin gieo trồng',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.planting.numberOfPlants': {
      title: 'Số cây đã con trồng',
    },
    'productPlan.planting.area': {
      title: 'Diện tích gieo trồng',
    },
    'productPlan.planting.farmLocation.[coordinates]': {
      title: 'PLANTING.FARM_LOCATION',
      formatter: DisplayCoordinates
    },
    'productPlan.planting.landLotImage': {
      title: 'Hình ảnh định vị lô luống',
      formatter: DisplayImage
    },
    'productPlan.planting.imageAfter': {
      title: 'Hình ảnh khi đưa vào nuôi trồng',
      formatter: DisplayImage
    },
    'productPlan.planting.temperature': {
      title: 'Nhiệt độ',
      formatter: DisplayCelcius,
    },
    'productPlan.planting.humidity': {
      title: 'Độ ẩm',
      formatter: DisplayPercent,
    },
    'productPlan.planting.porosity': {
      title: 'Độ xốp',
      formatter: DisplayPercent,
    },
    'productPlan.planting.manager.fullName': {
      title: 'Tổng giám đốc',
    },
    'productPlan.planting.[leader].fullName': {
      title: 'Tổ trưởng',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.planting.[technical].fullName': {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.planting.[worker].fullName': {
      title: 'Nông dân',
      formatter: (input) => DisplayArray(input)
    },
  }
}];

const harvestingInfo : RenderInfoDetail = [{
  header: 'THÔNG TIN THU HOẠCH',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.harvesting.time' : {
      title: 'Thời gian thu hoạch',
      formatter: (input, entity) => {return (
        <>{ (entity.productPlan.harvesting.startTime && entity.productPlan.harvesting.endTime) 
          ?
            (entity.productPlan.harvesting.startTime.toLocaleDateString() + ', ' + 
            entity.productPlan.harvesting.endTime.toLocaleDateString())
          : 
            ''
        }</>
      )},
    },
    'productPlan.harvesting.realQuantity' : {
      title: 'Sản lượng thực tế',
    },
    'productPlan.harvesting.imageBefore' : {
      title: 'Hình ảnh trước khi thu hoạch',
      formatter: DisplayImage
    },
    'productPlan.harvesting.imageInProgress' : {
      title: 'Hình ảnh khi thu hoạch',
      formatter: DisplayImage
    },
    'productPlan.harvesting.imageAfter' : {
      title: 'Hình ảnh sau khi thu hoạch',
      formatter: DisplayImage
    },
    'productPlan.harvesting.temperature' : {
      title: 'Nhiệt độ',
      formatter: DisplayCelcius
    },
    'productPlan.harvesting.humidity' : {
      title: 'Độ ẩm',
      formatter: DisplayPercent
    },
    'productPlan.harvesting.porosity' : {
      title: 'Độ xốp',
      formatter: DisplayPercent
    },
    'productPlan.harvesting.manager.fullName' : {
      title: 'Tổng giám đốc',
    },
    'productPlan.harvesting.[leader].fullName' : {
      title: 'Tổ trưởng',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.harvesting.[technical].fullName' : {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.harvesting.[worker].fullName' : {
      title: 'Nông dân',
      formatter: (input) => DisplayArray(input),
    },
  }
}];

const preliminaryTreatmentInfo : RenderInfoDetail = [{
  header: 'THÔNG TIN SƠ CHẾ',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.preliminaryTreatment.time' : {
      title: 'Thời gian sơ chế',
      formatter: (input, entity) => {return (<>
        { (entity.productPlan.preliminaryTreatment.startTime && entity.productPlan.preliminaryTreatment.endTime) 
          ?
            (entity.productPlan.preliminaryTreatment.startTime.toLocaleDateString() + ', ' + 
            entity.productPlan.preliminaryTreatment.endTime.toLocaleDateString())
          : 
            ''
        }</>
      )},
    },
    'productPlan.preliminaryTreatment.realQuantity' : {
      title: 'Sản lượng sau sơ chế',
    },
    'productPlan.preliminaryTreatment.imageBefore' : {
      title: 'Hình ảnh trước khi sơ chế',
      formatter: DisplayImage
    },
    'productPlan.preliminaryTreatment.imageInProgress' : {
      title: 'Hình ảnh sơ chế',
      formatter: DisplayImage
    },
    'productPlan.preliminaryTreatment.imageAfter' : {
      title: 'Hình ảnh sau khi sơ chế',
      formatter: DisplayImage
    },
    'productPlan.preliminaryTreatment.manager.fullName' : {
      title: 'Tổng giám đốc',
    },
    'productPlan.preliminaryTreatment.[leader].fullName' : {
      title: 'Tổ trưởng',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.preliminaryTreatment.[technical].fullName' : {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.preliminaryTreatment.[worker].fullName' : {
      title: 'Nông dân',
      formatter: (input) => DisplayArray(input),
    },
  }
}];

const cleaningInfo : RenderInfoDetail = [{
  header: 'THÔNG TIN LÀM SẠCH',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.cleaning.time' : {
      title: 'Thời gian làm sạch',
      formatter: (input, entity) => {return (<>
        { (entity.productPlan.cleaning.startTime && entity.productPlan.cleaning.endTime) 
          ?
            (entity.productPlan.cleaning.startTime.toLocaleDateString() + ', ' + 
            entity.productPlan.cleaning.endTime.toLocaleDateString())
          : 
            ''
        }</>
      )},
    },
    'productPlan.cleaning.realQuantity' : {
      title: 'Sản lượng sau làm sạch',
    },
    'productPlan.cleaning.imageBefore' : {
      title: 'Hình ảnh trước khi làm sạch',
      formatter: DisplayImage
    },
    'productPlan.cleaning.imageInProgress' : {
      title: 'Hình ảnh khi làm sạch',
      formatter: DisplayImage
    },
    'productPlan.cleaning.imageAfter' : {
      title: 'Hình ảnh sau khi làm sạch',
      formatter: DisplayImage
    },
    'productPlan.cleaning.manager.fullName' : {
      title: 'Tổng giám đốc',
    },
    'productPlan.cleaning.[leader].fullName' : {
      title: 'Tổ trưởng',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.cleaning.[technical].fullName' : {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.cleaning.[worker].fullName' : {
      title: 'Nông dân',
      formatter: (input) => DisplayArray(input),
    },
  }
}];

const packingInfo : RenderInfoDetail = [{
  header: 'THÔNG TIN ĐÓNG GÓI',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.harvesting.[imageInprogress].[coordinates]' : {
      title: 'Địa điểm Farm đóng gói',
      formatter: DisplayCoordinates
    },
    'productPlan.packing.packing.code' : {
      title: 'Quy cách đóng gói',
    },
    'productPlan.packing.3' : {
      title: 'Hạn sử dụng',
    },
    'productPlan.packing.sampleImage' : {
      title: 'Hình ảnh sản phẩm',
      formatter: DisplayImage
    },
    'productPlan.packing.packingImage' : {
      title: 'Hình ảnh sau khi đóng gói',
      formatter: DisplayImage
    },
    'createdAt' : {
      title: 'Ngày gán QR',
      formatter: (input) => DisplayDateTime(input)
    },
    'activeBy.fullName' : {
      title: 'Người gán QR',
    },
    'createdBy.fullName' : {
      title: 'Người kích hoạt',
    },
    'activeAt' : {
      title: 'Ngày kích hoạt',
      formatter: (input) => DisplayDateTime(input)
    },
    'productPlan.packing.manager.fullName' : {
      title: 'Tổng giám đốc',
    },
    'productPlan.packing.[leader].fullName' : {
      title: 'Tổ trưởng',
      formatter: (input) => DisplayArray(input),
    },
  }
}];

const preservationInfo : RenderInfoDetail = [{
  header: 'THÔNG TIN BẢO QUẢN',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.preservation.time' : {
      title: 'Thời gian bảo quản',
      formatter: (input, entity) => {return (<>
        { (entity.productPlan.preservation.startTime && entity.productPlan.preservation.endTime) 
          ?
            (entity.productPlan.preservation.startTime.toLocaleDateString() + ', ' + 
            entity.productPlan.preservation.endTime.toLocaleDateString())
          : 
            ''
        }</>
      )},
    },
    'productPlan.preservation.location.[coordinates]' : {
      title: 'Địa điểm bảo quản',
      formatter: DisplayCoordinates,
    },
    'productPlan.preservation.temperature' : {
      title: 'Nhiệt độ bảo quản',
      formatter: DisplayCelcius
    },
    'productPlan.preservation.storageImage' : {
      title: 'Hình ảnh bảo quản',
      formatter: DisplayImage
    },
    'productPlan.preservation.[technical].fullName' : {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.preservation.[worker].fullName' : {
      title: 'Nhân viên',
      formatter: (input) => DisplayArray(input),
    },
  }
}];


const shippingInfoColumns : MasterBodyColumns = [
  {
    dataField: 'exportTime',
    text: 'Thời gian xuất hàng',
    formatter: (date: string) => {return DisplayDateTime(date);}
  },
  {
    text: 'Địa điểm xuất hàng',
    dataField: 'exportAddress',
    formatter: (input) => {return DisplayArray(input)},
  },
  {
    text: 'Nhân viên xuất hàng',
    dataField: 'exportStaff.fullName',
  },
  {
    text: 'Nhân viên vận chuyển',
    dataField: 'shipper.fullName'
  },
];

const distributionInfoColumns : MasterBodyColumns = [
  ...shippingInfoColumns,
  {
    dataField: 'receiveTime',
    text: 'Thời gian nhận hàng',
    formatter: (date: string) => {return DisplayDateTime(date);}
  },
  {
    text: 'Địa điểm nhận hàng',
    dataField: 'receiveAddress',
    formatter: (input) => {return DisplayArray(input)},
  },
  {
    dataField: 'receiveStaff.fullName',
    text: 'Nhân viên xuất hàng',
  },
  {
    dataField: 'image.path',
    text: 'Hình ảnh',
  },
];


const shippingInfo : RenderInfoDetail = [{
  
  header: 'THÔNG TIN VẬN CHUYỂN',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'sellStatus': {
      title: '',
      formatter: (entity: any[]) => {

        return <DisplayTable entities={mobileSaleMock.shippingInfo} columns={shippingInfoColumns} />
      }
    }
  },
}];

const distributionInfo : RenderInfoDetail = [{
  
  header: 'THÔNG TIN PHÂN PHỐI',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'sellStatus': {
      title: '',
      formatter: (entity: any[]) => {

        return <DisplayTable entities={mobileSaleMock.distributionInfo} columns={distributionInfoColumns} />
      }
    }
  },
}];

const sellStatus : RenderInfoDetail = [{
  
  header: 'TRẠNG THÁI',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'sellStatus.status': {
      title: 'Trạng thái',
      formatter: (sold: boolean) => (<>{sold ? 'Đã bán' : 'Còn hàng'}</>),
    },
  },
}];



export const QrRenderDetail: RenderInfoDetail = [
  ...seedingInfo,
  ...plantingInfo,
  ...harvestingInfo,
  ...preliminaryTreatmentInfo,
  ...cleaningInfo,
  ...packingInfo,
  ...preservationInfo,
  ...shippingInfo,
  ...distributionInfo,
  ...sellStatus
];