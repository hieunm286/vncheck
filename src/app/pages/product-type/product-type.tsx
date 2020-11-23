import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DefaultPagination, NormalColumn, SortColumn, StatusValue } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterBody } from '../../common-library/common-components/master-body';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import { ModifyModel, SearchModel } from '../../common-library/common-types/common-type';
import {
  GenerateAllFormField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import { Switch, Route, useHistory } from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { ProductTypeModel, ProductTypeModifyModelDetail } from './product-type.model';
import * as ProductTypeService from './product-type.service';
import ProductTypeDetailDialog from './product-type-detail-dialog';

const data: any = [
  {
    _id: 'abc',
    code: '000001',
    name: 'Rau muống',
    barcode: '8930000001',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 30,
  },
  {
    _id: 'abcd',
    code: '000003',
    name: 'Rau cải',
    barcode: '8930000003',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 60,
  },
  {
    _id: 'abce',
    code: '000004',
    name: 'Rau muống',
    barcode: '8930000004',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 17,
  },
  {
    _id: 'abcf',
    code: '000005',
    name: 'Rau muống',
    barcode: '8930000005',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 19,
  },
  {
    _id: 'abdacf',
    code: '000009',
    name: 'Rau cần',
    barcode: '8930000009',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 19,
  },
];

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`

export const GenerateCode = (data: any[]) => {
    const lastEntity = data[data.length - 1].code
    let i;
    for (i = 0; i < lastEntity.length; i++) {
        if (lastEntity[i] !== '0') {
            break;
        }
    }

    const lastIndex = parseInt(lastEntity.slice(i));

    if (lastIndex < 9) {
        return `00000${lastIndex + 1}`
    } else if (lastIndex < 99) {
        return `0000${lastIndex + 1}`
    } else if (lastIndex < 999) {
        return `000${lastIndex + 1}`
    }
    return `00${lastIndex + 1}`
}

const ProductTypeSchema = Yup.object().shape({
    name: Yup.string().required('Tên chủng loại không được để trống'),
    barcode: Yup.string().required('Tên chủng loại không được để trống'),
    growingDays: Yup.number().required('Số ngày gieo giống không được để trống').typeError('Vui lòng nhập số'),
    plantingDays: Yup.number().required('Số ngày gieo trồng không được để trống').typeError('Vui lòng nhập số'),
    expiryDays: Yup.number().required('Hạn sử dụng không được để trống').typeError('Vui lòng nhập số'),
  });

function ProductType() {
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
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<ProductTypeModel>({
    getServer: ProductTypeService.Get,
    countServer: ProductTypeService.Count,
    createServer: ProductTypeService.Create,
    deleteServer: ProductTypeService.Delete,
    deleteManyServer: ProductTypeService.DeleteMany,
    getAllServer: ProductTypeService.GetAll,
    updateServer: ProductTypeService.Update,
  });

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, trigger, filterProps]);

  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },

    barcode: {
      dataField: 'barcode',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN' })}`,
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
        onShowDetail: (entity: ProductTypeModel) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: ProductTypeModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: ProductTypeModel) => {
          get(entity);
          // setShowEdit(true);
          setEditEntity(entity);
          history.push(`${window.location.pathname}/${entity._id}`);
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
        code: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.CODE' },
        name: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.NAME' },
        barcode: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.BARCODE' },
        growingDays: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' },
        plantingDays: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' },
        expiryDays: { title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY' },
      },
    },
  ];

  const productTypeSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      service: ProductTypeService,
      keyField: 'code',
    },
    name: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      service: ProductTypeService,
      keyField: 'name',
    },
  };

  const modifyModel: ProductTypeModifyModelDetail[] = [
    {
      title: 'THÔNG TIN CHUNG',
      data: {
        code: {
          type: 'string',
          placeholder: '',
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN' }),
          required: true,
          disabled: true,
        },
        name: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
        },
        barcode: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          }),
          required: true,
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN' }),
        },
        image: {
          type: 'image',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Album 1',
        },
      },
    },
    {
      title: 'THÔNG TIN VÒNG ĐỜI',
      data: {
        growingDays: {
          type: 'number',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
        },
        plantingDays: {
          type: 'number',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
        },
        expiryDays: {
          type: 'number',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY' }),
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
    ...GenerateAllFormField(
      modifyModel,
    ),
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
      linkto: '/product-type',
      className: 'btn btn-outline-primary mr-2',
      label: 'Hủy',
      icon: <CancelOutlinedIcon />,
    },
  };

  return (
    <Fragment>
      <ProductTypeDetailDialog
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

      <Switch>
        <Route path="/product-type/new">
          <EntityCrudPage
            entity={createEntity}
            onModify={add}
            title={createTitle}
            // reduxModel="purchaseOrder"
            code={null}
            get={() => null}
            formPart={formPart}
            allFormField={allFormField}
            allFormButton={allFormButton}
            validation={ProductTypeSchema}
            autoFill={{
                field: 'code',
                data: GenerateCode(data)
            }}
            homePage={homeURL}
          />
        </Route>
        <Route path={`/product-type/:code`}>
          {({ history, match }) => (
            // <ModifyEntityPage
            //   entity={editEntity}
            //   onModify={update}
            //   title={updateTitle}
            //   modifyModel={modifyModel}
            //   reduxModel="purchaseOrder"
            //   code={match && match.params.code}
            //   get={PurchaseOrderService.GetById}
            // />
            <EntityCrudPage
              entity={editEntity}
              onModify={update}
              title={updateTitle}
              //  modifyModel={modifyModel}
              reduxModel="purchaseOrder"
              code={match && match.params.code}
              get={ProductTypeService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={ProductTypeSchema}
              homePage={homeURL}

            />
          )}
        </Route>
        <Route path="/product-type">
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            searchModel={productTypeSearchModel}
            initValue={{
              code: '',
              name: '',
            }}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setCreateEntity(null);
              setEditEntity(null);
              // setShowCreate(true);
              history.push(`${window.location.pathname}/new`);
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

export default ProductType;
