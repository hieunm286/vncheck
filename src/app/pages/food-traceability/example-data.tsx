import React from 'react';
import { RenderInfoDetail } from '../../common-library/common-types/common-type';
import {
  Display3Info,
  DisplayAddress,
  DisplayArray,
  DisplayCelcius,
  DisplayCoordinates,
  DisplayDateTime,
  DisplayDiffTime,
	DisplayDistribution,
  DisplayDownloadLink,
  DisplayImage,
  DisplayPercent,
  DisplayPersonNameByArray,
} from '../../common-library/helpers/detail-helpers';

export const entityExample = {
  status: {
    status: 'Đã bán',
    sellDate: new Date(),
    location: 'Cửa hàng A',
    employee: 'Nguyễn Văn C',
    customer: {
      phone: '0868670715',
    },
    qr: {
      _id: 'ABC123ABC123ABC123ABC123',
    },
  },
  enterprise: {
    name: 'UniFarm',
    taxId: '0123456789',
    address: {
      address: '',
      district: '123 Trung Kính',
      city: 'Cầu Giấy',
      state: 'Hà Nội',
    },
    phone: '02103874859',
    representative: {
      fullName: 'Nguyễn Văn A',
    },
  },
  species: {
    name: 'Rau muống',
    barcode: '0123456789',
  },
  seeding: {
    area: 90600,
    buyInvoice: {
      path: 'http://placeimg.com/640/480/people',
      hash: '54bcb73d8dfacd914cc25da61808eb0f',
    },
    certificates: {
      path: 'http://placeimg.com/640/480/sports',
      hash: 'cb0bfcdb5da416939561a12d847aed34',
    },
    code: '46333',
    createdAt: '2021-01-15T09:16:19.890Z',
    estimatedPlantingTime: '2021-01-15T09:16:19.851Z',
    expectedQuantity: 67375,
    farmLocation: { coordinates: ['-22.3444', '-23.1984'], type: 'Point' },
    humidity: 91900,
    landLot: {
      code: 'F22',
      createdAt: '2021-01-15T09:16:19.805Z',
      lot: 'F',
      subLot: '22',
      updatedAt: '2021-01-15T09:16:19.805Z',
      __v: 0,
      _id: '60015d63ea093200407dfdb4',
    },
    landLotImage: {
      path: 'http://placeimg.com/640/480/sports',
      hash: '1976150f31adacb2bc84e32dffdf7be0',
    },
    leader: [
      {
        _id: '60015d63ea093200407dfd2d',
        username: 'Leader',
        lastName: ' Trưởng',
        fullName: 'Tổ Trưởng',
      },
    ],
    manager: {
      _id: '60015d63ea093200407dfd2c',
      username: 'Manager',
      lastName: ' Lý',
      fullName: 'Quản Lý',
    },
    numberOfSeed: 11521,
    porosity: 96950,
    seedingImage: {
      path: 'http://placeimg.com/640/480/fashion',
      hash: '1976150f31adacb2bc84e32dffdf7be0',
    },
    seedingTime: '2021-01-15T09:16:19.851Z',
    species: {
      barcode: 'amateur_plum',
      code: '1ee720b2bf',
      createdAt: '2021-01-15T09:16:19.764Z',
      expiryDays: 70,
      growingDays: 14,
      name: 'precise apricot',
      plantingDays: 17,
      updatedAt: '2021-01-15T09:16:19.764Z',
      __v: 0,
      _id: '60015d63ea093200407dfda0',
    },
    temperature: 19862,
    updatedAt: '2021-01-15T09:16:19.890Z',
    worker: [
      {
        _id: '60015d63ea093200407dfd2e',
        username: 'Worker',
        lastName: ' Dân',
        fullName: 'Nông Dân',
      },
    ],
    __v: 0,
    _id: '60015d63ea093200407dfdbe',
  },
  planting: {
    area: 61985,
    code: '46333',
    createdAt: '2021-01-15T09:16:20.047Z',
    estimatedHarvestTime: '2021-01-15T09:16:20.045Z',
    estimatedPlantingTime: '2021-01-15T09:16:20.045Z',
    expectedQuantity: 69664,
    farmLocation: { coordinates: ['57.1770', '28.1353'], type: 'Point' },
    humidity: 58087,
    imageAfter: {
      path: 'http://placeimg.com/640/480/nightlife',
      hash: 'a5546afe8d3fda1371de2d058af49e36',
    },
    imageBefore: {
      path: 'http://placeimg.com/640/480/sports',
      hash: 'e1856d38cd449330b498a0bebd8a37f0',
    },
    landLot: {
      code: 'A45',
      createdAt: '2021-01-15T09:16:19.795Z',
      lot: 'A',
      subLot: '45',
      updatedAt: '2021-01-15T09:16:19.795Z',
      __v: 0,
      _id: '60015d63ea093200407dfdaf',
    },
    leader: [
      {
        _id: '60015d63ea093200407dfd2d',
        username: 'Leader',
        lastName: ' Trưởng',
        fullName: 'Tổ Trưởng',
      },
    ],
    manager: {
      _id: '60015d63ea093200407dfd2c',
      username: 'Manager',
      lastName: ' Lý',
      fullName: 'Quản Lý',
    },
    numberOfPlants: 9565,
    porosity: 52035,
    species: {
      barcode: 'amateur_plum',
      code: '1ee720b2bf',
      createdAt: '2021-01-15T09:16:19.764Z',
      expiryDays: 70,
      growingDays: 14,
      name: 'precise apricot',
      plantingDays: 17,
      updatedAt: '2021-01-15T09:16:19.764Z',
      __v: 0,
      _id: '60015d63ea093200407dfda0',
    },
    temperature: 95469,
    updatedAt: '2021-01-15T09:16:20.047Z',
    worker: [
      {
        _id: '60015d63ea093200407dfd2e',
        username: 'Worker',
        lastName: ' Dân',
        fullName: 'Nông Dân',
      },
    ],
    __v: 0,
    _id: '60015d64ea093200407dfdca',
  },
  harvesting: {
    code: '36319',
    createdAt: '2021-01-15T09:16:20.383Z',
    imageAfter: { location: { coordinates: [] } },
    imageBefore: { location: { coordinates: [] } },
    imageInProgress: [
      {
        path: 'http://placeimg.com/640/480/people',
        hash: '54bcb73d8dfacd914cc25da61808eb0f',
      },
      {
        path: 'http://placeimg.com/640/480/people',
        hash: '54bcb73d8dfacd914cc25da61808eb0f',
      },
      {
        path: 'http://placeimg.com/640/480/people',
        hash: '54bcb73d8dfacd914cc25da61808eb0f',
      },
    ],
    leader: [
      {
        process: '2',
        role: 'leader',
        user: {
          _id: '60015d63ea093200407dfd2b',
          firstName: 'Nông',
          lastName: 'Dân',
          fullName: 'Miss Sheila Ngô',
        },
        _id: '6001bbe72257840069165b4d',
      },
    ],
    technical: [
      {
        process: '2',
        role: 'technical',
        user: {
          _id: '60015d63ea093200407dfd2b',
          firstName: 'Nông',
          lastName: 'Dân',
          fullName: 'Miss Sheila Ngô',
        },
        _id: '6001bbe72257840069165b4c',
      },
    ],
    updatedAt: '2021-01-15T09:16:20.383Z',
    worker: [],
    __v: 0,
    _id: '60015d64ea093200407dfde2',
  },
  distribution: [
    {
      name: 'Kho farm Trung Kính',
      address: {
        district: '123 Trung Kính',
        city: 'Cầu Giấy',
        state: 'Hà Nội',
      },
      date: '2021-01-15T09:16:20.383Z',
    },
    {
      name: 'Kho Khâm Thiên',
      address: {
        district: '123 Khâm Thiên',
        city: 'Đống Đa',
        state: 'Hà Nội',
      },
      date: '2021-01-15T09:16:20.383Z',
    },
    {
      name: 'Kho farm Trung Kính',
      address: {
        district: '123 Trung Kính',
        city: 'Cầu Giấy',
        state: 'Hà Nội',
      },
      date: '2021-01-15T09:16:20.383Z',
    },
  ],
};

