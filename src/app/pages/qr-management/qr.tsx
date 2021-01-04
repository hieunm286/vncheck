import React, {Fragment, useEffect, useMemo} from "react";
import {useIntl} from 'react-intl';

import * as UserService from '../user/user.service';
import {DisplayTime, InitMasterProps} from "../../common-library/helpers/common-function";
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetById, Update} from './qr.service';
import {QrModel} from './qr.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";

import {DefaultPagination, SortColumn} from '../../common-library/common-consts/const';


import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {SearchModel} from "../../common-library/common-types/common-type";
import {MasterEntityDetailPage} from "../../common-library/common-components/master-detail-page";
import {QrRenderDetail} from "./qr.render-info";
import * as MultilevelSaleService from '../multilevel-sale/multilevel-sale.service';
import User from "../account";
import { bodyEntities, detailEntities } from "./qr-mock";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import { MasterQrParentDetail } from "./qr-detail";

const headerTitle = 'QR.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'QR.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'QR.MASTER.BODY.TITLE';


function QrPage() {
  const history = useHistory();
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
    add, update, get, deleteMany, deleteFn, getAll, refreshData,
  } = InitMasterProps<QrModel>({
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
  }, [paginationProps, filterProps]);
  
  
  const columns = useMemo(() => {
    return {
      code: {
        dataField: 'code',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: string, row: any, rowIndex: number) => {console.log(row.codeType === 'Đóng gói');return <Link to={'qr/' + (row.codeType === 'Đóng gói' ? 'qr-parent/' : 'qr-child/') + cell}>{cell}</Link>},
      },
      createdBy: {
        dataField: 'createdBy',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_BY'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any, rowIndex: number) => {return <>{cell.firstName + ' ' + cell.lastName}</>},
      },
      createdDate: {
        dataField: 'createdDate',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_DATE'})}`,
        ...SortColumn,
        formatter: (cell: any, row: any, rowIndex: number) => (<DisplayTime value={cell}/>),
        align: 'center',
      },
      activeBy: {
        dataField: 'activeBy',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_BY'})}`,
        ...SortColumn,
        align: 'center',
      },
      activeAt: {
        dataField: 'activeAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_AT'})}`,
        ...SortColumn,
        formatter: (cell: any, row: any, rowIndex: number) => (<DisplayTime value={cell}/>),
        align: 'center',
      },
      codeType: {
        dataField: 'codeType',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE_TYPE'})}`,
        ...SortColumn,
        align: 'center',
      },
    }
  }, []);
  
  
  const searchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'QR.MASTER.SEARCH.CODE',
    },
    createdBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CREATED_BY',
      onSearch: UserService.GetAll,
    },
    createdDate: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.CREATED_DATE',
    },
    activeBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.ACTIVE_BY',
      onSearch: UserService.GetAll,
    },
    activeAt: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.ACTIVE_AT',
    },
    codeType: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CODE_TYPE',
      onSearch: console.log
    },
  };
  
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
        {/* <Redirect from="/agency/:code" to="/agency" /> */}
        <Route path="/qr" exact={true}>
          {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
          {/* initValue={filterProps}/> */}
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              // history.push(`${window.location.pathname}/0000000`);
              setShowCreate(true);
            }}
            entities={bodyEntities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
          />
          <ModifyEntityDialog
            show={showCreate}
            formModel={{
              _header: 'a',
              // _className: '',
              // _titlenpClassName: '',
              // _dataClassName: '',
              _panel1: {
                _title: '',
                group1: {
                  _subTitle: '',
                  codeType: {
                    _type: 'string',
                    label: 'QR.CODE_TYPE',
                  },
                  quantity: {
                    _type: 'number',
                    label: 'QR.QUANTITY',
                  }
                }
              }
              
            }}
            onHide={refreshData}
            onModify={add}
          />
        </Route>
        <Route path="/qr/qr-parent/123456">
          <MasterQrParentDetail
            entity={detailEntities}
          />
        </Route>
        <Route path="/qr/qr-child/123456">

        </Route>
        <Route exact path="/qr/:code">
          {({history, match}) => (
            <MasterEntityDetailPage
              renderInfo={QrRenderDetail}
              code={match && match.params.code}
              get={code => GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="THÔNG TIN GIEO GIỐNG"
            />
          )}
        </Route>
        <Route path="/qr/0000000">
          {/*<EntityCrudPage*/}
          {/*  moduleName={moduleName}*/}
          {/*  onModify={add}*/}
          {/*  formModel={createForm}*/}
          {/*  actions={actions}*/}
          {/*  entity={initCreateValues}*/}
          {/*  // validation={validationSchema}*/}
          {/*/>*/}
        </Route>
        <Route path="/qr/:code">
          {/*{({history, match}) => (*/}
          {/*  <EntityCrudPage*/}
          {/*    onModify={update}*/}
          {/*    moduleName={moduleName}*/}
          {/*    code={match && match.params.code}*/}
          {/*    get={AgencyService.GetById}*/}
          {/*    formModel={updateForm}*/}
          {/*    actions={actions}*/}
          {/*    validation={validationSchema}*/}
          {/*  />*/}
          {/*)}*/}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default QrPage;