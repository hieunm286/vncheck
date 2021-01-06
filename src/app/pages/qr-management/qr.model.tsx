import { ProductionPlanModel } from "../production-plan/production-plant.model";
import { UserModelForQR as UserModel } from '../user/user.model';

export type QrModel = CommonQr & Partial<QrPdf> & {
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
      leader: string[] | UserModel[];
      worker: string[] | UserModel[];
      manager: string | UserModel;
      technical: string[] | UserModel[];
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

export type QrPdf = {
  // buffers: {data: BlobPart[]}[];
  buffers: any;
}