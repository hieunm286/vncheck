import React, { useEffect, useState } from 'react';
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
import './style/production-plan.scss';
import { ProductPlanActionsColumn } from './production-plan-actions-column';
import EntityCrudPagePromise from '../../common-library/common-components/entity-crud-page-promise';
import ProductionPlanVersion from './production-plan-version';
import Visibility from '@material-ui/icons/Visibility';
import { MasterEntityDetailPage } from '../../common-library/common-components/master-detail-page';
import ProductionPlanModal from './production-plan-modal';
import {
  allFormField,
  formPart,
  PlantingDetailDialog,
  masterEntityDetailDialog2,
  productPlanSearchModel1,
  productPlanSearchModel2,
  SeedingDetailDialog,
} from './defined/const';
import { getAllUsers } from '../account/_redux/user-crud';
import { fetchAllUser } from '../account/_redux/user-action';
import { useDispatch } from 'react-redux';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `/production-plan`;

const data = [
  {
    step: 'string',
    isFulfilled: true,
    confirmationStatus: true,
    _id: 'string',
    code: 'string',
    process: 1,
    seeding: {
      certificates: {
        path: 'string',
        hash: 'string',
      },
      buyInvoice: {
        path: 'string',
        hash: 'string',
      },
      farmLocation: {
        coordinates: ['abc'],
        type: 'string',
      },
      landLotImage: {
        path: 'string',
        hash: 'string',
      },
      leader: ['xyz'],
      worker: ['zzz'],
      _id: 'string',
      code: 'string',
      seedingTime: new Date(),
      estimatedPlantingTime: new Date(),
      landLot: 'string',
      species: {
        _id: 'string12',
        name: 'string',
        barcode: 'string',
        seedingDays: 14,
        plantingDays: 15,
        expiryDays: 14,
        code: 'string',
      },
      area: 1,
      numberOfSeed: 2,
      expectedQuantity: 3,
      temperature: 4,
      humidity: 5,
      porosity: 6,
      manager: 'string',
    },
    planting: {
      farmLocation: {
        coordinates: ['zxc'],
        type: 'string',
      },
      imageAfter: {
        path: 'string',
        hash: 'string',
      },
      imageBefore: {
        path: 'string',
        hash: 'string',
      },
      leader: ['rrr'],
      worker: ['ttt'],
      _id: 'ghhgf',
      estimatedPlantingTime: new Date(),
      estimatedHarvestTime: new Date(),
      code: 'string',
      area: 1,
      numberOfPlants: 5,
      expectedQuantity: 7,
      temperature: 4,
      humidity: 5,
      porosity: 6,
      landLot: 'string',
      species: {
        _id: 'ghjgk',
        name: 'string',
        barcode: 'string',
        seedingDays: 14,
        plantingDays: 15,
        expiryDays: 16,
        code: 'string',
      },
      manager: 'string',
    },
    harvesting: {
      _id: 'strinhfgg',
      leader: [{ _id: 'strinfgkg', isRecieved: true, info: 'string' }],
      technicalStaff: [{ _id: 'stghfgfhring', isRecieved: true, info: 'string' }],
    },
    preliminaryTreatment: {
      _id: 'strigjfjng',
      time: new Date(),
      quantity: 14,
      leader: [{ _id: 'string', isRecieved: true, info: 'string' }],
      technicalStaff: [{ _id: 'striđâsg', isRecieved: true, info: 'string' }],
    },
    cleaning: {
      _id: 'hgfhgfj',
      time: Date,
      quantity: 14,
      leader: [{ _id: 'string', isRecieved: true, info: 'string' }],
      technicalStaff: [{ _id: 'striđâsg', isRecieved: true, info: 'string' }],
    },
    packing: {
      _id: 'sdhbdfhgfd',
      quantity: 32,
      leader: [{ _id: 'string', isRecieved: true, info: 'string' }],
    },
    preservation: {
      _id: 'fdnbdh',
      technicalStaff: [{ _id: 'striđâsg', isRecieved: true, info: 'string' }],
    },
    createdBy: {
      _id: 'bdfbdf',
      firstName: 'fdsb',
      lastName: 'string',
    },
    createdAt: new Date(),
    updateAt: new Date(),
  },
];

const data2 = [
  {
    _id: 'xcasvs',
    planCode: '000001',
    plantCode: '000001',
    growCode: '000001',
    speciesName: 'Rau muống',
    createAt: '10/11/2020',
    status: 'Hoàn thành',
    approve: 'Đã duyệt',
  },
];

