import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn,} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {InitMasterProps,} from '../../common-library/helpers/common-function';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as ProductionPlanService from './production-plan.service';
import {ProductionPlanModel} from './production-plant.model';
import ProductionPlanBody from './production-plant-body';
import './style/production-plan.scss';
import {ProductPlanActionsColumn} from './production-plan-actions-column';
import EntityCrudPagePromise from '../../common-library/common-components/entity-crud-page-promise';
import ProductionPlanVersion from './production-plan-version';
import {MasterEntityDetailPage} from '../../common-library/common-components/master-detail-page';
import ProductionPlanModal from './production-plan-modal';
import {
  allFormField,
  formPart,
  halfValidate,
  masterEntityDetailDialog2,
  packingValidate,
  PlantingDetailDialog,
  preservationValidate,
  productPlanSearchModel1,
  productPlanSearchModel2,
  SeedingDetailDialog,
  validate,
} from './defined/const';
import {getAllUsers} from '../account/_redux/user-crud';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import ProductionPlanCrud from './production-plan-crud';
import { fetchAllUser } from '../account/_redux/user-action';
import * as Yup from 'yup';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `/production-plan`;

const versionData = [
  {
    _id: 'cávsd',
    name: 'Phiên bản 1',
    createBy: 'Nguyễn C',
    createDate: new Date(),
    approveDate: new Date(),
  },
];


const ProductPlantSchema = Yup.object().shape({
  harvesting: Yup.object().shape(halfValidate),
  preliminaryTreatment: Yup.object().shape(validate),
  cleaning: Yup.object().shape(validate),
  packing: Yup.object().shape(packingValidate),
  preservation: Yup.object().shape(preservationValidate)
  
  // cleaning: Yup.object().shape({
  //   technical: Yup.array().typeError('Type err'),
  //   leader: Yup.array()
  // }).test('global-ok', 'Nhập hết vào', (value: any) => {
  //   return value.technical && value.technical.length > 0 && value.leader && value.leader.length > 0
  // }),
});

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
  
  const [tagData, setTagData] = useState([])

  const [submit, setSubmit] = useState(false)
  
    
  const { authState } = useSelector(
    (state: any) => ({
      authState: state.auth,
    }),
    shallowEqual,
  );
  const { username, role } = authState;

  // const userData = currentState.entities;

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(fetchAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  
  useEffect(() => {
    getAll({...(filterProps as any), step: currentTab});
    
  }, [paginationProps, trigger, filterProps, currentTab]);
  
  
  
  
  const columns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      headerClasses: 'text-center',
      align: 'center'
  
    },
    
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SEEDING_CODE'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      align: 'center',
      // classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.PLANT_CODE'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link
          to={{
            pathname: `/production-plan/planting/${row._id}`,
            state: {seedingCode: row.seeding, ...row.planting},
          }}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      align: 'center',
    },
    
    species: {
      dataField: 'seeding.species.name',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SPECIES_NAME'})}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    estimatedHarvestTime: {
      dataField: 'planting.estimatedHarvestTime',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.HARVEST_DATE'})}`,
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
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            ProductionPlanService.GetById(row._id).then(res => {
              setEditEntity(res.data)
              history.push({
                pathname: '/production-plan/new/' + row._id,
                state: res.data
              })
            })
          }}>
          + Tạo mới
        </button>
      ),
      
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  };
  
  const columns2 = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: {paddingTop: 20},
    },
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.CODE'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SEEDING_CODE'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.PLANT_CODE'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={{pathname: `/production-plan/planting/${row._id}`, state: row.planting}}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    species: {
      dataField: 'planting.species.name',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SPECIES_NAME'})}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.CREATE_DATE'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt))}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    process: {
      dataField: 'process',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.STATUS'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{row.process === '1' ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    confirmationStatus: {
      dataField: 'confirmationStatus',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.APPROVE_STATUS'})}`,
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
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
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
      style: {minWidth: '130px'},
    },
  };
  
  const TabData = [
    {
      tabTitle: 'Chờ tạo',
      entities: entities,
      columns: columns,
      total: total,
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
      total: total,
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
        role: 'special',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Gửi duyệt',
        icon: <SaveOutlinedIcon/>,
        onClick: () => {
          // setNoticeModal(true);
          setSubmit(true)
        },
      },
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Lưu',
        icon: <CancelOutlinedIcon/>,
        onClick: () => {
          // setNoticeModal(true);
          setSubmit(false)
        },
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/production-plan',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'Hủy',
        icon: <CancelOutlinedIcon/>,
      },
    },
  };

  const adminAllFormButton: any = {
    type: 'outside',
    data: {
      approve: {
        role: 'button',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Phê duyệt',
        icon: <SaveOutlinedIcon/>,
        onClick: () => {
          // setNoticeModal(true);
          // setSubmit(true)
        },
      },
      refuse: {
        role: 'button',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Từ chối',
        icon: <SaveOutlinedIcon/>,
        onClick: () => {
          // setNoticeModal(true);
          // setSubmit(true)
        },
      },
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Lưu',
        icon: <CancelOutlinedIcon/>,
        onClick: () => {
          // setNoticeModal(true);
          setSubmit(false)
        },
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/production-plan',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'Hủy',
        icon: <CancelOutlinedIcon/>,
      },
    },
  };

  const approve = (entity: any) => {
    const data = { confirmationStatus: "1" }
    return ProductionPlanService.Approve(entity, data)
  }
  
  return (
    <React.Fragment>
      <Switch>
        <Route path="/production-plan/new/:id">
          {({history, match}) => (
            <>
              {/* <ProductionPlanModal
                show={noticeModal}
                mode="notice"
                title="abc"
                body="xyz"
                onClose={() => {
                  setNoticeModal(false);
                  setSubmit(true);
                }}
                setSubmit={setSubmit}
              /> */}
              <ProductionPlanCrud
                entity={history.location.state}
                onModify={updatePromise}
                title={createTitle}
                // reduxModel="purchaseOrder"
                code={match && match.params.id}
                get={(code) => ProductionPlanService.GetById(code)}
                formPart={formPart}
                allFormField={allFormField}
                allFormButton={username === 'admin' ? adminAllFormButton : allFormButton}
                validation={ProductPlantSchema}
                autoFill={{
                  field: '',
                  data: null,
                  searchSelectField: [{field: 'packing', ref: {prop: 'packing', key: 'packing.weight'}}],
                }}
                refreshData={refreshData}
                homePage={homeURL}
                tagData={tagData}
                submit={submit}
                onApprove={approve}
              />
            </>
          )}
        </Route>
        <Route exact path={`/production-plan/:code`}>
          {({history, match}) => (
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
          {({history, match}) => (
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
          {({history, match}) => (
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
          {({history, match}) => (
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
              setFilterProps({...value});
            }}
            onReset={() => {
              setPaginationProps(DefaultPagination)
              setFilterProps(undefined)
            }}
            searchModel={currentTab == '0' ? productPlanSearchModel1 : productPlanSearchModel2}
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
