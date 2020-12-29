import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';


import {ConvertToTreeNode, InitMasterProps} from "../../common-library/helpers/common-function";

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import {AgencyModel} from './agency.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';

import {DefaultPagination, iconStyle, NormalColumn, SortColumn} from '../../common-library/common-consts/const';


import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {Route, Switch, useHistory} from 'react-router-dom';
import * as MultilevelSaleService from '../multilevel-sale/multilevel-sale.service';
import * as RoleService from './helpers/role.service';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetailDialog,
  SearchModel
} from "../../common-library/common-types/common-type";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {GetCity, GetDistrict, GetState} from "../address/address.service";
import EntityCrudPage from "../../common-library/common-components/entity-crud-page";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import AddIcon from "@material-ui/icons/Add";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {GetLots, GetSubLots} from "../land-lot/land-lot.service";

const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';


function AgencyPage() {
  const history = useHistory();
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
    add, update, get, deleteMany, deleteFn, getAll, refreshData,
  } = InitMasterProps<AgencyModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });
  
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);
  
  const columns = useMemo(() => {
    return {
      code: {
        dataField: 'code',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.CODE_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      name: {
        dataField: 'name',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.NAME_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      storeLevel: {
        dataField: 'storeLevel.name',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.STORE_LEVEL_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      address: {
        dataField: 'address',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
        formatter: (address: any, row: any, rowIndex: number) => {
          const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
          return (<>{addressString}</>);
        },
        ...NormalColumn,
        align: 'center',
      },
      status: {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.STATUS_COLUMN'})}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.ACTION_COLUMN'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: AgencyModel) => {
            get(entity);
            setShowDetail(true);
            setDetailEntity(entity);
          },
          onDelete: (entity: AgencyModel) => {
            setDeleteEntity(entity);
            setShowDelete(true);
          },
          onEdit: (entity: AgencyModel) => {
            history.push(`${window.location.pathname}/${entity._id}`);
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      },
    }
  }, []);
  
  
  const masterEntityDetailDialog: RenderInfoDetailDialog = useMemo((): RenderInfoDetailDialog => [
    {
      header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
      className: 'col-7',
      data: {
        code: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.CODE'},
        name: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.NAME'},
        address: {
          title: 'AGENCY.DETAIL_DIALOG.SHIPPING.ADDRESS',
          formatter: (address: any, row: any, rowIndex: number) => {
            const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
            return (<>{addressString}</>);
          }
        },
      },
    }, {
      header: 'EMPTY',
      className: 'col-5 pl-xl-15 pl-md-10 pl-5',
      data: {
        phone: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.PHONE_NUMBER'},
        status: {
          title: 'AGENCY.DETAIL_DIALOG.SHIPPING.STATUS',
          formatter: TickColumnFormatter
        },
      },
    },
    {
      header: 'AGENCY.DETAIL_DIALOG.OWNER.SUBTITLE',
      className: 'col-7',
      data: {
        fullName: {
          title: 'AGENCY.DETAIL_DIALOG.OWNER.FULL_NAME',
          keyField: 'owner.fullName'
        }, email: {
          title: 'AGENCY.DETAIL_DIALOG.OWNER.EMAIL',
          keyField: 'owner.email'
        }, phone: {
          title: 'AGENCY.DETAIL_DIALOG.OWNER.PHONE_NUMBER',
          keyField: 'owner.phone'
        },
      },
    }, {
      header: 'AGENCY.DETAIL_DIALOG.SHIPPING_ADDRESS',
      className: 'col-12',
      dataClassName: 'col-12',
      data: {
        shippingAddress: {
          keyField: 'shippingAddress',
          formatter: (addresses: any[], row: any, rowIndex: number) => {
            let address = addresses.find(address => address.isDefault);
            address = address ?? addresses[0]
            const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
            return (<>{addressString}<span style={{color: '#B5B5C3'}} className={'ml-5'}>
                                [{intl.formatMessage({id: 'AGENCY.VIEW.LABEL.DEFAULT_SHIPPING_ADDRESS'})}]
                              </span></>);
          },
        }
      },
    }
  ], []);
  const [state, setState] = useState<string | null | undefined>(null);
  const [city, setCity] = useState<string | null | undefined>(null);
  useEffect(() => {
    setState(editEntity?.address?.state);
    setCity(editEntity?.address?.city);
  }, [editEntity]);
  const getCity = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    console.log(state);
    return GetCity({queryProps: {...queryProps, state}, paginationProps})
  }, [state]);
  const getDistrict = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    console.log(city);
    return GetDistrict({queryProps: {...queryProps, city}, paginationProps})
  }, [city]);
  const searchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'AGENCY.MASTER.SEARCH.CODE',
    },
    name: {
      type: 'string',
      label: 'AGENCY.MASTER.SEARCH.NAME',
    },
    storeLevel: {
      type: 'tree-select',
      label: 'AGENCY.MASTER.SEARCH.STORE_LEVEL',
      onSearch: ({queryProps, sortList, paginationProps,}) => {
        return MultilevelSaleService.GetAll({queryProps}).then((e) => {
          return ConvertToTreeNode(e.data);
        })
      },
    },
    state: {
      type: 'search-select',
      label: 'AGENCY.MASTER.SEARCH.STATE',
      name: 'address.state',
      onSearch: GetState,
      onChange: (value: any, {setFieldValue}: any) => {
        console.log(value);
        if (state != value) {
          setCity(null);
          setFieldValue('address.city', null);
          setFieldValue('address.district', null);
        }
        setState(value);
      },
    },
    city: {
      type: 'search-select',
      label: 'AGENCY.MASTER.SEARCH.CITY',
      name: 'address.city',
      onSearch: getCity,
      // selectField: 'code',
      onChange: (value: any, {setFieldValue}: any) => {
        if (city != value) {
          setFieldValue('address.district', null);
        }
        setCity(value);
      },
      disabled: (values: any) => {
        return !(values.address?.state);
      },
    },
    district: {
      type: 'search-select',
      label: 'AGENCY.MASTER.SEARCH.DISTRICT',
      name: 'address.district',
      onSearch: getDistrict,
      // selectField: 'code',
      disabled: (values: any) => {
        return !(values.address?.city);
      },
    },
  };
  
  
  const modifyModel = [
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.AGENCY_INFO'}).toUpperCase(),
      data: {
        code: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_CODE'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_CODE'}),
          // disabled: editEntity,
          disabled: true
        },
        name: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_NAME'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_NAME'}),
        },
        // storeLevel: {
        //   type: 'search-select',
        //   placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
        //   label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
        //   service: StoreLevelService,
        //   keyField: 'name'
        // },
        storeLevel: {
          type: 'tree-select',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL'}),
          service: MultilevelSaleService,
          keyField: 'name',
          required: true,
        },
        state: {
          type: 'stateSelect',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.STATE'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.STATE'}),
          required: true,
        },
        city: {
          type: 'citySelect',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.CITY'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.CITY'}),
          required: true,
        },
        district: {
          type: 'districtSelect',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.DISTRICT'}),
          required: true,
        },
        detailAddress: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.AGENCY_ADDRESS'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_ADDRESS'}),
        },
        status: {
          type: 'boolean',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.STATUS'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.STATUS'}),
        },
        phoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
          label: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
        },
        taxId: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.TAX_ID'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.TAX_ID'}),
        },
        image: {
          type: 'image',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.IMAGE'}),
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
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.USERNAME'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.USERNAME'}),
          disabled: !!editEntity,
        },
        ownerName: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.NAME'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.NAME'}),
        },
        ownerPhoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.OWNER_PHONE'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.OWNER_PHONE'}),
        },
        email: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.EMAIL'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.EMAIL'}),
        },
        gender: {
          type: 'option',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.GENDER'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.GENDER'}),
          required: true,
        },
        birthDay: {
          type: 'date-time',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.BIRTH_DAY'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.BIRTH_DAY'}),
          required: true,
        },
        roleName: {
          type: 'search-select',
          placeholder: 'AGENCY.EDIT.PLACEHOLDER.ROLE_NAME',
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.ROLE_NAME'}),
          service: RoleService,
          keyField: 'name',
          required: true,
        },
        avatar: {
          type: 'image',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.AVATAR'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AVATAR'}),
        },
      },
    },
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.SHIPPING_ADDRESS'}).toUpperCase(),
      data: {
        shippingAddress: {
          type: 'radioGroup', // type: 'array',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
          label: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
        },
        defaultShippingAddress: {
          type: 'display',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.DEFAULT_SHIPPING_ADDRESS'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.DEFAULT_SHIPPING_ADDRESS'}),
        }
      }
    }
  ];
  
  const group1 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'AGENCY.MODIFY.GENERAL_INFO',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    code: {
      _type: 'string',
      label: 'AGENCY.MODIFY.CODE',
      disabled: true,
    },
    name: {
      _type: 'string',
      required: true,
      label: 'AGENCY.MODIFY.NAME',
    },
    storeLevel: {
      _type: 'tree-select',
      required: true,
      label: 'AGENCY.MODIFY.STORE_LEVEL',
      onSearch: ({queryProps, sortList, paginationProps,}: any) => {
        return MultilevelSaleService.GetAll({queryProps}).then((e) => {
          return ConvertToTreeNode(e.data);
        })
      },
    },
    address: {
      _type: 'object',
      state: {
        _type: 'search-select',
        onSearch: GetState,
        disabled: (values: any) => {
          console.log(values)
        },
        onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
          if (state != value) {
            setCity(null);
            setFieldValue('address.city', '');
            setFieldTouched('address.city', false);
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
          setState(value);
        },
        required: true,
        label: 'AGENCY.MODIFY.STATE',
      },
      city: {
        _type: 'search-select',
        onSearch: getCity,
        // selectField: 'code',
        required: true,
        onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
          if (city != value) {
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
          setCity(value);
        },
        disabled: (values: any) => {
          return (values.address?.state === '');
        },
        label: 'AGENCY.MODIFY.CITY',
      },
      district: {
        _type: 'search-select',
        onSearch: getDistrict,
        // selectField: 'code',
        required: true,
        disabled: (values: any) => {
          return (values.address?.city === '');
        },
        label: 'AGENCY.MODIFY.DISTRICT',
      },
      detailAddress: {
        _type: 'string',
        required: true,
        label: 'AGENCY.MODIFY.ADDRESS',
      },
    },
    status: {
      _type: 'boolean',
      required: true,
      label: 'AGENCY.MODIFY.STATUS',
    },
    phoneNumber: {
      _type: 'string-number',
      required: true,
      label: 'AGENCY.MODIFY.PHONE_NUMBER',
    },
    taxId: {
      _type: 'string-number',
      required: true,
      label: 'AGENCY.MODIFY.TAX_NUMBER',
    },
    images: {
      _type: 'image',
      label: 'AGENCY.MODIFY.IMAGE',
    },
  }), [getCity, getDistrict]);
  
  const group2 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'AGENCY.MODIFY.OWNER_INFO',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    owner: {
      _type: 'object',
      username: {
        _type: 'string',
        label: 'AGENCY.MODIFY.USER_NAME',
        required: true,
      },
      fullName: {
        _type: 'string',
        required: true,
        label: 'AGENCY.MODIFY.DISPLAY_NAME',
      },
      phone: {
        _type: 'string-number',
        required: true,
        label: 'AGENCY.MODIFY.PHONE_NUMBER',
      },
      email: {
        _type: 'email',
        required: true,
        label: 'AGENCY.MODIFY.EMAIL',
      },
      gender: {
        _type: 'radio',
        required: true,
        options: [
          {label: 'AGENCY.MODIFY.GENDER_OPTION.MALE', value: '1'},
          {label: 'AGENCY.MODIFY.GENDER_OPTION.FEMALE', value: '0'}
        ],
        label: 'AGENCY.MODIFY.GENDER',
      },
      birthDay: {
        _type: 'date-time',
        required: true,
        label: 'AGENCY.MODIFY.DATE_OF_BIRTH',
      },
      role: {
        _type: 'search-select',
        required: true,
        label: 'AGENCY.MODIFY.ROLE',
        keyField: 'name',
        // onSearch: ({queryProps, paginationProps}: any): Promise<any> => {
        //   return GetRole({queryProps, paginationProps}, (t: any) => intl.formatMessage({id: t}))
        // },
        onSearch: RoleService.GetAll,
      },
      image: {
        _type: 'image',
        isArray: false,
        maxNumber: 1,
        label: 'AGENCY.MODIFY.REPRESENT_IMAGE',
      },
      shippingAddress: {
        _type: 'custom',
        component: ({values}: any) => {
          
          return (
            <div className={'col-12'}>
             
              <div className="modify-subtitle text-primary">
                {intl.formatMessage({id: 'AGENCY.MODIFY.SHIPPING_ADDRESS'}).toUpperCase()}
              </div>
              <button type="button" className="btn btn-primary" onClick={() => {
                setShowCreate(true);
              }}>
                <AddIcon style={iconStyle}/>
                {intl.formatMessage({id: 'AGENCY.MODIFY.ADD_SHIPPING_ADDRESS'})}
              </button>
            
            </div>
          )
        }
      }
    }
  }),[showCreate]);
  
  const actions: any = useMemo(() => ({
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-8 fixed-btn-width',
        label: 'Lưu',
        icon: <SaveOutlinedIcon/>,
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/shipping-agency',
        className: 'btn btn-outline-primary fixed-btn-width',
        label: 'Hủy',
        icon: <CancelOutlinedIcon/>,
      }
    }
  }), []);
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1,
      group2: group2,
    },
  }), [group1, group2]);
  const updateForm = useMemo((): ModifyForm => {
    return ({...createForm, _header: updateTitle});
  }, [createForm]);
  
  
  
  
  const [shippingAddressGroup, setShippingAddressGroup] = useState<ModifyInputGroup>({
    _subTitle: '',
    state: {
      _type: 'search-select',
      onSearch: GetState,
      onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
        if (state != value) {
          setCity(null);
          setFieldValue('address.city', '');
          setFieldTouched('address.city', false);
          setFieldValue('address.district', '');
          setFieldTouched('address.district', false);
        }
        setState(value);
      },
      required: true,
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.STATE',
    },
    city: {
      _type: 'search-select',
      onSearch: getCity,
      // selectField: 'code',
      required: true,
      onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
        if (city != value) {
          setFieldValue('address.district', '');
          setFieldTouched('address.district', false);
        }
        setCity(value);
      },
      disabled: (values: any) => {
        return (values?.state === '');
      },
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.CITY',
    },
    district: {
      _type: 'search-select',
      onSearch: getDistrict,
      // selectField: 'code',
      required: true,
      disabled: (values: any) => {
        return (values?.city === '');
      },
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.DISTRICT',
    },
    detailAddress: {
      _type: 'string',
      required: true,
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.ADDRESS',
    },
  });
  
  const createShippingAddressForm = useMemo((): ModifyForm => ({
    _header: 'AGENCY.MODIFY.SHIPPING_ADDRESS.CREATE_TITLE',
    panel1: {
      _title: '',
      group1: shippingAddressGroup
    },
  }), [shippingAddressGroup]);
  
  
  
  return (
    <Fragment>
      <ModifyEntityDialog
        formModel={createShippingAddressForm}
        show={showCreate}
        onModify={(...add) => {
          console.log(add)}}
        onHide={() => {
          setShowCreate(false);
        }}
      />
      <ModifyEntityDialog
        formModel={updateForm}
        show={showEdit}
        entity={editEntity}
        onModify={update}
        onHide={() => {
          setShowEdit(false);
        }}
        loading={loading}
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
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
        error={error}
      />
      
      <Switch>
        {/* <Redirect from="/agency/:code" to="/agency" /> */}
        <Route path="/agency" exact={true}>
          {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
          {/* initValue={filterProps}/> */}
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              history.push(`${window.location.pathname}/0000000`);
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
        <Route path="/agency/0000000">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={add}
            formModel={createForm}
            actions={actions}
            // validation={validationSchema}
          />
        </Route>
        {/*<Route path="/agency/:code">*/}
        {/*  {({ history, match }) => (*/}
        {/*    <EntityCrudPageAgency*/}
        {/*      entity={editEntity}*/}
        {/*      onModify={update}*/}
        {/*      onClickReturn={refreshData}*/}
        {/*      code={match && match.params.code}*/}
        {/*      get={AgencyService.GetById}*/}
        {/*      formPart={formPart}*/}
        {/*      allFormField={allFormField}*/}
        {/*      allFormButton={allFormButton}*/}
        {/*      validation={agencySchema}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Route>*/}
      </Switch>
      <MasterEntityDetailDialog
        title={detailDialogTitle}
        moduleName={moduleName}
        entity={detailEntity}
        onHide={() => {
          setShowDetail(false);
        }}
        show={showDetail}
        size={'lg'}
        renderInfo={masterEntityDetailDialog}/>
    </Fragment>
  );
}

export default AgencyPage;