import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn,} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {InitMasterProps} from '../../common-library/helpers/common-function';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as ProductionPlanService from './production-plan.service';
import * as UserService from '../user/user.service';
import {ProductionPlanModel} from './production-plant.model';
import ProductionPlanBody from './production-plant-body';
import './style/production-plan.scss';
import {ProductPlanActionsColumn} from './production-plan-actions-column';
import ProductionPlanVersion from './production-plan-version';
import {MasterEntityDetailPage} from '../../common-library/common-components/master-detail-page';
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
import {shallowEqual, useSelector} from 'react-redux';
import ProductionPlanCrud from './production-plan-crud';
import * as Yup from 'yup';
import Visibility from '@material-ui/icons/Visibility';
import _ from 'lodash';
import {ModifyForm, ModifyPanel} from '../../common-library/common-types/common-type';
import * as ProductPackagingService from '../product-packaging/product-packaging.service';
import {ProductionPlanDetail} from './production-plan-detail';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'MENU.PRODUCT_PLANT';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `/production-plan`;

const harvestingProcess = 2,
  preliminaryTreatmentProcess = 3,
  cleaningProcess = 4,
  packingProcess = 5,
  preservationProcess = 6;

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
  harvesting: Yup.object()
    .shape(halfValidate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function(values: any) {
      console.log(this.parent.harvesting);
      console.log(values);
      if (values.technical.length === 0 || values.leader.length === 0) {
        if (
          this.parent.preliminaryTreatment.technical.length > 0 ||
          this.parent.preliminaryTreatment.leader.length > 0 ||
          this.parent.preliminaryTreatment.estimatedTime ||
          this.parent.preliminaryTreatment.estimatedQuantity > 0 ||
          this.parent.preliminaryTreatment.estimatedQuantity
        ) {
          return false;
        }
      }
      return true;
    }),
  preliminaryTreatment: Yup.object()
    .shape(validate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function(values: any) {
      console.log(this.parent.harvesting);
      console.log(values);
      if (
        values.technical.length === 0 ||
        values.leader.length === 0 ||
        !values.estimatedTime ||
        values.estimatedQuantity === 0 ||
        !values.estimatedQuantity
      ) {
        if (
          this.parent.cleaning.technical.length > 0 ||
          this.parent.cleaning.leader.length > 0 ||
          this.parent.cleaning.estimatedTime ||
          this.parent.cleaning.estimatedQuantity > 0 ||
          this.parent.cleaning.estimatedQuantity
        ) {
          return false;
        }
      }
      return true;
    }),
  cleaning: Yup.object()
    .shape(validate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function(values: any) {
      console.log(this.parent.preliminaryTreatment);
      console.log(values);

      if (
        // this.parent.harvesting.technical.length === 0 ||
        // this.parent.harvesting.leader.length === 0 ||
        values.technical.length === 0 ||
        values.leader.length === 0 ||
        !values.estimatedTime ||
        values.estimatedQuantity === 0 ||
        !values.estimatedQuantity
      ) {
        if (
          this.parent.packing.estimatedTime ||
          this.parent.packing.estimatedExpireTimeStart ||
          this.parent.packing.estimatedExpireTimeEnd ||
          // this.parent.packing.packing ||
          // (_.isObject(this.parent.packing.packing)) ||
          this.parent.packing.estimatedQuantity ||
          this.parent.packing.estimatedQuantity > 0 ||
          this.parent.packing.technical.length > 0 ||
          this.parent.packing.leader.length > 0
        ) {
          return false;
        }
        // else if (
        //   values.estimatedTime ||
        //   values.estimatedQuantity ||
        //   values.estimatedQuantity > 0 ||
        //   values.technical.length > 0 ||
        //   values.leader.length > 0
        // ) {
        //   return false;
        // }
        // return true;
      }
      return true;
    }),
  packing: Yup.object()
    .shape(packingValidate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function(values: any) {
      console.log(this.parent.packing);
      console.log(values);

      if (
        // this.parent.harvesting.technical.length === 0 ||
        // this.parent.harvesting.leader.length === 0 ||
        // this.parent.preliminaryTreatment.technical.length === 0 ||
        // this.parent.preliminaryTreatment.leader.length === 0 ||
        // !this.parent.preliminaryTreatment.estimatedTime ||
        // this.parent.preliminaryTreatment.estimatedQuantity === 0 ||
        // !this.parent.preliminaryTreatment.estimatedQuantity ||
        !values.estimatedTime ||
        !values.estimatedExpireTimeStart ||
        !values.estimatedExpireTimeEnd ||
        !values.packing ||
        (_.isObject(values.packing) && !values.packing.label) ||
        !values.estimatedQuantity ||
        values.estimatedQuantity === 0 ||
        values.technical.length === 0 ||
        values.leader.length === 0
      ) {
        if (
          this.parent.preservation.estimatedStartTime ||
          this.parent.preservation.estimatedEndTime > 0 ||
          this.parent.preservation.technical.length > 0
        ) {
          return true;
        }
        //  else if (
        //   values.estimatedTime ||
        //   values.estimatedQuantity ||
        //   values.estimatedQuantity > 0 ||
        //   values.technical.length > 0 ||
        //   values.leader.length > 0
        // ) {
        //   return false;
        // }
        // return true;
      }
      return true;
    }),
  preservation: Yup.object().shape(preservationValidate),

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
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    setLoading,
    spinning,
    setSpinning,
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

  const [currentTab, setCurrentTab] = useState<string | undefined>('0');

  const [versionTitle, setVersionTitle] = useState<string>('');

  const [noticeModal, setNoticeModal] = useState<boolean>(false);

  const [tagData, setTagData] = useState([]);

  const [submit, setSubmit] = useState(false);

  const [step, setStep] = useState('0');

  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    UserService.GetAll({ queryProps: {} }).then(e => {
      console.log(e);
      const rs = e.data as any;
      setUserData(rs.data);
    });
  }, []);

  const { authState } = useSelector(
    (state: any) => ({
      authState: state.auth,
    }),
    shallowEqual,
  );
  const { username, role } = authState;
  const [prevTab, setPrevTab] = useState<string | undefined>('0');
  useEffect(() => {
    if (currentTab === '0') {
      const t =
        prevTab !== currentTab && paginationProps.sortBy === 'updatedAt'
          ? {
              sortBy: '_id',
              sortType: 'desc',
            }
          : paginationProps;
      getAll({ ...(filterProps as any), step: '0', isMaster: true, ...t });
    } else if (currentTab === '1') {
      const t =
        prevTab !== currentTab ? { sortBy: 'updatedAt', sortType: 'desc' } : paginationProps;
      getAll({ ...(filterProps as any), step: '0', confirmationStatus: '1,3', ...t });
    } else if (currentTab === '2') {
      const t =
        prevTab !== currentTab ? { sortBy: 'updatedAt', sortType: 'desc' } : paginationProps;
      getAll({ ...(filterProps as any), step: '1', confirmationStatus: '2', isMaster: true, ...t });
    }
    setPrevTab(currentTab);
  }, [paginationProps, filterProps, currentTab]);

  const columns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'text-center',
      style: { paddingTop: 20 },
    },
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SEEDING_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      align: 'center',
      // classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
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
      align: 'center',
    },

    species: {
      dataField: 'seeding.species.name',
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
        <button
          className="btn btn-primary"
          onClick={() => {
            ProductionPlanService.GetById(row._id).then(res => {
              setEditEntity(res.data);
              history.push({
                pathname: '/production-plan/' + row._id + '/new',
                state: res.data,
              });
            });
          }}>
          + Tạo mới
        </button>
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
      classes: 'text-center',
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
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SEEDING_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={{ pathname: `/production-plan/planting/${row._id}`, state: row.planting }}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    species: {
      dataField: 'seeding.species.name',
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
        <span>{row.process === '7' ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
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
          {row.confirmationStatus === '1' && 'Chờ duyệt'}
          {row.confirmationStatus === '2' && 'Đã duyệt'}
          {row.confirmationStatus === '3' && 'Từ chối'}
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
        <button
          className="btn btn-primary"
          style={{ cursor: row.confirmationStatus === '3' ? 'not-allowed' : 'pointer' }}
          onClick={() => {
            ProductionPlanService.GetById(row._id).then(res => {
              setEditEntity(res.data);
              history.push({
                pathname: '/production-plan/plan-view/' + row._id,
                state: res.data,
              });
            });
          }}
          disabled={row.confirmationStatus === '3'}>
          Phê duyệt
        </button>
      ),

      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const columns3 = {
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
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CODE' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SEEDING_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={{ pathname: `/production-plan/planting/${row._id}`, state: row.planting }}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    species: {
      dataField: 'seeding.species.name',
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
        <span>{row.process === '7' ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
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
          ProductionPlanService.GetHistory(entity).then(res => {
            console.log(res.data);
            history.push({
              pathname: '/production-plan/' + entity._id + '/history',
              state: res.data.history,
            });
          });
        },
        onEdit: (entity: any) => {
          ProductionPlanService.GetById(entity._id).then(res => {
            setEditEntity(res.data);
            history.push({
              pathname: '/production-plan/' + entity._id + '/new',
              state: res.data,
            });
          });
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
      total: total,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
    {
      tabTitle: 'Chờ duyệt',
      entities: entities,
      columns: columns2,
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
      columns: columns3,
      total: total,
      loading: loading,
      paginationParams: { paginationProps },
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
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Gửi duyệt',
        icon: <SaveOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
          setStep('1');
          setSubmit(true);
        },
      },
      save: {
        role: 'submit',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Lưu',
        icon: <CancelOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
          setStep('0');
          setSubmit(false);
        },
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

  const allFormButton2: any = {
    type: 'outside',
    data: {
      sendRequest: {
        role: 'special',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Gửi duyệt',
        icon: <SaveOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
          setStep('1');
          setSubmit(true);
        },
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

  const sendRequest = (entity: any) => {
    const data = { confirmationStatus: '1' };
    return ProductionPlanService.Approve(entity, data);
  };

  const approve = (entity: any) => {
    const data = { confirmationStatus: '2' };
    return ProductionPlanService.Approve(entity, data);
  };

  const updateProcess = (entity: any) => {
    const newProcess = _.toString(_.toInteger(entity.process) + 1);
    const data = { process: newProcess };
    return ProductionPlanService.UpdateProcess(entity, data);
  };

  const refuse = (entity: any) => {
    const data = { confirmationStatus: '3' };
    return ProductionPlanService.Approve(entity, data);
  };

  const approveFollow = (entity: any) => {
    // const data = { ...entity, confirmationStatus: '1' }
    return ProductionPlanService.Approve(entity, entity);
  };

  const adminAllFormButton: any = {
    type: 'outside',
    data: {
      approve: {
        role: 'special',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Phê duyệt',
        icon: <SaveOutlinedIcon />,
        onClick: (entity: any) => {
          // setNoticeModal(true);
          // setSubmit(true)
          setStep('2');
          approve(entity)
            .then(res => {
              if (currentTab !== '1') {
                updateProcess(entity)
                  .then(ress => {
                    refreshData();
                    setCurrentTab('2');
                    history.push('/production-plan');
                  })
                  .catch(error => {});
              } else {
                setCurrentTab('2');
                history.push('/production-plan');
              }
            })
            .catch(error => {});
        },
      },
      refuse: {
        role: 'button',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Từ chối',
        icon: <SaveOutlinedIcon />,
        onClick: (entity: any) => {
          refuse(entity)
            .then(res => {
              refreshData();
              history.push('/production-plan');
            })
            .catch(error => {
              console.log(error);
            });
        },
      },
      save: {
        role: 'button',
        type: 'button',
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Chỉnh sửa',
        icon: <CancelOutlinedIcon />,
        onClick: (entity: any) => {
          ProductionPlanService.GetById(entity._id).then(res => {
            setEditEntity(res.data);
            history.push({
              pathname: '/production-plan/' + entity._id + '/new',
              state: res.data,
            });
          });
        },
      },
    },
  };

  const versionColumns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'text-center',
      style: { paddingTop: 20 },
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    createdBy: {
      dataField: 'productPlan.createdBy.lastName',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_CREATEBY' })}`,

      ...SortColumn,
      classes: 'text-center',
    },

    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_CREATEDATE' })}`,
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
    confirmationDate: {
      dataField: 'productPlan.confirmationDate',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.VERSION_APPROVEDATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.productPlan.confirmationDate
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.productPlan.confirmationDate))
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
              pathname: '/production-plan/plan-view/' + row.productPlan._id,
              state: row.productPlan,
            });
          }}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <Visibility className="text-primary eye" />
          </span>
        </span>
      ),

      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const modifyModel = useMemo(
    (): ModifyPanel => ({
      _title: '',
      commonInfo: {
        _subTitle: 'GENERAL_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        code: {
          _type: 'string',
          // placeholder: 'Mã kế hoạch',
          label: 'PRODUCTION_PLAN.CODE',
          required: true,
          disabled: true,
        },
        seeding: {
          _type: 'object',
          code: {
            _type: 'string',
            // placeholder: 'Mã gieo giống',
            required: true,
            label: 'PRODUCTION_PLAN.SEEDING_CODE',
            disabled: true,
          },
          certificates: {
            _type: 'object',
            path: {
              _type: 'string',
              onClick: (e: any) => {
                window.open(e, '_blank');
              },
              style: { textDecoration: 'underline', cursor: 'pointer', color: '#27AE60' },
              // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
              label: 'CERTIFICATE',
              required: true,
              disabled: true,
            },
          },
          buyInvoice: {
            _type: 'object',
            path: {
              _type: 'string',
              onClick: (e: any) => {
                window.open(e, '_blank');
              },
              style: { textDecoration: 'underline', cursor: 'pointer', color: '#27AE60' },
              // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
              label: 'BUY_INVOICE',
              required: true,
              disabled: true,
            },
          },
          seedingTime: {
            _type: 'date-time',
            // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
            required: true,
            label: 'SEEDING_TIME',
            disabled: true,
          },
          landLot: {
            _type: 'object',
            code: {
              _type: 'string',
              // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
              required: true,
              label: 'SEEDING_LAND_LOT',
              disabled: true,
            },
            // bill: {
            //   type: 'string',
            //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
            //   label: 'Hóa đơn mua hàng',
            //   disabled: true,
            // },
          },
        },
        planting: {
          _type: 'object',
          code: {
            _type: 'string',
            // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
            required: true,
            label: 'PRODUCTION_PLAN.PLANT_CODE',
            disabled: true,
          },
          estimatedPlantingTime: {
            _type: 'date-time',
            // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
            label: 'ESTIMATED_PLANTING_TIME',
            disabled: true,
            required: true,
          },
          landLot: {
            _type: 'object',
            code: {
              _type: 'string',
              // placeholder: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
              required: true,
              label: 'PLANTING_LAND_LOT',
              disabled: true,
            },
          },
        },

        // plantTime: {
        //   type: 'string',
        //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
        //   label: 'Thời gian gieo',
        //   disabled: true,
        // },
      },
      masterInfo: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        seeding: {
          _type: 'object',
          species: {
            _type: 'object',
            name: {
              _type: 'string',
              // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
              label: 'PRODUCTION_PLAN.SPECIES_NAME',
              disabled: true,
              required: true,
            },
            barcode: {
              _type: 'string',
              // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
              label: 'GTIN',
              disabled: true,
              required: true,
            },
          },
          area: {
            _type: 'string',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
            label: 'SEEDING_AREA',
            disabled: true,
            required: true,
          },
          numberOfSeed: {
            _type: 'string',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
            label: 'SEEDING_QUANTITY',
            disabled: true,
            required: true,
          },
          farmLocation: {
            _type: 'object',
            coordinates: {
              _type: 'string',
              // placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
              label: 'SEEDING_LOCATION',
              onClick: (arr: any) => {
                window.open(`https://google.com/maps/search/${arr[1]},+${arr[0]}`, '_blank');
              },
              style: { textDecoration: 'underline', cursor: 'pointer', color: '#27AE60' },
              disabled: true,
              required: true,
            },
          },
        },
        planting: {
          _type: 'object',
          area: {
            _type: 'string',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
            label: 'PLANTING_AREA',
            disabled: true,
            required: true,
          },
          numberOfPlants: {
            _type: 'string',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
            label: 'PLATING_QUANTITY',
            disabled: true,
            required: true,
          },
          farmLocation: {
            _type: 'object',
            coordinates: {
              _type: 'string',
              onClick: (arr: any) => {
                window.open(`https://google.com/maps/search/${arr[1]},+${arr[0]}`, '_blank');
              },
              style: { textDecoration: 'underline', cursor: 'pointer', color: '#27AE60' },
              label: 'PLANTING_LOCATION',
              disabled: true,
              required: true,
            },
          },
        },
      },
    }),
    [],
  );

  const modifyModel2 = useMemo(
    (): ModifyPanel => ({
      _title: '',
      managementInfo: {
        _subTitle: 'ADMIN_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        seeding: {
          _type: 'object',
          manager: {
            _type: 'object',
            fullName: {
              _type: 'string',
              // placeholder: 'Mã gieo giống',
              label: 'ADMIN_DIRECTOR_INFO',
              required: false,
              disabled: true,
            },
          },
          leader: {
            _type: 'tag',

            // placeholder: 'Mã gieo giống',
            required: false,
            tagData: userData,
            label: 'ADMIN_SEEDING_LEADER',
            disabled: true,
          },
        },
      },
      seedingInfo: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        planting: {
          _type: 'object',
          manager: {
            _type: 'object',
            fullName: {
              _type: 'string',
              // placeholder: 'Mã gieo giống',
              label: 'ADMIN_PLAN',
              required: false,
              disabled: true,
            },
          },
          leader: {
            _type: 'tag',

            required: false,
            tagData: userData,
            label: 'ADMIN_PLANTING_LEADER',
            disabled: true,
          },
        },
      },
    }),
    [userData],
  );

  const modifyModel3 = useMemo(
    (): ModifyPanel => ({
      _title: '',
      group1: {
        _subTitle: 'HARVESTING_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        planting: {
          _type: 'object',
          estimatedHarvestTime: {
            _type: 'date-time',
            label: 'HARVESTING_TIME',
            required: true,
            disabled: true,
          },
          expectedQuantity: {
            _type: 'number',
            // placeholder: 'Mã gieo giống',
            required: false,
            label: 'HARVESTING_QUANTITY',
            disabled: true,
          },
        },
      },
      group2: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        harvesting: {
          _type: 'object',
          technical: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'HARVESTING_WORKER',
            tagData: userData,
            required: true,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= harvestingProcess;
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'HARVESTING_LEADER',
            tagData: userData,
            required: true,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= harvestingProcess;
            },
          },
        },
      },
    }),
    [userData],
  );

  const modifyModel4 = useMemo(
    (): ModifyPanel => ({
      _title: '',
      _validationField: 'preliminaryTreatment',
      group1: {
        _subTitle: 'PRELIMINARY_TREATMENT_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        preliminaryTreatment: {
          _type: 'object',
          estimatedTime: {
            _type: 'date-time',
            // placeholder: 'Mã gieo giống',
            label: 'PRELIMINARY_TREATMENT_TIME',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preliminaryTreatmentProcess;
            },
           
          },
          estimatedQuantity: {
            _type: 'number',
            // placeholder: 'Mã gieo giống',
            label: 'PRELIMINARY_TREATMENT_QUANTITY',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preliminaryTreatmentProcess;
            },
          },
        },
      },
      group2: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        preliminaryTreatment: {
          _type: 'object',
          technical: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            tagData: userData,
            label: 'PRELIMINARY_TREATMENT_TECHNICAL',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preliminaryTreatmentProcess;
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'PRELIMINARY_TREATMENT_LEADER',
            tagData: userData,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preliminaryTreatmentProcess;
            },
          },
        },
      },
    }),
    [userData],
  );

  const modifyModel5 = useMemo(
    (): ModifyPanel => ({
      _title: '',
      _validationField: 'cleaning',
      cleaning: {
        _subTitle: 'CLEANING_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        cleaning: {
          _type: 'object',
          estimatedTime: {
            _type: 'date-time',
            // placeholder: 'Mã gieo giống',
            label: 'CLEANING_TIME',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= cleaningProcess;
            },
           
          },
          estimatedQuantity: {
            _type: 'number',
            // placeholder: 'Mã gieo giống',
            label: 'CLEANING_QUANTITY',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= cleaningProcess;
            },
          },
        },
      },
      cleaningInfo: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        cleaning: {
          _type: 'object',
          technical: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'CLEANING_TECHNICAL',
            root: 'cleaning',
            tagData: userData,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= cleaningProcess;
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'CLEANING_LEADER',
            root: 'cleaning',
            tagData: userData,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= cleaningProcess;
            },
          },
        },
      },
    }),
    [userData],
  );

  const modifyModel6 = useMemo(
    (): ModifyPanel => ({
      _title: '',
      _validationField: 'packing',
      group1: {
        _subTitle: 'PACKING_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        packing: {
          _type: 'object',
          estimatedTime: {
            _type: 'date-time',
            // placeholder: 'Mã gieo giống',
            label: 'PACKING_TIME',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
           
          },
          estimatedExpireTimeStart: {
            _type: 'date-time',
            // placeholder: 'Hạn sử dụng',
            label: 'PACKING_EXPIRY_START',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
            
          },
          estimatedExpireTimeEnd: {
            _type: 'date-time',
            // placeholder: 'Hạn sử dụng',
            label: 'PACKING_EXPIRY_END',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
            
          },
          packing: {
            _type: 'search-select',
            // placeholder: 'Quy cách',
            label: 'MENU.DATA.PRODUCT.PACK',
            onSearch: ({ queryProps, paginationProps }: any) => {
              if (editEntity && editEntity.seeding && editEntity.seeding.species) {
                queryProps.species = editEntity.seeding.species._id;
              }
              return ProductPackagingService.GetAll({ queryProps, paginationProps });
            },
            keyField: 'weight',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
            // required: true,
            // onDisplayOptions: (e:ProductPackagingModel)=> e.species.weight,
            // rootField: 'seeding',
            // fillField: 'packing',
            // display: 'weight',
          },
        },
      },
      group2: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        packing: {
          _type: 'object',
          estimatedQuantity: {
            _type: 'number',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'PACKING_QUANTITY',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
          },
          technical: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
            label: 'KCS',
            tagData: userData,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
            label: 'PACKING_LEADER',
            tagData: userData,
            disabled: (values: any) => {
              return _.parseInt(values.process) >= packingProcess;
            },
          },
        },
      },
    }),
    [editEntity, userData],
  );

  const modifyModel7 = useMemo(
    (): ModifyPanel => ({
      _title: '',
      _validationField: 'preservation',
      group1: {
        _subTitle: 'PRESERVATION_INFO',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        preservation: {
          _type: 'object',
          estimatedStartTime: {
            _type: 'date-time',
            // placeholder: 'Mã gieo giống',
            label: 'PRESERVATION_TIME_START',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preservationProcess;
            },
          
          },
          estimatedEndTime: {
            _type: 'date-time',
            // placeholder: 'Mã gieo giống',
            label: 'PRESERVATION_TIME_END',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preservationProcess;
            },
          
          },
        },
      },
      group2: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        preservation: {
          _type: 'object',
          technical: {
            _type: 'tag',
            tagData: userData,
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'PRESERVATION_TECHNICAL',
            disabled: (values: any) => {
              return _.parseInt(values.process) >= preservationProcess;
            },
          },
        },
      },
    }),
    [userData],
  );

  const updateForm = useMemo(
    (): ModifyForm => ({
      _header: 'PRODUCTION_PLAN_CREATE',
      panel1: modifyModel,
      panel2: modifyModel2,
      panel3: modifyModel3,
      panel4: modifyModel4,
      panel5: modifyModel5,
      panel6: modifyModel6,
      panel7: modifyModel7,
    }),
    [
      modifyModel,
      modifyModel2,
      modifyModel3,
      modifyModel4,
      modifyModel5,
      modifyModel6,
      modifyModel7,
    ],
  );

  return (
    <React.Fragment>
      <Switch>
        <Route path="/production-plan/:id/new">
          {({ history, match }) => (
            <>
              <ProductionPlanCrud
                entity={history.location.state}
                setEditEntity={setEditEntity}
                onModify={ProductionPlanService.Update}
                title={createTitle}
                code={match && match.params.id}
                get={code => ProductionPlanService.GetById(code)}
                onComments={ProductionPlanService.Comments}
                formPart={formPart}
                formModel={updateForm}
                allFormField={allFormField}
                allFormButton={currentTab !== '2' ? allFormButton : allFormButton2}
                validation={ProductPlantSchema}
                autoFill={{
                  field: '',
                  data: null,
                  searchSelectField: [
                    { field: 'packing', ref: { prop: 'packing', key: 'packing.weight' } },
                  ],
                }}
                currentTab={currentTab}
                refreshData={refreshData}
                homePage={homeURL}
                tagData={tagData}
                step={step}
                onApprove={approve}
                updateProcess={updateProcess}
                sendRequest={sendRequest}
                approveFollow={approveFollow}
                moduleName={moduleName}
              />
            </>
          )}
        </Route>
        <Route exact path={`/production-plan/:code/history`}>
          {({ history, match }) => (
            <ProductionPlanVersion
              title={match && match.params.code}
              data={history.location.state}
              total={versionData.length}
              versionColumns={versionColumns}
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
              renderInfo={SeedingDetailDialog}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="THÔNG TIN GIEO GIỐNG"
            />
          )}
        </Route>
        <Route exact path="/production-plan/planting/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={PlantingDetailDialog}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="THÔNG TIN GIEO TRỒNG"
              homeURL={homeURL}
            />
          )}
        </Route>
        <Route exact path="/production-plan/plan-view/:code">
          {({ history, match }) => (
            <ProductionPlanDetail
              entity={history.location.state}
              renderInfo={masterEntityDetailDialog2}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              allFormButton={currentTab === '1' && username === 'admin' && adminAllFormButton}
              header={`CHI TIẾT KẾ HOẠCH`}
            />
          )}
        </Route>
        <Route path="/production-plan">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              const cvValue = JSON.parse(JSON.stringify(value));
          
              if (
                value.product_plan &&
                value.product_plan.seeding &&
                value.product_plan.seeding.species &&
                _.isObject(value.product_plan.seeding.species)
              ) {
                cvValue.product_plan.seeding.species = value.product_plan.seeding.species._id;
              }

              setFilterProps({ ...cvValue });
            }}
            searchModel={currentTab == '0' ? productPlanSearchModel1 : productPlanSearchModel2}
          />
          <ProductionPlanBody
            tabData={TabData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setEntities={setEntities}
            setPaginationProps={setPaginationProps}
            // spinning={spinning}
          />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionPlan;
