import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch, useHistory } from 'react-router';
import { ActionsColumnFormatter, TickColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { MasterBody } from '../../common-library/common-components/master-body';
import { MasterHeader } from '../../common-library/common-components/master-header';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import { NormalColumn, SortColumn } from '../../common-library/common-consts/const';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './role.service';
import {RoleModel} from './role.model';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import { RenderInfoDetail } from '../../common-library/common-types/common-type';
import { DeleteEntityDialog } from '../../common-library/common-components/delete-entity-dialog';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import * as Yup from 'yup';
import {
  MasterBodyColumns,
  ModifyForm,
  ModifyInputGroup,
  SearchModel
} from "../../common-library/common-types/common-type";
import { Select } from 'antd';
import { Switch as SwitchField } from 'antd';

const { Option } = Select;
export default function ManagementOrganization() {
  const bodyTitle = 'ROLE.MASTER.BODY.TITLE';
  const createTitle = 'ROLE.CREATE.HEADER';

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

  const roleDetailrenderInfo : RenderInfoDetail = [
    {
      header: '',
      className: '',
      titleClassName: '',
      dataClassName: '',
      data: {
        managementOrganization: {
          title: 'ROLE.VIEW.LABEL.ORGANIZATION_MANAGEMENT',
        },
        _id: {
          title: 'ROLE.VIEW.LABEL.ROLE_CODE',
          
        },
        status: {
          title: 'ROLE.VIEW.LABEL.STATUS',
          
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

  const createForm : ModifyForm = {
    _header: createTitle,
    panel1: {
      _title: 'EMPTY',
      group1: {
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
        // name: {
        //   _type: 'search-select',
        //   label: 'ROLE.CREATE.LABEL.ROLE_NAME',
        //   placeholder: 'EMPTY',
        //   onSearch: console.log(),
        //   onChange: (value, {setFieldValue, setFieldTouched, values}) => {
        //   }
        // },
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
      }
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
        dataField: 'email',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.MANAGEMENT_ORGANIZATION'})}`,
        ...SortColumn,
        align: 'center',
      },
      
      {
        dataField: 'phone',
        text: `${intl.formatMessage({id: 'ROLE.MASTER.TABLE.STATUS'})}`,
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
            history.push(window.location.pathname + entity._id);
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
          {/* <MasterHeader
          /> */}

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
      </Switch>

    </>
  )
}