export const exampleDetail: RenderInfoDetail = [
  {
    header: 'Trạng thái',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'status.status': { title: 'Trạng thái' },
      'status.sellDate': {
        title: 'Ngày bán',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'status.location': { title: 'Nơi bán' },
      'status.employee': { title: 'Nhân viên nơi bán' },
      'status.customer.phone': { title: 'Số điện thoại người mua' },
      'status.qr._id': { title: 'ID QR' },
    },
  },
  {
    header: 'Doanh nghiệp sản xuất',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'enterprise.name': { title: 'Tên doanh nghiệp' },
      'enterprise.taxId': { title: 'Mã số thuế' },
      'enterprise.address': { title: 'Địa chỉ', formatter: input => DisplayAddress(input) },
      'enterprise.phone': { title: 'Nhân viên nơi bán' },
      'status.customer.phone': { title: 'Số điện thoại' },
      'status.representative.fullName': { title: 'Người đại diện' },
    },
  },
  {
    header: 'Thông tin chung',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'seeding.species.name': { title: 'Tên chủng loại' },
      'seeding.species.barcode': { title: 'Đăng ký vạch' },
    },
  },
  {
    header: 'Thông tin xuống giống',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'seeding.certificates': {
        title: 'SEEDING.CERTIFICATE',
        formatter: input => DisplayDownloadLink(input, 'path'),
      },
      'seeding.buyInvoice': {
        title: 'SEEDING.INVOICE',
        formatter: input => DisplayDownloadLink(input, 'path'),
      },
      'seeding.seedingTime': {
        title: 'SEEDING.SEEDING_TIME',
        formatter: input => <DisplayDateTime input={input} />,
      },
      'seeding.farmLocation.[coordinates]': {
        title: 'SEEDING.FARM_LOCATION',
        formatter: DisplayCoordinates,
      },
      'seeding.numberOfSeed': { title: 'SEEDING.NUMBER_OF_SEED' },
      'seeding.landLot.code': { title: 'SEEDING.LAND_LOT' },
      'seeding.area': { title: 'SEEDING.SEEDING_AREA' },
      'seeding.temperature': {
        title: 'Nhiệt độ',
        formatter: DisplayCelcius,
      },
      'seeding.humidity': {
        title: 'Độ ẩm',
        formatter: DisplayPercent,
      },
      'seeding.porosity': {
        title: 'Độ xốp',
        formatter: DisplayPercent,
      },
      'seeding.seedingImage': {
        title: 'Hình ảnh trước khi đưa vào nuôi trồng',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo);
        },
      },
      'seeding.landLotImage': {
        title: 'Hình ảnh định vị lô luống',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo);
        },
      },
      'seeding.manager.fullName': {
        title: 'Thông tin Giám đốc/TGĐ',
      },
      'seeding.[leader].fullName': {
        title: 'Tổ trưởng gieo trồng',
        formatter: input => DisplayArray(input),
      },
      'seeding.[worker].fullName': {
        title: 'Công nhân gieo trồng',
        formatter: input => DisplayArray(input),
      },
    },
  },
  {
    header: 'Thông tin gieo trồng',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'planting.numberOfPlants': { title: 'SEEDING.NUMBER_OF_SEED' },
      'planting.area': { title: 'SEEDING.SEEDING_AREA' },
      'planting.farmLocation.[coordinates]': {
        title: 'PLANTING.FARM_LOCATION',
        formatter: DisplayCoordinates,
      },
      'planting.imageBefore': {
        title: 'Hình ảnh trước khi nuôi trồng',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo);
        },
      },
      'planting.imageAfter': {
        title: 'Hình ảnh khi nuôi trồng',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo);
        },
      },
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
      'planting.manager.fullName': {
        title: 'Thông tin Giám đốc/TGĐ',
      },
      'planting.[leader].fullName': {
        title: 'Tổ trưởng gieo trồng',
        formatter: input => DisplayArray(input),
      },
      'planting.[worker].fullName': {
        title: 'Công nhân gieo trồng',
        formatter: input => DisplayArray(input),
      },
    },
  },
  {
    header: 'Thông tin thu hoạch',
    className: 'col-12',
    titleClassName: 'col-md-5 col-4 mb-10',
    dataClassName: 'col-md-7 col-8 mb-10 pl-5 text-right',
    data: {
      'harvesting.time': {
        keyField: 'harvesting',
        title: 'PRODUCTION_PLAN.HARVEST_DATE',
        formatter: e => <DisplayDiffTime startTime={e?.startTime} endTime={e?.endTime}/>
      },
      'harvesting.quantity': { title: 'HARVESTING.QUANTITY' },
      'harvesting.imageBefore': {
        title: 'HARVESTING_IMAGE_BEFORE',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo);
        },
      },
      'harvesting.imageAfter': {
        title: 'HARVESTING_IMAGE_AFTER',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo);
        },
      },
      'harvesting.imageInProgress': {
        title: 'HARVESTING_IMAGE_PROCESSING',
        formatter: (image, entity) => {
          const renderInfo = {
            title: 'IMAGE_INFO',
            component: Display3Info,
          };
          return DisplayImage(image, renderInfo, ['isMaster', true]);
        },
      },
      'harvesting.temperature': { title: 'TEMPERATURE', formatter: DisplayCelcius },
      'harvesting.humidity': { title: 'HUMIDITY', formatter: DisplayPercent },
      'harvesting.porosity': { title: 'POROSITY', formatter: DisplayPercent },
      'harvesting.[leader]': { title: 'HARVESTING_LEADER', formatter: DisplayPersonNameByArray },
      'harvesting.[worker]': { title: 'HARVESTING_WORKER', formatter: DisplayPersonNameByArray },
      'harvesting.[technical]': { title: 'ROLE.TECHNICIAN', formatter: DisplayPersonNameByArray },
    },
	},
	{
    header: 'Thông tin phân phối',
    className: 'col-12',
    titleClassName: 'col-md-0 col-12 mb-10',
    dataClassName: 'col-md-12 col-12 mb-10 pl-5',
    data: {
      'distribution': { formatter: input => DisplayDistribution(input) },
    },
  },
];
