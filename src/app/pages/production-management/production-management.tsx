import React, {useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {Card, CardBody} from '../../common-library/card';
import {InitMasterProps} from '../../common-library/helpers/common-function';
import {Steps} from 'antd';
import {DefaultPagination, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {SearchModel} from '../../common-library/common-types/common-type';
import * as SpeciesService from '../species/species.service';
import {Fix} from '../production-plan/defined/const';
import * as ProductionPlanService from '../production-plan/production-plan.service';
import {ProductionPlanModel} from '../production-plan/production-plant.model';
import {MasterTable} from '../../common-library/common-components/master-table';
import {MasterEntityDetailPage} from '../../common-library/common-components/master-detail-page';
import {
  CleaningDetail,
  harvestingDetail,
  PackingDetail,
  PreliminaryTreatmentDetail,
  PreservationDetail,
} from './defined/const';
import _ from 'lodash';

const {Step} = Steps;

const productPlanCode = 'PRODUCTION_PLAN.CODE';
const harvestingCode = 'PRODUCTION_PLAN.HARVESTING_CODE';
const preliminaryTreatmentCode = 'PRODUCTION_PLAN.PreliminaryTreatment_CODE';
const cleaningCode = 'PRODUCTION_PLAN.CLEANING.CODE';
const packingCode = 'PRODUCTION_PLAN.PACKING.CODE';
const preservationCode = 'PRODUCTION_PLAN.PRESERVATION.CODE';

const extendSearchField: SearchModel = {
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    onSearch: SpeciesService.GetAll,
    onChange: (value, {setFieldValue, values}) => {
      console.log(value, values);
      if (value) value.barcode = values.product_plan?.seeding?.species?.barcode;
      else return {barcode: values.product_plan?.seeding?.species?.barcode}
    },
    keyField: 'name',
    name: 'product_plan.seeding.species',
  },
  GTIN: {
    type: 'string',
    label: 'GTIN',
    name: 'product_plan.seeding.species.barcode',
  },
};

const estimatedHarvestTime: SearchModel = {
  estimatedHarvestTime: {
    type: 'date-time',
    name: 'product_plan.planting.estimatedHarvestTime',
    label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
  },
};

const PM_HarvestingSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: productPlanCode,
  },
  harvestingCode: {
    type: 'string',
    label: harvestingCode,
    name: 'product_plan.harvesting.code',
  },
  ...extendSearchField,
  startTime: {
    type: 'date-time',
    label: <Fix title={'HARVESTING_START_TIME'} />,
    name: 'product_plan.harvesting.startTime',
  },
  endTime: {
    type: 'date-time',
    label: <Fix title={'HARVESTING_END_TIME'} />,
    name: 'product_plan.harvesting.endTime',
  },
  landLot: {
    type: 'string',
    label: 'PLANTING_LAND_LOT',
    name: 'product_plan.planting.landlot',
  },
};

const PM_PreliminaryTreatmentSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: productPlanCode,
  },
  harvestingCode: {
    type: 'string',
    label: harvestingCode,
    name: 'product_plan.harvesting.code',
  },
  preliminaryTreatmentCode: {
    type: 'string',
    label: preliminaryTreatmentCode,
    name: 'product_plan.preliminaryTreatment.code',
  },
  ...extendSearchField,
  preliminaryTreatmentStartTime: {
    type: 'date-time',
    label: <Fix title={'PRELIMINARY_TREATMENT_START_TIME'} />,
    name: 'product_plan.preliminaryTreatment.startTime',
  },
  preliminaryTreatmentEndTime: {
    type: 'date-time',
    label: <Fix title={'PRELIMINARY_TREATMENT_END_TIME'} />,
    name: 'product_plan.preliminaryTreatment.endTime',
  },
};

