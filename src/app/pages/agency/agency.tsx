import React, { useEffect, Fragment, useState } from "react";
import {useIntl} from 'react-intl';


import {InitMasterProps} from "../../common-library/helpers/common-function-promise";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import { AgencyModel } from './agency.model';
import { MasterHeader } from "../../common-library/common-components/master-header";
import { MasterBody } from "../../common-library/common-components/master-body";
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';

import { DefaultPagination, NormalColumn, SortColumn } from '../../common-library/common-consts/const';

import {ModifyModel, SearchModel} from "../../common-library/common-types/common-type";

import { DeleteEntityDialog } from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import * as Yup from "yup";
import {  MasterEntityDetailAgency } from "../../common-library/common-components/master-entity-detail-dialog-agency";
import { getUserById } from "../account/_redux/user-crud";
import * as agencyTypeService from "../agency-type-2/agency-type.service";
import ModifyEntityPageAgency from './helpers/modify-entity-page-agency';
import EntityCrudPageAgency from "./helpers/entity-crud-page-agency";
import * as AgencyService from './agency.service';
import { ConvertStatusToBoolean, ConvertStatusToString, ConvertToTreeNode, GenerateAllFormField } from '../../common-library/helpers/common-function';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { convertToServer } from "./helpers/convert-data-model";
import { mockAgency } from "./helpers/mock-entity";
import { agencySearchModel, formPart, allFormField, allFormButton, agencySchema, masterEntityDetailDialog } from './defined/const';

function AgencyPage() {

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
    error,
    setError,
    add, update, get, deleteMany, deleteFn, getAll, refreshData
  } = InitMasterProps<AgencyModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });

  useEffect(() => {
    getAll(filterProps);
    // setEntities(mock_entities);
    // setEntities([{}]);
  }, [paginationProps, trigger, filterProps]);

  const history = useHistory();

  const moduleName = 'AGENCY.MODULE_NAME';
  const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
  const detailTitle = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE.2';
  // const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  // const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';

  const columns = [
    {
      dataField: 'ordinal',
      text: '#',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: {paddingTop: 20},
    },    {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL'})}`,
      ...SortColumn
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'address',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => {
        return (
        <p>{row.address.district + ',' + row.address.city + ',' + row.address.state}</p> )
      },
      ...SortColumn
    },
    
    {
      dataField: 'phone',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'})}`,
      ...SortColumn,
      formatter: (cell: any, row: any) => row.status === "1" ?
        (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<CheckCircleIcon style={{color: '#C4C4C4'}}/>),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: AgencyModel) => {
          get(entity)
            .then(res => {
              setDetailEntity(res.data);
            })
            .catch(error => {
              console.log(error);
            });
          setShowDetail(true);
        },
        onDelete: (entity: AgencyModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: AgencyModel) => {
          // setEditEntity(entity);
          // get(entity);
          setEditEntity(ConvertStatusToBoolean(entity));
          history.push(`${window.location.pathname}/${entity._id}`) // setShowEdit(true);
          // history.push(`${entity._id}`) // setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];

  return (
    <Fragment>


      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
        loading={loading}
        error={error}
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
        error={error}
      />

      <Switch>
        {/* <Redirect from="/purchase-order/edit" to="/purchase-order" /> */}
        <Route path="/agency" exact={true}>
          {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
              {/* initValue={filterProps}/> */}
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
            searchModel={agencySearchModel}
            initValue={{
              code: '',
              lot: '',
              subLot: '',
              address: {
                state: '',
                city: '',
                district: ''
              }
              // agencyAddress: '',
              // agency: null,
              // date: '',
              // count: 1,
              // tree: undefined,
              // tree2: undefined,
            }}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setEditEntity(null);
              // setCreateEntity(mockAgency);
              setCreateEntity(null)
              history.push('/agency/new');// setShowCreate(true);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={entities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
          />
        </Route>
        <Route path="/agency/new">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={createEntity}
              onModify={(values) => {
                add(ConvertStatusToString(convertToServer(values)))
              }}
              // title={updateTitle}
              //  modifyModel={modifyModel}
              // reduxModel="purchaseOrder"
              code={match && match.params.id}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={agencySchema}
            />
          )}
        </Route>
        <Route path="/agency/:code">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={editEntity}
              onModify={(values) => {
                update(ConvertStatusToString(convertToServer(values)))
              }}
              code={match && match.params.code}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={agencySchema}
            />
          )}
        </Route>
      </Switch>

      <MasterEntityDetailAgency
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
          setShowDetail(false);
        }}
        title={detailTitle}
      />
    </Fragment>
  );
}

export default AgencyPage;