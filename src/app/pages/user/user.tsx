import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, iconStyle, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
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
import {InitMasterProps, InitValues,} from '../../common-library/helpers/common-function';
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
import { ConvertRoleScope } from '../role/const/convert-scope';
import * as RoleScope from '../role/const/role_scope';
import _ from 'lodash';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const tableTitle = 'USER.MASTER.TABLE.TITLE';
const detailDialogTitle = 'USER.DETAIL_DIALOG.TITLE';
const moduleName = 'USER.MODULE_NAME';
const lockDialogTitle = 'USER.LOCK_DIALOG.TITLE';
const lockConfirmMessage = 'USER.LOCK_DIALOG.CONFIRM_MESSAGE';
const lockDialogBodyTitle = 'USER.LOCK_DIALOG.BODY_TITLE';
const lockingMessage = 'USER.LOCK_DIALOG.LOCKING_MESSAGE';
const createTitle = 'USER.CREATE.HEADER';
const updateTitle = 'USER.UPDATE.HEADER';

function User() {
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
    error,
    setError,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<UserModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });
  
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);
  
  const columns = useMemo(() => {
    return [{
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
            get(entity).then(e => {
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
  }, []);
  
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
  const searchModel: SearchModel = {
    managementUnit: {
      type: 'tree-select',
      label: 'USER.MASTER.SEARCH.ORGANIZATION',
      onSearch: ({queryProps, sortList, paginationProps,}: any) => {
        return ManagementUnitService.GetAll({queryProps}).then((e) => {
          return (e.data);
        })
      },
      onChange: (value: any, {setFieldValue}: any) => {
        console.log(value)
        if (managementUnit != value) {
          setFieldValue('role', null);
        }
        setManagementUnit(value);
      },
    },
    role: {
      type: 'search-select',
      label: 'USER.MASTER.SEARCH.ROLE',
      onSearch: ({queryProps, paginationProps}: any, values: any): Promise<any> => {
        return RoleService.GetAll({
          queryProps: {...queryProps, managementUnit: {...values?.managementUnit}},
          paginationProps
        })
      },
      keyField: 'name',
      disabled: (values: any) => {
        return !(values.managementUnit);
      },
    },
    code: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.CODE',
    },
    username: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.USER_NAME',
    },
    agency: {
      keyField: 'name',
      type: 'search-select',
      onSearch: AgencyService.GetAll,
      label: 'USER.MASTER.SEARCH.WORK_AT',
    },
    email: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.EMAIL',
    },
    phone: {
      type: 'string-number',
      label: 'USER.MASTER.SEARCH.PHONE',
    },
  };
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
    agency: {
      _type: 'search-select',
      onSearch: AgencyService.GetAll,
      // selectField: 'code',
      keyField: 'name',
      required: true,
      label: 'USER.MODIFY.AGENCY',
    },
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
      _type: 'tree-select',
      label: 'USER.MODIFY.MANAGEMENT_UNIT',
      required: true,
      onSearch: ({queryProps, sortList, paginationProps,}: any) => {
        return ManagementUnitService.GetAll({queryProps}).then((e) => {
          return (e.data);
        })
      },
      onChange: (value: any, {setFieldValue}: any) => {
        if (managementUnit != value) {
          setFieldValue('role', null);
        }
        setManagementUnit(value);
      },
    },
    role: {
      _type: 'search-select',
      label: 'USER.MODIFY.ROLE',
      onSearch: ({queryProps, paginationProps}: any, values: any): Promise<any> => {
        return RoleService.GetAll({
          queryProps: {...queryProps, managementUnit: {...values?.managementUnit}},
          paginationProps
        })
      },
      keyField: 'name',
      disabled: (values: any) => {
        return !(values?.managementUnit);
      },
    },
  }), []);

  const modifyModel2 = React.useMemo((): ModifyPanel => ({
    _title: 'EMPTY',
    group2: {
      _subTitle: 'PHÂN QUYỀN DỮ LIỆU',
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
      seeding: {
        _type: 'checkbox',
        label: 'THÔNG TIN XUỐNG GIỐNG',
        optionData: ConvertRoleScope(RoleScope.role_scope_seeding, intl)
      },
      planting: {
        _type: 'checkbox',
        label: 'THÔNG TIN GIEO TRỒNG',
        optionData: ConvertRoleScope(RoleScope.role_scope_planting, intl)
      },
      harvesting: {
        _type: 'checkbox',
        label: 'THÔNG TIN THU HOẠCH',
        optionData: ConvertRoleScope(RoleScope.role_scope_harvesting, intl)
      },
      preliminary_treatment: {
        _type: 'checkbox',
        label: 'THÔNG TIN SƠ CHẾ',
        optionData: ConvertRoleScope(RoleScope.role_scope_preliminary_treatment, intl)
      },
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
    owner: Yup.object().shape({
      phone: Yup.string()
        .max(11, 'VALIDATE.ERROR.INVALID_INPUT')
        .min(8, 'VALIDATE.ERROR.INVALID_INPUT'),
      birthDay: Yup.date().max(new Date(), 'VALIDATE.ERROR.MUST_LESS_THAN_TODAY')
    })
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
  return (
    <Fragment>
      <Switch>
        <Route path="/account/user/0000000">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={(values: any) => {
              console.log(values)
              let roleArr: string[] = []
              const cvValues: any = {}

              Object.keys(values).forEach(keys => {
                if (_.isArray(values[keys])) {
                  console.log('1')
                  roleArr = roleArr.concat(values[keys])
                } 
                // else if (_.isObject(values[keys])) {
                //   cvValues[keys] = values[keys]._id
                // } 
                else {
                  cvValues[keys] = values[keys]
                }
              })

              cvValues.scopes = roleArr
              console.log(roleArr)
              console.log(cvValues)

              return add(cvValues)
              }
            }
            formModel={createForm}
            entity={createEntity}
            actions={actions}
            validation={validationSchema}
          />
        </Route>
        <Route path={`/account/user/:code`}>
          {({history, match}) => (
            <EntityCrudPage
              onModify={(values: any) => {
                  console.log(values)
                  let roleArr: string[] = []
                  const cvValues: any = {}
    
                  Object.keys(values).forEach(keys => {
                    if (_.isArray(values[keys])) {
                      console.log('1')
                      roleArr = roleArr.concat(values[keys])
                    } 
                    // else if (_.isObject(values[keys])) {
                    //   cvValues[keys] = values[keys]._id
                    // } 
                    else {
                      cvValues[keys] = values[keys]
                    }
                  })
    
                  cvValues.scopes = roleArr
                  console.log(roleArr)
                  console.log(cvValues)
    
                  return add(cvValues)
                  
                }
              }
              moduleName={moduleName}
              code={match && match.params.code}
              get={GetById}
              formModel={updateForm}
              actions={actions}
              validation={validationSchema}
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
          <MasterBody
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
