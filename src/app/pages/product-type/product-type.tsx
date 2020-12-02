import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  DefaultPagination,
  NormalColumn,
  SortColumn,
  StatusValue,
} from '../../common-library/common-consts/const';
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
import EntityCrudPagePromise from '../../common-library/common-components/entity-crud-page-promise';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allFormField, formPart, masterEntityDetailDialog, productTypeSearchModel } from './defined/const';

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
const updateTitle = 'PRODUCT_TYPE.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`;

export const GenerateCode = (data: any[]) => {
  const lastEntity = data[data.length - 1].code;
  let i;
  for (i = 0; i < lastEntity.length; i++) {
    if (lastEntity[i] !== '0') {
      break;
    }
  }

  const lastIndex = parseInt(lastEntity.slice(i));

  if (lastIndex < 9) {
    return `00000${lastIndex + 1}`;
  } else if (lastIndex < 99) {
    return `0000${lastIndex + 1}`;
  } else if (lastIndex < 999) {
    return `000${lastIndex + 1}`;
  }
  return `00${lastIndex + 1}`;
};

const ProductTypeSchema = Yup.object().shape({
  name: Yup.string().required('Tên chủng loại không được để trống'),
  barcode: Yup.string()
    .required('GTIN không được để trống')
    .max(10, 'Vui lòng nhập tối đa 10 ký tự')
    .matches(/^[0-9]+$/u, {
      message: 'GTIN không hợp lệ. GTIN không chứa chữ cái và ký tự đặc biệt',
    }),
  growingDays: Yup.number()
    .required('Số ngày gieo giống không được để trống')
    .min(1, 'Số ngày không được ít hơn 1 nha')
    .typeError('Vui lòng nhập số'),
  plantingDays: Yup.number()
    .required('Số ngày gieo trồng không được để trống')
    .min(1, 'KSố ngày không được ít hơn 1 nha')
    .typeError('Vui lòng nhập số'),
  expiryDays: Yup.number()
    .required('Hạn sử dụng không được để trống')
    .min(1, 'Số ngày không được ít hơn 1 nha')
    .typeError('Vui lòng nhập số'),
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
    addPromise,
    updatePromise,
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

  const allFormButton: any = {
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Lưu',
        icon: <SaveOutlinedIcon />,
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/product-type',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'Hủy',
        icon: <CancelOutlinedIcon />,
      },
    },
  };

  const notify = () => {
    toast.error(`😠 ${error}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (error !== '') {
      // store.addNotification({
      //   title: 'Error!',
      //   message: error,
      //   type: 'danger',
      //   insert: 'top',
      //   container: 'top-center',
      //   animationIn: ['animate__animated', 'animate__fadeIn'],
      //   animationOut: ['animate__animated', 'animate__fadeOut'],
      //   dismiss: {
      //     duration: 5000,
      //     onScreen: true,
      //   },
      // });
      notify();
    }
  }, [error]);

  return (
    <Fragment>
      {/* <ReactNotification /> */}
      {/* <ToastContainer /> */}
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
          <EntityCrudPagePromise
            entity={createEntity}
            onModify={addPromise}
            title={createTitle}
            // reduxModel="purchaseOrder"
            code={null}
            get={() => null}
            formPart={formPart}
            allFormField={allFormField}
            allFormButton={allFormButton}
            validation={ProductTypeSchema}
            // autoFill={{
            //   field: 'code',
            //   data: GenerateCode(data),
            // }}
            refreshData={refreshData}
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
            <EntityCrudPagePromise
              entity={editEntity}
              onModify={updatePromise}
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
              asyncError={error}
              refreshData={refreshData}
            />
          )}
        </Route>
        <Route path="/product-type">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
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
