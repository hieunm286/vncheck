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
    'productPlan.seeding.[technical].user.fullName': {
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
        return (<>{input ? (input + ' m2') : ''}</>)
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
    'productPlan.planting.[technical].user.fullName': {
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
      keyField: 'productPlan.harvesting', title: 'HARVESTING_DATE', formatter: (e) => {
        return e ? (<>{DisplayDateTime(e.startTime)} {e.endTime && (<> - {DisplayDateTime(e.endTime)}</>)}</>) : (<></>);
      }
    },
    'productPlan.harvesting.quantity': {
      title: 'HARVESTING_REAL_QUANTITY',
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
    'productPlan.harvesting.manager.user.fullName': {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.harvesting.[leader].user.fullName': {
      title: 'ADMIN_HARVESTING_LEADER',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.harvesting.[technical].user.fullName': {
      title: 'ROLE.TECHNICIAN',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.harvesting.[worker].user.fullName': {
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
      keyField: 'productPlan.preliminaryTreatment', title: 'PRELIMINARY_TREATMENT_DATE', formatter: (e) => {
        return e ? (<>{DisplayDateTime(e.startTime)} {e.endTime && (<> - {DisplayDateTime(e.endTime)}</>)}</>) : (<></>);
      }
    },
    'productPlan.preliminaryTreatment.quantity': {
      title: 'PRELIMINARY_TREATMENT_QUANTITY_REAL',
    },
    'productPlan.preliminaryTreatment.imageBefore': {
      title: 'PRELIMINARY_TREATMENT_IMAGE_BEFORE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.preliminaryTreatment.imageInProgress': {
      title: 'PRELIMINARY_TREATMENT_IMAGE_PROCESSING',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.preliminaryTreatment.imageAfter': {
      title: 'PRELIMINARY_TREATMENT_IMAGE_AFTER',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.preliminaryTreatment.manager.user.fullName': {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.preliminaryTreatment.[leader].user.fullName': {
      title: 'PRELIMINARY_TREATMENT_LEADER',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.preliminaryTreatment.[technical].user.fullName': {
      title: 'PRELIMINARY_TREATMENT_TECHNICAL',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.preliminaryTreatment.[worker].user.fullName': {
      title: 'PRELIMINARY_TREATMENT_WORKER',
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
      keyField: 'productPlan.cleaning', title: 'CLEANING_TIME', formatter: (e) => {
        return e ? (<>{DisplayDateTime(e.startTime)} {e.endTime && (<> - {DisplayDateTime(e.endTime)}</>)}</>) : (<></>);
      }
    },
    'productPlan.cleaning.quantity': {
      title: 'Sản lượng sau làm sạch',
    },
    'productPlan.cleaning.imageBefore' : {
      title: 'CLEANING_IMAGE_BEFORE',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.cleaning.imageInProgress' : {
      title: 'CLEANING_IMAGE_PROCESSING',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.cleaning.imageAfter': {
      title: 'CLEANING_IMAGE_AFTER',
      formatter: (image, entity) => {
        const renderInfo = {
          title: 'IMAGE_INFO',
          component: Display3Info
        }
        return DisplayImage(image, renderInfo)
      }
    },
    'productPlan.cleaning.manager.user.fullName': {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.cleaning.[leader].user.fullName': {
      title: 'CLEANING_LEADER',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.cleaning.[technical].user.fullName': {
      title: 'CLEANING_TECHNICAL',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.cleaning.[worker].user.fullName': {
      title: 'CLEANING_WORKER',
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
    'productPlan.harvesting.scanLocation': {
      title: 'Địa điểm Farm đóng gói',
      formatter: DisplayCoordinates
    },
    'productPlan.packing.packing.code': {
      title: 'Quy cách đóng gói',
    },
    'productPlan.packing.exp': {
      keyField: 'productPlan.packing', title: 'Hạn sử dụng', formatter: (e) => {
        return e ? (<>{DisplayDateTime(e.estimatedExpireTimeStart)} {e.estimatedExpireTimeEnd && (<> - {DisplayDateTime(e.estimatedExpireTimeEnd)}</>)}</>) : (<></>);
      }
    },
    'productPlan.packing.sampleImage': {
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
    'scanAt': {
      title: 'Ngày gán QR',
      formatter: (input) => DisplayDateTime(input)
    },
    'scanBy.fullName': {
      title: 'Người gán QR',
    },
    'activeBy.fullName': {
      title: 'QR_ACTIVATE_BY',
    },
    'activeAt': {
      title: 'QR_ACTIVATE_AT',
      formatter: (input) => DisplayDateTime(input)
    },
    'productPlan.packing.manager.user.fullName': {
      title: 'ADMIN_DIRECTOR_INFO',
    },
    'productPlan.packing.[leader].user.fullName': {
      title: 'PACKING_LEADER',
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
      keyField: 'productPlan.preservation', title: 'Thời gian bảo quản', formatter: (e) => {
        return e ? (<>{DisplayDateTime(e.startTime)} {e.endTime && (<> - {DisplayDateTime(e.endTime)}</>)}</>) : (<></>);
      }
    },
    'productPlan.preservation.storageImage.location.[coordinates]': {
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
    'productPlan.preservation.[technical].user.fullName': {
      title: 'Kĩ thuật',
      formatter: (input) => DisplayArray(input),
    },
    'productPlan.preservation.[worker].user.fullName': {
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
      formatter: (date: string) => DisplayDateTime(new Date().toISOString()),
    },
    'sellStatus.sellAddress': {
      title: 'Nơi bán',
      formatter: (arr: string[]) => (<>Cửa hàng A</>),
    },
    'sellStatus.seller.fullName': {
      title: 'Nhân viên bán hàng',
      formatter: (arr: string[]) => (<>Nguyễn Văn C</>),
    },
    'sellStatus.customerPhoneNumber': {
      title: 'Số điện thoại khách hàng',
      formatter: (arr: string[]) => (<>0912345677</>),
    }

  },
}];