const PM_CleaningSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: productPlanCode,
  },
  harvestingCode: {
    type: 'string',
    label: harvestingCode,
    name: 'product_plan.harvesting.code',
  },
  preliminaryTreatmentCode: {
    type: 'string',
    label: preliminaryTreatmentCode,
    name: 'product_plan.preliminaryTreatment.code',
  },
  cleaningCode: {
    type: 'string',
    label: cleaningCode,
    name: 'product_plan.cleaning.code',
  },
  ...extendSearchField,
  cleaningStartTime: {
    type: 'date-time',
    label: <Fix title={'CLEANING_START_TIME'} />,
    name: 'product_plan.cleaning.startTime',
  },
  cleaningEndTime: {
    type: 'date-time',
    label: <Fix title={'CLEANING_END_TIME'} />,
    name: 'product_plan.cleaning.endTime',
  },
};

const PM_PackingSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: productPlanCode,
  },
  harvestingCode: {
    type: 'string',
    label: harvestingCode,
    name: 'product_plan.harvesting.code',
  },
  preliminaryTreatmentCode: {
    type: 'string',
    label: preliminaryTreatmentCode,
    name: 'product_plan.preliminaryTreatment.code',
  },
  cleaningCode: {
    type: 'string',
    label: cleaningCode,
    name: 'product_plan.cleaning.code',
  },
  packingCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PACKING.CODE',
    name: 'product_plan.packing.code',
  },
  ...extendSearchField,
  packing: {
    type: 'string',
    label: 'PRODUCT_PACKAGING.MODULE_NAME',
    name: 'product_plan.packing',
  }
};

const PM_PreservationSearchModel: SearchModel = {
  code: {
    type: 'string',
    label: productPlanCode,
  },
  harvestingCode: {
    type: 'string',
    label: harvestingCode,
    name: 'product_plan.harvesting.code',
  },
  preliminaryTreatmentCode: {
    type: 'string',
    label: preliminaryTreatmentCode,
    name: 'product_plan.preliminaryTreatment.code',
  },
  cleaningCode: {
    type: 'string',
    label: cleaningCode,
    name: 'product_plan.cleaning.code',
  },
  packingCode: {
    type: 'string',
    label: 'PRODUCTION_PLAN.PACKING.CODE',
    name: 'product_plan.packing.code',
  },
  preservationCode: {
    type: 'string',
    label: preservationCode,
    name: 'product_plan.preservation.code',
  },
  ...extendSearchField,
  preservationStartTime: {
    type: 'date-time',
    label: <Fix title={'PRESERVATION_START_TIME'} />,
    name: 'product_plan.preservation.startTime',
  },
  preservationEndTime: {
    type: 'date-time',
    label: <Fix title={'PRESERVATION_END_TIME'} />,
    name: 'product_plan.preservation.endTime',
  },
};

