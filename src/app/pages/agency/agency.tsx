import React, { useEffect } from "react";
import {useIntl} from 'react-intl';


import {InitMasterProps} from "../../common-library/helpers/common-function-promise";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import { AgencyModel } from './agency.model';
import { MasterHeader } from "../../common-library/common-components/master-header";
import { MasterBody } from "../../common-library/common-components/master-body";
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';

import { NormalColumn, SortColumn } from '../../common-library/common-consts/const';

import {ModifyModel, SearchModel} from "../../common-library/common-types/common-type";

import { DeleteEntityDialog } from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import * as Yup from "yup";
import { FormGroup } from "../../common-library/common-components/form-group";
import { getUserById } from "../account/_redux/user-crud";
import * as agencyTypeService from "../agency-type-2/agency-type.service";

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
    console.log(entities);
  }, [paginationProps, trigger, filterProps]);

  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
  const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';

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
      text: 'PURCHASE_ORDER.MASTER.TABLE.',
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
        console.log(row)
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
      formatter: (cell: any, row: any) => row.status == 1 ?
        (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<IndeterminateCheckBoxIcon/>),
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
              Promise.all(
                [getUserById(res.data.owner),
                  agencyTypeService.Get(
                    {_id: res.data.type, code: '', name: '', status: true}
                  )
                ]
              ).then(values => {
                const agency = res.data;
                const agencyOwner = values[0].data;
                const agencyType = values[1].data;
                setDetailEntity(
                  { ...agency, owner: agencyOwner, type: agencyType }
                );
                setEditEntity(
                  { ...agency, owner: agencyOwner, type: agencyType }
                );
              });
              // getUserById(res.data.owner)
              //   .then(userRes => {
              //     const agency = res.data;
              //     const agencyOwner = userRes.data;
              //     setDetailEntity({...agency, owner: agencyOwner});
              //     setEditEntity({...agency, owner: agencyOwner});
              // });
              // console.log(res);
              // agencyTypeService.Get(
              //   {_id: res.data.type, code: '', name: '', status: true}
              //   )
              // .then(res => {
              //   console.log(res);
              // })
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
          setEditEntity(entity);
          setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];

  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
      keyField: 'code'
    }, name: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL',
      keyField: 'name'
    },
  };



  const agencySchema = Yup.object<AgencyModel>().shape({
    // code: Yup.string().required('Vui lòng nhập mã đơn vị'),
    // agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
    // phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  });

  const modifyModel: ModifyModel = {
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
    { keyField: 'code', title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' },
    { keyField: 'address.state', title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
    { keyField: 'address.city', title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
    { keyField: 'address.district', title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN' },
    { keyField: 'phone', title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' },
    { keyField: 'owner.username', title: 'PURCHASE_ORDER.MASTER.TABLE.OWNER' },
    { keyField: 'owner.email', title: 'PURCHASE_ORDER.MASTER.TABLE.EMAIL' },
    { keyField: 'type.name', title: 'AGENCY_TYPE.MASTER.TABLE.NAME' },
    { keyField: 'type.code', title: 'AGENCY_TYPE.MASTER.TABLE.CODE' },
    { keyField: 'taxId', title: 'PURCHASE_ORDER.MASTER.TABLE.TAX_ID' },
    { keyField: 'status', title: 'PURCHASE_ORDER.MASTER.TABLE.STATUS' },
  ];

  return (
    <>
      {/* <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} */}
                    {/* initValue={filterProps}/> */}
      <MasterBody
        onCreate={() => {
          setCreateEntity(null);
          setShowCreate(true);
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

      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
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
      />
      {/* <ModifyEntityDialog
        isShow={showCreate}
        entity={createEntity}
        onModify={add}
        title={createTitle}
        modifyModel={modifyModel}
        validationModel={agencySchema}
        onHide={() => {
          setShowCreate(false);
        }}
      />
      <ModifyEntityDialog
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        modifyModel={modifyModel}
        validationModel={agencySchema}
        onHide={() => {
          setShowEdit(false);
        }}
      /> */}

      <FormGroup
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
          setShowDetail(false);
        }}
      />
    </>
  );
}

export default AgencyPage;