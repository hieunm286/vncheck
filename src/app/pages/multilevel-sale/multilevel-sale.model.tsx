export interface MultiLevelModel {

}

export interface TreeData {
    _id: string;
    title: string;
    parentId?: string;
    child: TreeData[]
}

export interface MultilevelSaleBodyProp {
    title: string;
    data: TreeData[]
    body: {title?: string; type: string; data: any}[]
}