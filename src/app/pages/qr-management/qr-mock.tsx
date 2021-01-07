import { RenderInfoDetail } from "../../common-library/common-types/common-type";
import { QrModel, QrParent } from "./qr.model";
import * as React from 'react';
import * as group from './mocks/user-mock'; 
import * as image from './mocks/image-mock';
import * as plan from './mocks/plan-mock';

import { createIntl, createIntlCache } from 'react-intl';
import viMessage from '../../layout/i18n/messages/vi.json'; //your messages translated with id

const cache = createIntlCache();
const intl = createIntl({ locale: 'vi-VN', messages: viMessage, }, cache);//locale and message can come from Redux or regular import

export const mobileSaleMock = {
  distributionInfo: [ 
    {
      exportTime: new Date(),
      exportAddress: ['Ngõ 219 Trung Kính', 'Cầu Giấy'],
      exportStaff: {
        fullName: 'N.V.A',
      },
      shipper: {
        fullName: 'H.D.M',
      },
      receiveTime: new Date(),
      receiveAddress:  ['Đại học kinh tế Quốc dân'],
      receiveStaff: {
        fullName: 'N.D.A',
      },
      image: {
        path: 'tisbbjs',
        hash: 'aoghbz',
      }
    },
  ],
  shippingInfo: [
    {
      exportTime: new Date(),
      exportAddress: ['Ngõ 219 Trung Kính', 'Cầu Giấy'],
      exportStaff: {
        fullName: 'N.V.A',
      },
      shipper: {
        fullName: 'H.D.M',
      }
    },
  ],
  sellStatus: {
    status: true,
    dateOfSell: new Date(),
    sellAddress: ['Cửa hàng A'],
    seller: {
      fullName: 'N.V.A'
    },
    customerPhoneNumber: '032246178',
  }
};

export const bodyEntities: QrModel[] = [
  {
    code: '123456', 
    createdBy: {
      _id: '',
      firstName: 'Nguyễn',
      lastName: 'Đức Chiến',
      fullName: 'Nguyễn Đức Chiến',
    }, 
    activeBy: {
      _id: '',
      firstName: 'Nguyễn',
      lastName: 'Đức Chiến',
      fullName: 'Nguyễn Đức Chiến',
    }, 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Sản phẩm',   
   ...mobileSaleMock,
  },
  {
    code: '123456', 
    createdBy: {
      _id: '',
      firstName: 'Phạm',
      lastName: 'Minh Nguyệt',
      fullName: 'Phạm Minh Nguyệt',
    }, 
    activeBy: {
      _id: '',
      firstName: 'Phạm',
      lastName: 'Minh Nguyệt',
      fullName: 'Phạm Minh Nguyệt',
    }, 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Đóng gói', 
    ...mobileSaleMock,
  },
];

export const childQrBodyEntities: QrModel[] = [
  {
    code: '1tql', 
    createdBy: {
      _id: '',
      firstName: 'Nguyễn',
      lastName: 'Đức Chiến',
      fullName: 'Nguyễn Đức Chiến',
    }, 
    activeBy: {
      _id: '',
      firstName: 'Nguyễn',
      lastName: 'Đức Chiến',
      fullName: 'Nguyễn Đức Chiến',
    }, 
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Sản phẩm',
    ...mobileSaleMock, 
  },
  {
    code: '123456', 
    createdBy: {
      _id: '',
      firstName: 'Phạm',
      lastName: 'Minh Nguyệt',
      fullName: 'Phạm Minh Nguyệt',
    }, 
    activeBy: {
      _id: '',
      firstName: 'Phạm',
      lastName: 'Minh Nguyệt',
      fullName: 'Phạm Minh Nguyệt',
    },  
    createdAt: new Date(),
    activeAt: new Date(), 
    codeType: 'Sản phẩm', 
    ...mobileSaleMock,
  },
];




export const detailEntityMock: QrModel = {
  code: '1tql', 
  createdBy: {
    _id: '',
    firstName: 'Nguyễn',
    lastName: 'Đức Chiến',
    fullName: 'Nguyễn Đức Chiến',
  }, 
  activeBy: {
    _id: '',
    firstName: 'Nguyễn',
    lastName: 'Đức Chiến',
    fullName: 'Nguyễn Đức Chiến',
  }, 
  createdAt: new Date(),
  activeAt: new Date(), 
  codeType: 'Sản phẩm', 
  productPlan: {
    seeding: {
      _id: 'mongoid@q82ur9jQM52aptrz',
      code: 'code@gieogiong',
      ...image.imageSeeding,
      ...plan.planSeeding,
      ...group.groupSeeding,
    },
    planting: {
      _id: 'mongoid@q24rirjifa2hgrezrtqnb',
      code: '234112e',
      ...image.imagePlanting,
      ...plan.planPlanting,
      ...group.groupPlanting,
    },
    harvesting: {
      _id: 'mongoid@q24rirjifa2hgrezrtqnb',
      ...group.groupHarvesting,
      ...image.imageHarvesting,
      ...plan.planHarvesting,
    },
    preliminaryTreatment: {
      _id: 'mongoid@q2rRVagnq10jgnArabzpr',
      ...plan.planPreliminary,
      ...image.imagePreliminary,
      ...group.groupPreliminary,
      
      // Redundant fields
      time: new Date(),
      quantity: 12,
      technicalStaff: [
        {
          _id: '',
          isRecieved: false,
          info: '', 
        },
      ],
    },
    cleaning: {
      _id: 'mongoid@q2rRVagnq10jgnArabzpr',
      ...plan.planCleaning,
      ...image.imageCleaning,
      ...group.groupCleaning,
      
      // Redundant fields
      time: new Date(),
      quantity: 12,
      technicalStaff: [
        {
          _id: '',
          isRecieved: false,
          info: '', 
        },
      ],
    },
    packing: {
      _id: 'mongoid@q2rRVagnq10jgnArabzpr',
      ...group.groupPacking,
      packing: {
        code: 'Mã đóng gói',
      },
      // Redundant fields
      quantity: 12,
    },
    preservation: {
      _id: 'mongoid@q2rRVagnq10jgnArabzpr',
      startTime: new Date(),
      endTime: new Date(),
      location: {
        type: 'latitude',
        coordinates: ['24N', '34E'],
      },
      temperature: 8,
      ...group.groupPreservation,

      technicalStaff: [
        {
          _id: '',
          isRecieved: false,
          info: '', 
        },
      ],
    },
  },
  ...mobileSaleMock,
};