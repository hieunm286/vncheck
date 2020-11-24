import React from 'react';
import { useIntl } from 'react-intl';
import {
  DefaultPagination,
  NormalColumn,
  SortColumn,
  StatusValue,
} from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import { ModifyModel, SearchModel } from '../../common-library/common-types/common-type';
import {
  GenerateAllFormField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import * as ProductionPlanService from './production-plan.service';
import { ProductionPlanModel } from './production-plant.model';
import ProductionPlanBody from './production-plant-body';
import './style/production-plan.scss'

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`;

const data = [
  {
    _id: 'xxx',
    plantCode: '000001',
    growCode: '000001',
    speciesName: 'Rau muống',
    time: '20/11/2020',
  }
]

const data2 = [
  {
    _id: 'xcasvs',
    planCode: '000001',
    plantCode: '000001',
    growCode: '000001',
    speciesName: 'Rau muống',
    createAt: '10/11/2020',
    status: 'Hoàn thành',
    approve: 'Đã duyệt'
  }
]


function ProductionPlan() {
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
  } = InitMasterProps<ProductionPlanModel>({
    getServer: ProductionPlanService.Get,
    countServer: ProductionPlanService.Count,
    createServer: ProductionPlanService.Create,
    deleteServer: ProductionPlanService.Delete,
    deleteManyServer: ProductionPlanService.DeleteMany,
    getAllServer: ProductionPlanService.GetAll,
    updateServer: ProductionPlanService.Update,
  });

  //   useEffect(() => {
  //     getAll(filterProps);
  //   }, [paginationProps, trigger, filterProps]);

  const columns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>
          {rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}
        </p>
      ),
      style: { paddingTop: 20 },
    },
    plantCode: {
      dataField: 'plantCode',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to=''>
          {row.plantCode}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    growCode: {
      dataField: 'growCode',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.GROW_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to=''>
          {row.growCode}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },

    speciesName: {
      dataField: 'speciesName',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SPECIES_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    time: {
      dataField: 'time',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.HARVEST_DATE' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to=''>
          <button className="btn btn-primary">
            + Tạo mới
          </button>
        </Link>
      ),
     
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const columns2 = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>
          {rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}
        </p>
      ),
      style: { paddingTop: 20 },
    },
    planCode: {
      dataField: 'planCode',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CODE' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    plantCode: {
      dataField: 'plantCode',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to=''>
          {row.plantCode}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    growCode: {
      dataField: 'growCode',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.GROW_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to=''>
          {row.growCode}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    speciesName: {
      dataField: 'speciesName',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SPECIES_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    createAt: {
      dataField: 'createAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CREATE_DATE' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    status: {
      dataField: 'status',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.STATUS' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    approveStatus: {
      dataField: 'approve',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.APPROVE_STATUS' })}`,
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
        onShowDetail: (entity: any) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: any) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: any) => {
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

  const productTypeSearchModel: SearchModel = {
    plantCode: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      service: ProductionPlanService,
      keyField: 'code',
    },
    growCode: {
      type: 'string',
      placeholder: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
      service: ProductionPlanService,
      keyField: 'name',
    },
    productTypeName: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
      service: ProductionPlanService,
      keyField: 'name',
      ref: true,
    },
    date: {
      type: 'Datetime',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      service: ProductionPlanService,
      keyField: 'agencyAddress',
    },
  };

  const TabData = [
    {
      tabTitle: 'Chờ tạo',
      entities: data,
      columns: columns,
      total: data.length,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
    {
      tabTitle: 'Theo dõi',
      entities: data2,
      columns: columns2,
      total: data2.length,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
  ];

  return (
    <React.Fragment>
      <Route path="/production-plan">
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
        <ProductionPlanBody
          tabData={TabData}
        />
      </Route>
    </React.Fragment>
  );
}

export default ProductionPlan;
