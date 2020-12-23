import React, {useEffect, useMemo, useState} from 'react';
import {
  ConvertStatusToBoolean,
  ConvertStatusToString,
  GenerateAllFormField,
  generateInitForm,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import MultiLevelSaleBody from './multi-sale-body';
import {TreeData} from './multilevel-sale.model';
import * as MultilevelSaleService from './multilevel-sale.service';
import {useIntl} from 'react-intl';
import {
  DefaultPagination,
  NormalColumn,
  SortColumn,
} from '../../common-library/common-consts/const';
import {MultilevelSaleActionColumn} from './multilevel-action-column';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import {GenerateCode} from '../species/species';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import {ModifyForm, ModifyInputGroup, ModifyPanel} from "../../common-library/common-types/common-type";

const data: TreeData[] = [
  {
    _id: 'dlc1',
    name: 'Nhà phân phối',
    code: '1213',
    level: 1,
    status: '1',
    children: [
      {
        _id: 'xxx-xxx',
        name: 'Tổng đại lý',
        code: '123rf13',
        level: 2,
        status: '1',
        children: [
          {
            _id: 'cccccc',
            name: 'Đại lý',
            code: '1savas213',
            level: 3,
            status: '1',
            children: [
              {
                _id: 'cccxzca',
                name: 'Cửa hàng bán lẻ',
                code: 'sàvasf1213',
                level: 4,
                status: '1',
              },
            ],
          },
        ],
        parent: 'dlc1',
      },
      {
        _id: 'xxx-xczxxx',
        name: 'Tổng đại lý 2',
        code: '12đá13',
        level: 2,
        status: '1',
        parent: 'dlc1',
      },
    ],
  },
  {
    _id: 'sieuthi',
    name: 'Siêu thị',
    code: '12ábsdb13',
    level: 1,
    status: '1',
  },
  {
    _id: 'bigC',
    name: 'Big C',
    code: '1213',
    level: 1,
    status: '1',
    children: [
      {
        _id: 'xxx-xxx4',
        name: 'Đại lý cấp 4',
        parent: 'bigC',
        code: '12ávasv13',
        level: 2,
        status: '1',
      },
      {
        _id: 'xxx-xxx5',
        name: 'Đại lý cấp 5',
        parent: 'bigC',
        code: '12173783',
        level: 2,
        status: '1',
      },
    ],
  },
];

const headerTitle = 'PRODUCT_PACKAGING.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_PACKAGING.MASTER.BODY.TITLE';
const moduleName = 'MULTILEVEL_SALE.MODULE_NAME';
const deleteDialogTitle = 'MULTILEVEL_SALE.DELETE_DIALOG.TITLE';
const createTitle = 'MULTILEVEL_SALE.CREATE.TITLE';
const updateTitle = 'MULTILEVEL_SALE.UPDATE.TITLE';
const homeURL = `${window.location.pathname}`;

function MultilevelSale() {
  const intl = useIntl();
  
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
    error,
    setError,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<TreeData>({
    getServer: MultilevelSaleService.Get,
    countServer: MultilevelSaleService.Count,
    createServer: MultilevelSaleService.Create,
    deleteServer: MultilevelSaleService.Delete,
    deleteManyServer: MultilevelSaleService.DeleteMany,
    getAllServer: MultilevelSaleService.GetAll,
    updateServer: MultilevelSaleService.Update,
  });
  
  const [agency, setAgency] = useState<any[]>([]);
  const [agencyPagination, setAgencyPagination] = useState(DefaultPagination);
  const [agencyTotal, setAgencyTotal] = useState(0);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [agencyParams, setAgencyParams] = useState({
    storeLevel: '',
  });
  const [showdeleteAgency, setShowDeleteAgency] = useState(false)
  const [deleteAgency, setDeleteAgency] = useState<any>(null);
  const [refresh, setRefresh] = useState(false)
  const [errorAgency, setErrorAgency] = useState('')
  
  useEffect(() => {
    getAll(filterProps);
  }, [filterProps]);
  
  useEffect(() => {
    setAgencyLoading(true)
    MultilevelSaleService.GetAgency({agencyParams, paginationProps})
      .then(res => {
        setAgency(res.data.data);
        setAgencyTotal(res.data.paging.total);
        setAgencyLoading(false)
        setErrorAgency('')
      })
      .catch(err => {
        console.log(err);
        setAgencyLoading(false)
        setErrorAgency(err.message)
      });
  }, [paginationProps, agencyParams, refresh]);
  
  const columns = {
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
      text: `${intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.TABLE.CODE_AGENCY'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.TABLE.NAME_AGENCY'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: MultilevelSaleActionColumn,
      formatExtraData: {
        intl,
        
        onDelete: (entity: any) => {
          setDeleteAgency(entity);
          setErrorAgency('')
          setShowDeleteAgency(true);
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  };
  
  const TreeBody = [
    {
      name: 'Cấp',
      title: 'Danh sách cấp phân phối',
      type: 'Tree',
      data: entities,
    },
    {
      name: 'Test',
      title: 'Danh sách các đơn vị bán hàng',
      type: 'Table',
      data: agency,
      prop: {
        columns: columns,
        total: agencyTotal,
        loading: agencyLoading,
        paginationParams: paginationProps,
        setPaginationParams: setPaginationProps,
        onSelectMany: setSelectedEntities,
        selectedEntities: selectedEntities,
      },
    },
  ];
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    code: {
      _type: 'string',
      placeholder: intl.formatMessage({id: 'COMMON_COMPONENT.INPUT.PLACEHOLDER'}),
      label: intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.CODE_COLUMN'}),
      required: true,
      disabled: true,
    },
    name: {
      _type: 'string',
      placeholder: intl.formatMessage({
        id: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
      }),
      required: true,
      label: intl.formatMessage({id: 'MULTILEVEL_SALE.MASTER.NAME_COLUMN'}),
    },
    status: {
      _type: 'boolean',
      placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.STATUS'}),
      label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.STATUS'}),
    },
  });
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1
    },
  }), []);
  
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: updateTitle}), [createForm]);
  
  // const allFormField: any = {
  //   ...GenerateAllFormField(modifyModel),
  // };
  
  const onFetchAgency = (entity: any) => {
    setPaginationProps(DefaultPagination)
    setAgencyParams({storeLevel: entity._id});
  };
  
  const onDeleteAgency = (entity: any) => {
    setAgencyLoading(true);
    MultilevelSaleService.DeleteAgency(entity).then(res => {
      setAgencyLoading(false)
      setShowDeleteAgency(false)
      setRefresh(!refresh)
      setErrorAgency('')
    }).catch(err => {
      setAgencyLoading(false)
      setErrorAgency(err.message || err.reason)
    })
  }
  
  return (
    <React.Fragment>
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={deleteDialogTitle}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteAgency}
        onDelete={onDeleteAgency}
        isShow={showdeleteAgency}
        loading={agencyLoading}
        error={{error: errorAgency}}
        onHide={() => {
          setShowDeleteAgency(false);
        }}
        title={deleteDialogTitle}
      />
      <ModifyEntityDialog
        show={showCreate}
        entity={{ name: '', status: true }}
        onModify={values => {
          console.log(values);
          console.log(editEntity);
          if (editEntity) {
            add({parentId: editEntity._id, ...ConvertStatusToString(values)});
          } else {
            add(ConvertStatusToString(values));
          }
        }}
        onHide={() => {
          setShowCreate(false);
        }}
        code={null}
        get={() => null}
        error={error}
        homePage={homeURL}
        formModel={createForm}/>
      <ModifyEntityDialog
        show={showEdit}
        entity={editEntity}
        onModify={values => {
          console.log(values);
          if (editEntity) {
            update({parentId: editEntity._id, ...ConvertStatusToString(values)});
          } else {
            update(ConvertStatusToString(values));
          }
        }}
        onHide={() => {
          setShowEdit(false);
        }}
        code={null}
        get={() => null}
        error={error}
        homePage={homeURL}
        formModel={updateForm}/>
      <MultiLevelSaleBody
        title="CẤP BÁN HÀNG"
        data={data}
        body={TreeBody}
        onCreate={(entity: any) => {
          setCreateEntity(null);
          setEditEntity(entity);
          setShowCreate(true);
          //   history.push(`${window.location.pathname}/new`);
        }}
        onEdit={(entity: any) => {
          // get(entity);
          setEditEntity(ConvertStatusToBoolean(entity));
          setShowEdit(true);
        }}
        onDelete={(entity: any) => {
          setError({error: ''})
          setDeleteEntity(entity);
          setShowDelete(true);
        }}
        onFetchAgency={onFetchAgency}
      />
    </React.Fragment>
  );
}

export default MultilevelSale;
