import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetLots, GetSubLots, Update} from './land-lot.service';
import {LandLotModel} from './land-lot.model';
import {NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {
  GenerateAllFormField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {DefaultPagination} from '../../common-library/common-consts/const';
import {
  MasterBodyColumns,
  ModifyPanel,
  ModifyInputGroup,
  RenderInfoDetailDialog,
  SearchModel, InputGroupType, ModifyForm
} from "../../common-library/common-types/common-type";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from "../../common-library/common-components/delete-many-entities-dialog";
import isNumeric from "antd/es/_util/isNumeric";

function LandLot() {
  const {
    entities,
    setEntities,
    intl,
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
    error,
    setError,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<LandLotModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });
  
  const moduleName = 'LAND_LOT.MODULE_NAME';
  const headerTitle = 'LAND_LOT.MASTER.HEADER.TITLE';
  const bodyTitle = 'LAND_LOT.MASTER.BODY.TITLE';
  const createTitle = 'LAND_LOT.CREATE.TITLE';
  const updateTitle = 'LAND_LOT.EDIT.TITLE';
  const viewTitle = 'LAND_LOT.VIEW.TITLE';
  const validateSchema = Yup.object().shape({
    lot: Yup.string()
      .required('LAND_LOT.EDIT.VALIDATION.LOT_CODE_EMPTY')
      .matches(/[a-zA-Z]/u, {
        message: 'LAND_LOT.EDIT.VALIDATION.LOT_CODE_WRONG_FORMAT'
      }).nullable(),
    subLot: Yup.string()
      .required('LAND_LOT.EDIT.VALIDATION.SUB_LOT_CODE_EMPTY')
      .matches(/[0-9]+/u, {
        message: 'LAND_LOT.EDIT.VALIDATION.SUB_LOT_CODE_WRONG_FORMAT'
      }).nullable()
    // .test('len', intl.formatMessage({id: 'LAND_LOT.EDIT.VALIDATION.SUB_LOT_CODE_WRONG_FORMAT_LENGTH'}), (val: any) => val.length === 2),
  });
  
  
  useEffect(() => {
    getAll(filterProps);
    
  }, [paginationProps, filterProps, getAll]);
  const columns = useMemo((): MasterBodyColumns => ({
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'LAND_LOT.MASTER.HEADER.CODE'})}`,
      formatter: (cell: any, row: any, rowIndex) => {
        return (<Fragment>{row.lot + row.subLot}</Fragment>);
      },
      ...SortColumn,
    },
    lot: {
      dataField: 'lot',
      text: `${intl.formatMessage({id: 'LAND_LOT.MASTER.HEADER.LOT_CODE'})}`,
      ...SortColumn,
    },
    subLot: {
      dataField: 'subLot',
      text: `${intl.formatMessage({id: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE'})}`,
      ...SortColumn,
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: LandLotModel) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: LandLotModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: LandLotModel) => {
          get(entity).then(result => {
            setEditEntity(result.data);
            setShowEdit(true);
          });
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  }), [get, intl, setDeleteEntity, setEditEntity, setShowDelete, setShowDetail, setShowEdit]);
  
  const masterEntityDetailDialog: RenderInfoDetailDialog = useMemo((): RenderInfoDetailDialog => [
    {
      data: {
        code: {title: 'LAND_LOT.MASTER.HEADER.CODE'},
        lot: {title: 'LAND_LOT.MASTER.HEADER.LOT_CODE'},
        subLot: {title: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE'},
      },
      titleClassName: 'col-3'
    },
  ], []);
  
  const initSearchModel = useMemo<SearchModel>(() => (
    {
      code: {
        type: 'string',
        label: 'LAND_LOT.MASTER.HEADER.CODE',
        disabled: false,
        onChange: (value, {setFieldValue, values}) => {
          const innerValue = value.target.value.toUpperCase();
          setFieldValue('code', innerValue);
          if (innerValue !== '') {
            searchModel.lot.disabled = true;
            searchModel.subLot.disabled = true;
            if (innerValue[0].charAt(0) < 'A'.charCodeAt(0) || innerValue[0].charAt(0) > 'Z'.charCodeAt(0)) {
              setError({error: 'LAND_LOT.ERROR.INVALID_LOT_SEARCH'});
              return;
            }
            setFieldValue('lot', innerValue[0]);
            if (innerValue.length === 1) {
              setFieldValue('subLot', '');
              return;
            }
            if (innerValue.length > 3) {
              setError({error: 'LAND_LOT.ERROR.INVALID_LENGTH_SEARCH'});
              setFieldValue('code',innerValue.substring(0,3));
              return;
            }
            const subLot = innerValue.substr(1, 2);
            if (!isNumeric(subLot)) {
              setError({error: 'LAND_LOT.ERROR.INVALID_SUB_LOT_SEARCH'});
              return;
            }
            setFieldValue('subLot', subLot);
          } else {
            setFieldValue('lot', '');
            setFieldValue('subLot', '');
            searchModel.lot.disabled = false;
            searchModel.subLot.disabled = false;
          }
          setSearchModel(searchModel);
        }
      },
      lot: {
        type: 'search-select',
        label: 'LAND_LOT.MASTER.HEADER.LOT_CODE',
        onSearch: GetLots,
        disabled: false,
        onChange: (value, {setFieldValue, values}) => {
          // setFieldValue('code', value + (values.subLot ?? ''));
          // setFieldValue('subLot', null);
          searchModel.code.disabled = true;
          // searchModel.subLot.disabled = false;
          setSearchModel(searchModel);
          console.log(value);
          console.log(values);
        }
      },
      subLot: {
        type: 'search-select',
        label: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE',
        onSearch: GetSubLots,
        disabled: false,
        onChange: (value, {setFieldValue, values}) => {
          searchModel.code.disabled = true;
          setSearchModel(searchModel);
          // setFieldValue('code', values.lot ? (values.lot + value) : '');
        },
        
      },
    }), [setError]);
  const [searchModel, setSearchModel] = useState(initSearchModel);
  const resetSearchModel = useCallback((queryProps) => {
   if (Object.keys(queryProps).length !== 0) return;
    searchModel.code.disabled = false;
    searchModel.lot.disabled = false;
    searchModel.subLot.disabled = false;
    setSearchModel(searchModel);
  }, [searchModel]);
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    code: {
      _type: 'string',
      label: 'LAND_LOT.MASTER.HEADER.CODE',
      required: true,
      disabled: true,
    },
    lot: {
      _type: 'search-select',
      label: 'LAND_LOT.MASTER.HEADER.LOT_CODE',
      onSearch: GetLots,
      disabled: false,
      onChange: (value, {setFieldValue, values}) => {
        setFieldValue('code', value);
        setFieldValue('subLot', null);
        setGroup1({...group1})
      }
    },
    subLot: {
      _type: 'search-select',
      label: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE',
      onSearch: GetSubLots,
      disabled: (values) => {
        return !values.lot || values.lot.length !== 1
      },
      onChange: (value, {setFieldValue, values}) => {
        setFieldValue('code', values.lot + value);
      },
    },
  });
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1
    },
  }), [group1]);
  
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [createForm]);
  
  console.log(createEntity)
  return (
    <Fragment>
      <MasterEntityDetailDialog
        title={viewTitle}
        moduleName={moduleName}
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onHide={() => {
          setShowDetail(false);
        }}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
        loading={loading}
        error={error}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        error={error}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
      <ModifyEntityDialog
        formModel={createForm}
        show={showCreate}
        entity={createEntity}
        onModify={add}
        validation={validateSchema}
        onHide={() => {
          setShowCreate(false);
        }}
        loading={loading}
      />
      <ModifyEntityDialog
        formModel={updateForm}
        show={showEdit}
        entity={editEntity}
        onModify={update}
        validation={validateSchema}
        onHide={() => {
          setShowEdit(false);
        }}
        loading={loading}
      />
      <Switch>
        <Redirect from="/land-lot/edit" to="/land-lot"/>
        <Route path="/land-lot">
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
              resetSearchModel(value);
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              // setCreateEntity({} as any);
              
              // setEditEntity(null);
              setShowCreate(true);
              // history.push(`${window.location.pathname}/new`);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={entities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
            isShowId={true}
          />
          
          {/* <MasterGoogleMap location={location} /> */}
          
          {/* <MasterMap /> */}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default LandLot;
