import {AxiosResponse} from 'axios';
import {CSSProperties, ReactElement} from "react";
import {ColumnDescription} from "react-bootstrap-table-next";


export interface MainInputState {
  field: any; // { name, value, onChange, onBlur }
  form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label: string | any;
  withFeedbackLabel: any;
  withValidation: any;
  customFeedbackLabel: any;
  mode: 'horizontal' | 'vertical';
  labelWidth: number;
  width: any;
  type: string;
  value: any;
  onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
  required?: boolean | ((values: any) => boolean);
  disabled?: boolean | ((values: any) => boolean);
  name: string;
}

export interface PaginationProps {
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
    disabled?: boolean | ((values: any) => boolean);
    selectField?: string;
    onSearch?: (e: any) => any;
    onChange?: (value: any, props: { setFieldValue: ((name: string, value: any) => void), values: any }) => any;
    data?: any;
    name?: string;
  };
};

export type MasterBodyColumns = {
  [T: string]: ColumnDescription
} | ColumnDescription[];

export type ModifyForm = { _header: string } & Panels;

export type Panels = {
  [T: string]: ModifyPanel | string,
}
export type ModifyPanel = { _title: string, _validationField?: string } & InputGroups;

export type InputGroups = {
  [T: string]: ModifyInputGroup | string
};


export type ModifyInputGroup = InputGroupType & {
  _subTitle: string;
  _className?: string;
  _titlenpClassName?: string;
  _dataClassName?: string;
};

export type InputGroupType = { [T: string]: _ModifyModelInput | string }

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
  paginationProps?: PaginationProps;
}) => (Promise<AxiosResponse<T[]>>);
export type _ModifyModelInput =
  ({ _type: 'object', [S: string]: any })
  | ({ _type: 'image', value?: any , pathField? : string} & _CommonProps)
  | ({ _type: 'custom', component: () => ReactElement})
  | ({ _type: 'string' | 'date-time' | 'number' | 'boolean' | 'tag' | 'gallery' } & _CommonProps)
  | ({ _type: 'radio', options: { value: any, label: string }[] | ((...props: any) => { value: any, label: string }[]); } & _CommonProps)
  | ({ _type: 'search-select', onSearch: GetAllPropsServer<any> | GetAllProps<any>, keyField?: string, selectField?: string } & _CommonProps)
  | ({ _type: 'checkbox', onSelectMany: (entities: any[]) => void; selectedEntities: any[]; } & _CommonProps)
export type GetAllProps<T> = ({
                                queryProps,
                                sortList,
                                paginationProps,
                              }: {
  queryProps: any;
  sortList?: SortProps[];
  paginationProps?: PaginationProps;
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
  titleClassName?: string;
  dataClassName?: string;
  data: {
    [T: string]: {
      title?: string;
      formatter?: (cellContent: any, row: any, rowIndex: number) => ReactElement;
      keyField?: string;
    }
  },
  
}[]
export type GetProps<T> = (entity: T) => Promise<AxiosResponse>;
export type UpdateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteProps<T> = (entity: T) => Promise<AxiosResponse>;
export type CreateProps<T> = (entity: T) => Promise<AxiosResponse>;
export type DeleteManyProps<T> = (entities: T[]) => Promise<AxiosResponse>;
