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
import * as RoleService from "../role/role.service";
import * as Yup from "yup";
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetById, Update} from "./user.service";

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const tableTitle = 'USER.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'SHIPPING_AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

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
      dataField: 'workAt',
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
        dataField: 'organization',
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
            get(entity);
            setShowDetail(true);
            setDetailEntity(entity);
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
      header: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
      className: 'col-7',
      dataClassName: 'col-7',
      data: {
        code: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.CODE'},
        name: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.NAME'},
        address: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.ADDRESS',
          formatter: (address: any, row: any) => {
            const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
            return (<>{addressString}</>);
          }
        },
        phone: {title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.PHONE_NUMBER'},
        status: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.SHIPPING.STATUS',
          formatter: TickColumnFormatter
        },
      },
    },
    {
      header: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.SUBTITLE',
      className: 'col-5',
      titleClassName: 'col-5',
      dataClassName: 'col-7',
      data: {
        fullName: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.FULL_NAME',
          keyField: 'owner.fullName'
        }, email: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.EMAIL',
          keyField: 'owner.email'
        }, phone: {
          title: 'SHIPPING_AGENCY.DETAIL_DIALOG.OWNER.PHONE_NUMBER',
          keyField: 'owner.phone'
        },
      },
    },
  ], []);
  
  const searchModel: SearchModel = {
    organization: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.ORGANIZATION',
    },
    role: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.ROLE',
    },
    code: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.CODE',
    },
    username: {
      type: 'string',
      label: 'USER.MASTER.SEARCH.USER_NAME',
    },
    workAt: {
      type: 'string',
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
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    code: {
      _type: 'string',
      label: 'SHIPPING_AGENCY.MODIFY.CODE',
      disabled: true,
    },
    name: {
      _type: 'string',
      required: true,
      label: 'SHIPPING_AGENCY.MODIFY.NAME',
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
          console.log(state, value);
          if (!value || state != value) {
            setCity(null);
            setFieldValue('address.city', '');
            setFieldTouched('address.city', false);
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
          setState(value);
        },
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.STATE',
      },
      city: {
        _type: 'search-select',
        onSearch: getCity,
        // selectField: 'code',
        required: true,
        onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
          if (!value || city != value) {
            setFieldValue('address.district', '');
            setFieldTouched('address.district', false);
          }
          setCity(value);
        },
        disabled: (values: any) => {
          return (values?.address?.state === '');
        },
        label: 'SHIPPING_AGENCY.MODIFY.CITY',
      },
      district: {
        _type: 'search-select',
        onSearch: getDistrict,
        // selectField: 'code',
        required: true,
        disabled: (values: any) => {
          return (values?.address?.city === '');
        },
        label: 'SHIPPING_AGENCY.MODIFY.DISTRICT',
      },
      address: {
        _type: 'string',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.ADDRESS',
      },
    },
    status: {
      _type: 'boolean',
      label: 'SHIPPING_AGENCY.MODIFY.STATUS',
    },
    phone: {
      _type: 'string-number',
      required: true,
      label: 'SHIPPING_AGENCY.MODIFY.PHONE_NUMBER',
    },
    taxId: {
      _type: 'string-number',
      required: true,
      label: 'SHIPPING_AGENCY.MODIFY.TAX_NUMBER',
    },
    images: {
      _type: 'image',
      label: 'SHIPPING_AGENCY.MODIFY.IMAGE',
    },
  }), [getCity, getDistrict]);
  const [group2, setGroup2] = useState<ModifyInputGroup>({
    _subTitle: 'THÔNG TIN CHỦ ĐƠN VỊ',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    owner: {
      _type: 'object',
      username: {
        _type: 'string',
        label: 'SHIPPING_AGENCY.MODIFY.USER_NAME',
        required: true,
      },
      fullName: {
        _type: 'string',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.DISPLAY_NAME',
      },
      phone: {
        _type: 'string-number',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.PHONE_NUMBER',
      },
      email: {
        _type: 'email',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.EMAIL',
      },
      gender: {
        _type: 'radio',
        required: true,
        options: [
          {label: 'SHIPPING_AGENCY.MODIFY.GENDER_OPTION.MALE', value: '1'},
          {label: 'SHIPPING_AGENCY.MODIFY.GENDER_OPTION.FEMALE', value: '0'}
        ],
        label: 'SHIPPING_AGENCY.MODIFY.GENDER',
      },
      birthDay: {
        _type: 'date-time',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.DATE_OF_BIRTH',
      },
      role: {
        _type: 'search-select',
        required: true,
        label: 'SHIPPING_AGENCY.MODIFY.ROLE',
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
        label: 'SHIPPING_AGENCY.MODIFY.REPRESENT_IMAGE',
      },
    }
  });
  
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
        <Route path="/shipping-agency/0000000">
          <EntityCrudPage
            moduleName={moduleName}
            onModify={add}
            formModel={createForm}
            entity={initCreateValues}
            actions={actions}
            validation={validationSchema}
          />
        </Route>
        <Route path={`/shipping-agency/:code`}>
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
        <Route path="" exact={true}>
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
