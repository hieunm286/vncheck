import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Card, CardBody } from '../../common-library/card';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import { Steps } from 'antd';
import { DefaultPagination, SortColumn } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { SearchModel } from '../../common-library/common-types/common-type';
import * as SpeciesService from '../species/species.service';
import { Fix } from '../production-plan/defined/const';
import * as ProductionPlanService from '../production-plan/production-plan.service';
import { ProductionPlanModel } from '../production-plan/production-plant.model';
import { MasterTable } from '../../common-library/common-components/master-table';
import _ from 'lodash';
import { MasterEntityDetailPage } from '../../common-library/common-components/master-detail-page';
import { harvestingDetail, PreliminaryTreatmentDetail, CleaningDetail, PackingDetail, PreservationDetail } from './defined/const';

const { Step } = Steps;

const productPlanCode = 'PRODUCTION_PLAN.CODE';
const harvestingCode = 'PRODUCTION_PLAN.HARVESTING_CODE';
const preliminaryTreatmentCode = 'PRODUCTION_PLAN.PreliminaryTreatment_CODE';
const cleaningCode = 'PRODUCTION_PLAN.CLEANING.CODE';
const packingCode = 'PRODUCTION_PLAN.PACKING.CODE';
const preservationCode = 'PRODUCTION_PLAN.PACKING.CODE';

const extendSearchField: SearchModel = {
  species: {
    type: 'search-select',
    label: 'PRODUCTION_PLAN.SPECIES_NAME',
    onSearch: SpeciesService.GetAll,
    keyField: 'name',
    name: 'product_plan.seeding.species',
  },
  GTIN: {
    type: 'string',
    label: 'GTIN',
    name: 'product_plan.seeding.species.barcode',
  },
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
  ...(extendSearchField as any),
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
      dataField: 'planting.species.name',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.SPECIES_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    GTIN: {
      dataField: 'planting.species.barcode',
      text: `${intl.formatMessage({ id: 'GTIN' })}`,
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
      dataField: 'harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
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
    landlot: {
      dataField: 'planting.landLot.code',
      text: `${intl.formatMessage({ id: 'PLANTING_LAND_LOT' })}`,
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
      dataField: 'harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>
          {row.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    preliminaryTreatmentTime: {
      dataField: 'preliminaryTreatment.createdAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.preliminaryTreatment.TIME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.preliminaryTreatment.createdAt
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.preliminaryTreatment.createdAt))
            : 'Không có thông tin'}
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
      dataField: 'harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>
          {row.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    cleaningCode: {
      dataField: 'cleaning.code',
      text: `${intl.formatMessage({ id: cleaningCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/cleaning/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    cleaningTime: {
      dataField: 'planting.estimatedHarvestTime',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.CLEANING.TIME' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <span>
          {row.cleaning.createdAt
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.cleaning.createdAt))
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
      dataField: 'harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'preliminaryTreatment.code',
      text: `${intl.formatMessage({ id: preliminaryTreatmentCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preliminaryTreatment/${row._id}`}>
          {row.code}
        </Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    cleaningCode: {
      dataField: 'cleaning.code',
      text: `${intl.formatMessage({ id: cleaningCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/cleaning/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    packingCode: {
      dataField: 'packing.code',
      text: `${intl.formatMessage({ id: packingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/packing/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    packing: {
      dataField: 'packing.packing.weight',
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
      dataField: 'harvesting.code',
      text: `${intl.formatMessage({ id: harvestingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preliminaryTreatmentCode: {
      dataField: 'preliminaryTreatment.code',
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
      dataField: 'cleaning.code',
      text: `${intl.formatMessage({ id: cleaningCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/cleaning/${row._id}`}>{row.cleaning.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    packingCode: {
      dataField: 'packing.code',
      text: `${intl.formatMessage({ id: packingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/packing/${row._id}`}>{row.packing.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    preservationCode: {
      dataField: 'preservation.code',
      text: `${intl.formatMessage({ id: packingCode })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/preservation/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    ...extendField,
    preservationTime: {
      dataField: 'preservationTime.createdAt',
      text: `${intl.formatMessage({ id: 'PRODUCTION_MANAGEMENT.CLEANING.TIME' })}`,
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
      dataField: 'preservationTime.createdAt',
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
    getAll({ ...(filterProps as any), step: '1', isMaster: true, confirmationStatus: '2', process: currentStep + 2 + '' });
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
    return preservationColumns;
  }, [currentStep]);

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
              header="THÔNG TIN THU HOẠCH"
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
              header="THÔNG TIN THU HOẠCH"
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
              header="THÔNG TIN THU HOẠCH"
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
              header="THÔNG TIN THU HOẠCH"
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
              header="THÔNG TIN THU HOẠCH"
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
                setFilterProps({ ...value });
              }}
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
