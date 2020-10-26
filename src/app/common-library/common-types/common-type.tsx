import {AxiosResponse} from "axios";

export interface PaginationProps {
  limit: number | undefined;
  page: number | undefined;
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

export interface DeleteDialogProps<T> {
  isShow: boolean;
  onHide: () => any;
  onDelete: (entity: T) => any;
  title?: string;
  moduleName?: string;
  entity: T;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  deleteBtn?: string;
  cancelBtn?: string;
}

export interface DeleteManyDialogProps<T> {
  isShow: boolean;
  onHide: () => any;
  onDelete: () => any;
  selectedEntities: any[];
  title?: string;
  moduleName?: string;
  entity?: T;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  noSelectedEntityMessage?: string;
  deletingMessage?: string;
  deleteBtn?: string;
  cancelBtn?: string;
  loading?: boolean;
}

export interface ActionColumnProps<T> {
  onShowDetail: (entity: T) => void;
  onDelete: (entity: T) => void;
  onEdit: (entity: T) => void;
  // onCreate: (entity?: T) => void;
  // onSelectMany: (entities: T[]) => void;
  // onDeleteMany?: () => any;
  // openEditDialog: any;
  // openDeleteDialog: any;
  // detailTitle: string;
  // editTitle: string;
  // deleteTitle: string;
}

export interface ActionColumnProps<T> {
  onShowDetail: (entity: T) => void;
  onDelete: (entity: T) => void;
  onEdit: (entity: T) => void;
  // onCreate: (entity?: T) => void;
  // onSelectMany: (entities: T[]) => void;
  // onDeleteMany?: () => any;
  // openEditDialog: any;
  // openDeleteDialog: any;
  // detailTitle: string;
  // editTitle: string;
  // deleteTitle: string;
}

export type SearchModel = {
  [T: string]: {
    type: 'string' | 'number' | 'Datetime',
    placeholder: string,
    label: string,
  }
}
export type ModifyModel = {
  [T: string]: {
    type: 'string' | 'number' | 'Datetime',
    placeholder: string,
    label: string,
  }
}

export type GetAllProps<T> = ({queryProps, sortList, paginationProps}: { queryProps: any, sortList?: SortProps[], paginationProps?: PaginationProps }) =>
  Promise<AxiosResponse<T[]>>;
export type CountProps = (queryProps: any) => Promise<AxiosResponse>;
export type GetProps<T> = (entity: T) => Promise<AxiosResponse>;
export type UpdateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteProps<T> = (entity: T) => Promise<AxiosResponse>;
export type CreateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteManyProps<T> = (entities: T[]) => Promise<AxiosResponse>;
