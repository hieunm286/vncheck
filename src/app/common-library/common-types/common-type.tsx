import {AxiosResponse} from 'axios';
import {CSSProperties, ReactElement} from "react";
import {IntlShape} from "react-intl";
import {StylesConfig} from "react-select";
import {ColumnDescription} from "react-bootstrap-table-next";

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
  error?: { error: string };
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
  error?: { error: string };
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
    disabled?: boolean;
    selectField?: string;
    onSearch?: (e: any) => void;
    onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
    data?: any;
    name?: string;
  };
};

export type MasterBodyColumns = {
  [T: string]: ColumnDescription
} | ColumnDescription[];
export type OldModifyModel = {
  [T: string]: {
    type: InputType;
    placeholder: string;
    label: string;
    disabled?: boolean;
  };
};
export type ModifyForm = { [T: string]: { title: string, modifyModel: ModifyModel } };

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
    | { type: 'object', name?: string, data: _ModifyModelType, disabled?: boolean }
    | ({ type: 'image', value: any } & _CommonProps)
    | ({ type: 'search-select', onSearch: GetAllPropsServer<any> | GetAllProps<any>, keyField?: string, selectField?: string } & _CommonProps)
}
export type _CommonProps = {
  label: string | ReactElement;
  placeholder?: string;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  value?: any;
  name?: string;
  [T: string]: any;
  onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
}
export type GetAllPropsServer<T> = ({
                                      queryProps,
                                      sortList,
                                      paginationProps,
                                    }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps | PaginationPropsV2;
}) => (Promise<AxiosResponse<T[]>>);
export type GetAllProps<T> = ({
                                queryProps,
                                sortList,
                                paginationProps,
                              }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps | PaginationPropsV2;
}) => (Promise<{ code: number, data: any, success: boolean }>);

export type CountProps<T> = ({
                               queryProps,
                               sortList,
                               paginationProps,
                             }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps;
}) => Promise<AxiosResponse>;
export type RenderInfoDetailDialog = {
  header?: string;
  className?: string;
  data: {
    [T: string]: {
      title?: string;
      formatter?: (cellContent: any, row: any, rowIndex: number) => ReactElement;
      keyField?: string;
    }
  },
  titleClassName?: string;
  dataClassName?: string;
}[]
export type GetProps<T> = (entity: T) => Promise<AxiosResponse>;
export type UpdateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteProps<T> = (entity: T) => Promise<AxiosResponse>;
export type CreateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteManyProps<T> = (entities: T[]) => Promise<AxiosResponse>;
