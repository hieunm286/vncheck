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

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'CUSTOMERS_LISTS';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PRODUCT_TYPE.UPDATE.TITLE';

const standardizeamedName = (name: string) => {
  let sName = name.trim();
  sName.toLowerCase();
  sName = sName.replace(/\s+/g, ' ');
  return sName.toLowerCase().replace(/(^|\s)\S/g, function(l) {
    return l.toUpperCase();
  });
};

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
  //   useEffect(() => {
  //     getAll(filterProps);
  //   }, [paginationProps, filterProps]);

  const masterColumns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'text-center',
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
    phone: {
      dataField: 'phone',
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
    buyDate: {
      dataField: 'buyDate',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_BUY_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.buyDate
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.buyDate))
            : 'Không có thông tin'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    species: {
      dataField: 'species.name',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    QR: {
      dataField: 'qr._id',
      text: `${intl.formatMessage({ id: 'QR.MASTER.TABLE.CODE' })}`,
      ...SortColumn,
      classes: 'text-center',
    },

    store: {
      dataField: 'store.name',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_STORE' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },

    seller: {
      dataField: 'store.seller.name',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_SELLER' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
  };

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
        phone: { title: 'CUSTOMERS_PHONE_NUMBER' },
        dateOfBirth: { title: 'CUSTOMERS_DETAIL_DOB' },
        address: { title: 'CUSTOMERS_DETAIL_ADDRESS' },
        role: { title: 'CUSTOMERS_DETAIL_ROLE' },
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
            <Card>
              <CardHeader
                title={
                  <>
                    <span onClick={() => history.goBack()}>
                      <ArrowBackIosIcon />
                    </span>
                    {match && match.params.code}
                  </>
                }
              />
              <CardBody>
                <div className="mt-8 mb-10">
                  <span className="text-primary detail-dialog-subtitle">LỊCH SỬ MUA HÀNG</span>
                </div>
                <MasterTable
                  entities={(history.location.state as any) || []}
                  columns={historyColumn as any}
                  total={total}
                  loading={loading}
                  paginationParams={paginationProps}
                  setPaginationParams={setPaginationProps}
                />
              </CardBody>
            </Card>
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
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={masterData}
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
