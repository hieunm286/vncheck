import React, { Fragment, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import {
  DefaultPagination,
  NormalColumn,
  SortColumn,
} from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterBody } from '../../common-library/common-components/master-body';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import { InitMasterProps, InitValues } from '../../common-library/helpers/common-function';
import { Route, Switch, useHistory } from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetail,
  SearchModel,
} from '../../common-library/common-types/common-type';
import { Spinner } from 'react-bootstrap';
import { DetailImage } from '../../common-library/common-components/detail/detail-image';
import * as CustomersService from './customers.service';
import { CustomersModel, historyData, masterData } from './customers.model';
import HistoryIcon from '@material-ui/icons/History';
import { MasterTable } from '../../common-library/common-components/master-table';
import { Card, CardBody, CardHeader } from '../../common-library/card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CustomersManagementView from './customers-management-history';
import Visibility from '@material-ui/icons/Visibility';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'CUSTOMERS_LISTS';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PRODUCT_TYPE.UPDATE.TITLE';

const HistoryTitle = "LỊCH SỬ MUA HÀNG"
const PurchaseOrderTitle = "ĐƠN HÀNG "

function CustomersManagement() {
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
  } = InitMasterProps<CustomersModel>({
    getServer: CustomersService.Get,
    countServer: CustomersService.Count,
    createServer: CustomersService.Create,
    deleteServer: CustomersService.Delete,
    deleteManyServer: CustomersService.DeleteMany,
    getAllServer: CustomersService.GetAll,
    updateServer: CustomersService.Update,
  });

    useEffect(() => {
      getAll(filterProps);
    }, [paginationProps, filterProps]);

  const masterColumns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'mr-3',
      style: { paddingTop: 20 },
    },
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span
          className="text-primary"
          style={{ fontWeight: 600, cursor: 'pointer' }}
          onClick={() => {
            setShowDetail(true);
            setDetailEntity(row);
          }}>
          {row.code}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    fullName: {
      dataField: 'fullName',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_PHONE_NUMBER' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    username: {
      dataField: 'username',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_PHONE_NUMBER' })}`,
      ...SortColumn,
      classes: 'text-center',
    },

    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_CREATED_AT' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.createdAt
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt))
            : 'Không có thông tin'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span
          className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
          onClick={() => {
            // ProductionPlanService.GetById(row._id).then(res => {
            //   setEditEntity(res.data);
            //   history.push({
            //     pathname: '/production-plan/plan-view/' + row._id,
            //     state: res.data,
            //   });
            // });
            history.push({
              pathname: '/customers-management/' + row._id + '/history',
              state: historyData,
            });
          }}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <HistoryIcon className="text-primary eye" />
          </span>
        </span>
      ),

      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const historyColumn = {
    code: {
      dataField: 'code',
      text: `ĐƠN HÀNG`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span
          className="text-primary"
          style={{ fontWeight: 600, cursor: 'pointer' }}
        >
          {row.code}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_BUY_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.createdAt
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt))
            : 'Không có thông tin'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    sellAgency: {
      dataField: 'sellAgency',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    seller: {
      dataField: 'seller.fullName',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_SELLER' })}`,
      ...SortColumn,
      classes: 'text-center',
    },

    action: {
      dataField: 'action',
      text: 'action',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span
          className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
          onClick={() => {
            history.push({
              pathname: '/production-plan/plan-view/version/' + row._id,
            });
          }}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <Visibility className="text-primary eye" />
          </span>
        </span>
      ),
    }
  };

  const productInPurChaseOrderColumn = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'mr-3',
      style: { paddingTop: 20 },
    },
    species: {
      dataField: 'species.name',
      text: 'Tên chủng loại',
      classes: 'text-center',
    },
    packing: {
      dataField: 'packing.weight',
      text: 'Tên chủng loại',
      classes: 'text-center',
    },
    qr: {
      dataField: 'qr',
      text: 'Mã QR',
      ...SortColumn,
      classes: 'text-center',
    }
  }

  const masterEntityDetailDialog: RenderInfoDetail = [
    {
      data: {
        image: {
          formatter: (data, values) => (
            <DetailImage width={'270px'} height={'270px'} images={data} values={values} />
          ),
        },
      },
      className: 'col-lg-6 col-md-12 d-flex justify-content-right align-items-center mr-5 ml-5',
      dataClassName: 'd-flex',
    },
    {
      data: {
        name: { title: 'CUSTOMERS_DETAIL_NAME' },
        gender: { title: 'CUSTOMERS_DETAIL_GENDER' },
        username: { title: 'CUSTOMERS_PHONE_NUMBER' },
        birthDay: { title: 'CUSTOMERS_DETAIL_DOB' },
        email: { title: 'EMAIL' },
      },
      dataClassName: 'col-lg-5 col-md-8',
      titleClassName: 'col-lg-7 col-md-4',
      className: 'col-lg-5 col-md-12',
    },
  ];

  const productTypeSearchModel: SearchModel = {
    phone: {
      type: 'string',
      label: 'CUSTOMERS_PHONE_NUMBER',
    },
  };

  return (
    <Fragment>
      <MasterEntityDetailDialog
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onHide={() => {
          setShowDetail(false);
        }}
        moduleName={'EMPTY'}
        size={'lg'}
      />

      <Switch>
        <Route exact path={`/customers-management/:code/history`}>
          {({ history, match }) => (
            <CustomersManagementView
              columns={historyColumn}
              code={match && match.params.code}
              history={history}
              title={HistoryTitle}
              onFetch={(code) => CustomersService.GetOrders(code, { paginationProps, filterProps })}
            />
          )}
        </Route>
        <Route exact path={`/customers-management/:code/purchase-order`}>
          {({ history, match }) => (
            <CustomersManagementView
              columns={productInPurChaseOrderColumn}
              code={match && match.params.code}
              history={history}
              title={PurchaseOrderTitle + (match ? match.params.code : '')}
              onFetch={(code) => CustomersService.GetOrderDetail(code, { paginationProps, filterProps })}
            />
          )}
        </Route>
        <Route path="/customers-management">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={productTypeSearchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {}}
            hideHeaderButton={true}
            entities={entities}
            total={total}
            columns={masterColumns as any}
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

export default CustomersManagement;
