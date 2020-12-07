
export interface SpeciesModel {
    _id: any;
    code: string;
    name: string;
    barcode: string;
    imageURL: string;
    growingDays: number;
    plantingDays: number;
    expiryDays: number;
}

export interface ProductTypeModifyModelDetail {
    title?: string;
    data: any;
}

export interface ProductTypeFormPart {

}
