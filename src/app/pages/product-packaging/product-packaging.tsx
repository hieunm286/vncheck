import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DefaultPagination, NormalColumn, SortColumn, StatusValue } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterBody } from '../../common-library/common-components/master-body';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { ModifyModel, SearchModel } from '../../common-library/common-types/common-type';
import {
  ConvertToTreeNode,
  GenerateAllFormField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ModifyEntityPage from '../../common-library/common-components/modify-entity-page';
import ImageUploading from 'react-images-uploading';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { isArray, isNull } from 'lodash';
import MasterGoogleMap from '../../common-library/common-components/master-google-map';
import * as Yup from 'yup';
import { ProductPackagingModel } from './product-packaging.model';
import * as ProductPackagingService from './product-packaging.service';
import ProductPackagingDetailDialog from './product-packaging-detail-dialog';
import { GenerateCode } from '../species/species';
import * as ProductTypeService from '../species/species.service';
import ModifyEntityDialogPromise from '../../common-library/common-components/modify-entity-dialog-promise';
import {GetAll} from "./product-packaging.service";


const data: any = [
  {
    _id: 'abc',
    code: '000001',
    name: 'Rau muống',
    gram: 200,
  },
  {
    _id: 'abcd',
    code: '000003',
    name: 'Rau cải',
    gram: 300,
  },
  {
    _id: 'abce',
    code: '000004',
    name: 'Rau muống',
    gram: 400,
  },
];

const headerTitle = 'PRODUCT_PACKAGING.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_PACKAGING.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_PACKAGING.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_PACKAGING.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_PACKAGING.CREATE.TITLE';
const updateTitle = 'PRODUCT_PACKAGING.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`;

const ProductPackagingSchema = Yup.object().shape({
  species: Yup.string().required('Name ko đc để trống'),
  weight: Yup.number()
    .required('Số gram không được để trống')
    .min(0, 'Số gram không được ít hơn 0 nha')
    .typeError('Vui lòng nhập số'),
});

function ProductPackaging() {
  const intl = useIntl();

  const history = useHistory();
  const {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    createEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showEdit,
    setShowEdit,
    showCreate,
    setShowCreate,
    showDetail,
    setShowDetail,
    showDeleteMany,
    setShowDeleteMany,
    trigger,
    setTrigger,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    setLoading,
    error,
    setError,
    add,
    update,
    addPromise,
    updatePromise,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<ProductPackagingModel>({
    getServer: ProductPackagingService.Get,
    countServer: ProductPackagingService.Count,
    createServer: ProductPackagingService.Create,
    deleteServer: ProductPackagingService.Delete,
    deleteManyServer: ProductPackagingService.DeleteMany,
    getAllServer: ProductPackagingService.GetAll,
    updateServer: ProductPackagingService.Update,
  });

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, trigger, filterProps]);

  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'species',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN' })}`,
      ...SortColumn,
      formatter: (cell: any, row: any, rowIndex: any) => {
        return (<p>{row.species ?  row.species.name : 'Không có thông tin nha'}</p>);
      },
      classes: 'text-center',
    },

    weight: {
      dataField: 'weight',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.GRAM_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: ProductPackagingModel) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: ProductPackagingModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: ProductPackagingModel) => {
          get(entity);
          setShowEdit(true);
          setEditEntity(entity);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const masterEntityDetailDialog = [
    {
      header: 'THÔNG TIN 1',
      data: {
        code: { title: 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.CODE' },
        species: { title: 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.NAME', ref: true, refField: 'name' },
        weight: { title: 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.GRAM' },
      },
    },
  ];

  const productTypeSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN',
      onSearch: GetAll,
      keyField: 'code',
    },
    species: {
      type: 'SearchSelect',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      keyField: 'name',
      ref: true
    },
  };

  const modifyModel = [
    {
      title: '',
      data: {
        code: {
          type: 'string',
          placeholder: '',
          label: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN',
          required: true,
          disabled: true,
        },
        species: {
          type: 'SearchSelect',
          placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
          required: true,
          label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
          service: ProductTypeService,
          keyField: 'name',
          ref: true
        },
        weight: {
          type: 'number',
          placeholder: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
          
          required: true,
          label: 'PRODUCT_PACKAGING.MASTER.TABLE.GRAM_COLUMN',
        },
      },
    },
  ];

  const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
      header: 'ĐƠN HÀNG',
    },
  };

  const allFormField: any = {
    ...GenerateAllFormField(modifyModel),
  };

  const allFormButton: any = {
    save: {
      role: 'submit',
      type: 'submit',
      linkto: undefined,
      className: 'btn btn-primary mr-2',
      label: 'Lưu',
      icon: <SaveOutlinedIcon />,
    },
    cancel: {
      role: 'link-button',
      type: 'button',
      linkto: '/product-packaging',
      className: 'btn btn-outline-primary mr-2',
      label: 'Hủy',
      icon: <CancelOutlinedIcon />,
    },
  };

  return (
    <Fragment>
      <ProductPackagingDetailDialog
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
          setShowDetail(false);
        }}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={deleteDialogTitle}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        error={error}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
      <ModifyEntityDialogPromise
        isShow={showCreate}
        entity={createEntity}
        onModify={addPromise}
        title={createTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowCreate(false);
        }}
        code={null}
        get={() => null}
        formPart={formPart}
        allFormField={allFormField}
        allFormButton={allFormButton}
        validation={ProductPackagingSchema}
        error={error}
        autoFill={{
          field: '',
          data: null,
        }}
        homePage={homeURL}
        refreshData={refreshData}
      />
      <ModifyEntityDialogPromise
        isShow={showEdit}
        entity={editEntity}
        onModify={updatePromise}
        title={updateTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowEdit(false);
        }}
        code={null}
        get={() => null}
        formPart={formPart}
        allFormField={allFormField}
        allFormButton={allFormButton}
        validation={ProductPackagingSchema}
        error={error}
        autoFill={{
          field: '',
          data: null,
          searchSelectField: [{ field: 'species', ref: { prop: '', key: 'name' } }],
        }}
        homePage={homeURL}
        refreshData={refreshData}
      />
      <Switch>
        <Route path="/product-packaging">
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            onReset={() => {
              setPaginationProps(DefaultPagination)
              setFilterProps(undefined)
            }}
            searchModel={productTypeSearchModel}
            initValue={{
              code: '',
              species: '',
            }}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setCreateEntity(null);
              setEditEntity(null);
              setShowCreate(true);
              //   history.push(`${window.location.pathname}/new`);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={entities}
            total={total}
            columns={columns as any}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
            isShowId={true}
          />

          {/* <MasterTreeStructure /> */}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default ProductPackaging;
