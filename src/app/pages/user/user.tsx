import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, HomePageURL, iconStyle, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
  ModifyPanel,
  RenderInfoDetail,
  SearchModel
} from '../../common-library/common-types/common-type';
import {InitMasterProps, InitValues, RoleArrayToObject,} from '../../common-library/helpers/common-function';
import {Route, Switch, useHistory} from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {UserModel} from './user.model';
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {GetCity, GetDistrict, GetState} from "../address/address.service";
import * as Yup from "yup";
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetById, Update} from "./user.service";
import {DisplayAddress, DisplayDate} from "../../common-library/helpers/detail-helpers";
import {DetailImage} from "../../common-library/common-components/detail/detail-image";
import * as ManagementUnitService from "../management-organization/management-organization.service";
import * as RoleService from "../role/role.service";
import * as AgencyService from "../agency/agency.service";
import {Spinner} from "react-bootstrap";
import {ConvertRoleScope} from '../role/const/convert-scope';
import * as RoleScope from '../role/const/role_scope';
import UserBody from './user-body';
import './style.scss'
import HistoryIcon from '@material-ui/icons/History';
import * as CustomersService from '../customers/customers.service'
import { CustomersModel } from '../customers/customers.model';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const detailDialogTitle = 'USER.DETAIL_DIALOG.TITLE';
const moduleName = 'USER.MODULE_NAME';
const lockDialogTitle = 'USER.LOCK_DIALOG.TITLE';
const lockConfirmMessage = 'USER.LOCK_DIALOG.CONFIRM_MESSAGE';
const lockDialogBodyTitle = 'USER.LOCK_DIALOG.BODY_TITLE';
const lockingMessage = 'USER.LOCK_DIALOG.LOCKING_MESSAGE';
const createTitle = 'USER.CREATE.HEADER';
const updateTitle = 'USER.UPDATE.HEADER';

export const USER_TAB_TYPE = {
  employee: '0',
  customer: '1'
}

