import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, HomePageURL, NormalColumn, SortColumn,} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {InitMasterProps} from '../../common-library/helpers/common-function';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
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
import moment from 'moment';
import {DisplayDateTime} from '../../common-library/helpers/detail-helpers';
import {notifySuccess} from './defined/crud-helped';
import {FormikState} from 'formik';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const moduleName = 'MENU.PRODUCT_PLANT';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const homeURL = `/production-plan`;

const harvestingProcess = 2,
  preliminaryTreatmentProcess = 3,
  cleaningProcess = 4,
  packingProcess = 5,
  preservationProcess = 6;

export const TAB_TYPE = {
  waitingCreated: '0',
  approve: '1',
  following: '2',
  refuse: '3'
}

export const CONFIRMATION_STATUS_TYPE = {
  common: '0',
  approve: '1',
  following: '2',
  refuse: '3'
}

export const STEP_TYPE = {
  waitingCreated: '0',
  following: '1'
}


const CheckDisabled = (values: any, currentProcess: string, targetProcess: number) => {
  if (!values) return false;
  
  const cvCurrentProcess = _.parseInt(currentProcess);
  
  if (targetProcess < cvCurrentProcess) return true;
  
  if (targetProcess === cvCurrentProcess) {
    let isDisabled = false;
    
    values.leader?.forEach((item: any) => {
      if (item.isRecieved === true) {
        isDisabled = true;
      }
    });
    
    return isDisabled;
  }
  
  return false;
};

const ProductPlantSchema = Yup.object().shape({
  harvesting: Yup.object()
    .shape(halfValidate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function (values: any) {
      if (values.technical?.length === 0 || values.leader?.length === 0) {
        if (
          this.parent.preliminaryTreatment?.technical?.length > 0 ||
          this.parent.preliminaryTreatment?.leader?.length > 0 ||
          this.parent.preliminaryTreatment?.estimatedTime ||
          this.parent.preliminaryTreatment?.estimatedQuantity > 0 ||
          this.parent.preliminaryTreatment?.estimatedQuantity
        ) {
          return false;
        }
      }
      return true;
    }),
  preliminaryTreatment: Yup.object()
    .shape(validate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function (values: any) {
      if (
        values.technical?.length === 0 ||
        values.leader?.length === 0 ||
        !values.estimatedTime ||
        values.estimatedQuantity === 0 ||
        !values.estimatedQuantity
      ) {
        if (
          this.parent.cleaning?.technical?.length > 0 ||
          this.parent.cleaning?.leader?.length > 0 ||
          this.parent.cleaning?.estimatedTime ||
          this.parent.cleaning?.estimatedQuantity > 0 ||
          this.parent.cleaning?.estimatedQuantity
        ) {
          return false;
        }
      }
      return true;
    }),
  cleaning: Yup.object()
    .shape(validate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function (values: any) {
    
      if (
        
        values.technical?.length === 0 ||
        values.leader?.length === 0 ||
        !values.estimatedTime ||
        values.estimatedQuantity === 0 ||
        !values.estimatedQuantity
      ) {
        if (
          this.parent.packing?.estimatedTime ||
          this.parent.packing?.estimatedExpireTimeStart ||
          this.parent.packing?.estimatedExpireTimeEnd ||
          
          this.parent.packing?.estimatedQuantity ||
          this.parent.packing?.estimatedQuantity > 0 ||
          this.parent.packing?.technical?.length > 0 ||
          this.parent.packing?.leader?.length > 0
        ) {
          return false;
        }
        
      }
      return true;
    }),
  packing: Yup.object()
    .shape(packingValidate)
    .test('oneOfRequired', 'INPUT_MUTS_ACCORDING_ORDER', function (values: any) {
    
      if (
       
        !values.estimatedTime ||
        !values.estimatedExpireTimeStart ||
        !values.estimatedExpireTimeEnd ||
        !values.packing ||
        (_.isObject(values.packing) && !values.packing.label) ||
        !values.estimatedQuantity ||
        values.estimatedQuantity === 0 ||
        values.technical?.length === 0 ||
        values.leader?.length === 0
      ) {
        if (
          this.parent.preservation?.estimatedStartTime ||
          this.parent.preservation?.estimatedEndTime > 0 ||
          this.parent.preservation?.technical?.length > 0
        ) {
          return true;
        }
        
      }
      return true;
    }),
  preservation: Yup.object().shape(preservationValidate),
  
});

