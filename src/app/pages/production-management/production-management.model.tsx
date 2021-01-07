export interface PackingProduct {
    _id: string;
    scanLocation: {
        coordinates: any[]
    };
    children: any[];
    createdBy: string | any;
    activeBy: {
        _id: string;
        fullName: string;
        [X: string]: any;
    };
    activeAt: Date | string;
    type: string;
    productPlan: string | any;
    enterprise: {
        [X: string]: string;
    };
    code: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    scanAt: Date | string;
    scanBy: {
        _id: string;
        fullName: string;
        [X: string]: string;
    };
    
}