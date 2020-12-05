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
import * as ShippingAgencyService from './shipping-agency.service'
import { ShippingAgencyModel } from './shipping-agency.model';
import { GenerateCode } from '../species/species';
import {GetAll} from "./shipping-agency.service";

const data: any = [
    {
      _id: 'abc',
      code: '000001',
      name: 'Rau muống',
      phone: '0868670715',
      status: true
    },
    {
        _id: 'abcf',
        code: '000002',
        name: 'Rau muống',
        phone: '0868670715',
        status: true
      },
  ];

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`

function ShippingAgency() {
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
  } = InitMasterProps<ShippingAgencyModel>({
    getServer: ShippingAgencyService.Get,
    countServer: ShippingAgencyService.Count,
    createServer: ShippingAgencyService.Create,
    deleteServer: ShippingAgencyService.Delete,
    deleteManyServer: ShippingAgencyService.DeleteMany,
    getAllServer: ShippingAgencyService.GetAll,
    updateServer: ShippingAgencyService.Update,
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

    phone: {
      dataField: 'phone',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    status: {
        dataField: 'status',
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
        onShowDetail: (entity: ShippingAgencyModel) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: ShippingAgencyModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: ShippingAgencyModel) => {
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
      onSearch: GetAll,
      keyField: 'code',
    },
    name: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      onSearch: GetAll,
      keyField: 'name',
    },
  };

  const modifyModel: any[] = [
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
      linkto: '/shipping-agency',
      className: 'btn btn-outline-primary mr-2',
      label: 'Hủy',
      icon: <CancelOutlinedIcon />,
    },
  };

  return (
    <Fragment>
      {/* <SpeciesDetailDialog
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
          setShowDetail(false);
        }}
      /> */}
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
        <Route path="/shipping-agency/new">
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
            // validation={ProductTypeSchema}
            // autoFill={{
            //     field: 'code',
            //     data: GenerateCode(data)
            // }}
            homePage={homeURL}
          />
        </Route>
        <Route path={`/shipping-agency/:code`}>
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
              get={ShippingAgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
            //   validation={ProductTypeSchema}
              homePage={homeURL}

            />
          )}
        </Route>
        <Route path="/shipping-agency">
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
            entities={data}
            total={data.length}
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

export default ShippingAgency
