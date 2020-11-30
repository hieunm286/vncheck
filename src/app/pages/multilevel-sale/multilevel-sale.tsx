import React, { useEffect, useState } from 'react';
import {
  ConvertStatusToBoolean,
  ConvertStatusToString,
  GenerateAllFormField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import MultiLevelSaleBody from './multi-sale-body';
import { TreeData } from './multilevel-sale.model';
import * as MultilevelSaleService from './multilevel-sale.service';
import { useIntl } from 'react-intl';
import { NormalColumn, SortColumn } from '../../common-library/common-consts/const';
import { MultilevelSaleActionColumn } from './multilevel-action-column';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { GenerateCode } from '../product-type/product-type';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';

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
const moduleName = 'PRODUCT_PACKAGING.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_PACKAGING.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_PACKAGING.CREATE.TITLE';
const updateTitle = 'PRODUCT_PACKAGING.UPDATE.TITLE';
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

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, trigger, filterProps]);

  const columns = {
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
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({ id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN' })}`,
      ...SortColumn,
      classes: 'text-center',
    },

    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
      formatter: MultilevelSaleActionColumn,
      formatExtraData: {
        intl,

        onDelete: (entity: any) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
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
      data: entities,
      prop: {
        columns: columns,
        total: 2,
        loading: loading,
        paginationParams: paginationProps,
        setPaginationParams: setPaginationProps,
        onSelectMany: setSelectedEntities,
        selectedEntities: selectedEntities,
      },
    },
  ];

  const modifyModel = [
    {
      title: '',
      data: {
        code: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'COMMON_COMPONENT.INPUT.PLACEHOLDER' }),
          label: intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.CODE_COLUMN' }),
          required: true,
          disabled: true,
        },
        name: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'COMMON_COMPONENT.INPUT.PLACEHOLDER',
          }),
          required: true,
          label: intl.formatMessage({ id: 'PRODUCT_PACKAGING.MASTER.TABLE.GRAM_COLUMN' }),
        },
        status: {
          type: 'boolean',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.STATUS' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.STATUS' }),
        },
      },
    },
  ];

  const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
      header: 'ĐƠN HÀNG',
    },
  };

  const allFormField: any = {
    ...GenerateAllFormField(modifyModel),
  };

  console.log(showEdit)

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
      <ModifyEntityDialog
        isShow={showCreate}
        entity={createEntity}
        onModify={(values) => {
          console.log(values)
          console.log(editEntity)
          if (editEntity) {
            add({parentId: editEntity._id, ...ConvertStatusToString(values)})
          } else {
            add(ConvertStatusToString(values))
          }
        }}
        title={createTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowCreate(false);
        }}
        autoFill={{
          field: 'code',
          data: GenerateCode(data),
        }}
        code={null}
        get={() => null}
        formPart={formPart}
        allFormField={allFormField}
        // validation={ProductPackagingSchema}
        error={error}
        homePage={homeURL}
      />
      <ModifyEntityDialog
        isShow={showEdit}
        entity={editEntity}
        onModify={(values) => {
          console.log(values)
          if (editEntity) {
            update({parentId: editEntity._id, ...ConvertStatusToString(values)})
          } else {
            update(ConvertStatusToString(values))
          }
        }}
        title={updateTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowEdit(false);
        }}
        code={null}
        get={() => null}
        formPart={formPart}
        allFormField={allFormField}
        // allFormButton={allFormButton}
        // validation={ProductPackagingSchema}
        error={error}
        autoFill={{
          field: 'code',
          data: GenerateCode(data),
        }}
        homePage={homeURL}
      />
      <MultiLevelSaleBody
        title="Cấp bán hàng"
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
          setDeleteEntity(entity);
          setShowDelete(true);
        }}
      />
    </React.Fragment>
  );
}

export default MultilevelSale;
