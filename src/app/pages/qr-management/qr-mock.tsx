import { RenderInfoDetail } from "../../common-library/common-types/common-type";
import { QrModel, QrParent } from "./qr.model";
import * as React from 'react';

import { createIntl, createIntlCache } from 'react-intl';
import viMessage from '../../layout/i18n/messages/vi.json'; //your messages translated with id

const cache = createIntlCache();
const intl = createIntl({ locale: 'vi-VN', messages: viMessage, }, cache);//locale and message can come from Redux or regular import

export const bodyEntities: QrModel[] = [
  {
    code: '123456', 
    createdBy: {
      _id: '',
      firstName: 'Nguyễn',
      lastName: 'Đức Chiến',
    }, 
    activeBy: '3', 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Sản phẩm', 
  },
  {
    code: '123456', 
    createdBy: {
      _id: '',
      firstName: 'Phạm',
      lastName: 'Minh Nguyệt',
    }, 
    activeBy: '3', 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Đóng gói', 
  }
];

export const childQrBodyEntities: QrModel[] = [
  {
    code: '1tql', 
    createdBy: {
      _id: '',
      firstName: 'Nguyễn',
      lastName: 'Đức Chiến',
    }, 
    activeBy: '3', 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Sản phẩm', 
  },
  {
    code: '123456', 
    createdBy: {
      _id: '',
      firstName: 'Phạm',
      lastName: 'Minh Nguyệt',
    }, 
    activeBy: '3', 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Sản phẩm', 
  }
];


export const detailEntities : QrParent = 
  {
    seeding: {
      certificates: {
        path: 'upload/path-to-imagexxx.png',
        hash: 'hash@9gy2ahfqp7234asf396LKWQFOPW',
      },
      buyInvoice: {
        path: 'upload/path-to-imagexxx.png',
        hash: 'hash@9gy2ahfqt7h34asf396LKW6FsPo',
      },
      farmLocation: {
        coordinates: ['24N', '34E'],
        type: 'latitude',
      },
      landLotImage: {
        path: 'upload/path-to-imagexxx.png',
        hash: 'hash@9gy2ahfqtjh34aslq96LK86FsPo',
      },
      leader: ['Tổ trưởng gieo giống 1', 'Tổ trưởng gieo giống 2'],
      worker: ['Nông dân gieo giống 1', 'nông dân gieo giống 2'],
      _id: 'mongoid@q82ur9jQM52aptrz',
      code: 'code@gieogiong',
      seedingTime: new Date(),
      estimatedPlantingTime: new Date(),
      landLot: {
        code: 'A23',
        lot: 'A',
        subLot: '23',
      },
      species: {
        _id: 'mongoid@qprtmzfaw24a4hfharftwbe',
        name: 'Rau muống',
        barcode: 'GTIN@123456',
        seedingDays: 10,
        plantingDays: 4,
        expiryDays: 2,
        code: 'RM01'
      },
      area: 42,
      numberOfSeed: 175,
      expectedQuantity: 160,
      temperature: 20,
      humidity: 42,
      porosity: 13,
      manager: 'Quản lý gieo giống',
    },
    planting: {
      farmLocation: {
        coordinates: ['24N', '34E'],
        type: 'latitude',
      },
      imageAfter: {
        path: 'upload/path-to-imagexxx.png',
        hash: 'hash@9gy2ahfq3o234asfd96LKWQFOPW',
      },
      imageBefore: {
        path: 'upload/path-to-imagexxx.png',
        hash: 'hash@9gy2ahfa234asfd96LKWQA3FOPW',
      },
      leader: ['Tổ trưởng 1', 'tổ trưởng 2'],
      worker: ['Công nhân 1', 'công nhân 2'],
      _id: 'mongoid@q24rirjifa2hgrezrtqnb',
      estimatedPlantingTime: new Date(),
      estimatedHarvestTime: new Date(),
      code: '234112e',
      area: 42,
      numberOfPlants: 150,
      expectedQuantity: 135,
      temperature: 26,
      humidity: 31,
      porosity: 5,
      landLot: 'A34',
      species: {
        _id: 'mongoid@qprtmzfaw24a4hfharftwbe',
        name: 'Rau muống',
        barcode: 'GTIN@123456',
        seedingDays: 10,
        plantingDays: 4,
        expiryDays: 2,
        code: 'RM01'
      },
      manager: 'Quản lý',
    },
    createdBy: {
      _id: '',
      firstName: 'N.V.A',
      lastName: '',
    },
  };


