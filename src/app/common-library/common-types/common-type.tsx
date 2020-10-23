export interface PaginationProps {
  limit: number | string;
  page: number | string;
  orderType: string;
  orderBy: string;
}

export interface SortProps {
  [t: string]: 'asc' | 'des';
}

export interface ShowProps {
  edit: boolean;
  delete: boolean;
  detail: boolean;
  deleteMany: boolean;
}


export interface DeleteDialogProps {
  show: ShowProps;
  hideModal: (a: string) => any;
  deleteFn: (a: string) => any;
  title?: string,
  moduleName?: string,
  entity: any,
  idProperty?: string,
  bodyTitle?: string,
  confirmMessage?: string,
  deleteBtn?: string,
  cancelBtn?: string,
}


export interface ActionColumnProps<T> {
  onShowDetail: (entity: T) => void;
  onDelete: (entity: T) => void;
  onEdit: (entity: T) => void;
  onSelectMany: (entities: T[]) => void;
  
  // openEditDialog: any;
  // openDeleteDialog: any;
  // detailTitle: string;
  // editTitle: string;
  // deleteTitle: string;
}
