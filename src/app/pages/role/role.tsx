import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch, useHistory } from 'react-router';
import {
  ActionsColumnFormatter,
  TickColumnFormatter,
} from '../../common-library/common-components/actions-column-formatter';
import { MasterHeader } from '../../common-library/common-components/master-header';
import {
  DefaultPagination,
  HomePageURL,
  NormalColumn,
  SortColumn,
} from '../../common-library/common-consts/const';
import {
  InitMasterProps,
  InitValues,
} from '../../common-library/helpers/common-function';
import {
  Count,
  Create,
  Delete,
  DeleteMany,
  Get,
  GetAll,
  GetById,
  GetStatusList,
  Update,
} from './role.service';
import { RoleModel } from './role.model';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import {
  ModifyForm,
  ModifyInputGroup,
  ModifyPanel,
  RenderInfoDetail,
  SearchModel,
} from '../../common-library/common-types/common-type';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import * as ManagementOrganizationService from '../management-organization/management-organization.service';
import { Select } from 'antd';
import * as RoleScope from './const/role_scope';
import { ConvertRoleScope } from './const/convert-scope';
import _ from 'lodash';
import { AxiosResponse } from 'axios';
import UserBody from '../user/user-body';
import '../user/style.scss'



const RoleSchema = Yup.object().shape({
  managementUnit: Yup.mixed().test(
    'test name',
    'ROLE.VALIDATION.REQUIRED.MANAGEMENT_ORGANIZATION',
    function(value) {
      console.log(value);
      return !!value;
    },
  ),
  name: Yup.string().required('ROLE.VALIDATION.REQUIRED.ROLE_NAME'),
  // managementUnit: Yup.string().required('').nullable(),
  // // _id: Yup.string().required('ROLE.VALIDATION.REQUIRED.ROLE_CODE').nullable(),
  // status: Yup.string().required('ROLE.VALIDATION.REQUIRED.STATUS').nullable(),
  // name: Yup.string().required('').nullable(),
});

