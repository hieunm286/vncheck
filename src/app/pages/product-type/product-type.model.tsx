
export interface ProductTypeModel {
    _id: any;
    code: string;
    name: string;
    barcode: string;
    imageURL: string;
    growingDays: number;
    plantingDays: number;
    expiryDate: number;
}

export interface ProductTypeModifyModelDetail {
    title?: string;
    data: any;
}

export interface ProductTypeFormPart {
    
}
