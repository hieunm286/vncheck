import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Card, CardBody } from '../../common-library/card';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import { ProductionManagementModel } from './production-management.model';
import * as ProductionManagementService from './production-management.service';
import { Steps } from 'antd';
import { DefaultPagination, SortColumn } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { SearchModel } from '../../common-library/common-types/common-type';
import * as ProductTypeService from '../species/species.service';
import { Fix } from '../production-plan/defined/const';
import * as ProductionPlanService from '../production-plan/production-plan.service';
import { ProductionPlanModel } from '../production-plan/production-plant.model';
import { MasterTable } from '../../common-library/common-components/master-table';

const { Step } = Steps;

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
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-plan/plan-view/${row._id}`}>{row.code}</Link>
      ),
      ...SortColumn,
      classes: 'text-center',
    },
    harvestingCode: {
      dataField: 'harvesting.code',
      text: `${intl.formatMessage({ id: 'PRODUCTION_PLAN.CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <Link to={`/production-management/harvesting/${row._id}`}>{row.harvesting.code}</Link>
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
    GTIN: {
      dataField: 'planting.species.barcode',
      text: `${intl.formatMessage({ id: 'GTIN' })}`,
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
    landlot: {
      dataField: 'planting.landLot',
      text: `${intl.formatMessage({ id: 'landlot' })}`,
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

  const PM_HarvestingSearchModel: SearchModel = {
    plCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CODE',
    },
    code: {
      type: 'string',
      label: 'PRODUCTION_PLAN.HARVESTING_CODE',
    },
    species: {
      type: 'search-select',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      selectField: '_id',
      keyField: 'name',
    },
    GTIN: {
      type: 'string',
      label: 'GTIN',
    },
    estimatedHarvestTime: {
      type: 'date-time',
      name: 'planting.estimatedHarvestTime',
      label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
    },
    landLot: {
      type: 'string',
      label: 'PLANTING_LAND_LOT',
    },
  };

  const PM_PreliminaryTreatmentSearchModel: SearchModel = {
    plCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CODE',
    },
    harvestingCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.HARVESTING_CODE',
    },
    code: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE',
    },
    species: {
      type: 'search-select',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      selectField: '_id',
      keyField: 'name',
    },
    GTIN: {
      type: 'string',
      label: 'GTIN',
    },
    estimatedHarvestTime: {
      type: 'date-time',
      name: 'planting.estimatedHarvestTime',
      label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
    },
  };

  const PM_CleaningSearchModel: SearchModel = {
    plCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CODE',
    },
    harvestingCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.HARVESTING_CODE',
    },
    PreliminaryTreatment: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE',
    },
    code: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CLEANING.CODE',
    },
    species: {
      type: 'search-select',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      selectField: '_id',
      keyField: 'name',
    },
    GTIN: {
      type: 'string',
      label: 'GTIN',
    },
    estimatedHarvestTime: {
      type: 'date-time',
      name: 'planting.estimatedHarvestTime',
      label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
    },
  };

  const PM_PackingSearchModel: SearchModel = {
    plCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CODE',
    },
    harvestingCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.HARVESTING_CODE',
    },
    PreliminaryTreatment: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE',
    },
    cleaning: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CLEANING.CODE',
    },
    code: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PACKING.CODE',
    },
    species: {
      type: 'search-select',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      selectField: '_id',
      keyField: 'name',
    },
    GTIN: {
      type: 'string',
      label: 'GTIN',
    },
    estimatedHarvestTime: {
      type: 'date-time',
      name: 'planting.estimatedHarvestTime',
      label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
    },
  };

  const PM_PreservationSearchModel: SearchModel = {
    plCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CODE',
    },
    harvestingCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.HARVESTING_CODE',
    },
    PreliminaryTreatment: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PreliminaryTreatment_CODE',
    },
    cleaning: {
      type: 'string',
      label: 'PRODUCTION_PLAN.CLEANING.CODE',
    },
    packing: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PACKING.CODE',
    },
    code: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PRESERVATION.CODE',
    },
    species: {
      type: 'search-select',
      placeholder: 'COMMON_COMPONENT.SELECT.PLACEHOLDER',
      label: 'PRODUCT_PACKAGING.MASTER.TABLE.NAME_COLUMN',
      onSearch: ProductTypeService.GetAll,
      selectField: '_id',
      keyField: 'name',
    },
    GTIN: {
      type: 'string',
      label: 'GTIN',
    },
    estimatedHarvestTime: {
      type: 'date-time',
      name: 'planting.estimatedHarvestTime',
      label: <Fix title={'PRODUCTION_PLAN.HARVEST_DATE'} />,
    },
  };

  useEffect(() => {
    getAll({ ...(filterProps as any), step: '0', isMaster: true, process: currentStep + 2 + '' });
  }, [paginationProps, filterProps, currentStep]);

  console.log(entities);

  const getSearchModel = (): SearchModel => {
    if (currentStep === 0) return PM_HarvestingSearchModel;
    if (currentStep === 1) return PM_PreliminaryTreatmentSearchModel;
    if (currentStep === 2) return PM_CleaningSearchModel;
    if (currentStep === 3) return PM_PackingSearchModel;
    return PM_PreservationSearchModel;
  };

  return (
    <React.Fragment>
      <Switch>
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
                  columns={harvestingColumns}
                  total={total}
                  loading={loading}
                  paginationParams={paginationProps}
                  setPaginationParams={setPaginationProps}
                  onSelectMany={setSelectedEntities}
                  selectedEntities={selectedEntities}
                  removeSelectRow
                />
              </CardBody>
            </Card>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionManagement;
