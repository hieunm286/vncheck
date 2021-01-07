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
    activeAt: Date;
    type: string;
    productPlan: string | any;
    enterprise: {
        [X: string]: string;
    };
}