function ProductionPlan() {
  const intl = useIntl();
  
  const history = useHistory();
  const {
    entities,
    setEntities,
    editEntity,
    setEditEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    setShowDetail,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    loading,
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
  
  const [currentTab, setCurrentTab] = useState<string | undefined>(TAB_TYPE.waitingCreated);
  
  const [tagData] = useState([]);
  
  const [, setSubmit] = useState(false);
  
  const [step, setStep] = useState(STEP_TYPE.waitingCreated);
  const [totalVersion] = useState(0);
  const [userData, setUserData] = useState<any>();
  
  useEffect(() => {
    UserService.GetAll({queryProps: {limit: 100, sortBy: 'fullName', sortType: 'asc'}}).then(
      e => {
        const rs = e.data as any;
        setUserData(rs.data);
      },
    );
  }, []);
  
  const {authState} = useSelector(
    (state: any) => ({
      authState: state.auth,
    }),
    shallowEqual,
  );
  const [prevTab, setPrevTab] = useState<string | undefined>(TAB_TYPE.waitingCreated);
  const [trigger, setTrigger] = useState<boolean>(false);
  useEffect(() => {
    if (currentTab === TAB_TYPE.waitingCreated) {
      const t =
        prevTab !== currentTab && paginationProps.sortBy === 'updatedAt'
          ? {
            sortBy: '_id',
            sortType: 'desc',
          }
          : paginationProps;
      getAll({...(filterProps as any), step: STEP_TYPE.waitingCreated, isMaster: true, confirmationStatus: CONFIRMATION_STATUS_TYPE.common, ...t});
    } else if (currentTab === TAB_TYPE.approve) {
      const t =
        prevTab !== currentTab ? {sortBy: 'updatedAt', sortType: 'desc'} : paginationProps;
      getAll({...(filterProps as any), step: STEP_TYPE.waitingCreated, confirmationStatus: CONFIRMATION_STATUS_TYPE.approve, ...t});
    } else if (currentTab === TAB_TYPE.following) {
      const t =
        prevTab !== currentTab ? {sortBy: 'updatedAt', sortType: 'desc'} : paginationProps;
      getAll({...(filterProps as any), step: STEP_TYPE.following, confirmationStatus: CONFIRMATION_STATUS_TYPE.following, isMaster: true, ...t});
    } else if (currentTab === TAB_TYPE.refuse) {
      const t =
        prevTab !== currentTab ? {sortBy: 'updatedAt', sortType: 'desc'} : paginationProps;
      getAll({...(filterProps as any), step: STEP_TYPE.waitingCreated, confirmationStatus: CONFIRMATION_STATUS_TYPE.refuse, isMaster: false, ...t});
    }
    setPrevTab(currentTab);
  }, [paginationProps, filterProps, currentTab, trigger]);
  
  const columns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'text-center',
      style: {paddingTop: 20},
    },
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SEEDING_CODE'})}`,
      formatter: (cell: any, row: any) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.seeding.code}</Link>
      ),
      ...SortColumn,
      align: 'center',
      // classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.PLANT_CODE'})}`,
      formatter: (cell: any, row: any) => (
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
      formatter: (cell: any, row: any) => (
        <span>
          <DisplayDateTime input={row.planting.estimatedHarvestTime}/>
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: (cell: any, row: any) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            
            history.push({
              pathname: '/production-plan/' + row._id + '/new',
            });
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
      classes: 'text-center',
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
      formatter: (cell: any, row: any) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.seeding.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.PLANT_CODE'})}`,
      formatter: (cell: any, row: any) => (
        <Link to={{pathname: `/production-plan/planting/${row._id}`, state: row.planting}}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    species: {
      dataField: 'seeding.species.name',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SPECIES_NAME'})}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.CREATE_DATE'})}`,
      formatter: (cell: any, row: any) => (
        <span>
          <DisplayDateTime input={row.createdAt}/>
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    process: {
      dataField: 'process',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.STATUS'})}`,
      formatter: (cell: any, row: any) => (
        <span>{row.process === '7' ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    confirmationStatus: {
      dataField: 'confirmationStatus',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.APPROVE_STATUS'})}`,
      formatter: (cell: any, row: any) => (
        <span>
          {row.confirmationStatus === CONFIRMATION_STATUS_TYPE.approve && 'Chờ duyệt'}
          {row.confirmationStatus === CONFIRMATION_STATUS_TYPE.following && 'Đã duyệt'}
          {row.confirmationStatus === CONFIRMATION_STATUS_TYPE.refuse && 'Từ chối'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: (cell: any, row: any) => {
        return row.confirmationStatus === CONFIRMATION_STATUS_TYPE.refuse || row.confirmationStatus === CONFIRMATION_STATUS_TYPE.following ? (
          
          <span
            className="btn btn-icon btn-light btn-hover-primary btn-sm visibility cursor-pointer"
            onClick={() => {
              history.push({
                pathname: '/production-plan/plan-view/' + row._id,
              });
            }}>
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <Visibility className="text-primary eye"/>
            </span>
          </span>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => {
              history.push({
                pathname: '/production-plan/plan-view/' + row._id,
              });
            }}
          >
            Phê duyệt
          </button>
        );
      },
  
      ...NormalColumn,
      style: {minWidth: '130px'},
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
      formatter: (cell: any, row: any) => (
        <Link to={`/production-plan/seeding/${row._id}`}>{row.seeding.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.PLANT_CODE'})}`,
      formatter: (cell: any, row: any) => (
        <Link to={{pathname: `/production-plan/planting/${row._id}`, state: row.planting}}>
          {row.planting.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    species: {
      dataField: 'seeding.species.name',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.SPECIES_NAME'})}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.CREATE_DATE'})}`,
      formatter: (cell: any, row: any) => (
        <span>
          <DisplayDateTime input={row.createdAt}/>
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    process: {
      dataField: 'process',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.STATUS'})}`,
      formatter: (cell: any, row: any) => (
        <span>{row.process === '7' ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
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
        onView: (entity: any) => {
          history.push({
            pathname: '/production-plan/plan-view/' + entity._id,
          });
        },
        onShowHistory: (entity: any) => {      
          history.push({
            pathname: '/production-plan/' + entity._id + '/history',
          });
        },
        onEdit: (entity: any) => {
          history.push({
            pathname: '/production-plan/' + entity._id + '/new',
            state: '2',
          });
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
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
    {
      tabTitle: 'Từ chối',
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
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Gửi duyệt',
        // icon: <SaveOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
          setStep(STEP_TYPE.following);
          setPrevTab(TAB_TYPE.waitingCreated);
          setSubmit(true);
          // setCurrentTab('1')
        },
      },
      save: {
        role: 'submit',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'SAVE_BTN_LABEL',
        // icon: <CancelOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
          setStep(STEP_TYPE.waitingCreated);
          setSubmit(false);
        },
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/production-plan',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'CANCEL_BTN_LABEL',
        // icon: <CancelOutlinedIcon />,
      },
    },
  };
  
  const adminEditFormButton: any = {
    type: 'outside',
    data: {
      save: {
        role: 'submit',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'SAVE_BTN_LABEL',
        // icon: <CancelOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
          setStep(STEP_TYPE.waitingCreated);
          setSubmit(false);
          // setTrigger(!trigger)
        },
      },
      reset: {
        role: 'reset',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Khôi phục',
        // icon: <SaveOutlinedIcon />,
        onClick: (
          entity: any,
          resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void,
        ) => {
          // setNoticeModal(true);
          // window.location.reload();
          resetForm(entity);
        },
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/production-plan',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'CANCEL_BTN_LABEL',
        // icon: <CancelOutlinedIcon />,
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
        disabled: (entity: any) => {
          return _.parseInt(entity?.process) >= 7;
        },
        // icon: <SaveOutlinedIcon />,
        onClick: () => {
          // setNoticeModal(true);
  
          setStep(STEP_TYPE.following);
          setPrevTab(TAB_TYPE.following);
          setSubmit(true);
          // setCurrentTab('1')
        },
      },
      reset: {
        role: 'reset',
        type: 'button',
        disabled: (entity: any) => {
          return _.parseInt(entity?.process) >= 7;
        },
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Khôi phục',
        // icon: <SaveOutlinedIcon />,
        onClick: (
          entity: any,
          resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void,
        ) => {
          // setNoticeModal(true);
          // window.location.reload();
          resetForm(entity);
        },
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/production-plan',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'CANCEL_BTN_LABEL',
        // icon: <CancelOutlinedIcon />,
      },
    },
  };
  
  const sendRequest = (entity: any) => {
    const data = {confirmationStatus: CONFIRMATION_STATUS_TYPE.approve, _id: entity._id};
    return ProductionPlanService.Approve(entity, data);
  };
  
  const approve = (entity: any) => {
    const data = {confirmationStatus: CONFIRMATION_STATUS_TYPE.following, _id: entity._id};
    return ProductionPlanService.Approve(entity, data);
  };
  
  const updateProcess = (entity: any) => {
    const newProcess = _.toString(_.toInteger(entity.process) + 1);
    const data = {process: newProcess, _id: entity._id};
    return ProductionPlanService.UpdateProcess(entity, data);
  };
  
  const refuse = (entity: any) => {
    const data = {confirmationStatus: CONFIRMATION_STATUS_TYPE.refuse, _id: entity._id};
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
        // icon: <SaveOutlinedIcon/>,
        onClick: (entity: any) => {
          // setNoticeModal(true);
          // setSubmit(true)
          if (entity) {
            setStep('2');
            approve(entity)
              .then(() => {
                setCurrentTab(TAB_TYPE.following);
                notifySuccess('Phê duyệt thành công');
                history.push('/production-plan');
              })
              .catch(() => {
              });
          } else {
            notifySuccess('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau');
          }
        },
      },
      refuse: {
        role: 'button',
        type: 'button',
        linkto: undefined,
        className: 'btn btn-outline-primary mr-5 pl-8 pr-8',
        label: 'Từ chối',
        // icon: <SaveOutlinedIcon/>,
        onClick: (entity: any) => {
          if (entity) {
            refuse(entity)
              .then(() => {
                // refreshData();
                notifySuccess('Kế hoạch đã bị từ chối');
                setPrevTab(TAB_TYPE.approve);
                if (entity.isMaster === true) {
                  setCurrentTab(TAB_TYPE.waitingCreated);
                } else {
                  setCurrentTab(TAB_TYPE.refuse);
                }
                history.push(HomePageURL.productionPlan);
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            notifySuccess('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau');
          }
        },
      },
      save: {
        role: 'button',
        type: 'button',
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Chỉnh sửa',
        // icon: <CancelOutlinedIcon/>,
        onClick: (entity: any) => {
          
          if (entity) {
            history.push({
              pathname: `${HomePageURL.productionPlan}/` + entity._id + '/new',
              state: '5',
            });
          } else {
            notifySuccess('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau');
          }
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
      headerClasses: 'text-center',
      style: {paddingTop: 20},
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.VERSION_NAME'})}`,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    createdBy: {
      dataField: 'productPlan.createdBy.fullName',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.VERSION_CREATEBY'})}`,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    
    createdAt: {
      dataField: 'createdAt',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.VERSION_CREATEDATE'})}`,
      formatter: (cell: any, row: any) => (<DisplayDateTime input={row.createdAt}/>),
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    confirmationDate: {
      dataField: 'productPlan.confirmationDate',
      text: `${intl.formatMessage({id: 'PRODUCTION_PLAN.VERSION_APPROVEDATE'})}`,
      formatter: (cell: any, row: any) => (
        <span>
          {row.productPlan.confirmationDate ? (
            <DisplayDateTime input={row.productPlan.confirmationDate}/>
          ) : (
            'Không có thông tin'
          )}
        </span>
      ),
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: (cell: any, row: any) => (
        <span
          className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
          onClick={() => {
            history.push({
              pathname: '/production-plan/plan-view/version/' + row.productPlan._id,
            });
          }}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <Visibility className="text-primary eye"/>
          </span>
        </span>
      ),
  
      ...NormalColumn,
      style: {minWidth: '130px'},
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
              style: {textDecoration: 'underline', cursor: 'pointer', color: '#27AE60'},
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
              style: {textDecoration: 'underline', cursor: 'pointer', color: '#27AE60'},
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
              style: {textDecoration: 'underline', cursor: 'pointer', color: '#27AE60'},
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
              style: {textDecoration: 'underline', cursor: 'pointer', color: '#27AE60'},
              label: 'FARM_LOCATION',
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
        },
        '': {
          _type: 'object',
          _className: 'custom-input-group',
          _inputClassName: 'col-4 custom-input-label mb-5 p-0',
          title: {
            _type: 'string',
            label: 'HARVESTING_QUANTITY',
            labelWidth: 12
          },
          planting: {
            _type: 'object',
            _inputClassName: 'col-6 custom-input-input mb-5 p-0',
            expectedQuantity: {
              _type: 'number',
              labelWidth: 0,
              // placeholder: 'Mã gieo giống',
              disabled: true,
            },
          },
          unit: {
            _type: 'object',
            _inputClassName: 'col-2 custom-input-input mb-5 p-0',
            '': {
              _type: 'search-select',
              labelWidth: 0,
              label: 'Đơn vị tính',
              onSearch: ProductionPlanService.GetUnit,
              disabled: (values: any) => {
                return CheckDisabled(values?.harvesting, values?.process, harvestingProcess);
              },
              isClearable: false
            },
          }
        }
      },
      group2: {
        _subTitle: '\u00A0',
        _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
        harvesting: {
          _type: 'object',
          technical: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'HARVESTING_TECHNICAL',
            tagData: userData,
            required: true,
            disabled: (values: any) => {
              return CheckDisabled(values?.harvesting, values?.process, harvestingProcess);
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'HARVESTING_LEADER',
            tagData: userData,
            required: true,
            disabled: (values: any) => {
              return CheckDisabled(values?.harvesting, values?.process, harvestingProcess);
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
            label: 'PRODUCTION_PLAN_FORM_PRELIMINARY_TREATMENT_TIME',
            showTime: true,
            format: 'DD/MM/yyyy HH:mm',
            disabled: (values: any) => {
              return CheckDisabled(
                values?.preliminaryTreatment,
                values?.process,
                preliminaryTreatmentProcess,
              );
            },
          },
        },
        '': {
          _type: 'object',
          _className: 'custom-input-group',
          _inputClassName: 'col-4 custom-input-label mb-5 p-0',
          title: {
            _type: 'string',
            label: 'PRELIMINARY_TREATMENT_QUANTITY',
            labelWidth: 12
          },
          preliminaryTreatment: {
            _type: 'object',
            _inputClassName: 'col-6 custom-input-input mb-5 p-0',
            estimatedQuantity: {
              _type: 'number',
              labelWidth: 0,
              // placeholder: 'Mã gieo giống',
              disabled: (values: any) => {
                return CheckDisabled(
                  values?.preliminaryTreatment,
                  values?.process,
                  preliminaryTreatmentProcess,
                );
              },
            },
          },
          unit: {
            _type: 'object',
            _inputClassName: 'col-2 custom-input-input mb-5 p-0',
            '': {
              _type: 'search-select',
              labelWidth: 0,
              label: 'Đơn vị tính',
              onSearch: ProductionPlanService.GetUnit,
              disabled: true,
              isClearable: false
            },
          }
        }
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
              return CheckDisabled(
                values?.preliminaryTreatment,
                values?.process,
                preliminaryTreatmentProcess,
              );
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'PRELIMINARY_TREATMENT_LEADER',
            tagData: userData,
            disabled: (values: any) => {
              return CheckDisabled(
                values?.preliminaryTreatment,
                values?.process,
                preliminaryTreatmentProcess,
              );
            },
          },
        },
      },
    }),
    [editEntity, userData],
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
            showTime: true,
            format: 'DD/MM/yyyy HH:mm',
            label: 'PRODUCTION_PLAN_CLEANING_TIME',
            disabled: (values: any) => {
              return CheckDisabled(values?.cleaning, values?.process, cleaningProcess);
            },
          },
        },
        '': {
          _type: 'object',
          _className: 'custom-input-group',
          _inputClassName: 'col-4 custom-input-label mb-5 p-0',
          title: {
            _type: 'string',
            label: 'PRODUCTION_PLAN_CLEANING_QUANTITY',
            labelWidth: 12
          },
          cleaning: {
            _type: 'object',
            _inputClassName: 'col-6 custom-input-input mb-5 p-0',
            estimatedQuantity: {
              _type: 'number',
              labelWidth: 0,
              // placeholder: 'Mã gieo giống',
              disabled: (values: any) => {
                return CheckDisabled(
                  values?.cleaning,
                  values?.process,
                  cleaningProcess,
                );
              },
            },
          },
          unit: {
            _type: 'object',
            _inputClassName: 'col-2 custom-input-input mb-5 p-0',
            '': {
              _type: 'search-select',
              labelWidth: 0,
              label: 'Đơn vị tính',
              onSearch: ProductionPlanService.GetUnit,
              disabled: true
            },
          }
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
              return CheckDisabled(values?.cleaning, values?.process, cleaningProcess);
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
            label: 'CLEANING_LEADER',
            root: 'cleaning',
            tagData: userData,
            disabled: (values: any) => {
              return CheckDisabled(values?.cleaning, values?.process, cleaningProcess);
            },
          },
        },
      },
    }),
    [editEntity, userData],
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
            showTime: true,
            format: 'DD/MM/yyyy HH:mm',
            disabled: (values: any) => {
              return CheckDisabled(values?.packing, values?.process, packingProcess);
            },
          },
          estimatedExpireTimeStart: {
            _type: 'date-time',
            // placeholder: 'Hạn sử dụng',
            label: 'PACKING_EXPIRY_START',
            showTime: true,
            format: 'DD/MM/yyyy HH:mm',
            disabled: (values: any) => {
              return CheckDisabled(values?.packing, values?.process, packingProcess);
            },
            onChange: (
              val: any,
              values: any,
              setFieldValue: (
                field: string,
                value: any,
                shouldValidate?: boolean | undefined,
              ) => void,
            ) => {
              if (val) {
                // const clVal = val
                const newDate = moment(val).add(values.seeding.species.expiryDays, 'days');
                // console.log(val)
                // console.log(newDate)
                setFieldValue('packing.estimatedExpireTimeEnd', newDate);
              }
            },
            onReset: (
              setFieldValue: (
                field: string,
                value: any,
                shouldValidate?: boolean | undefined,
              ) => void,
            ) => {
              setFieldValue('packing.estimatedExpireTimeEnd', null);
            },
          },
          estimatedExpireTimeEnd: {
            _type: 'date-time',
            // placeholder: 'Hạn sử dụng',
            label: 'PACKING_EXPIRY_END',
            // showTime: true,
            // format: 'DD/MM/yyyy HH:mm',
            disabled: true,
          },
          packing: {
            _type: 'search-select',
            // placeholder: 'Quy cách',
            label: 'PRODUCTION_PLAN_FORM_PACKING',
            onSearch: ({queryProps, paginationProps}: any) => {
              if (editEntity && editEntity.seeding && editEntity.seeding.species) {
                queryProps.species = editEntity.seeding.species;
              }
              return ProductPackagingService.GetAll({queryProps, paginationProps});
            },
            keyField: 'weight',
            disabled: (values: any) => {
              return CheckDisabled(values?.packing, values?.process, packingProcess);
            },
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
            label: 'PRODUCTION_PLAN_FORM_PACKING_QUANTITY',
            disabled: (values: any) => {
              return CheckDisabled(values?.packing, values?.process, packingProcess);
            },
          },
          technical: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
            label: 'KCS',
            tagData: userData,
            disabled: (values: any) => {
              return CheckDisabled(values?.packing, values?.process, packingProcess);
            },
          },
          leader: {
            _type: 'tag',
            // placeholder: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
            label: 'PACKING_LEADER',
            tagData: userData,
            disabled: (values: any) => {
              return CheckDisabled(values?.packing, values?.process, packingProcess);
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
            showTime: true,
            format: 'DD/MM/yyyy HH:mm',
            disabled: (values: any) => {
              return CheckDisabled(values?.preservation, values?.process, preservationProcess);
            },
          },
          estimatedEndTime: {
            _type: 'date-time',
            // placeholder: 'Mã gieo giống',
            label: 'PRESERVATION_TIME_END',
            showTime: true,
            format: 'DD/MM/yyyy HH:mm',
            disabled: (values: any) => {
              return CheckDisabled(values?.preservation, values?.process, preservationProcess);
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
              return CheckDisabled(values?.preservation, values?.process, preservationProcess);
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
          {({history, match}) => (
            <>
              <ProductionPlanCrud
                setEditEntity={setEditEntity}
                onModify={ProductionPlanService.Update}
                title={createTitle}
                code={match && match.params.id}
                get={code => ProductionPlanService.GetById(code)}
                onComments={ProductionPlanService.Comments}
                formPart={formPart}
                formModel={updateForm}
                allFormField={allFormField}
                allFormButton={
                  editEntity?.confirmationStatus === CONFIRMATION_STATUS_TYPE.approve
                    ? adminEditFormButton
                    : editEntity?.confirmationStatus === CONFIRMATION_STATUS_TYPE.following
                    ? allFormButton2
                    : allFormButton
                }
                current={history.location.state}
                validation={ProductPlantSchema}
                autoFill={{
                  field: '',
                  data: null,
                  searchSelectField: [
                    {field: 'packing', ref: {prop: 'packing', key: 'packing.weight'}},
                  ],
                }}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
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
          {({history, match}) => (
            <ProductionPlanVersion
              title={match && match.params.code}
              get={code => ProductionPlanService.GetHistory(code)}
              data={history.location.state}
              total={totalVersion}
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
          {({history, match}) => (
            <MasterEntityDetailPage
              renderInfo={SeedingDetailDialog}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                history.push('/production-plan');
              }}
              header="THÔNG TIN GIEO GIỐNG"
            />
          )}
        </Route>
        <Route exact path="/production-plan/planting/:code">
          {({history, match}) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={PlantingDetailDialog}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                history.push('/production-plan');
              }}
              header="THÔNG TIN GIEO TRỒNG"
              homeURL={homeURL}
            />
          )}
        </Route>
        <Route exact path="/production-plan/plan-view/version/:code">
          {({match}) => (
            <ProductionPlanDetail
              renderInfo={masterEntityDetailDialog2}
              setDetailEntity={setDetailEntity}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              header={`CHI TIẾT PHIÊN BẢN`}
              showComment={
                match &&
                detailEntity?.parentPlan &&
                JSON.parse(localStorage.getItem('newestVersion') as any)
                && JSON.parse(localStorage.getItem('newestVersion') as any)[detailEntity?.parentPlan] === match.params.code
              }
            />
          )}
        </Route>
        <Route exact path="/production-plan/plan-view/:code">
          {({history, match}) => (
            <ProductionPlanDetail
              entity={history.location.state}
              renderInfo={masterEntityDetailDialog2}
              setDetailEntity={setDetailEntity}
              onComments={ProductionPlanService.Comments}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              allFormButton={
                detailEntity?.confirmationStatus !== CONFIRMATION_STATUS_TYPE.following &&
                detailEntity?.confirmationStatus !== CONFIRMATION_STATUS_TYPE.refuse &&
                adminAllFormButton
              }
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
    
              if (value.seeding?.species && _.isObject(value.seeding.species)) {
                const newVl = {_id: value.seeding.species._id};
                cvValue.seeding.species = {...newVl};
              }
    
              setFilterProps({...cvValue});
            }}
            searchModel={currentTab == TAB_TYPE.waitingCreated ? productPlanSearchModel1 : productPlanSearchModel2}
          />
          <ProductionPlanBody
            tabData={TabData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setEntities={setEntities}
            setPaginationProps={setPaginationProps}
            setTrigger={setTrigger}
            trigger={trigger}
            // spinning={spinning}
          />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionPlan;
