import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch, useHistory, match } from 'react-router';
import { ActionsColumnFormatter, TickColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { MasterBody } from '../../common-library/common-components/master-body';
import { MasterHeader } from '../../common-library/common-components/master-header';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import { DefaultPagination, NormalColumn, SortColumn } from '../../common-library/common-consts/const';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetManagementOrganization, GetNames, GetStatus, Update} from './role.service';
import {GetIds} from './role.service';
import {RoleModel} from './role.model';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import { RenderInfoDetail, _ModifyModelInput } from '../../common-library/common-types/common-type';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import * as Yup from 'yup';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import {
  MasterBodyColumns,
  ModifyForm,
  ModifyInputGroup,
  SearchModel
} from "../../common-library/common-types/common-type";
import { Select } from 'antd';
import { Switch as SwitchField } from 'antd';
import CheckBoxField from '../../common-library/forms/input-checkbox';

const { Option } = Select;
export default function ManagementOrganization() {
  const headerTitle = 'ROLE.MASTER.HEADER.TITLE';
  const bodyTitle = 'ROLE.MASTER.BODY.TITLE';
  const createTitle = 'ROLE.CREATE.HEADER';
  const editTitle = 'ROLE.EDIT.HEADER';

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
  } = InitMasterProps<RoleModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });

  const intl = useIntl();
  const history = useHistory();

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);

  const   roleDetailrenderInfo : RenderInfoDetail = [
    {
      header: '',
      className: '',
      titleClassName: '',
      dataClassName: '',
      data: {
        'managementUnit': {
          title: 'ROLE.VIEW.LABEL.ORGANIZATION_MANAGEMENT',
          keyField: 'managementUnit.name'
        },
        _id: {
          title: 'ROLE.VIEW.LABEL.ROLE_CODE',
          
        },
        status: {
          title: 'ROLE.VIEW.LABEL.STATUS',
          formatter: (value: any) => (value === 1 || value === true || value === "1") ? (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<CheckCircleIcon style={{color: '#C4C4C4'}}/>)
          
        },
        name: {
          title: 'ROLE.VIEW.LABEL.ROLE_NAME',
        },
      }
    }
  ];

  const roleValidationSchema = Yup.object().shape({
    managementOrganization: Yup.string().required('ROLE.VALIDATION.REQUIRED.MANAGEMENT_ORGANIZATION').nullable(),
    // _id: Yup.string().required('ROLE.VALIDATION.REQUIRED.ROLE_CODE').nullable(),
    status: Yup.string().required('ROLE.VALIDATION.REQUIRED.STATUS').nullable(),
    name: Yup.string().required('ROLE.VALIDATION.REQUIRED.ROLE_NAME').nullable(),
  });

  const group1 : ModifyInputGroup = {
    _subTitle: '',
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
    managementOrganization: {
      _type: 'select',
      label: 'ROLE.CREATE.LABEL.ROLE_NAME',
      placeholder: 'EMPTY',
      name: 'managementOrganization',
      onSearch: GetNames,
    },
    name: {
      _type: 'search-select',
      label: 'ROLE.CREATE.LABEL.ROLE_NAME',
      placeholder: 'EMPTY',
      onSearch: GetNames,
      onChange: (value, {setFieldValue, setFieldTouched, values}) => {
      }
    },
    status: {
      _type: 'custom',
      label: 'ROLE.CREATE.LABEL.ROLE_NAME',
      component: () => {
        return (
          <>
            <SwitchField></SwitchField>
          </>
        )
      }
    },
    checkboxs: {
      _type: 'checkbox',
      label: 'Doanh nghiệp sản xuất',
      optionData: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true },
      ]
    },
    checkbox: {
      _type: 'checkbox',
      label: 'Doanh nghiệp xuất khẩu',
      optionData: [
        { label: 'Red', value: 'Red' },
        { label: 'Green', value: 'Green' },
        
      ]
    }

  };

  const createForm : ModifyForm = {
    _header: createTitle,
    panel1: {
      _title: 'EMPTY',
      group1: group1,
    },
  };

  const editForm : ModifyForm = {
    _header: editTitle,
    panel1: {
      _title: 'EMPTY',
      group1: group1,
    },
  };

  const columns = React.useMemo(() => {
    return [
      {
        dataField: '',
        text: `${intl.formatMessage({id: 'ORDINAL'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any, rowIndex: number) => (<>{rowIndex + 1}</>),
      },
      {
        dataField: '_id',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.ROLE_CODE' })}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'name',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.ROLE_NAME'})}`,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'managementUnit.name',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.MANAGEMENT_ORGANIZATION'})}`,
        ...SortColumn,
        align: 'center',
      },
      
      {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.STATUS'})}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      {
        dataField: 'actions',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.ACTIONS'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
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
          }
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
        align: 'center',
      },
    ]
  }, []);

  const actions: any = {
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-8 fixed-btn-width',
        label: intl.formatMessage({id: 'COMMON_COMPONENT.MODIFY_DIALOG.SAVE_BTN'}),
        icon: <SaveOutlinedIcon/>,
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/account/role',
        className: 'btn btn-outline-primary fixed-btn-width',
        label: intl.formatMessage({id: 'COMMON_COMPONENT.MODIFY_DIALOG.CANCEL_BTN'}),
        icon: <CancelOutlinedIcon/>,
      }
    }
  };

  const searchModel: SearchModel = {
    _id: {
      type: 'string',
      label: 'ROLE.HEADER.LABEL.ROLE_CODE',
      placeholder: 'ROLE.HEADER.PLACEHOLDER.ROLE_CODE',
      // onSearch: GetIds,
    },
    name: {
      type: 'string',
      label: 'ROLE.HEADER.LABEL.ROLE_NAME',
      placeholder: 'ROLE.HEADER.PLACEHOLDER.ROLE_NAME',
      // onSearch: GetNames,
    },
    managementUnit: {
      type: 'string',
      name: 'managementUnit._id',
      label: 'ROLE.HEADER.LABEL.ORGANIZATION_MANAGEMENT',
      placeholder: 'ROLE.HEADER.PLACEHOLDER.ORGANIZATION_MANAGEMENT',
      // onSearch: GetManagementOrganization,
    },
    status: {
      type: 'search-select',
      label: 'ROLE.HEADER.LABEL.STATUS',
      placeholder: 'ROLE.HEADER.PLACEHOLDER.STATUS',
      onSearch: GetStatus,
    },

  }

  return (
    <>
      <MasterEntityDetailDialog
        title='ROLE.VIEW.HEADER'
        moduleName='ROLE.MODULE_NAME'
        show={showDetail}
        entity={detailEntity}
        renderInfo={roleDetailrenderInfo}
        onHide={() => {setShowDetail(false);}}
        size='sm'
      />

      <DeleteEntityDialog
        isShow={showDelete}
        moduleName='ROLE.MODULE_NAME'
        onHide={() => {setShowDelete(false);}}
        onDelete={deleteFn}
        entity={deleteEntity}
      />

      <Switch>
        <Route path='/account/role' exact={true}>
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={searchModel}
          />

          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              history.push(`${window.location.pathname}/new`);
              // setShowCreate(true);
            }}
            // entities={bodyEntities}
            entities={entities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
          />
        </Route>

        <Route path='/account/role/new'>
          <EntityCrudPage
            moduleName='ROLE.MODULE_NAME'
            entity={createEntity}
            onModify={update}
            formModel={createForm}
            actions={actions}
            validation={roleValidationSchema}
            loading={loading}
          />
        </Route>
        <Route path='/account/role/:code'>
          {(history: History, match: match<{code: string}>) => (
            <EntityCrudPage
              moduleName='ROLE.MODULE_NAME'
              entity={editEntity}
              onModify={update}
              code={match && match.params.code}
              formModel={editForm}
              actions={actions}
              validation={roleValidationSchema}
              loading={loading}
            />
          )}
        </Route>
      </Switch>

    </>
  )
}