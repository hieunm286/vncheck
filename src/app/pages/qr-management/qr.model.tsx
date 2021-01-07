import { ProductionPlanModel } from "../production-plan/production-plant.model";
import { UserModel } from '../user/user.model';

export type QrModel = CommonQr & {
  _id?: string;
  code: string;
  activeBy: any;
  activeAt: Date;
  codeType: string;
  productPlan?: CommonQr & {
    seeding: {
      technical: string[] | {fullName: string}[];
    },
    harvesting: {
      leader: string[];
      worker: string[];
      manager: string;
      farmLocation: Location | Image;
      imageBefore: Location | Image;
      imageAfter: Location | Image;
      area: number;
      realQuantity: number;
      temperature: number;
      humidity: number;
      porosity: number;
      landLot: string;
      code: string;
      startTime: Date;
      endTime: Date;
    }
  };
}

export type QrParent = CommonQr & {

}

export type QrChild = CommonQr & {
  
}

type CommonQr = Partial<ProductionPlanModel>;

type Location = {
  coordinates: string[],
  type: string,
}

type Image = {
  hash: string;
  path: string;
}