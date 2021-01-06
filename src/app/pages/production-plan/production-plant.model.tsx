// export interface ProductionPlanModel {
//     code: string;
//     plantCode: string;

// }

import { UserModelForQR as UserModel } from '../user/user.model';

export type ProductionPlanModel = {
  step: string;
  isFulfilled: boolean;
  confirmationStatus: string;
  _id: string;
  code: string;
  process: string;
  seeding?: {
    certificates: {
      path: string;
      hash: string;
    },
    buyInvoice: {
      path: string;
      hash: string;
    },
    farmLocation: {
      coordinates: string[];
      type: string;
    },
    landLotImage: {
      path: string;
      hash: string;
    },
    leader: string[] | UserModel[];
    worker: string[] | UserModel[];
    _id: string;
    code: string;
    seedingTime: Date;
    estimatedPlantingTime: Date;
    landLot: string | {
      code: string;
      lot: string;
      subLot: string;
    };
    species: {
      _id: string;
      name: string;
      barcode: string;
      seedingDays: number;
      plantingDays: number;
      expiryDays: number;
      code: string;
    };
    area: number;
    numberOfSeed: number;
    expectedQuantity: number;
    temperature: number;
    humidity: number;
    porosity: number;
    manager: string | UserModel;
  },
  planting: {
    farmLocation: {
      coordinates: string[];
      type: string;
    },
    imageAfter: {
      path: string;
      hash: string;
    },
    imageBefore: {
      path: string;
      hash: string;
    },
    leader: string[] | UserModel[];
    worker: string[] | UserModel[];
    _id: string;
    estimatedPlantingTime: Date;
    estimatedHarvestTime: Date;
    code: string;
    area: number;
    numberOfPlants: number;
    expectedQuantity: number;
    temperature: number;
    humidity: number;
    porosity: number;
    landLot: string;
    species: {
      _id: string;
      name: string;
      barcode: string;
      seedingDays: number;
      plantingDays: number;
      expiryDays: number;
      code: string;
    };
    manager: string | UserModel;
  },
  harvesting: {
    _id: string;
    leader: { _id: string; isRecieved: boolean; info: string }[] | string[];
    technicalStaff: { _id: string; isRecieved: boolean; info: string }[];
  },
  preliminaryTreatment: {
    _id: string;
    time: Date;
    quantity: number;
    leader: { _id: string; isRecieved: boolean; info: string }[] | UserModel[];
    technicalStaff: { _id: string; isRecieved: boolean; info: string }[];
  },
  cleaning: {
    _id: string;
    time: Date;
    quantity: number;
    leader: { _id: string; isRecieved: boolean; info: string }[] | UserModel[];
    technicalStaff: { _id: string; isRecieved: boolean; info: string }[];
  },
  packing: {
    _id: string;
    quantity: number;
    leader: { _id: string; isRecieved: boolean; info: string }[] | UserModel[];
  },
  preservation: {
    _id: string;
    technicalStaff: { _id: string; isRecieved: boolean; info: string }[];
  },
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  },
  comments?: any[];
  createdAt: Date;
  updatedAt: Date;
}