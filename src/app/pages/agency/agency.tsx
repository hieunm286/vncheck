import React, { useEffect, Fragment } from "react";
import {useIntl} from 'react-intl';


import {InitMasterProps} from "../../common-library/helpers/common-function-promise";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import { AgencyModel } from './agency.model';
import { MasterHeader } from "../../common-library/common-components/master-header";
import { MasterBody } from "../../common-library/common-components/master-body";
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';

import { NormalColumn, SortColumn } from '../../common-library/common-consts/const';

import {ModifyModel, SearchModel} from "../../common-library/common-types/common-type";

import { DeleteEntityDialog } from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import * as Yup from "yup";
import {  MasterEntityDetailAgency } from "../../common-library/common-components/master-entity-detail-dialog-agency";
import { getUserById } from "../account/_redux/user-crud";
import * as agencyTypeService from "../agency-type-2/agency-type.service";
import ModifyEntityPage from '../../common-library/common-components/modify-entity-page';
import EntityCrudPageAgency from "../../common-library/common-components/entity-crud-page-agency";
import * as AgencyService from './agency.service';
import { ConvertToTreeNode, GenerateAllFormField } from '../../common-library/helpers/common-function';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

function AgencyPage() {

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
    add, update, get, deleteMany, deleteFn, getAll, refreshData
  } = InitMasterProps<AgencyModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });

  // const mock_entities: AgencyModel[] = [
  //   {
  //       _id: "",
  //       // address: {state: "Sample State", city: "Sample City", district: "Sample District", address: "Sample address"},
  //       address: "",
  //       code: "casual_magenta",
  //       imagePath: ["sdassad"],
  //       name: "scattered gold",
  //       owner: "5fa0df3cc8a04103d0876308",
  //       phone: "(+84)388944118",
  //       // shippingAddress: [{state: "Sample State", city: "Sample City", district: "Sample District", address: "Sample address", isDefault: true}],
  //       shippingAddress: "",
  //       status: true,
  //       taxId: "9187609710",
  //       type: "5fa0df3dc8a04103d0876331"
  //   }
  // ]

  useEffect(() => {
    getAll(filterProps);
    // setEntities(mock_entities);
    // setEntities([{}]);
    console.log(entities);
  }, [paginationProps, trigger, filterProps]);

  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
  const detailTitle = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE.2';
  const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const history = useHistory();
  console.log(entities);
  const columns = [
    {
      dataField: 'ordinal',
      text: '#',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: {paddingTop: 20},
    },    {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL'})}`,
      ...SortColumn
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'address',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => {
        console.log(row)
        return (
        <p>{row.address.district + ',' + row.address.city + ',' + row.address.state}</p> )
      },
      ...SortColumn
    },
    
    {
      dataField: 'phone',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'})}`,
      ...SortColumn,
      formatter: (cell: any, row: any) => row.status === "true" ?
        (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<CheckCircleIcon style={{color: '#C4C4C4'}}/>),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: AgencyModel) => {
          get(entity)
            .then(res => {
              setDetailEntity(res.data);
              setEditEntity(res.data);
              // Promise.all(
              //   [getUserById(res.data.owner),
              //     agencyTypeService.Get(
              //       {_id: res.data.type, code: '', name: '', status: true}
              //     )
              //   ]
              // ).then(values => {
              //   const agency = res.data;
              //   const agencyOwner = values[0].data;
              //   const agencyType = values[1].data;
              //   setDetailEntity(
              //     { ...agency, owner: agencyOwner, type: agencyType }
              //   );
              //   setEditEntity(
              //     { ...agency, owner: agencyOwner, type: agencyType }
              //   );
              // });
            })
            .catch(error => {
              console.log(error);
            });
          setShowDetail(true);
        },
        onDelete: (entity: AgencyModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: AgencyModel) => {
          // setEditEntity(entity);
          get(entity);
          setEditEntity(entity);
          history.push(`agency/${entity._id}`) // setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];

  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      keyField: 'code'
    }, name: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
      keyField: 'name'
    },
  };



  const agencySchema = Yup.object<AgencyModel>().shape({
    // code: Yup.string().required('Vui lòng nhập mã đơn vị'),
    // agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
    // phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  });

  const oldModifyModel: ModifyModel = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    },
    name: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
    },
    phone: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
    },
    status: {
      type: 'string',
      placeholder: 'AGENCY.MASTER.TABLE.STATUS_COLUMN',
      label: 'AGENCY.MASTER.TABLE.STATUS_COLUMN'
    },
    taxId: {
      type: 'string',
      placeholder: 'AGENCY.MASTER.TABLE.TAXID_COLUMN',
      label: 'AGENCY.MASTER.TABLE.TAXID_COLUMN'
    },
    type: {
      type: 'string',
      placeholder: 'AGENCY.MASTER.TABLE.AGENCY_TYPE',
      label: 'AGENCY.MASTER.TABLE.AGENCY_TYPE'
    },
    // owner: "5f8aae8710bd6f1624b533c7",
    "owner.username": {
      type: 'string',
      placeholder: 'AGENCY.MASTER.TABLE.OWNER',
      label: 'AGENCY.MASTER.TABLE.OWNER'
    },
    // shippingAddress: [],
    shippingAddress:  {
      type: 'string',
      placeholder: 'AGENCY.MASTER.TABLE.SHIPING_ADDRESS',
      label: 'AGENCY.MASTER.TABLE.SHIPPING_ADDRESS'
    },
    imagePath: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.IMAGE_PATH',
      label: 'PURCHASE_ORDER.MASTER.TABLE.IMAGE_PATH',
    },
    address: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
      label: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN',
    },

  };

  const masterEntityDetailDialog = [
    {
      header: 'AGENCY.MASTER.HEADER.AGENCY_INFO',
      data: [
        { keyField: 'code', title: 'AGENCY.VIEW.LABEL.AGENCY_CODE' },
        { keyField: 'name', title: 'AGENCY.VIEW.LABEL.AGENCY_NAME' },
        { keyField: ['address.district', 'address.city', 'address.state'], title: 'AGENCY.VIEW.LABEL.AGENCY_ADDRESS' },
        { keyField: 'phone', title: 'AGENCY.VIEW.LABEL.PHONE' },
        // { keyField: 'taxId', title: 'AGENCY.VIEW.LABEL.AGENCY_NAME.TAX_ID' },
        { keyField: 'status', title: 'AGENCY.VIEW.LABEL.AGENCY_NAME.STATUS' },
        // { keyField: 'type.name', title: 'AGENCY_TYPE.MASTER.TABLE.NAME' },
        // { keyField: 'type.code', title: 'AGENCY_TYPE.MASTER.TABLE.CODE' },
      ]
    },
    {
      header: 'AGENCY.MASTER.HEADER.AGENCY_OWNER_INFO',
      data: [
        { keyField: 'owner.username', title: 'AGENCY.VIEW.LABEL.OWNER_NAME' },
        { keyField: 'owner.email', title: 'AGENCY.VIEW.LABEL.OWNER_EMAIL' },
        { keyField: 'owner.phone', title: 'AGENCY.VIEW.LABEL.OWNER_PHONE' },
      ]
    },
    {
      header: 'AGENCY.VIEW.LABEL.SHIPPING_ADDRESS',
      data: [
        { keyField: 'shippingAddress', title: 'AGENCY.VIEW.LABEL.SHIPPING_ADDRESS' },
      ]
    },  
    
 
  ];

  const modifyModel = [
    {
      code: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_CODE' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_CODE' }),
        disabled: !editEntity,
      },
      name: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_NAME' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_NAME' }),
      },
      type: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
      },
      state: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.STATE' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.STATE' }), 
      },
      city: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.CITY' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.CITY' }), 
      },
      district: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.DISTRICT' }), 
      },
      address: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.AGENCY_ADDRESS' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_ADDRESS' }),
      },
      status: {
        type: 'boolean',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.STATUS' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.STATUS' }),
      },
      phoneNumber: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
      taxId: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.TAX_ID' }),
        label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.TAX_ID' }),
      },
      image: {
        type: 'image',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        label: 'Album 1',
      },
      // image2: {
      //   type: 'image',
      //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
      //   label: 'Album 2',
      // },
    },
    {
      username: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        disabled: !!editEntity,
      },
      name: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
      },
      ownerPhone: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
      email: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
      gender: {
        type: 'option',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
      birthDay: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
      role: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
      avatar: {
        type: 'image',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      },
    },
    {
      shippingAddress: {
        type: 'string',
        placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
      }
    }
  ];

  const modifyModel_3 = [{
    time: {
      type: 'Datetime',
      placeholder: 'Thời gian thu hoạch',
      label: 'Thời gian thu hoạch',
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
    },
  }];

  const modifyModel_2 = [{
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
  }];

  const modifyModel_4 = [
    {
      test4: {
        type: 'string',
        label: 'Test 4',
        placeholder: 'Test 4'
      },
      test5: {
        type: 'string',
        label: 'Test 5',
        placeholder: 'Test 5'
      }
    },
    {
      test6: {
        type: 'string',
        label: 'Test 6',
        placeholder: 'Test 6'
      },
      test7: {
        type: 'string',
        label: 'Test 7',
        placeholder: 'Test 7'
      },
      test8: {
        type: 'string',
        label: 'Test 8',
        placeholder: 'Test 8'
      }
    }
  ]

  const formPart: any = {
    form_1: {
      title: 'Thông tin đơn vị bán hàng',
      modifyModel: modifyModel,
      header: 'THÔNG TIN ĐƠN VỊ BÁN HÀNG',
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
    //   title: "Thông tin test",
    //   modifyModel: modifyModel_4
    // },
    // form_5: {
    //   title: "xxx",
    //   modifyModel: modifyModel_2
    // }
  };

  const allFormField: any = {
    ...GenerateAllFormField(modifyModel, modifyModel_2, modifyModel_3, modifyModel_4)
  };

  return (
    <Fragment>


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
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={oldModifyModel}
        validationModel={agencySchema}
        onHide={() => {
          setShowCreate(false);
        }}
      />
      <ModifyEntityDialog
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        modifyModel={oldModifyModel}
        validationModel={agencySchema}
        onHide={() => {
          setShowEdit(false);
        }}
      />

      <Switch>
        {/* <Redirect from="/purchase-order/edit" to="/purchase-order" /> */}
        <Route path="/agency" exact={true}>
          {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
              {/* initValue={filterProps}/> */}
          <MasterBody
            onCreate={() => {
              setCreateEntity(null);
              setShowCreate(true);
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
          />
        </Route>
        <Route path="/agency/:id">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={editEntity}
              onModify={update}
              // title={updateTitle}
              //  modifyModel={modifyModel}
              // reduxModel="purchaseOrder"
              code={match && match.params.id}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              // allFormButton={allFormButton}
            />
          )}
        </Route>
      </Switch>

      <MasterEntityDetailAgency
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
          setShowDetail(false);
        }}
        title={detailTitle}
      />
    </Fragment>
  );
}

export default AgencyPage;