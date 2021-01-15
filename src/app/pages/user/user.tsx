import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
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

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const tableTitle = 'USER.MASTER.TABLE.TITLE';
const detailDialogTitle = 'USER.DETAIL_DIALOG.TITLE';
const moduleName = 'USER.MODULE_NAME';
const deleteDialogTitle = 'USER.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'USER.DELETE_DIALOG.BODY_TITLE';
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
            console.log("NOT IMPLEMENTED");
          },
          onChangeRole: (entity: UserModel) => {
            console.log("NOT IMPLEMENTED");
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
      dataClassName: 'col-md-6 col-12',
      data: {
        image: {
          title: 'USER.DETAIL_DIALOG.IMAGE',
          formatter: (input) => <DetailImage images={input} width={200} height={200}/>
        },
      },
    },
    {
      className: 'col-md-6 col-12',
      dataClassName: 'col-md-6 col-12',
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
  const getRole = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return RoleService.GetAll({queryProps: {...queryProps, managementUnit}, paginationProps})
  }, [managementUnit?._id]);
  const searchModel: SearchModel = {
    managementUnit: {
      type: 'tree-select',
      label: 'USER.MASTER.SEARCH.ORGANIZATION',
      onSearch: ({queryProps, sortList, paginationProps,}) => {
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
      onSearch: getRole,
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
  const [state, setState] = useState<string | null | undefined>(null);
  const [city, setCity] = useState<string | null | undefined>(null);
  useEffect(() => {
    setState(editEntity?.address?.state);
    setCity(editEntity?.address?.city);
  }, [editEntity]);
  const getCity = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return GetCity({queryProps: {...queryProps, state}, paginationProps})
  }, [state]);
  const getDistrict = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return GetDistrict({queryProps: {...queryProps, city}, paginationProps})
  }, [city]);
  const group1 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'USER.MODIFY.DETAIL_INFO',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    image: {
      _type: 'image',
      label: 'USER.MODIFY.IMAGE',
      required: true,
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
    },
  }), [getCity, getDistrict]);
  const group2 = useMemo((): ModifyInputGroup => ({
    _subTitle: 'EMPTY',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    agency: {
      _type: 'search-select',
      onSearch: AgencyService.GetAll,
      // selectField: 'code',
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
        label: 'USER.MODIFY.STATE',
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
          return (values?.address?.state === '');
        },
        label: 'USER.MODIFY.CITY',
      },
      district: {
        _type: 'search-select',
        onSearch: getDistrict,
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
      onSearch: getRole,
      keyField: 'name',
      disabled: (values: any) => {
        return !(values.managementUnit);
      },
    },
  }), [getRole]);
  
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
  const initCreateValues = useMemo(() => ({...InitValues(createForm), status: 'false'}), [createForm]);
  return (
    <Fragment>
      <Switch>
        <Route path="/account/user/0000000">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={add}
            formModel={createForm}
            entity={initCreateValues}
            actions={actions}
            validation={validationSchema}
          />
        </Route>
        <Route path={`/account/user/:code`}>
          {({history, match}) => (
            <EntityCrudPage
              onModify={update}
              moduleName={moduleName}
              //  modifyModel={modifyModel}
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
              history.push(`${window.location.pathname}/0000000`);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
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
        title={deleteDialogTitle}
        bodyTitle={deleteDialogBodyTitle}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        error={error}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
    </Fragment>
  );
}

export default User
