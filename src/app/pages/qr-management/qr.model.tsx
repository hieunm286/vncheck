import { ProductionPlanModel } from "../production-plan/production-plant.model";

export type QrModel = CommonQr & {
  _id?: string;
  code: string;
  activeBy: any;
  activeAt: Date;
  codeType: string;
  seeding?: {
    
  }
}

export type QrParent = CommonQr & {

}

export type QrChild = CommonQr & {
  
}

type CommonQr = Partial<ProductionPlanModel>;