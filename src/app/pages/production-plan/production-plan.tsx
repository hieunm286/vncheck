import React, { useState } from 'react';
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

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`;

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

  const [noticeModal, setNoticeModal] = useState<boolean>(false)

  //   useEffect(() => {
  //     getAll(filterProps);
  //   }, [paginationProps, trigger, filterProps]);

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
      formatter: (cell: any, row: any, rowIndex: number) => <Link to={`/production-plan/seeding/${row._id}`}>{row.seeding.code}</Link>,
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.GROW_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => <Link to={`/production-plan/planting/${row._id}`}>{row.planting.code}</Link>,
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
    estimatedHarvestTime: {
      dataField: 'planting.estimatedHarvestTime',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.HARVEST_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <td>{new Intl.DateTimeFormat('en-GB').format(row.estimatedHarvestTime)}</td>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to="/production-plan/new">
          <button className="btn btn-primary">+ Tạo mới</button>
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
    seeding: {
      dataField: 'seeding.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.PLANT_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => <Link to={`/production-plan/seeding/${row._id}`}>{row.seeding.code}</Link>,
      ...SortColumn,
      classes: 'text-center',
    },
    planting: {
      dataField: 'planting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.GROW_CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => <Link to={`/production-plan/planting/${row._id}`}>{row.planting.code}</Link>,
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
      dataField: 'createAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CREATE_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <td>{new Intl.DateTimeFormat('en-GB').format(row.createdAt)}</td>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    process: {
      dataField: 'process',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.STATUS' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    confirmationStatus: {
      dataField: 'confirmationStatus',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.APPROVE_STATUS' })}`,
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

  console.log(currentTab);

  const productPlanSearchModel1: SearchModel = {
    plantCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PLANT_CODE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'code',
    },
    growCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.GROW_CODE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'name',
    },
    speciesName: {
      type: 'SearchSelect',
      label: 'PRODUCTION_PLAN.SPECIES_NAME',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'speciesName',
      ref: true,
    },
    date: {
      type: 'Datetime',
      label: 'PRODUCTION_PLAN.HARVEST_DATE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'agencyAddress',
    },
  };

  const productPlanSearchModel2: SearchModel = {
    planCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CODE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'planCode',
    },
    plantCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PLANT_CODE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'plantCode',
    },
    growCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.GROW_CODE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'growCode',
    },
    speciesName: {
      type: 'SearchSelect',
      label: 'PRODUCTION_PLAN.SPECIES_NAME',
      placeholder: 'PRODUCTION_PLAN.INPUT',
      service: ProductionPlanService,
      keyField: 'speciesName',
      ref: true,
    },
    date: {
      type: 'Datetime',
      label: 'PRODUCTION_PLAN.HARVEST_DATE',
      placeholder: 'PRODUCTION_PLAN.INPUT',
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
      entities: data,
      columns: columns2,
      total: data.length,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
  ];

  const modifyModel: any[] = [
    {
      title: 'THÔNG TIN CHUNG',
      data: {
        planCode: {
          type: 'string',
          placeholder: '',
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN' }),
          required: true,
          disabled: true,
        },
        plantCode: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          disabled: true,
        },
        growCode: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
          }),
          required: true,
          label: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN' }),
          disabled: true,
        },
        certificates: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Giấy chứng nhận giống',
          disabled: true,
        },
        bill: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Hóa đơn mua hàng',
          disabled: true,
        },
        plantTime: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Thời gian gieo',
          disabled: true,
        },
        growTime: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Thời gian trồng',
          disabled: true,
        },
        plantLand: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Lô gieo ươm',
          disabled: true,
        },
        growLand: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: 'Lô gieo trồng',
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        farmLocation: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Địa chỉ Farm',
          disabled: true,
        },
        speciesName: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'Tên chủng loại',
          disabled: true,
        },
        barcode: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: 'GTIN',
          disabled: true,
        },
        plantArea: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: 'Diện tích gieo ươm',
          disabled: true,
        },
        growArea: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: 'Diện tích gieo trồng',
          disabled: true,
        },
        numberOfPlants: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: 'Số cây con giống',
          disabled: true,
        },
        numberOfGrows: { 
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'Số cây con trồng',
          }),
          label: 'GTIN',
          disabled: true,
        },
        plantLocation: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: 'Địa điểm Farm giống',
          disabled: true,
        },
        growLocation: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
          }),
          label: 'Địa điểm Farm trồng',
          disabled: true,
        },
      },
    },
  ];

  const modifyModel2: any[] = [
    {
      title: 'THÔNG TIN QUẢN TRỊ',
      data: {
        manager: {
          type: 'string',
          placeholder: '',
          label: 'Thông tin Giám đốc/TGĐ',
          required: true,
          disabled: true,
        },
        plantLeader: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: 'Tổ trưởng gieo trồng',
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        planHuman: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Người lập kế hoạch',
        },
        growLeader: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'Tổ trưởng gieo trồng',
        },
      },
    },
  ];

  const modifyModel3: any[] = [
    {
      title: 'THÔNG TIN THU HOẠCH',
      data: {
        estimatedHarvestTime: {
          type: 'Datetime',
          placeholder: '',
          label: 'Thời gian thu hoạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expectedQuantity: {
          type: 'number',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: 'Sản lượng thu hoạch dự kiến (kg)',
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        worker: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Nhân viên kỹ thuật thu hoạch',
        },
        harvestLeader: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'Tổ trưởng thu hoạch',
        },
      },
    },
  ];

  const modifyModel4: any[] = [
    {
      title: 'THÔNG TIN THU HOẠCH',
      data: {
        estimatedPTTime: {
          type: 'Datetime',
          placeholder: '',
          label: 'Thời gian thu hoạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expectedPTQuantity: {
          type: 'number',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: 'Sản lượng sau sơ chế dự kiến',
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        workerPT: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Nhân viên kỹ thuật sơ chế',
        },
        PTLeader: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'Tổ trưởng sơ chế',
        },
      },
    },
  ];

  const modifyModel5: any[] = [
    {
      title: 'THÔNG TIN LÀM SẠCH',
      data: {
        estimatedCleanTime: {
          type: 'Datetime',
          placeholder: '',
          label: 'Thời gian làm sạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expectedCleanQuantity: {
          type: 'number',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: 'Sản lượng sau làm sạch dự kiến',
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        workerClean: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Nhân viên kỹ thuật làm sạch',
        },
        cleanLeader: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'Tổ trưởng làm sạch',
        },
      },
    },
  ];

  const modifyModel6: any[] = [
    {
      title: 'THÔNG TIN ĐÓNG GÓI',
      data: {
        estimatedCleanTime: {
          type: 'Datetime',
          placeholder: '',
          label: 'Thời gian làm sạch (dự kiến)',
          required: true,
          disabled: true,
        },
        expiryDate: {
          type: 'Datetime',
          placeholder: '',
          label: 'Hạn sử dụng (dự kiến)',
          required: true,
          disabled: true,
        },
        packing: {
          type: 'SearchSelect',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' }),
          required: true,
          label: 'Sản lượng sau làm sạch dự kiến',
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        estimatedPackingQuantity: {
          type: 'number',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Số lượng đóng gói dự kiến ',
        },
        KCS: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'KCS',
        },
        packingLeader: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING' }),
          label: 'Tổ trưởng đóng gói',
        },
      },
    },
  ];

  const modifyModel7: any[] = [
    {
      title: 'THÔNG TIN BẢO QUẢN',
      data: {
        estimatedCleanTime: {
          type: 'Datetime',
          placeholder: '',
          label: 'Thời gian làm sạch (dự kiến)',
          required: true,
          disabled: true,
        },
      },
    },
    {
      title: '\u00A0',
      data: {
        workerPreservation: {
          type: 'tag',
          placeholder: intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW' }),
          label: 'Nhân viên kỹ thuật bảo quản',
        },
      },
    },
  ];

  const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
      header: 'KẾ HOẠCH',
    },
    form_2: {
      title: '',
      modifyModel: modifyModel2,
    },
    form_3: {
      title: '',
      modifyModel: modifyModel3,
    },
    form_4: {
      title: '',
      modifyModel: modifyModel4,
    },
    form_5: {
      title: '',
      modifyModel: modifyModel5,
    },
    form_6: {
      title: '',
      modifyModel: modifyModel6,
    },
    form_7: {
      title: '',
      modifyModel: modifyModel7,
    },
  };

  const allFormField: any = {
    ...GenerateAllFormField(
      modifyModel,
      modifyModel2,
      modifyModel3,
      modifyModel4,
      modifyModel5,
      modifyModel6,
      modifyModel7,
    ),
  };

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
          setNoticeModal(true)
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

  console.log(noticeModal)

  const masterEntityDetailDialog = [
    {
      header: 'THÔNG TIN 1',
      data: [
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantCode: {
            type: 'string',
            title: 'Mã gieo giống',
          },
          growCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          certificates: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          bill: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantTime: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          growTime: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          growLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          image: {
            type: 'image',
            title: 'Hình ảnh',
          },
        },
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
          image: {
            type: 'string',
            title: 'Hình ảnh',
          },
        },
      ],
    },
    {
      header: 'THÔNG TIN 2',
      data: [
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantCode: {
            type: 'string',
            title: 'Mã gieo giống',
          },
          growCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
        },
        {}
      ],
    },
    {
      header: 'THÔNG TIN THU HOẠCH',
      data: [
        {
          imagePrev: {
            type: 'image',
            title: 'Hình ảnh trước thu hoạch',
          },  
        },
        {
          imageAfter: {
            type: 'image',
            title: 'Hình ảnh sau thu hoạch',
          },  
        },
      ],
    },
  ];

  const masterEntityDetailDialog2 = [
    {
      header: 'THÔNG TIN CHUNG',
      data: [
        {
         
         
          plantLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          growLand: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          image: {
            type: 'image',
            title: 'Hình ảnh',
          },
        },
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
          image: {
            type: 'string',
            title: 'Hình ảnh',
          },
        },
      ],
    },
    {
      header: 'THÔNG TIN 2',
      data: [
        {
          planCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          plantCode: {
            type: 'string',
            title: 'Mã gieo giống',
          },
          growCode: {
            type: 'string',
            title: 'Mã kế hoạch',
          },
          
        },
        {}
      ],
    },
    {
      header: 'THÔNG TIN THU HOẠCH',
      data: [
        {
          imagePrev: {
            type: 'image',
            title: 'Hình ảnh trước thu hoạch',
          },  
        },
        {
          imageAfter: {
            type: 'image',
            title: 'Hình ảnh sau thu hoạch',
          },  
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Switch>
        <Route path="/production-plan/new">
          <ProductionPlanModal 
            show={noticeModal}
            mode="notice"
            title="abc"
            body="xyz"
            onClose={() => {
              setNoticeModal(false)
            }}
          />
          <EntityCrudPagePromise
            entity={createEntity}
            onModify={addPromise}
            title={createTitle}
            // reduxModel="purchaseOrder"
            code={null}
            get={() => null}
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
          />
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
              renderInfo={masterEntityDetailDialog}
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
              entity={detailEntity}
              renderInfo={masterEntityDetailDialog}
              onClose={() => {
                setShowDetail(false);
              }}
              mode="line"
              title="THÔNG TIN GIEO TRỒNG"
            />
          )}
        </Route>
        <Route exact path="/production-plan/plan-view/:code">
        {({ history, match }) => (
            <MasterEntityDetailPage
              entity={detailEntity}
              renderInfo={masterEntityDetailDialog2}
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
