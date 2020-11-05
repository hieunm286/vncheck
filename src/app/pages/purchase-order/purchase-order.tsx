import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Count, Create, Delete, DeleteMany, Get, GetAll, Update } from './purchase-order.service';
import { PurchaseOrderModel } from './purchase-order.model';
import { NormalColumn, SortColumn, StatusValue } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import { MasterBody } from '../../common-library/common-components/master-body';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { ModifyModel, SearchModel } from '../../common-library/common-types/common-type';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import * as AgencyService from './agency.service';
import * as PurchaseOrderService from './purchase-order.service';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ModifyEntityPage from '../../common-library/common-components/modify-entity-page';
import { purchaseOrderSlice, callTypes } from './purchase-order.redux';
import ImageUploading from 'react-images-uploading';

function PurchaseOrder() {
  const intl = useIntl();
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
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<PurchaseOrderModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });

  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'PURCHASE_ORDER.MASTER.HEADER.TITLE';
  const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const history = useHistory();

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, trigger, filterProps]);

  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' })}`,
      ...SortColumn,
    },
    agencyAddress: {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' })}`,
      ...SortColumn,
    },

    phoneNumber: {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' })}`,
      ...SortColumn,
    },
    status: {
      dataField: 'status',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN' })}`,
      ...SortColumn,
      formatter: (cell: any, row: any) =>
        row.status === StatusValue ? (
          <CheckCircleIcon style={{ color: '#1DBE2D' }} />
        ) : (
          <IndeterminateCheckBoxIcon />
        ),
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: PurchaseOrderModel) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: PurchaseOrderModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: PurchaseOrderModel) => {
          // history.push(`${window.location.pathname}/${entity.code}`);
          get(entity);
          setShowEdit(true);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };
  const masterEntityDetailDialog = {
    code: { title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' },
    agencyAddress: { title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
    phoneNumber: { title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' },
  };

  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      service: PurchaseOrderService,
      keyField: 'code',
    },
    agencyAddress: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      service: PurchaseOrderService,
      keyField: 'agencyAddress',
    },
    date: {
      type: 'Datetime',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      service: PurchaseOrderService,
      keyField: 'agencyAddress',
    },
    agency: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
      service: AgencyService,
      keyField: 'name',
      ref: true,
    },
    count: {
      type: 'number',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      service: PurchaseOrderService,
      keyField: 'count',
    },
  };

  const modifyModel: ModifyModel = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    },
    agencyAddress: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
    },
    phoneNumber: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
    },
    image: {
      type: 'image',
      placeholder: 'input image',
      label: 'Image',
    },
  };
  return (
    <Fragment>
      <MasterEntityDetailDialog
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
        onHide={() => {
          setShowDelete(false);
        }}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
      {/* <ModifyEntityDialog
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowCreate(false);
        }}
      />*/}
      <ModifyEntityDialog
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowEdit(false);
        }}
      />
      <Switch>
        <Redirect from="/purchase-order/edit" to="/purchase-order" />

        <Route path="/purchase-order/new">
          <ModifyEntityPage
            entity={createEntity}
            onModify={add}
            title={createTitle}
            modifyModel={modifyModel}
            reduxModel="purchaseOrder"
            code={null}
            get={() => null}
          />
        </Route>
        {/* <Route path={`/purchase-order/:code`}>
          {({ history, match }) => (
            <ModifyEntityPage
              entity={editEntity}
              onModify={update}
              title={updateTitle}
              modifyModel={modifyModel}
              reduxModel="purchaseOrder"
              code={match && match.params.code}
              get={PurchaseOrderService.GetById}
            />
          )}
        </Route> */}
        <Route path="/purchase-order">
          <MasterHeader
            title={headerTitle}
            onSearch={setFilterProps}
            searchModel={purchaseOrderSearchModel}
            initValue={{
              code: null,
              agencyAddress: null,
              agency: null,
              date: '',
              count: 15,
            }}
          />
          <MasterBody
            onCreate={() => {
              setCreateEntity(null);
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
        </Route>
      </Switch>
    </Fragment>
  );
}

export default PurchaseOrder;
