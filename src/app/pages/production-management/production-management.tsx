import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Card, CardBody } from '../../common-library/card';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import ProductionManagementBody from './production-management-body';
import { ProductionManagementModel } from './production-management.model';
import * as ProductionManagementService from './production-management.service';
import { Steps, Divider } from 'antd';
import { DefaultPagination } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { SearchModel } from '../../common-library/common-types/common-type';
import * as ProductTypeService from '../species/species.service';
import { Fix } from '../production-plan/defined/const';

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
  } = InitMasterProps<ProductionManagementModel>({
    getServer: ProductionManagementService.Get,
    countServer: ProductionManagementService.Count,
    createServer: ProductionManagementService.Create,
    deleteServer: ProductionManagementService.Delete,
    deleteManyServer: ProductionManagementService.DeleteMany,
    getAllServer: ProductionManagementService.GetAll,
    updateServer: ProductionManagementService.Update,
  });

  const [currentStep, setCurrentStep] = useState<number | undefined>(0);

  const columns = {
    _id: {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: { paddingTop: 20 },
    },
  };

  const stepData = [
    {
      title: 'PRODUCTION_MANAGEMENT_HARVESTING',
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
      title: 'PRODUCTION_MANAGEMENT_PREPROCESSING',
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
      title: 'PRODUCTION_MANAGEMENT_CLEANING',
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
      title: 'PRODUCTION_MANAGEMENT_PACKING',
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
      title: 'PRODUCTION_MANAGEMENT_PRESERVATION',
      entities: entities,
      columns: columns,
      total: total,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
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
      keyField: 'name'
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
    }
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
      keyField: 'name'
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
      keyField: 'name'
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
      keyField: 'name'
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
      keyField: 'name'
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

  const getSearchModel = (): SearchModel => {
    if (currentStep === 0)
      return PM_HarvestingSearchModel
    if (currentStep === 1)
      return PM_PreliminaryTreatmentSearchModel
    if (currentStep === 2)
      return PM_CleaningSearchModel
    if (currentStep === 3)
      return PM_PackingSearchModel
    return PM_PreservationSearchModel
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/production-management">
          <div className="bg-white pm-header pt-10">
            <Card>
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
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionManagement;
