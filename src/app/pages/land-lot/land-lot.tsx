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
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { ModifyModel, SearchModel } from '../../common-library/common-types/common-type';
import {
  ConvertToTreeNode,
  GenerateAllFormField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
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

// const validateSchema = {
//   code: {
//     required: true,
//   },
//   phone: {
//     required: true,

//   }
// }

// const ValidationByNguyenMinhHieu = (data: any, validateSchema: any) => {

//   const _validationResult = {}

//   Object.keys(validateSchema).map(key => {
//     switch(validateSchema[key])
//   })
// }

const PurchaseOrderSchema = Yup.object().shape({
  // code: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Code không được để trống'),
  // // dateofbirth: Yup.mixed()
  // //   .nullable(false)
  // //   .required('Date of Birth is required'),
  // agencyAddress: Yup.string().required('Vui lòng nhập Agency Address'),
  phoneNumber: Yup.string()
    .required('Last name không được để trống')
    .matches(/[0-9]$/u, {
      message: 'Vui lòng nhập tên đúng định dạng',
    }),
  // time: Yup.date().required('Vui lòng nhập date'),
  // time2: Yup.date().required('Vui lòng nhập date'),
  // quantity: Yup.number().required('Vui lòng nhập số lượng'),
  agency: Yup.object().shape({
    name: Yup.string().required('Name ko đc để trống'),
    taxId: Yup.string().required('TaxId ko đc để trống'),
  })
});

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

  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'PURCHASE_ORDER.MASTER.HEADER.TITLE';
  const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const history = useHistory();

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, trigger, filterProps]);

  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' })}`,
      ...SortColumn,
    },
    agencyAddress: {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' })}`,
      ...SortColumn,
    },

    phoneNumber: {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' })}`,
      ...SortColumn,
    },
    status: {
      dataField: 'status',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN' })}`,
      ...SortColumn,
      formatter: (cell: any, row: any) =>
        row.status === StatusValue ? (
          <CheckCircleIcon style={{ color: '#1DBE2D' }} />
        ) : (
          <IndeterminateCheckBoxIcon />
        ),
    },
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
          // setShowEdit(true);
          setEditEntity(entity);
          history.push(`${window.location.pathname}/${entity.code}`);
        },
      },
      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  };

  const masterEntityDetailDialog = [
    {
      header: 'THÔNG TIN 1',
      data: {
        code: { title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' },
        agencyAddress: { title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
        phoneNumber: { title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' },
      },
    },
    {
      header: 'THÔNG TIN 2',
      data: {
        code: { title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' },
        agencyAddress: { title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
        phoneNumber: { title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' },
      },
    },
    {
      header: 'THÔNG TIN 3',
      data: {
        code: { title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' },
        agencyAddress: { title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
        phoneNumber: { title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' },
      },
    },
  ];

  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    //   service: LandLotService,
      keyField: 'code',
    },
    agencyAddress: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   service: LandLotService,
      keyField: 'agencyAddress',
    },
    date: {
      type: 'Datetime',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   service: LandLotService,
      keyField: 'agencyAddress',
    },
    agency: {
      type: 'SearchSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
    //   service: AgencyService,
      keyField: 'name',
      ref: true,
    },
    count: {
      type: 'number',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    //   service: LandLotService,
      keyField: 'count',
    },
    tree: {
      type: 'TreeSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      keyField: 'code',
      data: ConvertToTreeNode(DataExample),
    },
    tree2: {
      type: 'TreeSelect',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      keyField: 'code',
      data: ConvertToTreeNode(DataExample),
    },
  };

  const modifyModel = [
    {
      title: 'Test',
      data: {
        // code: {
        //   type: 'string',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   required: true,
        //   disabled: !!editEntity,
        // },
        // agencyAddress: {
        //   type: 'string',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
        //   required: true,
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
        // },
        phoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
          }),
          required: true,
          label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
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
        agency: {
          type: 'object',
          name: {
            type: 'string',
            label: 'Name',
            placeholder: 'Name'
          },
          taxId: {
            type: 'string',
            label: 'Tax',
            placeholder: 'Tax'
          }
        }
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

  const modifyModel_3 = [
    {
      time: {
        type: 'Datetime',
        placeholder: 'Thời gian thu hoạch',
        label: 'Thời gian thu hoạch',
        required: true,
      },
      time2: {
        type: 'Datetime',
        placeholder: 'Thời gian thu hoạch2',
        label: 'Thời gian thu hoạch2',
      },
      quantity: {
        type: 'number',
        label: 'Sản lượng thu hoạch (kg)',
        placeholder: 'Sản lượng',
        required: true,
      },
    },
  ];

  const modifyModel_2 = [
    {
      director: {
        type: 'string',
        label: 'Thông tin giám đốc',
        placeholder: 'Thông tin giám đốc',
      },
      leader: {
        type: 'string',
        label: 'Tổ trưởng gieo trồng',
        placeholder: 'Tổ trưởng gieo trồng',
      },
    },
  ];

  const modifyModel_4 = [
    {
      test4: {
        type: 'string',
        label: 'Test 4',
        placeholder: 'Test 4',
      },
      test5: {
        type: 'string',
        label: 'Test 5',
        placeholder: 'Test 5',
      },
    },
    {
      test6: {
        type: 'string',
        label: 'Test 6',
        placeholder: 'Test 6',
      },
      test7: {
        type: 'string',
        label: 'Test 7',
        placeholder: 'Test 7',
      },
      test8: {
        type: 'string',
        label: 'Test 8',
        placeholder: 'Test 8',
      },
    },
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
    // form_3: {
    //   title: 'Thông tin thu hoạch',
    //   modifyModel: modifyModel_3,
    // },
    // form_4: {
    //   title: 'Thông tin test',
    //   modifyModel: modifyModel_4,
    // },
    // form_5: {
    //   title: "xxx",
    //   modifyModel: modifyModel_2
    // }
  };

  const allFormField: any = {
    ...GenerateAllFormField(
      modifyModel,
      // modifyModel_3,
      // , modifyModel_2, modifyModel_3, modifyModel_4
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
      linkto: '/purchase-order',
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
      {/* <ModifyEntityDialog
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowCreate(false);
        }}
      />*/}
      {/* <ModifyEntityDialog
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        modifyModel={modifyModel}
        onHide={() => {
          setShowEdit(false);
        }}
      /> */}
      <Switch>
        <Redirect from="/purchase-order/edit" to="/purchase-order" />

        <Route path="/purchase-order/new">
          {/* <ModifyEntityPage
            entity={createEntity}
            onModify={add}
            title={createTitle}
            modifyModel={modifyModel}
            reduxModel="purchaseOrder"
            code={null}
            get={() => null}
          /> */}
          <EntityCrudPage
            entity={createEntity}
            onModify={add}
            title={createTitle}
            //  modifyModel={modifyModel}
            reduxModel="purchaseOrder"
            code={null}
            get={() => null}
            formPart={formPart}
            allFormField={allFormField}
            allFormButton={allFormButton}
            validation={PurchaseOrderSchema}
          />
        </Route>
        <Route path={`/purchase-order/:code`}>
          {({ history, match }) => (
            // <ModifyEntityPage
            //   entity={editEntity}
            //   onModify={update}
            //   title={updateTitle}
            //   modifyModel={modifyModel}
            //   reduxModel="purchaseOrder"
            //   code={match && match.params.code}
            //   get={LandLotService.GetById}
            // />
            <EntityCrudPage
              entity={editEntity}
              onModify={update}
              title={updateTitle}
              //  modifyModel={modifyModel}
              reduxModel="purchaseOrder"
              code={match && match.params.code}
              get={LandLotService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={PurchaseOrderSchema}
            />
          )}
        </Route>
        <Route path="/purchase-order">
          <MasterHeader
            title={headerTitle}
            onSearch={setFilterProps}
            searchModel={purchaseOrderSearchModel}
            initValue={{
              code: null,
              agencyAddress: null,
              agency: null,
              date: '',
              count: 15,
              tree: undefined,
              tree2: undefined,
            }}
          />
          <MasterBody
            onCreate={() => {
              setCreateEntity(null);
              setEditEntity(null);
              // setShowCreate(true);
              history.push(`${window.location.pathname}/new`);
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

          <MasterGoogleMap location={location} />

          {/* <MasterMap /> */}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default LandLot;