const versionData = [
  {
    _id: 'cávsd',
    name: 'Phiên bản 1',
    createBy: 'Nguyễn C',
    createDate: new Date(),
    approveDate: new Date(),
  },
];

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
    addPromise,
    updatePromise,
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

  const [currentTab, setCurrentTab] = useState<string | undefined>('0');

  const [versionTitle, setVersionTitle] = useState<string>('');

  const [noticeModal, setNoticeModal] = useState<boolean>(false);

  const [params, setParams] = useState({ step: 0 }); 

  const [tagData, setTagData] = useState([])

  const dispatch = useDispatch();


  useEffect(() => {
    getAll(params);
    
  }, [paginationProps, trigger, params]);

  useEffect(() => {
    getAllUsers().then(res => {
      setTagData(res.data)
    })
  }, [])


  const columns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: { paddingTop: 20 },
    },

    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.GROW_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link
          to={{
            pathname: `/production-plan/planting/${row._id}`,
            state: { seedingCode: row.seeding, ...row.planting },
          }}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },

    species: {
      dataField: 'planting.species.name',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SPECIES_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    estimatedHarvestTime: {
      dataField: 'planting.estimatedHarvestTime',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.HARVEST_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {new Intl.DateTimeFormat('en-GB').format(new Date(row.planting.estimatedHarvestTime))}
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
        <Link to={{ pathname: '/production-plan/new/' + row._id, state: row }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              get(row);
              setEditEntity(row);
            }}>
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
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: { paddingTop: 20 },
    },
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CODE' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.GROW_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={{ pathname: `/production-plan/planting/${row._id}`, state: row.planting }}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    species: {
      dataField: 'planting.species.name',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SPECIES_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CREATE_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt))}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    process: {
      dataField: 'process',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.STATUS' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{row.process === '1' ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    confirmationStatus: {
      dataField: 'confirmationStatus',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.APPROVE_STATUS' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.confirmationStatus === '1' && 'Đã duyệt'}
          {row.confirmationStatus === '0' && 'Chờ duyệt'}
          {row.confirmationStatus === '2' && 'Từ chối'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: ProductPlanActionsColumn,
      formatExtraData: {
        intl,
        onShowDetail: (entity: any) => {
          setEditEntity(entity);
          setVersionTitle('Kế hoạch số' + entity._id);
          history.push(`${window.location.pathname}/${entity._id}`);
        },
        onEdit: (entity: any) => {
          get(entity);
          // setShowEdit(true);
          setEditEntity(entity);
          setVersionTitle('Kế hoạch số' + entity._id);
          history.push(`${window.location.pathname}/${entity._id}`);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const TabData = [
    {
      tabTitle: 'Chờ tạo',
      entities: entities,
      columns: columns,
      total: entities.length,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
    {
      tabTitle: 'Theo dõi',
      entities: entities,
      columns: columns2,
      total: entities.length,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
  ];

  const allFormButton: any = {
    type: 'outside',
    data: {
      sendRequest: {
        role: 'button',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Gửi duyệt',
        icon: <SaveOutlinedIcon />,
        onClick: () => {
          setNoticeModal(true);
        },
      },
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Lưu',
        icon: <CancelOutlinedIcon />,
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/production-plan',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'Hủy',
        icon: <CancelOutlinedIcon />,
      },
    },
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/production-plan/new/:id">
          {({ history, match }) => (
            <>
              <ProductionPlanModal
                show={noticeModal}
                mode="notice"
                title="abc"
                body="xyz"
                onClose={() => {
                  setNoticeModal(false);
                }}
              />
              <EntityCrudPagePromise
                entity={history.location.state}
                onModify={updatePromise}
                title={createTitle}
                // reduxModel="purchaseOrder"
                code={match && match.params.id}
                get={(code) => ProductionPlanService.GetById(code)}
                formPart={formPart}
                allFormField={allFormField}
                allFormButton={allFormButton}
                // validation={ProductTypeSchema}
                // autoFill={{
                //   field: 'code',
                //   data: GenerateCode(data),
                // }}
                refreshData={refreshData}
                homePage={homeURL}
                tagData={tagData}
              />
            </>
          )}
        </Route>
        <Route exact path={`/production-plan/:code`}>
          {({ history, match }) => (
            <ProductionPlanVersion
              title={match && match.params.code}
              data={versionData}
              total={versionData.length}
              loading={loading}
              paginationParams={paginationProps}
              setPaginationParams={setPaginationProps}
              onSelectMany={setSelectedEntities}
              selectedEntities={selectedEntities}
            />
          )}
        </Route>
        <Route exact path="/production-plan/seeding/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={detailEntity}
              renderInfo={SeedingDetailDialog}
              code={match && match.params.code}
              get={(code) => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              mode="line"
              title="THÔNG TIN GIEO GIỐNG"
            />
          )}
        </Route>
        <Route exact path="/production-plan/planting/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={PlantingDetailDialog}
              code={match && match.params.code}
              get={(code) => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              mode="line"
              title="THÔNG TIN GIEO TRỒNG"
              homeURL={homeURL}
            />
          )}
        </Route>
        <Route exact path="/production-plan/plan-view/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={detailEntity}
              renderInfo={masterEntityDetailDialog2}
              code={match && match.params.code}
              get={(code) => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              mode="split"
              title={`${detailEntity ? detailEntity._id : 'nothing'}`}
            />
          )}
        </Route>
        <Route path="/production-plan">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={currentTab == '0' ? productPlanSearchModel1 : productPlanSearchModel2}
            initValue={{
              code: '',
              name: '',
            }}
          />
          <ProductionPlanBody
            tabData={TabData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionPlan;
