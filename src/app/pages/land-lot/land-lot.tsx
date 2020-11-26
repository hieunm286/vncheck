import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Count, Create, Delete, DeleteMany, Get, GetAll, Update } from './land-lot.service';
import { LandLotModel } from './land-lot.model';
import { NormalColumn, SortColumn, StatusValue } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import { MasterBody } from '../../common-library/common-components/master-body';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from './helpers/modify-entity-dialog';
import { ModifyModel, SearchModel } from '../../common-library/common-types/common-type';
import {
  ConvertToTreeNode,
  GenerateAllFormField,
  InitMasterProps,
} from './helpers/common-function-land-lot';
import * as AgencyService from '../purchase-order/agency.service';
import * as LandLotService from './land-lot.service';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ModifyEntityPage from '../../common-library/common-components/modify-entity-page';
import ImageUploading from 'react-images-uploading';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { isArray, isNull } from 'lodash';
import MasterGoogleMap from '../../common-library/common-components/master-google-map';
import MasterMap from '../../common-library/common-components/master-google-map-other';
import * as Yup from 'yup';
import { stringOnChange, searchSelectOnChange } from './helpers/autofill';

const DataExample: any = [
  {
    _id: 'dlc1',
    code: 'zz_1',
    title: 'Đại lý cấp 1',
    child: [
      {
        _id: 'xxx-xxx',
        code: 'cccc',
        title: 'Đại lý cấp 2',
        parentId: 'dlc1',
      },
    ],
  },
  {
    _id: 'sieuthi',
    code: 'abcxyz',
    title: 'Siêu thị',
    child: [],
  },
  {
    _id: 'bigC',
    code: 'dcvf',
    title: 'Big C',
    child: [
      {
        _id: 'xxx-xxx4',
        code: 'cvfv',
        title: 'Đại lý cấp 4',
        parentId: 'bigC',
      },
      {
        _id: 'xxx-xxx5',
        code: 'dfs',
        title: 'Đại lý cấp 5',
        parentId: 'bigC',
      },
    ],
  },
];


