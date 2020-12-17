import {AxiosResponse} from 'axios';
import {ReactElement} from "react";

export interface PaginationProps {
  limit: number | undefined;
  page: number | undefined;
  sortType: string;
  sortBy: string;
}

export interface PaginationPropsV2 {
  limit: number | undefined;
  page: number | undefined;
  sortType: string;
  sortBy: string;
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
  loading?: boolean;
  deletingMessage?: string;
  error?: string;
}

export interface DeleteDialogPromiseProps<T> {
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
  loading?: boolean;
  deletingMessage?: string;
  error?: string;
  deleteSuccess: any;
  deleteFail: any;
}

export interface ConfirmDialogProps {
  isShow: boolean;
  onSubmit: () => any;
  onHide: () => any;
  title?: string;
  moduleName?: string;
  idProperty?: string;
  bodyTitle?: string;
  confirmMessage?: string;
  confirmBtn?: string;
  cancelBtn?: string;
  loading?: boolean;
  error?: string;
}

export interface NotifyDialogProps {
  isShow: boolean;
  onHide: () => any;
  title?: string;
  moduleName?: string;
  bodyTitle?: string;
  notifyMessage?: string;
  cancelBtn?: string;
}

export interface DeleteManyDialogProps<T> {
  isShow: boolean;
  onHide: () => any;
  onDelete: (entities?: T[]) => any;
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
  error?: string;
}

export interface DeleteManyDialogPromiseProps<T> {
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
  error?: string;
  deleteSuccess: any;
  deleteFail: any;
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

export type InputType = 'string' | 'number' | 'date-time' | 'search-select' | 'file' | 'tree-select' | 'nested';
export type SearchModel = {
  [T: string]: {
    type: InputType;
    placeholder?: string;
    label: string | ReactElement;
    keyField?: string;
    onSearch?: (t: any) => any;
    data?: any;
    name?: string;
  };
};
export type OldModifyModel = {
  [T: string]: {
    type: InputType;
    placeholder: string;
    label: string;
    disabled?: boolean;
  };
};

export type ModifyModel = ModifyPart[];

export type ModifyPart = {
  title: string;
  data: _ModifyModelType;
}

export type _ModifyModelType = {
  [T: string]: (
    {
      type: 'string' | 'date-time' | 'number' | 'boolean' | 'tag' | 'gallery';
    } & _CommonProps)
    | { type: 'object', data: _ModifyModelType }
    | ({ type: 'image', value: any } & _CommonProps)
    | ({ type: 'search-select', onSearch: () => void, keyField: string } & _CommonProps)
}
export type _CommonProps = {
  label: string | ReactElement;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  process?: string;
  [T: string]: any;
}
export type GetAllProps<T> = ({
                                queryProps,
                                sortList,
                                paginationProps,
                              }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps | PaginationPropsV2;
}) => Promise<AxiosResponse<T[]>>;

export type CountProps<T> = ({
                               queryProps,
                               sortList,
                               paginationProps,
                             }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps;
}) => Promise<AxiosResponse>;

export type GetProps<T> = (entity: T) => Promise<AxiosResponse>;
export type UpdateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteProps<T> = (entity: T) => Promise<AxiosResponse>;
export type CreateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteManyProps<T> = (entities: T[]) => Promise<AxiosResponse>;