function ProductionManagement() {
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

  const [currentStep, setCurrentStep] = useState<number>(0);

  const extendField = {
    species: {
      dataField: 'product_plan.seeding.species.name',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SPECIES_NAME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{row.seeding.species.name}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    GTIN: {
      dataField: 'product_plan.seeding.species.barcode',
      text: `${intl.formatMessage({ id: 'GTIN' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{row.seeding.species.barcode}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
  };

  const harvestingColumns = {
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
      text: `${intl.formatMessage({ id: productPlanCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/plan-view/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    harvestingCode: {
      dataField: 'product_plan.harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    estimatedHarvestTime: {
      dataField: 'product_plan.planting.estimatedHarvestTime',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.HARVEST_REAL_DATE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        // <span>
        //   {new Intl.DateTimeFormat('en-GB').format(new Date(row.planting.estimatedHarvestTime))}
        // </span>
        <span>
          {row.harvesting.startTime && row.harvesting.endTime ? (
            <span>
              {new Intl.DateTimeFormat('en-GB').format(new Date(row.harvesting.startTime))} -{' '}
              {new Intl.DateTimeFormat('en-GB').format(new Date(row.harvesting.endTime))}
            </span>
          ) : (
            'Không có thông tin'
          )}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    landlot: {
      dataField: 'product_plan.planting.landLot.code',
      text: `${intl.formatMessage({ id: 'PLANTING_LAND_LOT' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{row.planting.landLot.code}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
  };

  const preliminaryTreatmentColumns = {
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
      text: `${intl.formatMessage({ id: productPlanCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/plan-view/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    harvestingCode: {
      dataField: 'product_plan.harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'product_plan.preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    preliminaryTreatmentTime: {
      dataField: 'product_plan.preliminaryTreatment.startTime',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.preliminaryTreatment.TIME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.preliminaryTreatment.startTime && row.preliminaryTreatment.endTime ? (
            <span>
              {new Intl.DateTimeFormat('en-GB').format(
                new Date(row.preliminaryTreatment.startTime),
              )}{' '}
              -{' '}
              {new Intl.DateTimeFormat('en-GB').format(new Date(row.preliminaryTreatment.endTime))}
            </span>
          ) : (
            'Không có thông tin'
          )}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
  };

  const cleaningColumns = {
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
      text: `${intl.formatMessage({ id: productPlanCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/plan-view/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    harvestingCode: {
      dataField: 'product_plan.harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'product_plan.preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    cleaningCode: {
      dataField: 'product_plan.cleaning.code',
      text: `${intl.formatMessage({ id: cleaningCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/cleaning/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    cleaningTime: {
      dataField: 'product_plan.cleaning.estimatedTime',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.CLEANING.TIME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.cleaning.estimatedTime
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.cleaning.estimatedTime))
            : 'Không có thông tin'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
  };

  const packingColumns = {
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
      text: `${intl.formatMessage({ id: productPlanCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/plan-view/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    harvestingCode: {
      dataField: 'product_plan.harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'product_plan.preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    cleaningCode: {
      dataField: 'product_plan.cleaning.code',
      text: `${intl.formatMessage({ id: cleaningCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/cleaning/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    packingCode: {
      dataField: 'product_plan.packing.code',
      text: `${intl.formatMessage({ id: packingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/packing/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    packing: {
      dataField: 'product_plan.packing.packing.weight',
      text: `${intl.formatMessage({ id: 'PRODUCT_PACKAGING.MODULE_NAME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>{row.packing.packing ? row.packing.packing.weight : 'Chưa có thông tin'}</span>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
  };

  const preservationColumns = {
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
      text: `${intl.formatMessage({ id: productPlanCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/plan-view/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    harvestingCode: {
      dataField: 'product_plan.harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'product_plan.preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>
          {row.preliminaryTreatment.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    cleaningCode: {
      dataField: 'product_plan.cleaning.code',
      text: `${intl.formatMessage({ id: cleaningCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/cleaning/${row._id}`}>{row.cleaning.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    packingCode: {
      dataField: 'product_plan.packing.code',
      text: `${intl.formatMessage({ id: packingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/packing/${row._id}`}>{row.packing.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preservationCode: {
      dataField: 'product_plan.preservation.code',
      text: `${intl.formatMessage({ id: preservationCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preservation/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    preservationDate: {
      dataField: 'product_plan.preservation.createdAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.PRESERVATION.TIME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {/* {new Intl.DateTimeFormat('en-GB').format(new Date(row.preservation.createdAt))} */}
          Chưa có thông tin
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    preservationTemperature: {
      dataField: 'product_plan.preservation.updatedAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.PRESERVATION.TEMPERATURE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {/* {new Intl.DateTimeFormat('en-GB').format(new Date(row.preservation.createdAt))} */}
          Chưa có thông tin
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
  };

  const stepData = [
    {
      title: 'PRODUCTION_MANAGEMENT_HARVESTING',
    },
    {
      title: 'PRODUCTION_MANAGEMENT_PREPROCESSING',
    },
    {
      title: 'PRODUCTION_MANAGEMENT_CLEANING',
    },
    {
      title: 'PRODUCTION_MANAGEMENT_PACKING',
    },
    {
      title: 'PRODUCTION_MANAGEMENT_PRESERVATION',
    },
  ];

  function callback(key: number) {
    setCurrentStep(key);
    setEntities([]);
    setPaginationProps(DefaultPagination);
  }

  useEffect(() => {
    getAll({
      ...(filterProps as any),
      step: '1',
      isMaster: true,
      confirmationStatus: '2',
      process: currentStep + 2 + '',
    });
  }, [paginationProps, filterProps, currentStep]);

  const getSearchModel = useCallback((): SearchModel => {
    if (currentStep === 0) return PM_HarvestingSearchModel;
    if (currentStep === 1) return PM_PreliminaryTreatmentSearchModel;
    if (currentStep === 2) return PM_CleaningSearchModel;
    if (currentStep === 3) return PM_PackingSearchModel;
    return PM_PreservationSearchModel;
  }, [currentStep]);

  const getTableColumn = useCallback(() => {
    if (currentStep === 0) return harvestingColumns;
    if (currentStep === 1) return preliminaryTreatmentColumns;
    if (currentStep === 2) return cleaningColumns;
    if (currentStep === 3) return packingColumns;
    if (currentStep === 4) return preservationColumns;
    return {}
  }, [cleaningColumns, currentStep, harvestingColumns, packingColumns, preliminaryTreatmentColumns, preservationColumns]);

  console.log(packingColumns)

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/production-management/harvesting/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={harvestingDetail}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="HARVESTING_INFO"
            />
          )}
        </Route>
        <Route exact path="/production-management/preliminaryTreatment/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={PreliminaryTreatmentDetail}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="PRELIMINARY_TREATMENT_INFO"
            />
          )}
        </Route>
        <Route exact path="/production-management/cleaning/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={CleaningDetail}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="CLEANING_INFO"
            />
          )}
        </Route>
        <Route exact path="/production-management/packing/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={PackingDetail}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="PACKING_INFO"
            />
          )}
        </Route>
        <Route exact path="/production-management/preservation/:code">
          {({ history, match }) => (
            <MasterEntityDetailPage
              entity={history.location.state}
              renderInfo={PreservationDetail}
              code={match && match.params.code}
              get={code => ProductionPlanService.GetById(code)}
              onClose={() => {
                setShowDetail(false);
              }}
              header="PRESERVATION_INFO"
            />
          )}
        </Route>
        <Route path="/production-management">
          <div className="bg-white pm-header pt-10">
            <Card className="card-step">
              <Steps current={currentStep} onChange={callback} className="pm-step">
                {stepData.map((item: any, key: number) => (
                  <Step title={intl.formatMessage({ id: item.title })} key={'' + key} />
                ))}
              </Steps>
            </Card>
            <MasterHeader
              title={'Tìm kiếm'}
              onSearch={value => {
                setPaginationProps(DefaultPagination);
                if (!value || _.isEmpty(value)) {
                  setFilterProps({});
                } else {
                  // const cvValue = JSON.parse(JSON.stringify(value));

                  // if (
                  //   value.product_plan &&
                  //   value.product_plan.seeding &&
                  //   value.product_plan.seeding.species &&
                  //   _.isObject(value.product_plan.seeding.species)
                  // ) {
                  //   cvValue.product_plan.seeding.species = value.product_plan.seeding.species._id;
                  // }
                  const pr = {
                    step: '1',
                    isMaster: true,
                    confirmationStatus: '2',
                    process: currentStep + 2 + '',
                  }
                  ProductionPlanService.Search(value, {DefaultPagination, pr}).then(res => {
                    const data: any = res.data
                    setEntities(data.data ? data.data : data);
                  })
                
                  // setFilterProps({ ...cvValue });

              }}}
              searchModel={getSearchModel()}
            />
          </div>
          <Card>
            <CardBody>
              <MasterTable
                entities={entities}
                columns={getTableColumn()}
                total={total}
                loading={loading}
                paginationParams={paginationProps}
                setPaginationParams={setPaginationProps}
              />
            </CardBody>
          </Card>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionManagement;