function LandLot() {
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
  const createTitle = 'LAND_LOT.CREATE.TITLE';
  const updateTitle = 'LAND_LOT.EDIT.TITLE';
  const viewTitle = 'LAND_LOT.VIEW.TITLE';
  const history = useHistory();

  const PurchaseOrderSchema = Yup.object().shape({
  // code: Yup.string().required('abc'),
  lot: Yup.string()
    .required(intl.formatMessage({id:'LAND_LOT.EDIT.VALIDATION.LOT_CODE_EMPTY'}))
    .matches(/[a-zA-Z]/u, {
      message: intl.formatMessage({id: 'LAND_LOT.EDIT.VALIDATION.LOT_CODE_WRONG_FORMAT'})
    }),
  subLot: Yup.string()
    .required(intl.formatMessage({id: 'LAND_LOT.EDIT.VALIDATION.SUB_LOT_CODE_EMPTY'}))
    .matches(/[0-9]+/u, {
      message: intl.formatMessage({id: 'LAND_LOT.EDIT.VALIDATION.SUB_LOT_CODE_WRONG_FORMAT'})
    })
    // .test('len', intl.formatMessage({id: 'LAND_LOT.EDIT.VALIDATION.SUB_LOT_CODE_WRONG_FORMAT_LENGTH'}), (val: any) => val.length === 2),
});

  useEffect(() => {
    getAll(filterProps);

  }, [paginationProps, trigger, filterProps]);
  //TODO: change fields to get data from server
  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'LAND_LOT.MASTER.HEADER.CODE' })}`,
      formatter: (cell: any, row: any, rowIndex: any) => {
        return (<p>{row.lot + row.subLot}</p>);
      },
      ...SortColumn,
    },
    lot: {
      dataField: 'lot',
      text: `${intl.formatMessage({ id: 'LAND_LOT.MASTER.HEADER.LOT_CODE' })}`,
      ...SortColumn,
    },

    subLot: {
      dataField: 'subLot',
      text: `${intl.formatMessage({ id: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE' })}`,
      ...SortColumn,
    },
    // status: {
    //   dataField: 'status',
    //   text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN' })}`,
    //   ...SortColumn,
    //   formatter: (cell: any, row: any) =>
    //     row.status === StatusValue ? (
    //       <CheckCircleIcon style={{ color: '#1DBE2D' }} />
    //     ) : (
    //       <IndeterminateCheckBoxIcon />
    //     ),
    // },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN' })}`,
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
          get(entity);
          setShowEdit(true);
          setEditEntity(entity);
          // history.push(`${window.location.pathname}/${entity.code}`);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const masterEntityDetailDialog = [
    {
      header: '',
      data: {
        code: { title: 'LAND_LOT.MASTER.HEADER.CODE',
        formatter: (data: any, fields = ['lot', 'subLot']) => {
          return fields.map(field => {
            return data[field];
          }).join("");
        }},
        lot: { title: 'LAND_LOT.MASTER.HEADER.LOT_CODE' },
        subLot: { title: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE' },
      },
    },
    // {
    //   header: 'THÔNG TIN 2',
    //   data: {
    //     code: { title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' },
    //     agencyAddress: { title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
    //     phoneNumber: { title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' },
    //   },
    // },
  ];

  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'LAND_LOT.MASTER.PLACEHOLDER.CODE',
      label: 'LAND_LOT.MASTER.HEADER.CODE',
      service: LandLotService,
      keyField: 'code',
    },
    lot: {
      type: 'SearchSelect',
      placeholder: 'LAND_LOT.MASTER.PLACEHOLDER.LOT_CODE',
      label: 'LAND_LOT.MASTER.HEADER.LOT_CODE',
      service: LandLotService,
      keyField: 'lot',
    },
    subLot: {
      type: 'SearchSelect',
      placeholder: 'LAND_LOT.MASTER.PLACEHOLDER.SUB_LOT_CODE',
      label: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE',
      service: LandLotService,
      keyField: 'subLot',
    },
    // date: {
    //   type: 'Datetime',
    //   placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    // //   service: LandLotService,
    //   keyField: 'agencyAddress',
    // },
    // agency: {
    //   type: 'SearchSelect',
    //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
    //   label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
    // //   service: AgencyService,
    //   keyField: 'name',
    //   ref: true,
    // },
    // count: {
    //   type: 'number',
    //   placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    // //   service: LandLotService,
    //   keyField: 'count',
    // },
    // tree: {
    //   type: 'TreeSelect',
    //   placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   keyField: 'code',
    //   data: ConvertToTreeNode(DataExample),
    // },
    // tree2: {
    //   type: 'TreeSelect',
    //   placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   keyField: 'code',
    //   data: ConvertToTreeNode(DataExample),
    // },
  };

  const modifyModel = [
    {
      title: '',
      data: {
        code: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'LAND_LOT.MASTER.PLACEHOLDER.CODE' }),
          label: intl.formatMessage({ id: 'LAND_LOT.MASTER.HEADER.CODE' }),
          required: true,
          disabled: true,
        },
        lot: {
          type: 'select',
          placeholder: intl.formatMessage({ id: 'LAND_LOT.MASTER.PLACEHOLDER.LOT_CODE' }),
          required: true,
          label: intl.formatMessage({ id: 'LAND_LOT.MASTER.HEADER.LOT_CODE' }),
        },
        subLot: {
          type: 'select',
          placeholder: intl.formatMessage({
            id: 'LAND_LOT.MASTER.PLACEHOLDER.SUB_LOT_CODE',
          }),
          required: true,
          label: intl.formatMessage({ id: 'LAND_LOT.MASTER.HEADER.SUB_LOT_CODE' }),
        },
        // image: {
        //   type: 'image',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   label: 'Album 1',
        // },
        // image2: {
        //   type: 'image',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   label: 'Album 2',
        // },
        // agency: {
        //   type: 'object',
        //   name: {
        //     type: 'string',
        //     label: 'Name',
        //     placeholder: 'Name'
        //   },
        //   taxId: {
        //     type: 'string',
        //     label: 'Tax',
        //     placeholder: 'Tax'
        //   }
        // }
      },
    },
    // {
    //   title: 'Test222',
    //   data: {
    //     test1: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
    //       disabled: !!editEntity,
    //     },
    //     test2: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
    //     },
    //     test3: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({
    //         id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
    //       }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
    //     },
    //   },
    // },
  ];

  const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModel,
      header: 'ĐƠN HÀNG',
    },
    // form_2: {
    //   title: 'Thông tin quản trị',
    //   modifyModel: modifyModel_2,
    // },
  };

  const allFormField: any = {
    ...GenerateAllFormField(
      modifyModel,
    ),
  };

  const allFormButton: any = {
    save: {
      role: 'submit',
      type: 'submit',
      linkto: undefined,
      className: 'btn btn-primary mr-2',
      label: 'Lưu',
      icon: <SaveOutlinedIcon />,
    },
    cancel: {
      role: 'link-button',
      type: 'button',
      linkto: '/land-lot',
      className: 'btn btn-outline-primary mr-2',
      label: 'Hủy',
      icon: <CancelOutlinedIcon />,
    },
    test: {
      role: 'button',
      type: 'button',
      linkto: undefined,
      className: 'btn btn-outline-primary',
      label: 'Test',
      icon: <CancelOutlinedIcon />,
    },
  };

  const location = {
    latitude: 21.027763,
    longitude: 105.83416,
  };

  return (
    <Fragment>
      <MasterEntityDetailDialog
        title={viewTitle}
        moduleName={moduleName}
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
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
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
      <ModifyEntityDialog
        autoFill=''
        formPart={formPart}
        allFormField={allFormField}
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={modifyModel}
        validation={PurchaseOrderSchema}
        onHide={() => {
          setShowCreate(false);
        }}
      />
      <ModifyEntityDialog
        autoFill=''
        formPart={formPart}
        allFormField={allFormField}
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        modifyModel={modifyModel}
        validation={PurchaseOrderSchema}
        onHide={() => {
          setShowEdit(false);
        }}
      />
      <Switch>
        <Redirect from="/land-lot/edit" to="/land-lot" />
        <Route path="/land-lot">
          <MasterHeader
            title={headerTitle}
            onSearch={setFilterProps}
            searchModel={purchaseOrderSearchModel}
            stringOnChange={stringOnChange}
            searchSelectOnChange={searchSelectOnChange}
            initValue={{
              code: '',
              lot: '',
              subLot: '',
              // agencyAddress: '',
              // agency: null,
              // date: '',
              // count: 1,
              // tree: undefined,
              // tree2: undefined,
            }}
          />
          <MasterBody
            onCreate={() => {
              setCreateEntity(null);
              setEditEntity(null);
              setShowCreate(true);
              // history.push(`${window.location.pathname}/new`);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={entities}
            total={total}
            columns={columns as any}
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
