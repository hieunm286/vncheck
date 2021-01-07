import React from "react";
import {RenderInfoDetail} from "../../common-library/common-types/common-type";
import {
  Display3Info,
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime,
  DisplayDownloadLink,
  DisplayImage,
  DisplayPercent
} from "../../common-library/helpers/detail-helpers";


export const producerInfo: RenderInfoDetail = [{
  header: 'ENTERPRISE_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'enterprise.name': {title: 'ENTERPRISE.NAME'},
    'enterprise.taxId': {title: 'ENTERPRISE.TAX_ID'},
    'enterprise.address': {title: 'ENTERPRISE.ADDRESS'},
    'enterprise.phone': {title: 'ENTERPRISE.PHONE'},
    'enterprise.presentedBy': {title: 'ENTERPRISE.REPRESENTED_BY'},
    'enterprise.gln': {title: 'ENTERPRISE.GLN'},
  }
}];

export const commonInfo: RenderInfoDetail = [{
  header: 'GENERAL_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.seeding.species.name': {title: 'SEEDING.SPECIES_NAME',},
    'productPlan.seeding.species.barcode': {title: 'SEEDING.GTIN',},
  }
}]
export const seedingInfo: RenderInfoDetail = [{
  header: 'SEEDING_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.seeding.certificates': {
      title: 'SEEDING.CERTIFICATE',
      formatter: (input) => DisplayDownloadLink(input, 'path')
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
      title: 'SEEDING_AREA',
      formatter: (input) => {
        return (<>{input ? (input + ' m2') : ''}</>)
      },
    },
    'productPlan.seeding.temperature': {
      title: 'TEMPERATURE',
      formatter: DisplayCelcius,
    },
    'productPlan.seeding.humidity': {
      title: 'HUMIDITY',
      formatter: DisplayPercent,
    },
    'productPlan.seeding.porosity': {
      title: 'POROSITY',
      formatter: DisplayPercent,
    },
    'productPlan.planting.imageBefore': {
      title: 'PLANTING_IMAGE_BEFORE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.seeding.landLotImage': {
      title: 'PLANTING_LAND_LOT_IMAGE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.seeding.manager.fullName': {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.seeding.[leader].fullName': {
      title: 'ADMIN_SEEDING_LEADER',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.seeding.[technical].fullName': {
      title: 'ROLE.TECHNICIAN',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.seeding.[worker].fullName': {
      title: 'SEEDING_WORKER',
      formatter: (input) => {
        console.log(input);
        return DisplayArray(input)
      }
    },
  }
}];

export const plantingInfo: RenderInfoDetail = [{
  header: 'PLANTING_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.planting.numberOfPlants': {
      title: 'PLATING_QUANTITY',
    },
    'productPlan.planting.area': {
      title: 'PLANTING_AREA',
      formatter: (input) => {
        return (<>{input + ' m2'}</>)
      },
    },
    'productPlan.planting.farmLocation.[coordinates]': {
      title: 'PLANTING.FARM_LOCATION',
      formatter: DisplayCoordinates
    },
    'productPlan.planting.landLotImage': {
      title: 'PLANTING_LAND_LOT_IMAGE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.planting.imageBefore': {
      title: 'PLANTING_IMAGE_BEFORE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.planting.temperature': {
      title: 'TEMPERATURE',
      formatter: DisplayCelcius,
    },
    'productPlan.planting.humidity': {
      title: 'HUMIDITY',
      formatter: DisplayPercent,
    },
    'productPlan.planting.porosity': {
      title: 'POROSITY',
      formatter: DisplayPercent,
    },
    'productPlan.planting.manager.fullName': {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.planting.[leader].fullName': {
      title: 'ADMIN_SEEDING_LEADER',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.planting.[technical].fullName': {
      title: 'ROLE.TECHNICIAN',
      formatter: (input) => DisplayArray(input)
    },
    'productPlan.planting.[worker].fullName': {
      title: 'PLANTING_WORKER',
      formatter: (input) => DisplayArray(input)
    },
  }
}];

export const harvestingInfo : RenderInfoDetail = [{
  header: 'HARVESTING_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.harvesting.time': {
      keyField: 'productPlan.harvesting', title: 'PRODUCTION_PLAN.HARVEST_DATE', formatter: (e) => {
        return e ? (<>{DisplayDateTime(e.startTime)} {e.endTime && (<> - {DisplayDateTime(e.endTime)}</>)}</>) : (<></>);
      }
    },
    'productPlan.harvesting.realQuantity': {
      title: 'ADMIN_HARVESTING_LEADER',
    },
    'productPlan.harvesting.imageBefore': {
      title: 'HARVESTING_IMAGE_BEFORE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.harvesting.imageInProgress': {
      title: 'HARVESTING_IMAGE_PROCESSING',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.harvesting.imageAfter' : {
      title: 'HARVESTING_IMAGE_AFTER',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.harvesting.temperature' : {
      title: 'TEMPERATURE',
      formatter: DisplayCelcius
    },
    'productPlan.harvesting.humidity' : {
      title: 'HUMIDITY',
      formatter: DisplayPercent
    },
    'productPlan.harvesting.porosity' : {
      title: 'POROSITY',
      formatter: DisplayPercent
    },
    'productPlan.harvesting.manager.fullName' : {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.harvesting.[leader].fullName' : {
      title: 'ADMIN_HARVESTING_LEADER',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.harvesting.[technical].fullName' : {
      title: 'ROLE.TECHNICIAN',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.harvesting.[worker].fullName' : {
      title: 'HARVESTING_WORKER',
      formatter: (input) => DisplayArray(input),
    },
  }
}];

export const preliminaryTreatmentInfo : RenderInfoDetail = [{
  header: 'PRELIMINARY_TREATMENT_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.preliminaryTreatment.time': {
      title: 'Thời gian sơ chế',
      formatter: (input, entity) => {
        return (<>
            {(entity.productPlan.preliminaryTreatment.startTime && entity.productPlan.preliminaryTreatment.endTime)
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
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.preliminaryTreatment.imageInProgress' : {
      title: 'Hình ảnh sơ chế',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.preliminaryTreatment.imageAfter' : {
      title: 'Hình ảnh sau khi sơ chế',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
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

export const cleaningInfo : RenderInfoDetail = [{
  header: 'CLEANING_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.cleaning.time': {
      title: 'Thời gian làm sạch',
      formatter: (input, entity) => {
        return (<>
            {(entity.productPlan.cleaning.startTime && entity.productPlan.cleaning.endTime)
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
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.cleaning.imageInProgress' : {
      title: 'Hình ảnh khi làm sạch',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.cleaning.imageAfter' : {
      title: 'Hình ảnh sau khi làm sạch',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
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

export const packingInfo : RenderInfoDetail = [{
  header: 'PACKING_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.harvesting.[imageInprogress].[coordinates]': {
      title: 'Địa điểm Farm đóng gói',
      formatter: DisplayCoordinates
    },
    'productPlan.packing.packing.code': {
      title: 'Quy cách đóng gói',
    },
    'productPlan.packing.3' : {
      title: 'Hạn sử dụng',
    },
    'productPlan.packing.sampleImage' : {
      title: 'Hình ảnh sản phẩm',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.packing.packingImage' : {
      title: 'Hình ảnh sau khi đóng gói',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
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

export const preservationInfo : RenderInfoDetail = [{
  header: 'PRESERVATION_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'productPlan.preservation.time': {
      title: 'Thời gian bảo quản',
      formatter: (input, entity) => {
        return (<>
            {(entity.productPlan.preservation.startTime && entity.productPlan.preservation.endTime)
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
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
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



export const sellStatus : RenderInfoDetail = [{
  
  header: 'STATUS_INFO',
  className: 'col-12',
  titleClassName: 'col-3 mb-10',
  dataClassName: 'col-9 mb-10 pl-5',
  data: {
    'sellStatus.status': {
      title: 'Trạng thái',
      formatter: (sold: boolean) => (<>{sold ? 'Đã bán' : 'Còn hàng'}</>),
    },
    'sellStatus.dateOfSell': {
      title: 'Ngày bán',
      formatter: (date: string) => DisplayDateTime(date),
    },
    'sellStatus.sellAddress': {
      title: 'Nơi bán',
      formatter: (arr: string[]) => DisplayArray(arr),
    },
    'sellStatus.seller.fullName': {
      title: 'Nhân viên bán hàng',
    },
    'sellStatus.customerPhoneNumber': {
      title: 'Số điện thoại khách hàng',
    }

  },
}];