export default function ManagementOrganization() {
  const headerTitle = 'ROLE.MASTER.HEADER.TITLE';
  const createTitle = 'ROLE.CREATE.HEADER';
  const editTitle = 'ROLE.EDIT.HEADER';

  const {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showDetail,
    setShowDetail,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    loading,
    add,
    update,
    get,
    deleteFn,
    getAll,
  } = InitMasterProps<RoleModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update,
  });

  const intl = useIntl();
  const history = useHistory();

  const [currentTab, setCurrentTab] = useState<string | undefined>('0');
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps, trigger, currentTab]);

  const roleDetailrenderInfo: RenderInfoDetail = [
    {
      header: '',
      dataClassName: 'col-lg-8 col-md-8',
      titleClassName: 'col-lg-4 col-md-4',
      className: 'col-lg-12 col-md-12',
      data: {
        managementUnit: {
          title: 'ROLE.VIEW.LABEL.MANAGEMENT_ORGANIZATION',
          keyField: 'managementUnit.name',
        },
        code: {
          title: 'ROLE.VIEW.LABEL.ROLE_CODE',
        },
        status: {
          title: 'ROLE.VIEW.LABEL.STATUS',
          formatter: TickColumnFormatter,
        },
        name: {
          title: 'ROLE.VIEW.LABEL.ROLE_NAME',
        },
      },
    },
  ];

  const group1: ModifyInputGroup = {
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-md-8 col-12 pr-xl-15 pr-md-10 pr-5',
    _inputClassName: 'ml-xl-15 mb-5',
    // managementOrganization: {
    //   _type: 'custom',
    //   component: () => {
    //     return (
    //       <>
    //         <Select style={{width: '200px'}}>
    //           <Option value="0">Phòng Giám Đốc</Option>
    //         </Select>
    //       </>
    //     )
    //   }
    // },
    // managementUnit: {
    //   _type: 'search-select',
    //   label: 'ROLE.CREATE.LABEL.MANAGEMENT_ORGANIZATION',
    //   // name: 'managementUnit',
    //   keyField: 'name',
    //   onSearch: ManagementOrganizationService.getAll,
    //   required: true
    //   // onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
    //   //   const name = 'managementUnit';
    //   //   setFieldTouched(name, true);
    //   //   setFieldValue(name, value._id ?? '');
    //   // },
    //   // onFetch: (entities: any) => {console.log(entities); return entities.data;}
    //   // onSearch: ({queryProps, sortList, paginationProps,}: any) => {
    //   //   return ManagementOrganizationService.GetAll({queryProps}).then((e) => {
    //   //     return (e.data);
    //   //   })
    //   // },
    // },
    managementUnit: {
      _type: 'search-select',
      label: 'USER.MODIFY.MANAGEMENT_UNIT',
      keyField: 'name',
      required: true,
      onSearch: ManagementOrganizationService.getAll,
    },
    roleCodeDummy: {
      _type: 'string',
      label: 'ROLE.CREATE.LABEL.ROLE_CODE',
      disabled: true,
    },
    name: {
      _type: 'string',
      label: 'ROLE.CREATE.LABEL.ROLE_NAME',
      required: true,
    },
    // status: {
    //   _type: 'custom',
    //   label: 'ROLE.CREATE.LABEL.ROLE_NAME',
    //   component: () => {
    //     return (
    //       <>
    //         <SwitchField></SwitchField>
    //       </>
    //     )
    //   }
    // },
    status: {
      _type: 'boolean',
      label: 'ROLE.CREATE.LABEL.STATUS',
      trueFalse: {
        true: '1',
        false: '0',
      },
    },
  };

  const modifyModel2 = React.useMemo(
    (): ModifyPanel => ({
      _title: 'EMPTY',
      group2: {
        _subTitle: 'PHÂN QUYỀN DỮ LIỆU',
        scopes: {
          _type: 'object',
          enterprise: {
            _type: 'checkbox',
            label: 'DOANH NGHIỆP SẢN XUẤT',
            optionData: ConvertRoleScope(RoleScope.role_scope_enterprise, intl),
          },
          species: {
            _type: 'checkbox',
            label: 'THÔNG TIN CHUNG',
            optionData: ConvertRoleScope(RoleScope.role_scope_species, intl),
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
            optionData: ConvertRoleScope(RoleScope.role_scope_logistics, intl),
          },
          distribution: {
            _type: 'checkbox',
            label: 'THÔNG TIN PHÂN PHỐI',
            optionData: ConvertRoleScope(RoleScope.role_scope_distribution, intl),
          },
          shipping: {
            _type: 'checkbox',
            label: 'THÔNG TIN VẬN CHUYỂN',
            optionData: ConvertRoleScope(RoleScope.role_scope_shipping, intl),
          },
          status: {
            _type: 'checkbox',
            label: 'TRẠNG THÁI',
            optionData: ConvertRoleScope(RoleScope.role_scope_status, intl),
          },
        },
      },
    }),
    [],
  );

  const createForm: ModifyForm = {
    _header: createTitle,
    panel1: {
      _title: 'EMPTY',
      group1: group1,
    },
    panel2: modifyModel2,
  };

  const editForm: ModifyForm = {
    _header: editTitle,
    panel1: {
      _title: 'EMPTY',
      group1: group1,
    },
    panel2: modifyModel2,
  };

  const columns = React.useMemo(() => {
    return [
      {
        dataField: 'code',
        text: `${intl.formatMessage({ id: 'ROLE.MASTER.TABLE.ROLE_CODE' })}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'name',
        text: `${intl.formatMessage({ id: 'ROLE.MASTER.TABLE.ROLE_NAME' })}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'managementUnit.name',
        text: `${intl.formatMessage({ id: 'ROLE.MASTER.TABLE.MANAGEMENT_ORGANIZATION' })}`,
        ...SortColumn,
        align: 'center',
      },

      {
        dataField: 'status',
        text: `${intl.formatMessage({ id: 'ROLE.MASTER.TABLE.STATUS' })}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'actions',
        text: `${intl.formatMessage({ id: 'ROLE.MASTER.TABLE.ACTIONS' })}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onClone: (entity: RoleModel) => {
            const validateEntity = (entity: RoleModel): RoleModel => {
              const { name } = entity;

              const date = new Date();
              const markerString =
                ' - Clone ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
              const vName = name.includes(' - Clone')
                ? name.split(' - Clone')[0] + markerString
                : name + markerString;

              return {
                name: vName,
                status: entity.status,
                managementUnit: {
                  _id: entity.managementUnit?._id,
                },
                scopes: entity.scopes, // scopes: RoleArrayToObject(entity.scopes),
              };
            };

            const id = entity?._id ?? undefined;
            if (id) {
              GetById(id).then((res: AxiosResponse<RoleModel>) => {
                add(validateEntity(res.data));
              });
            }
          },
          onShowDetail: (entity: RoleModel) => {
            setDetailEntity(entity);
            setShowDetail(true);
          },
          onEdit: (entity: RoleModel) => {
            setEditEntity(entity);
            history.push(`${window.location.pathname}/${entity._id}`);
          },
          onDelete: (entity: RoleModel) => {
            setDeleteEntity(entity);
            setShowDelete(true);
          },
        },
        ...NormalColumn,
        style: { minWidth: '166px' },
        align: 'center',
      },
    ];
  }, []);

  const customerColumn = useMemo(
    () => [
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
        dataField: 'managementUnit.name',
        text: `${intl.formatMessage({ id: 'Mã khách hàng' })}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'phone',
        text: `${intl.formatMessage({ id: 'Họ và tên' })}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'email',
        text: `${intl.formatMessage({ id: 'Số điện thoại' })}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'status',
        text: `${intl.formatMessage({ id: 'Lần đầu mua hàng' })}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'action',
        text: `${intl.formatMessage({ id: 'USER.MASTER.TABLE.ACTION_COLUMN' })}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onClone: (entity: RoleModel) => {
            const validateEntity = (entity: RoleModel): RoleModel => {
              const { name } = entity;

              const date = new Date();
              const markerString =
                ' - Clone ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
              const vName = name.includes(' - Clone')
                ? name.split(' - Clone')[0] + markerString
                : name + markerString;

              return {
                name: vName,
                status: entity.status,
                managementUnit: {
                  _id: entity.managementUnit?._id,
                },
                scopes: entity.scopes, // scopes: RoleArrayToObject(entity.scopes),
              };
            };

            const id = entity?._id ?? undefined;
            if (id) {
              GetById(id).then((res: AxiosResponse<RoleModel>) => {
                add(validateEntity(res.data));
              });
            }
          },
          onShowDetail: (entity: RoleModel) => {
            get(entity).then(() => {
              setShowDetail(true);
            });
          },
          onEdit: (entity: RoleModel) => {
            history.push(`${window.location.pathname}/${entity._id}`);
          },
        },
        ...NormalColumn,
        style: { minWidth: '130px' },
      },
    ],
    [],
  );

  const actions: any = {
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-8 fixed-btn-width',
        label: intl.formatMessage({ id: 'COMMON_COMPONENT.MODIFY_DIALOG.SAVE_BTN' }),
        icon: <SaveOutlinedIcon />,
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/account/role',
        className: 'btn btn-outline-primary fixed-btn-width',
        label: intl.formatMessage({ id: 'COMMON_COMPONENT.MODIFY_DIALOG.CANCEL_BTN' }),
        icon: <CancelOutlinedIcon />,
      },
    },
  };

  const searchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'ROLE.HEADER.LABEL.ROLE_CODE',
      // onSearch: GetIds,
    },
    name: {
      type: 'string',
      label: 'ROLE.HEADER.LABEL.ROLE_NAME',
      // onSearch: GetNames,
    },
    managementUnit: {
      type: 'search-select',
      // name: 'managementUnit',
      label: 'ROLE.HEADER.LABEL.MANAGEMENT_ORGANIZATION',
      keyField: 'name',
      // onSearch: ({queryProps, sortList, paginationProps,}: any) => {
      //   return ManagementOrganizationService.GetAll({queryProps}).then((e) => {
      //     return (e.data);
      //   })
      // },
      onSearch: ManagementOrganizationService.getAll,
    },
    status: {
      type: 'search-select',
      label: 'ROLE.HEADER.LABEL.STATUS',
      onSearch: GetStatusList,
      keyField: 'name',
      selectField: 'code',
    },
  };

  const initCreateValues: any = React.useMemo(() => InitValues(createForm), [createForm]);

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
          },
        },
      ],
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
      button: [
        {
          label: 'Thêm mới',
          onClick: () => {
            setCreateEntity(initCreateValues);
            history.push(`${window.location.pathname}/new`);
          },
        },
      ],
    },
  ];

  return (
    <>
      <MasterEntityDetailDialog
        title="ROLE.VIEW.HEADER"
        moduleName="ROLE.MODULE_NAME"
        show={showDetail}
        entity={detailEntity}
        renderInfo={roleDetailrenderInfo}
        onHide={() => {
          setShowDetail(false);
        }}
        size="sm"
      />

      <DeleteEntityDialog
        isShow={showDelete}
        moduleName="ROLE.MODULE_NAME"
        onHide={() => {
          setShowDelete(false);
        }}
        onDelete={deleteFn}
        entity={deleteEntity}
      />

      <Switch>
        <Route path="/account/role" exact={true}>
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              const cvValue = JSON.parse(JSON.stringify(value));
              if (value && value.status && !_.isString(value.status)) {
                cvValue.status = value.status.code;
              }
              setFilterProps(cvValue);
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
              title="Danh mục vai trò"
            />
          </div>
        </Route>

        <Route path="/account/role/new">
          <EntityCrudPage
            moduleName="ROLE.MODULE_NAME"
            entity={initCreateValues}
            onModify={add}
            formModel={createForm}
            actions={actions}
            validation={RoleSchema}
            loading={loading}
            homePageUrl={HomePageURL.role}
          />
        </Route>
        <Route path="/account/role/:code">
          {({ match }) => (
            <EntityCrudPage
              moduleName="ROLE.MODULE_NAME"
              entity={editEntity}
              onModify={update}
              code={match && match.params.code}
              get={code => GetById(code)}
              formModel={editForm}
              actions={actions}
              validation={RoleSchema}
              loading={loading}
              homePageUrl={HomePageURL.role}
            />
          )}
        </Route>
      </Switch>
    </>
  );
}
