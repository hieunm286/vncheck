import React, {Fragment, useEffect, useMemo} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {
  ModifyForm,
  ModifyModel,
  RenderInfoDetailDialog,
  SearchModel
} from '../../common-library/common-types/common-type';
import {GenerateAllFormField, InitMasterProps,} from '../../common-library/helpers/common-function';
import {Route, Switch, useHistory} from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as ShippingAgencyService from './shipping-agency.service'
import {ShippingAgencyModel} from './shipping-agency.model';
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'SHIPPING_AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
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
  }, [paginationProps, filterProps]);
  
  const columns = useMemo(() => {
    return {
      code: {
        dataField: 'code',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.CODE_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      name: {
        dataField: 'name',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.NAME_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      phone: {
        dataField: 'phone',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.PHONE_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      status: {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.STATUS_COLUMN'})}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'SHIPPING_AGENCY.MASTER.TABLE.ACTION_COLUMN'})}`,
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
            // get(entity);
            // setShowEdit(true);
            setEditEntity(entity);
            history.push(`${window.location.pathname}/${entity._id}`);
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      },
    }
  }, []);
  
  const masterEntityDetailDialog: RenderInfoDetailDialog = useMemo(():RenderInfoDetailDialog => [
    {
      header: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
      className: 'col-7',
      data: {
        code: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.CODE'},
        name: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.NAME'},
        address: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.ADDRESS',
          formatter: (address: any, row: any, rowIndex: number) => {
            const addressString = `${address.district}, ${address.city}, ${address.state}`;
            return ( <>{addressString}</>);
          }
        },
        phone: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.PHONE_NUMBER'},
        status: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.STATUS',
          formatter: TickColumnFormatter
        },
      },
    },
    {
      header: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.SUBTITLE',
      className: 'col-5',
      titleClassName: 'col-5',
      dataClassName: 'col-7',
      data: {
        fullName: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.FULL_NAME',
          // keyField: 'owner.fullName'
        }, email: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.EMAIL',
          // keyField: 'owner.email'
        }, phone: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.PHONE_NUMBER',
          // keyField: 'owner.phone'
        },
      },
    },
  ], []);
  
  const searchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'SHIPPING_AGENCY.MASTER.SEARCH.CODE',
    },
    name: {
      type: 'string',
      label: 'SHIPPING_AGENCY.MASTER.SEARCH.NAME',
    },
    phone: {
      type: 'number',
      label: 'SHIPPING_AGENCY.MASTER.SEARCH.PHONE',
    },
  };
  
  const modifyModel = useMemo((): ModifyModel => [
    {
      title: 'THÔNG TIN CHUNG',
      className: 'col-6 pr-xl-15 pr-md-10 pr-5',
      data: {
        code: {
          type: 'string',
          label: 'SHIPPING_AGENCY.MODIFY.CODE',
          required: true,
          disabled: true,
        },
        name: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.NAME',
        },
        city: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.CITY',
        },
        district: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
        },
        quater: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
        },
        address: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
        },
        status: {
          type: 'boolean',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.STATUS',
        },
        phoneNumber: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.STATUS',
        },
        tax: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.STATUS',
        },
        images: {
          type: 'image',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.STATUS',
        },
      },
    }, {
      title: 'THÔNG TIN CHỦ ĐƠN VỊ',
      className: 'col-6 pl-xl-15 pl-md-10 pl-5',
      data: {
        code: {
          type: 'string',
          label: 'SHIPPING_AGENCY.MODIFY.CODE',
          required: true,
          disabled: true,
        },
        name: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.NAME',
        },
        city: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.CITY',
        },
        district: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
        },
        quater: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
        },
        address: {
          type: 'string',
          required: true,
          label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
        },
      },
    },
  ], []);
  
  const models: ModifyForm = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
    },
  };
  
  const allFormField: any = {
    ...GenerateAllFormField(
      modifyModel,
    ),
  };
  
  const actions: any = {
    save: {
      role: 'submit',
      type: 'submit',
      linkto: undefined,
      className: 'btn btn-primary mr-8 fixed-btn-width',
      label: 'Lưu',
      icon: <SaveOutlinedIcon/>,
    },
    cancel: {
      role: 'link-button',
      type: 'button',
      linkto: '/shipping-agency',
      className: 'btn btn-outline-primary fixed-btn-width',
      label: 'Hủy',
      icon: <CancelOutlinedIcon/>,
    },
  };
  
  return (
    <Fragment>
      <Switch>
        <Route path="/shipping-agency/new">
          <EntityCrudPage
            entity={createEntity}
            moduleName={moduleName}
            onModify={add}
            title={createTitle}
            code={null}
            get={() => null}
            models={models}
            // allFormField={allFormField}
            actions={actions}
            // validation={ProductTypeSchema}
            // autoFill={{
            //     field: 'code',
            //     data: GenerateCode(data)
            // }}
          />
        </Route>
        <Route path={`/shipping-agency/:code`}>
          {({history, match}) => (
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
              moduleName={moduleName}
              //  modifyModel={modifyModel}
              code={match && match.params.code}
              get={ShippingAgencyService.GetById}
              models={models}
              // allFormField={allFormField}
              actions={actions}
              //   validation={ProductTypeSchema}
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
            searchModel={searchModel}
          />
          <MasterBody
            title={tableTitle}
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
      <MasterEntityDetailDialog
        title={detailDialogTitle}
        moduleName={moduleName}
        entity={detailEntity}
        onHide={() => {
          setShowDetail(false);
        }}
        show={showDetail}
        size={'lg'}
        renderInfo={masterEntityDetailDialog}/>
      <DeleteEntityDialog
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={deleteDialogTitle}
        bodyTitle={deleteDialogBodyTitle}
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
    </Fragment>
  );
}

export default ShippingAgency
