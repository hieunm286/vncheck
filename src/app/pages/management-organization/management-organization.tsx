import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { ActionsColumnFormatter, TickColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { MasterTable } from '../../common-library/common-components/master-table';
import MasterTreeStructure from '../../common-library/common-components/master-tree-structure';
import { DefaultPagination, NormalColumn, SortColumn } from '../../common-library/common-consts/const';
import { InitMasterProps } from '../../common-library/helpers/common-function';
import MultiLevelSaleBody from '../multilevel-sale/multi-sale-body';
import { UserModel } from '../user/user.model';
import { ManagementOrganizationModel } from './management-organization.model';
import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './management-organization.service';
import * as UserService from '../user/user.service';
import * as RoleService from '../role/role.service';
import { AxiosResponse } from 'axios';
import { RoleModel } from '../role/role.model';
import _ from 'lodash';

export default function ManagementOrganization() {

  const [userEntities, setUserEntities] = useState<UserModel[]>([]);
  const [convertedEntities, setConvertedEntities] = useState<any[]>([]);

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
  } = InitMasterProps<ManagementOrganizationModel>({
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

  const getDataConverted = () => {
    // console.log(entities)
    // if(entities && entities.length > 0) {
    //   const res =  entities.map((entity: any) => {
    //     const queryParams = {managementUnit: entity._id};
    //     RoleService.GetAll({queryProps: queryParams, paginationProps: DefaultPagination, }).then((res : AxiosResponse<{data: RoleModel[]; paging: number}>) => {
    //       return {...entity, children: res.data.data};
    //       // _entities.push(_entity);
    //       // console.log(_entities.length)
    //     })
    //   });
    //   console.log(res)
    //   return res;
    // } else {
    //   return entities;
    // }
    return entities;
 }

  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);



  useEffect(() => {
    if(entities && entities.length > 0) {

      const promises: Promise<AxiosResponse<any>> [] = entities.map((entity: any) => {
        const queryParams = {managementUnit: {_id: entity._id }};
        const promise: Promise<AxiosResponse<any>> = RoleService.GetAll({queryProps: queryParams, paginationProps: DefaultPagination, });
        return promise;
      });

      
      Promise.all(promises).then((responses: AxiosResponse<{data: RoleModel[]; paging: number}>[]) => {
        const _convertedEntities: any[] = responses.map((response: AxiosResponse<{data: RoleModel[]; paging: number}>) => {
          const index = responses.indexOf(response)
          return {...entities[index], children: response.data.data};
        });
        setConvertedEntities(_convertedEntities);
      });

    } 
  }, [entities]);

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
        dataField: 'fullName',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.DISPLAY_NAME'})}`,
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
        dataField: 'phone',
        text: `${intl.formatMessage({id: 'USER.MASTER.TABLE.PHONE'})}`,
        ...SortColumn,
        align: 'center',
      },
    ]
  }, []);


  const mockManagementOrganizations = [
    {
      name: 'Phòng Giám Đốc',
      children: [
        {
          name: 'Tổng Giám Đốc'
        },
      ],
    },
    {name: 'Phòng kế hoạch',},
    {name: 'Phòng kĩ thuật',},
    {name: 'Phòng sản xuất',},
    {name: 'Đơn vị vận chuyển',},
    {name: 'Đại lý',},
    {name: 'Cửa hàng',},
  ];

  const TreeBody = [
    {
      // name: '',
      // title: 'MULTIVELEVEL_SALE_TREE_DATA',
      type: 'Tree',
      // data: mockManagementOrganizations,
      // data: getDataConverted(),
      data: convertedEntities,
    },
    {
      // name: '',
      title: 'MANAGEMENT_ORGANIZATION.MASTER.TABLE.STAFF_LIST',
      type: 'Table',
      data: userEntities,
      prop: {
        columns: columns,
        total: userEntities.length,
        loading: false,
        paginationParams: paginationProps,
        setPaginationParams: setPaginationProps,
        onSelectMany: setSelectedEntities,
        selectedEntities: selectedEntities,
      },
    },
  ];

  return (
    <>
          <MultiLevelSaleBody
            title='EMPTY'
            body={TreeBody}
            onFetchEntities={(entity: any) => {
              const getQueryParams = (entity: any): object => {
                if(entity.children && entity.children.length) {
                  const roleIds = entity.children.map((entity: any) => {
                    return entity._id;
                  });
                  return {role: roleIds};
                }
                return {role: entity._id};
              }
              
              UserService.GetAll({queryProps: getQueryParams(entity), paginationProps: DefaultPagination, })
                .then((res : AxiosResponse<{data: UserModel[]; paging: number}>) => {
                // .then((res : AxiosResponse<{data: any}>) => {
                console.log(res.data.data)
                setUserEntities(res.data.data);
              })
            }}
          />
    </>
  )
}