function User() {
  const intl = useIntl();
  
  const history = useHistory();
  const {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    createEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    showDelete,
    setShowDelete,
    showDetail,
    setShowDetail,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    error,
    add,
    update,
    get,
    deleteFn,
    getAll,
    refreshData
  } = InitMasterProps<UserModel | CustomersModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });

  const [currentTab, setCurrentTab] = useState<string | undefined>(USER_TAB_TYPE.employee);
  const [trigger, setTrigger] = useState<boolean>(false);
  
  useEffect(() => {
    if (currentTab === USER_TAB_TYPE.employee) {
      getAll(filterProps);

    } else {
      CustomersService.GetAll({ queryProps: { ...filterProps as any }, paginationProps }).then(res => {
        setEntities(res.data?.data)
        setTotal(res.data?.paging?.total)
      }).catch (err => console.log(err))
    }
  }, [paginationProps, filterProps, trigger, currentTab]);

  console.log(paginationProps)
  
  const columns = useMemo(() => {
    return [
      {
        dataField: '_id',
        text: 'STT',
        formatter: (cell: any, row: any, rowIndex: number) => (
          <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
        ),
        classes: 'mr-3',
        style: { paddingTop: 20 },
      },
      {
      dataField: 'agency.name',
      text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.WORK_AT'})}`,
      ...SortColumn,
      align: 'center',
    },
      {
        dataField: 'fullName',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.DISPLAY_NAME'})}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'managementUnit.name',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.ORGANIZATION'})}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'phone',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.PHONE'})}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'email',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.EMAIL'})}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.STATUS_COLUMN'})}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.ACTION_COLUMN'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: UserModel) => {
            get(entity).then(() => {
              setShowDetail(true);
            })
          },
          onEdit: (entity: UserModel) => {
            history.push(`${window.location.pathname}/${entity._id}`);
          },
          onLock: (entity: UserModel) => {
            setDeleteEntity(entity);
            setShowDelete(true);
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      }
    ]
  }, [paginationProps]);

  const customerColumn = useMemo(() => ([
    {
      dataField: '_id',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      classes: 'mr-3',
      style: { paddingTop: 20 },
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_CODE' })}`,
      // formatter: (cell: any, row: any, rowIndex: number) => (
      //   <span
      //     className="text-primary"
      //     style={{ fontWeight: 600, cursor: 'pointer' }}
      //     onClick={() => {
      //       setShowDetail(true);
      //       setDetailEntity(row);
      //     }}>
      //     {row.code}
      //   </span>
      // ),
      ...SortColumn,
      classes: 'text-center',
    },
    {
      dataField: 'fullName',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_DETAIL_NAME' })}`,
      ...SortColumn,
      classes: 'text-center',
    },
    {
      dataField: 'username',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_PHONE_NUMBER' })}`,
      ...SortColumn,
      classes: 'text-center',
    },

    {
      dataField: 'createdAt',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_CREATED_AT' })}`,
      formatter: (cell: any, row: any) => (
        <span>
          {row.createdAt
            ? new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt))
            : 'Không có thông tin'}
        </span>
      ),
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'CUSTOMERS_DETAIL_ACTION' })}`,
      formatter: (cell: any, row: any) => (
        <span
          className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
          onClick={() => {
            // ProductionPlanService.GetById(row._id).then(res => {
            //   setEditEntity(res.data);
            //   history.push({
            //     pathname: '/production-plan/plan-view/' + row._id,
            //     state: res.data,
            //   });
            // });
            history.push({
              pathname: '/customers-management/' + row._id + '/history',
            });
          }}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <HistoryIcon className="text-primary eye" />
          </span>
        </span>
      ),

      ...NormalColumn,
      style: { minWidth: '130px' },
    },
  ]), [paginationProps])
  
  const masterEntityDetailDialog: RenderInfoDetail = useMemo((): RenderInfoDetail => [
    {
      className: 'col-md-6 col-12',
      dataClassName: 'col-md-12 col-12 text-lg-center',
      data: {
        image: {
          formatter: (input) => <DetailImage images={input} width={200} height={200}/>
        },
      },
    },
    {
      className: 'col-md-6 col-12',
      dataClassName: 'col-md-8 col-12',
      data: {
        fullName: {title: 'USER.DETAIL_DIALOG.FULL_NAME'},
        phone: {title: 'USER.DETAIL_DIALOG.PHONE'},
        birthDay: {title: 'USER.DETAIL_DIALOG.BIRTHDAY', formatter: (input) => DisplayDate({input})},
        address: {title: 'USER.DETAIL_DIALOG.ADDRESS', formatter: DisplayAddress},
        'role.name': {title: 'USER.DETAIL_DIALOG.ROLE'},
      },
    },
  ], []);
  const [managementUnit, setManagementUnit] = useState<any>(null);
  const [role, setRole] = useState<any>(null);
  const searchModel: SearchModel = useMemo(() => ({
    managementUnit: {
      type: 'search-select',
      label: 'USER.MASTER.SEARCH.ORGANIZATION',
      keyField: 'name',
      disabled: currentTab === '1',
      onSearch: ManagementUnitService.getAll,
      onChange: (value: any, {setFieldValue}: any) => {
        console.log(value)
        if (managementUnit != value) {
          setFieldValue('role', null);
        }
        setManagementUnit(value);
      },
    },
    // role: {
    //   type: 'search-select',
    //   label: 'USER.MASTER.SEARCH.ROLE',
    //   keyField: 'name',
    //   onSearch: ({queryProps, paginationProps}: any, values: any): Promise<any> => {
    //     return RoleService.GetAll({
    //       queryProps: {...queryProps, managementUnit: {...values?.managementUnit}},
    //       paginationProps
    //     })
    //   },
    //   disabled: (values: any) => {
    //     return !(values.managementUnit);
    //   },
    // },
    code: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.CODE',
      disabled: currentTab === '1',
    },
    fullName: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.FULL_NAME',
    },
    agency: {
      keyField: 'name',
      type: 'search-select',
      onSearch: AgencyService.GetAll,
      label: 'USER.MASTER.SEARCH.WORK_AT',
      disabled: currentTab === '1',
    },
    email: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.EMAIL',
      disabled: currentTab === '1',
    },
    phone: {
      type: 'string-number',
      label: 'USER.MASTER.SEARCH.PHONE',
    },
  }), [managementUnit, currentTab]);
  const group1 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'USER.MODIFY.DETAIL_INFO',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    image: {
      _type: 'image',
      maxNumber: 1,
      label: 'USER.MODIFY.IMAGE',
      isArray: false,
    },
    code: {
      _type: 'string',
      label: 'USER.MODIFY.CODE',
      disabled: true,
    },
    username: {
      _type: 'string',
      required: true,
      label: 'USER.MODIFY.USER_NAME',
    },
    fullName: {
      _type: 'string',
      required: true,
      label: 'USER.MODIFY.FULL_NAME',
    },
    birthDay: {
      _type: 'date-time',
      required: true,
      label: 'USER.MODIFY.BIRTHDAY',
    },
    phone: {
      _type: 'string-number',
      required: true,
      label: 'USER.MODIFY.PHONE',
    },
    gender: {
      _type: 'radio',
      required: true,
      options: [
        {label: 'USER.MODIFY.GENDER_OPTION.MALE', value: '1'},
        {label: 'USER.MODIFY.GENDER_OPTION.FEMALE', value: '0'}
      ],
      label: 'USER.MODIFY.GENDER',
    },
    status: {
      _type: 'boolean',
      label: 'USER.MODIFY.STATUS',
      trueFalse: {
        true: '1',
        false: '0'
      }
    },
  }), []);
  const group2 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'EMPTY',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    
    email: {
      _type: 'email',
      required: true,
      label: 'USER.MODIFY.EMAIL',
    },
    address: {
      _type: 'object',
      state: {
        _type: 'search-select',
        onSearch: GetState,
        disabled: (values: any) => {
          console.log(values)
        },
        onChange: (value: any, {setFieldValue, setFieldTouched, values}: any) => {
          if (values?.address?.state !== value) {
            setFieldValue('address.city', '');
            setFieldTouched('address.city', false);
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
        },
        required: true,
        label: 'USER.MODIFY.STATE',
      },
      city: {
        _type: 'search-select',
        onSearch: ({queryProps, paginationProps}: any, values: any): Promise<any> => {
          return GetCity({queryProps: {...queryProps, state: values?.address?.state}, paginationProps})
        },
        // selectField: 'code',
        required: true,
        onChange: (value: any, {setFieldValue, setFieldTouched, values}: any) => {
          if (values?.address?.city != value) {
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
        },
        disabled: (values: any) => {
          return (values?.address?.state === '');
        },
        label: 'USER.MODIFY.CITY',
      },
      district: {
        _type: 'search-select',
        onSearch: ({queryProps, paginationProps}: any, values: any): Promise<any> => {
          return GetDistrict({queryProps: {...queryProps, city: values?.address?.city}, paginationProps})
        },
        // selectField: 'code',
        required: true,
        disabled: (values: any) => {
          return (values?.address?.city === '');
        },
        label: 'USER.MODIFY.DISTRICT',
      },
      address: {
        _type: 'string',
        required: true,
        label: 'USER.MODIFY.ADDRESS',
      },
    },
    managementUnit: {
      _type: 'search-select',
      label: 'USER.MODIFY.MANAGEMENT_UNIT',
      keyField: 'name',
      required: true,
      onSearch: ManagementUnitService.getAll,
      onChange: (value: any, {setFieldValue}: any) => {
        if (managementUnit != value) {
          setFieldValue('role', null);
          setFieldValue('scopes', {});
        }
        setManagementUnit(value);
      },
    },
    role: {
      _type: 'search-select',
      label: 'USER.MODIFY.ROLE',
      keyField: 'name',
      onSearch: ({queryProps, paginationProps}: any, values: any): Promise<any> => {
        return RoleService.GetAll({
          queryProps: {...queryProps, managementUnit: {...values?.managementUnit}},
          paginationProps
        })
      },
      onChange: (value: any, {setFieldValue}: any) => {
        if (role != value) {
          if (value) setFieldValue('scopes', RoleArrayToObject(value.scopes));
          else setFieldValue('scopes', {});
        }
        setRole(value);
      },
      disabled: (values: any) => {
        return !(values?.managementUnit);
      },
    },
    agency: {
      _type: 'search-select',
      onSearch: AgencyService.GetAll,
      // selectField: 'code',
      keyField: 'name',
      required: true,
      label: 'USER.MODIFY.AGENCY',
    },
  }), [managementUnit, role]);
  
  const modifyModel2 = React.useMemo((): ModifyPanel => ({
    _title: 'EMPTY',
    group2: {
      _subTitle: 'PHÂN QUYỀN DỮ LIỆU',
      scopes: {
        _type: 'object',
        enterprise: {
          _type: 'checkbox',
          label: 'DOANH NGHIỆP SẢN XUẤT',
          optionData: ConvertRoleScope(RoleScope.role_scope_enterprise, intl)
        },
        species: {
          _type: 'checkbox',
          label: 'THÔNG TIN CHUNG',
          optionData: ConvertRoleScope(RoleScope.role_scope_species, intl)
        },
        productPlan: {
          _type: 'object',
          seeding: {
            _type: 'checkbox',
            label: 'THÔNG TIN XUỐNG GIỐNG',
            optionData: ConvertRoleScope(RoleScope.role_scope_seeding, intl),
          },
          planting: {
            _type: 'checkbox',
            label: 'THÔNG TIN GIEO TRỒNG',
            optionData: ConvertRoleScope(RoleScope.role_scope_planting, intl),
          },
          harvesting: {
            _type: 'checkbox',
            label: 'THÔNG TIN THU HOẠCH',
            optionData: ConvertRoleScope(RoleScope.role_scope_harvesting, intl),
          },
          preliminaryTreatment: {
            _type: 'checkbox',
            label: 'THÔNG TIN SƠ CHẾ',
            optionData: ConvertRoleScope(RoleScope.role_scope_preliminary_treatment, intl),
          },
          cleaning: {
            _type: 'checkbox',
            label: 'THÔNG TIN LÀM SẠCH',
            optionData: ConvertRoleScope(RoleScope.role_scope_cleaning, intl),
          },
          packing: {
            _type: 'checkbox',
            label: 'THÔNG TIN ĐÓNG GÓI',
            optionData: ConvertRoleScope(RoleScope.role_scope_packing, intl),
          },
          preservation: {
            _type: 'checkbox',
            label: 'THÔNG TIN BẢO QUẢN',
            optionData: ConvertRoleScope(RoleScope.role_scope_preservation, intl),
          },
        },
        logistics: {
          _type: 'checkbox',
          label: 'THÔNG TIN LOGISTICS',
          optionData: ConvertRoleScope(RoleScope.role_scope_logistics, intl)
        },
        distribution: {
          _type: 'checkbox',
          label: 'THÔNG TIN PHÂN PHỐI',
          optionData: ConvertRoleScope(RoleScope.role_scope_distribution, intl)
        },
        shipping: {
          _type: 'checkbox',
          label: 'THÔNG TIN VẬN CHUYỂN',
          optionData: ConvertRoleScope(RoleScope.role_scope_shipping, intl)
        },
        status: {
          _type: 'checkbox',
          label: 'TRẠNG THÁI',
          optionData: ConvertRoleScope(RoleScope.role_scope_status, intl)
        }
      }
    }
  }), [])
  
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1,
      group2: group2,
    },
    panel2: modifyModel2,
  }), [group1, group2]);
  const updateForm = useMemo((): ModifyForm => {
    return ({...createForm, _header: updateTitle});
  }, [createForm]);
  const validationSchema = useMemo(() => Yup.object().shape({
    phone: Yup.string()
      .max(11, 'VALIDATE.ERROR.INVALID_INPUT')
      .min(8, 'VALIDATE.ERROR.INVALID_INPUT'),
    taxId: Yup.string()
      .min(10, 'VALIDATE.ERROR.INVALID_INPUT')
      .max(13, 'VALIDATE.ERROR.INVALID_INPUT'),
    birthDay: Yup.date().max(new Date(), 'VALIDATE.ERROR.MUST_LESS_THAN_TODAY'),

    // owner: Yup.object().shape({
    //   phone: Yup.string()
    //     .max(11, 'VALIDATE.ERROR.INVALID_INPUT')
    //     .min(8, 'VALIDATE.ERROR.INVALID_INPUT'),
    // })
  }), []);
  const actions: any = useMemo(() => ({
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-8 fixed-btn-width',
        label: 'SAVE_BTN_LABEL',
        icon: loading ? (<Spinner style={iconStyle} animation="border" variant="light" size="sm"/>) :
          (<SaveOutlinedIcon style={iconStyle}/>)
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/account/user',
        className: 'btn btn-outline-primary fixed-btn-width',
        label: 'CANCEL_BTN_LABEL',
        icon: <CancelOutlinedIcon/>,
      }
    }
  }), [loading]);
  const initCreateValues: any = useMemo(() => ({...InitValues(createForm), status: '0'}), [createForm]);

  const TabData = [
    {
      tabTitle: 'Nhân viên',
      entities: entities,
      columns: columns,
      total: total,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
      button: [
        {
          label: 'Thêm mới',
          onClick: () => {
            setCreateEntity(initCreateValues);
            history.push(`${window.location.pathname}/new`);
          }
        }
      ]
    },
    {
      tabTitle: 'Khách hàng',
      entities: entities,
      columns: customerColumn,
      total: total,
      loading: loading,
      paginationParams: paginationProps,
      setPaginationParams: setPaginationProps,
      onSelectMany: setSelectedEntities,
      selectedEntities: selectedEntities,
    },
  ];

  return (
    <Fragment>
      <Switch>
        <Route path="/account/user/new">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={add}
            formModel={createForm}
            entity={createEntity}
            actions={actions}
            validation={validationSchema}
            homePageUrl={HomePageURL.user}
          />
        </Route>
        <Route path={`/account/user/:code`}>
          {({match}) => (
            <EntityCrudPage
              onModify={update}
              moduleName={moduleName}
              code={match && match.params.code}
              get={GetById}
              formModel={updateForm}
              actions={actions}
              validation={validationSchema}
              homePageUrl={HomePageURL.user}
            />
          )}
        </Route>
        <Route path="/account/user" exact={true}>
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            searchModel={searchModel}
          />
          <div className="user-body">
            <UserBody 
              tabData={TabData}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              setEntities={setEntities}
              setPaginationProps={setPaginationProps}
              setTrigger={setTrigger}
              trigger={trigger}
              refreshData={refreshData}
              title='Người dùng hệ thống'
            />
          </div>
          {/* <MasterBody
            title={tableTitle}
            onCreate={() => {
              setCreateEntity(initCreateValues);
              history.push(`${window.location.pathname}/0000000`);
            }}
            entities={entities}
            total={total}
            columns={columns as any}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
            isShowId={true}
          />
           */}
          {/* <MasterTreeStructure /> */}
        </Route>
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
      <DeleteEntityDialog
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={lockDialogTitle}
        confirmMessage={lockConfirmMessage}
        bodyTitle={lockDialogBodyTitle}
        deletingMessage={lockingMessage}
      />
    </Fragment>
  );
}

export default User