const plantingDetailModel = {
    certificates: {
      type: 'link',
      title: intl.formatMessage({id: 'CERTIFICATE'}),
      keyField: 'seeding.certificates.path',
    },
    buyInvoice: {
      type: 'link',
      title: intl.formatMessage({id: 'BUY_INVOICE'}),
      keyField: 'seeding.buyInvoice.path',
    },
    seedingTime: {
      type: 'string',
      title: intl.formatMessage({id: 'SEEDING_TIME'}),
      keyField: 'seeding.seedingTime',
      formatter: (value: Date, entity: QrParent) => {return (<>{value.toLocaleDateString()}</>)},
    },
    seedingLocation: {
      type: 'link',
      title: intl.formatMessage({id: 'SEEDING_LOCATION'}),
      keyField: 'seeding.farmLocation.coordinates',
      formatter: (value: Array<String>, entity: QrParent) => {return (<>{value.join(", ")}</>)},
      params: 'a',
      path: 'https://google.com/maps',
    },
    seedingQuantity: {
      type: 'string',
      title: intl.formatMessage({id: 'SEEDING_QUANTITY'}),
      keyField: 'seeding.numberOfSeed',
    },
    landLot: {
      type: 'string',
      title: intl.formatMessage({id: 'SEEDING_LAND_LOT'}),
      keyField: 'seeding.landLot.code',
    },
    area: {
      type: 'string',
      title: intl.formatMessage({id: 'SEEDING_AREA'}),
      keyField: 'seeding.area',
      formatter: (value: string, entity: QrParent) =>{ return (<>{value + String.fromCharCode(0x33A1)}</>)}
    },
    temperature: {
      type: 'string',
      title: intl.formatMessage({id: 'TEMPERATURE'}),
      keyField: 'seeding.temperature',
      formatter: (value: string, entity: QrParent) => { return (<>{value + String.fromCharCode(0x2103)}</>)}
    },
    humidity: {
      type: 'string',
      title: intl.formatMessage({id: 'HUMIDITY'}),
      keyField: 'seeding.humidity',
      formatter: (value: string, entity: QrParent) => { return (<>{value}%</>)},
    },
    porosity: {
      type: 'string',
      title: intl.formatMessage({id: 'POROSITY'}),
      keyField: 'seeding.porosity',
      formatter: (value: string, entity: QrParent) => { return (<>{value}%</>)},
    },
  }

export const detailModel : RenderInfoDetail = [
  {
    header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
    className: 'col-7',
    data: plantingDetailModel
  },

  // {
  //   header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
  //   className: 'col-7',
  //   data: [
  //     [
  //       // {
  //       //   code: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.CODE', type: 'string'},
  //       //   name: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.NAME'},
  //       // },
  //       {
  //         type: 'string',
  //         title: 'Mã gieo giống',
  //         keyField: 'createdBy.firstName',
  //         path: '/qr/qr-parent/123456',
  //         params: '_id',
  //       },
  //       {
  //         type: 'string',
  //         title: 'Mã gieo giống',
  //         keyField: 'createdBy.lastName',
  //         path: '/qr/qr-parent/123456',
  //         params: '_id',
  //       },
  //     ]
  //   ]
  // }
]



export const qrChildDetailModel : RenderInfoDetail = [
  {
    header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
    className: 'col-7',
    data: plantingDetailModel
  },
  {
    header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
    className: 'col-7',
    data: plantingDetailModel
  },
]