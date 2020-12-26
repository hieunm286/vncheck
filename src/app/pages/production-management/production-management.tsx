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

  const productPlanSearchModel1: SearchModel = {
    seedingCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.SEEDING_CODE',
    },
    plantCode: {
      type: 'string',
      label: 'PRODUCTION_PLAN.PLANT_CODE',
    },
  };

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
              searchModel={productPlanSearchModel1}
            />
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default ProductionManagement;
