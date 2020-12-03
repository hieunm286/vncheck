import React, { useEffect, Fragment, useState } from "react";
import {useIntl} from 'react-intl';


import {InitMasterProps} from "../../common-library/helpers/common-function-promise";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import { AgencyModel } from './agency.model';
import { MasterHeader } from "../../common-library/common-components/master-header";
import { MasterBody } from "../../common-library/common-components/master-body";
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';

import { DefaultPagination, NormalColumn, SortColumn } from '../../common-library/common-consts/const';

import {ModifyModel, SearchModel} from "../../common-library/common-types/common-type";

import { DeleteEntityDialog } from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import * as Yup from "yup";
import {  MasterEntityDetailAgency } from "../../common-library/common-components/master-entity-detail-dialog-agency";
import { getUserById } from "../account/_redux/user-crud";
import * as agencyTypeService from "../agency-type-2/agency-type.service";
import ModifyEntityPageAgency from './helpers/modify-entity-page-agency';
import EntityCrudPageAgency from "./helpers/entity-crud-page-agency";
import * as AgencyService from './agency.service';
import { ConvertStatusToBoolean, ConvertStatusToString, ConvertToTreeNode, GenerateAllFormField } from '../../common-library/helpers/common-function';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { convertToServer } from "./helpers/convert-data-model";
import * as StoreLevelService from '../multilevel-sale/multilevel-sale.service';
import * as RoleService from './helpers/role.service';

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
    error,
    setError,
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
  }, [paginationProps, trigger, filterProps]);

  const moduleName = 'AGENCY.MODULE_NAME';
  const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
  const detailTitle = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE.2';
  // const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  // const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';
  const history = useHistory();
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
      formatter: (cell: any, row: any) => row.status === "1" ?
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
              // setEditEntity(ConvertStatusToBoolean(res.data));
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
          // get(entity);
          setEditEntity(ConvertStatusToBoolean(entity));
          history.push(`${window.location.pathname}/${entity._id}`) // setShowEdit(true);
          // history.push(`${entity._id}`) // setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];

  const agencySearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'AGENCY.MASTER.HEADER.AGENCY_CODE.PLACEHOLDER',
      label: 'AGENCY.MASTER.HEADER.AGENCY_CODE.LABEL',
      keyField: 'code'
    }, 
    name: {
      type: 'string',
      placeholder: 'AGENCY.MASTER.HEADER.AGENCY_NAME.PLACEHOLDER',
      label: 'AGENCY.MASTER.HEADER.AGENCY_NAME.LABEL',
      keyField: 'name'
    }, 
    storeLevel: {
      type: 'TreeSelect',
      placeholder: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL',
      label: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL',
      keyField: 'name'
    }, 
    state: {
      type: 'string',
      placeholder: 'AGENCY.EDIT.PLACEHOLDER.STATE',
      label: 'AGENCY.EDIT.LABEL.STATE',
      keyField: 'name'
    }, 
    city: {
      type: 'string',
      placeholder: 'AGENCY.EDIT.PLACEHOLDER.CITY',
      label: 'AGENCY.EDIT.LABEL.CITY',
      keyField: 'name'
    },
    district: {
      type: 'string',
      placeholder: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT',
      label: 'AGENCY.EDIT.LABEL.DISTRICT',
      keyField: 'name'
    }
  };



  const agencySchema = Yup.object<AgencyModel>().shape({
    // code: Yup.string().required('Vui lòng nhập mã đơn vị'),
    // agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
    // phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),

    code: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_CODE.REQUIRED'}))
      // .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_CODE.MAX_LENGTH_EXCEEDED'}))
      ,
    name: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_NAME.REQUIRED'}))
      .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_NAME.MAX_LENGTH_EXCEEDED'})),
    storeLevel: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.STORE_LEVEL.REQUIRED'})),
    state: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.STATE.REQUIRED'})),
    city: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.CITY.REQUIRED'})),
    district: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.DISTRICT.REQUIRED'})),
    detailAddress: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.ADDRESS.REQUIRED'})),
    status: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.STATUS.REQUIRED'})),
    phoneNumber: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.PHONE_NUMBER.REQUIRED'})),
    taxId: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.TAX_ID.REQUIRED'}))
      .max(100, intl.formatMessage({id: 'AGENCY.VALIDATION.TAX_ID.MAX_LENGTH_EXCEEDED'})),
    // image: Yup.string().required(intl.formatMessage({id: 'AGENCY.VALIDATION.AGENCY_CODE.REQUIRED'})),


    username: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.USER_NAME.REQUIRED'}))
      .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.USER_NAME.MAX_LENGTH_EXCEEDED'})),
    ownerName: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.OWNER_NAME.REQUIRED'}))
      .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.OWNER_NAME.MAX_LENGTH_EXCEEDED'})),
    ownerPhoneNumber: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.OWNER_PHONE_NUMBER.REQUIRED'}))
      // .test('len', 'AGENCY.VALIDATION.OWNWER_PHONE_NUMBER.WRONG_EXACT_LENGTH', (val: any) => {return val.length !== null && val.length !== undefined && val.length === 10 }),
      ,
    email: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.EMAIL.REQUIRED'}))
      .max(255, intl.formatMessage({id: 'AGENCY.VALIDATION.EMAIL.MAX_LENGTH_EXCEEDED'})),
    gender: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.GENDER.REQUIRED'})),
    birthDay: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.BIRTHDAY.REQUIRED'})),
    roleName: Yup.string()
      .required(intl.formatMessage({id: 'AGENCY.VALIDATION.ROLE_NAME.REQUIRED'})),
    // avatar: Yup.string().required(intl.formatMessage({id: 'AGENCY.VALIDATION.AVATAR.REQUIRED'})),
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
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.AGENCY_INFO'}).toUpperCase(),
      data: {
        code: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_CODE' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_CODE' }),
          disabled: editEntity,
        },
        name: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_NAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_NAME' }),
        },
        // storeLevel: {
        //   type: 'SearchSelect',
        //   placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
        //   label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
        //   service: StoreLevelService,
        //   keyField: 'name'
        // },
        storeLevel: {
          type: 'TreeSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
          service: StoreLevelService,
          keyField: 'name',
        },
        state: {
          type: 'stateSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.STATE' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.STATE' }), 
        },
        city: {
          type: 'citySelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.CITY' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.CITY' }), 
        },
        district: {
          type: 'districtSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.DISTRICT' }), 
        },
        detailAddress: {
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
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.IMAGE' }),
        },
        // image2: {
        //   type: 'image',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   label: 'Album 2',
        // },
      }
    },
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.AGENCY_OWNER_INFO'}).toUpperCase(),
      data: {
        username: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.USERNAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.USERNAME' }),
          disabled: !!editEntity,
        },
        ownerName: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.NAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.NAME' }),
        },
        ownerPhoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.OWNER_PHONE' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.OWNER_PHONE' }),
        },
        email: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.EMAIL' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.EMAIL' }),
        },
        gender: {
          type: 'option',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.GENDER' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.GENDER' }),
        },
        birthDay: {
          type: 'Datetime',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.BIRTH_DAY' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.BIRTH_DAY' }),
        },
        roleName: {
          type: 'SearchSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.ROLE_NAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.ROLE_NAME' }),
          service: RoleService,
          keyField: 'name'
        },
        avatar: {
          type: 'image',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.AVATAR' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AVATAR' }),
        },
      },
    },
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.SHIPPING_ADDRESS'}).toUpperCase(),
      data: {
        shippingAddress: {
          type: 'radioGroup', // type: 'array',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
          label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        },
        defaultShippingAddress: {
          type: 'display',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.DEFAULT_SHIPPING_ADDRESS' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.DEFAULT_SHIPPING_ADDRESS' }),
        }
      }
    }

    // {

    // }
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

  const allFormButton: any = {
    save: {
      role: 'submit',
      type: 'submit',
      linkto: undefined,
      className: 'btn btn-primary mr-2',
      label: intl.formatMessage({id: 'AGENCY.EDIT.BUTTON.SAVE'}),
      icon: <SaveOutlinedIcon />,
    },
    cancel: {
      role: 'popupButton',
      type: 'button',
      // linkto: '/agency',
      className: 'btn btn-outline-primary mr-2',
      label: intl.formatMessage({id: 'AGENCY.EDIT.BUTTON.CANCEL'}),
      icon: <CancelOutlinedIcon />,
    },
  };

  const formPart: any = {
    form_1: {
      // title: 'Thông tin đơn vị bán hàng',
      modifyModel: modifyModel,
      // header: 'THÔNG TIN ĐƠN VỊ BÁN HÀNG',
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
    ...GenerateAllFormField(modifyModel)
  };

  // const mock_entity: AgencyModel

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
        loading={loading}
        error={error}
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
        error={error}
      />
      {/* <ModifyEntityDialog
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={oldModifyModel}
        // validationModel={agencySchema}
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
        // validationModel={agencySchema}
        onHide={() => {
          setShowEdit(false);
        }}
      /> */}

      <Switch>
        {/* <Redirect from="/purchase-order/edit" to="/purchase-order" /> */}
        <Route path="/agency" exact={true}>
          {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
              {/* initValue={filterProps}/> */}
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            onReset={() => {
              setPaginationProps(DefaultPagination)
              setFilterProps(undefined)
            }}
            searchModel={agencySearchModel}
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
            title={bodyTitle}
            onCreate={() => {
              setEditEntity(null);
              setCreateEntity(null);
              history.push('/agency/new');// setShowCreate(true);
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
        <Route path="/agency/new">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={createEntity}
              onModify={(values) => {
                add(ConvertStatusToString(convertToServer(values)))
              }}
              // title={updateTitle}
              //  modifyModel={modifyModel}
              // reduxModel="purchaseOrder"
              code={match && match.params.id}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={agencySchema}
            />
          )}
        </Route>
        <Route path="/agency/:code">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={editEntity}
              onModify={(values) => {
                update(ConvertStatusToString(convertToServer(values)))
              }}
              // title={updateTitle}
              //  modifyModel={modifyModel}
              // reduxModel="purchaseOrder"
              code={match && match.params.code}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={agencySchema}
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