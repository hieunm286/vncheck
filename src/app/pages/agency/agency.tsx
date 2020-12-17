import React, { useEffect, Fragment, useState } from "react";
import {useIntl} from 'react-intl';


import {GetHomePage, InitMasterProps} from "../../common-library/helpers/common-function";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import { AgencyModel } from './agency.model';
import { MasterHeader } from "../../common-library/common-components/master-header";
import { MasterBody } from "../../common-library/common-components/master-body";
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';

import { DefaultPagination, NormalColumn, SortColumn } from '../../common-library/common-consts/const';

import {ModifyModel, SearchModel} from "../../common-library/common-types/common-type";

import { DeleteEntityDialog } from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from '../../common-library/common-components/modify-entity-dialog';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import * as Yup from "yup";
import {  MasterEntityDetailAgency } from "../../common-library/common-components/master-entity-detail-dialog-agency";
import { getUserById } from "../account/_redux/user-crud";
import * as agencyTypeService from "../agency-type-2/agency-type.service";
import ModifyEntityPageAgency from './helpers/modify-entity-page-agency';
import EntityCrudPageAgency from "./helpers/entity-crud-page-agency";
import * as AgencyService from './agency.service';
import { ConvertStatusToBoolean, ConvertStatusToString, ConvertToTreeNode, GenerateAllFormField } from '../../common-library/helpers/common-function';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { convertToServer } from "./helpers/convert-data-model";
import { mockAgency, initAgency } from "./helpers/mock-entity";
import { agencySearchModel, allFormButton, agencySchema, masterEntityDetailDialog } from './defined/const';
import * as StoreLevelService from '../multilevel-sale/multilevel-sale.service';
import * as RoleService from './helpers/role.service';
import { ToastContainer, toast } from 'react-toastify';



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
    error,
    setError,
    add, update, get, deleteMany, deleteFn, getAll, refreshData,
    addPromise,
    updatePromise,
    deletePromise,
    deleteManyPromise,
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
    // setEntities(mock_entities);
    // setEntities([{}]);
  }, [paginationProps, trigger, filterProps]);

  const history = useHistory();

  const moduleName = 'AGENCY.MODULE_NAME';
  const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
  const detailTitle = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE.2';
  // const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
  // const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
  const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';

  const columns = [
    {
      dataField: 'ordinal',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <React.Fragment>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</React.Fragment>
      ),
      // style: {paddingTop: 20},
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.NAME_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'storeLevel',
      text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.STORE_LEVEL_COLUMN'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => (
        <React.Fragment>{row.storeLevel.name}</React.Fragment>
      ),
      ...SortColumn
    },
    {
      dataField: 'address',
      text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
      formatter: (cell: any, row: any, rowIndex: number) => {
        return (
        <React.Fragment>{row.address.district + ',' + row.address.city + ',' + row.address.state}</React.Fragment> )
      },
      ...SortColumn
    },
    {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'})}`,
      ...SortColumn,
      formatter: (cell: any, row: any) => row.status === "1" ?
        (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<CheckCircleIcon style={{color: '#C4C4C4'}}/>),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: AgencyModel) => {
          get(entity)
            // .then(res => {
            //   setDetailEntity(res.data);
            // })
            // .catch(error => {
            //   console.log(error);
            // });
          setShowDetail(true);
        },
        onDelete: (entity: AgencyModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: AgencyModel) => {
          // setEditEntity(entity);
          // get(entity);
          setEditEntity(ConvertStatusToBoolean(entity));
          history.push(`${window.location.pathname}/${entity._id}`) // setShowEdit(true);
          // history.push(`${entity._id}`) // setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];

  const modifyModel = [
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.AGENCY_INFO'}).toUpperCase(),
      data: {
        code: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_CODE' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_CODE' }),
          // disabled: editEntity,
          disabled: true
        },
        name: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_NAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_NAME' }),
        },
        // storeLevel: {
        //   type: 'SearchSelect',
        //   placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
        //   label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
        //   service: StoreLevelService,
        //   keyField: 'name'
        // },
        storeLevel: {
          type: 'TreeSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
          service: StoreLevelService,
          keyField: 'name',
          required: true,
        },
        state: {
          type: 'stateSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.STATE' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.STATE' }), 
          required: true,
        },
        city: {
          type: 'citySelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.CITY' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.CITY' }), 
          required: true,
        },
        district: {
          type: 'districtSelect',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.DISTRICT' }), 
          required: true,
        },
        detailAddress: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.AGENCY_ADDRESS' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AGENCY_ADDRESS' }),
        },
        status: {
          type: 'boolean',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.STATUS' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.STATUS' }),
        },
        phoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
          label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        },
        taxId: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.TAX_ID' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.TAX_ID' }),
        },
        image: {
          type: 'image',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.IMAGE' }),
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
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.USERNAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.USERNAME' }),
          disabled: !!editEntity,
        },
        ownerName: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.NAME' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.NAME' }),
        },
        ownerPhoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.OWNER_PHONE' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.OWNER_PHONE' }),
        },
        email: {
          type: 'string',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.EMAIL' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.EMAIL' }),
        },
        gender: {
          type: 'option',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.GENDER' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.GENDER' }),
          required: true,
        },
        birthDay: {
          type: 'Datetime',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.BIRTH_DAY' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.BIRTH_DAY' }),
          required: true,
        },
        roleName: {
          type: 'SearchSelect',
          placeholder: 'AGENCY.EDIT.PLACEHOLDER.ROLE_NAME',
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.ROLE_NAME' }),
          service: RoleService,
          keyField: 'name',
          required: true,
        },
        avatar: {
          type: 'image',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.AVATAR' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.AVATAR' }),
        },
      },
    },
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.SHIPPING_ADDRESS'}).toUpperCase(),
      data: {
        shippingAddress: {
          type: 'radioGroup', // type: 'array',
          placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
          label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        },
        defaultShippingAddress: {
          type: 'display',
          placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.DEFAULT_SHIPPING_ADDRESS' }),
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.DEFAULT_SHIPPING_ADDRESS' }),
        }
      }
    }
  ];

  const formPart: any = {
    form_1: {
      // title: 'Thông tin đơn vị bán hàng',
      modifyModel: modifyModel,
      // header: 'THÔNG TIN ĐƠN VỊ BÁN HÀNG',
    },
    // form_2: {
    //   title: 'Thông tin quản trị',
    //   modifyModel: modifyModel_2,
    // },
    // form_3: {
    //   title: 'Thông tin thu hoạch',
    //   modifyModel: modifyModel_3,
    // },
    // form_4: {
    //   title: "Thông tin test",
    //   modifyModel: modifyModel_4
    // },
    // form_5: {
    //   title: "xxx",
    //   modifyModel: modifyModel_2
    // }
  };
  
  const allFormField: any = {
    ...GenerateAllFormField(modifyModel)
  };

  const notify = (error: string) => {
    toast.error(`😠 ${error}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifySuccess = () => {
    toast.success(`😠 Thành công`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const crudSuccess = () => {
    refreshData();
    notifySuccess();
    history.push(GetHomePage(window.location.pathname));
    history.push('/agency')
    // history.goBack()

  }

  const crudFail = (error: any) => {
    setError(error.response.data || error.message || JSON.stringify(error))
    notify(intl.formatMessage({id: error.response.data || error.message || JSON.stringify(error)}));
  }

  const [treeData, setTreeData] = useState<any>();
  
  const treeLoadOptions = async (getAll: (t:any)=> any) => {
    const queryProps: any = {};
    // queryProps[keyField] = search;
    // queryProps =
  
    const entities = await getAll({});
    return entities.data;
  };
  
  useEffect(() => {
    treeLoadOptions(StoreLevelService.GetAll) // treeLoadOptions(modifyModel.data['storeLevel'].service)
      .then((res: any) => {
        // console.log(res);
        // console.log(DataExample)
        const treeData = ConvertToTreeNode(res);
        setTreeData(treeData);
      });
  }, []);
  

  return (
    <Fragment>


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
            onReset={() => {
              setPaginationProps(DefaultPagination)
              setFilterProps({})
            }}
            searchModel={agencySearchModel}
            treeData={treeData}
            initValue={{
              code: '',
              lot: '',
              subLot: '',
              address: {
                state: '',
                city: '',
                district: ''
              }
              // agencyAddress: '',
              // agency: null,
              // date: '',
              // count: 1,
              // tree: undefined,
              // tree2: undefined,
            }}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setEditEntity(null);
              setCreateEntity(initAgency);
              // setCreateEntity(mockAgency)
              history.push('/agency/new');// setShowCreate(true);
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
        <Route path="/agency/new">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={createEntity}
              onModify={(values) => {
                return addPromise(ConvertStatusToString(convertToServer(values)))
              }}
              onClickReturn={refreshData}
              // title={updateTitle}
              //  modifyModel={modifyModel}
              // reduxModel="purchaseOrder"
              code={match && match.params.id}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={agencySchema}
              crudSuccess={crudSuccess}
              crudFail={crudFail}
            />
          )}
        </Route>
        <Route path="/agency/:code">
          {({ history, match }) => (
            <EntityCrudPageAgency
              entity={editEntity}
              onModify={(values) => {
                return updatePromise(ConvertStatusToString(convertToServer(values)))
              }}
              onClickReturn={refreshData}
              code={match && match.params.code}
              get={AgencyService.GetById}
              formPart={formPart}
              allFormField={allFormField}
              allFormButton={allFormButton}
              validation={agencySchema}
              crudSuccess={crudSuccess}
              crudFail={crudFail}
            />
          )}
        </Route>
      </Switch>

      <MasterEntityDetailAgency
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onClose={() => {
          setShowDetail(false);
        }}
        title={detailTitle}
      />
    </Fragment>
  );
}

export default AgencyPage;