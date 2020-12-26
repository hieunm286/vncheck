import React, {Fragment, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';


import {GenerateAllFormField, InitMasterProps} from "../../common-library/helpers/common-function";

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import {AgencyModel} from './agency.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';

import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';


import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {Route, Switch, useHistory} from 'react-router-dom';
import {initAgency} from "./helpers/mock-entity";
import {agencySearchModel} from './defined/const';
import * as StoreLevelService from '../multilevel-sale/multilevel-sale.service';
import * as RoleService from './helpers/role.service';
import {RenderInfoDetailDialog} from "../../common-library/common-types/common-type";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";

const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';


function AgencyPage() {
  const history = useHistory();
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
  }, [paginationProps, filterProps]);
  
  const columns = useMemo(() => {
    return {
      code: {
        dataField: 'code',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.CODE_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      name: {
        dataField: 'name',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.NAME_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      storeLevel: {
        dataField: 'storeLevel.name',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.STORE_LEVEL_COLUMN'})}`,
        ...SortColumn,
        align: 'center',
      },
      address: {
        dataField: 'address',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
        formatter: (address: any, row: any, rowIndex: number) => {
          const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
          return (<>{addressString}</>);
        },
        ...SortColumn,
        align: 'center',
      },
      status: {
        dataField: 'status',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.STATUS_COLUMN'})}`,
        formatter: TickColumnFormatter,
        ...SortColumn,
        align: 'center',
      },
      action: {
        dataField: 'action',
        text: `${intl.formatMessage({id: 'AGENCY.MASTER.TABLE.ACTION_COLUMN'})}`,
        formatter: ActionsColumnFormatter,
        formatExtraData: {
          intl,
          onShowDetail: (entity: AgencyModel) => {
            get(entity);
            setShowDetail(true);
            setDetailEntity(entity);
          },
          onDelete: (entity: AgencyModel) => {
            setDeleteEntity(entity);
            setShowDelete(true);
          },
          onEdit: (entity: AgencyModel) => {
            history.push(`${window.location.pathname}/${entity._id}`);
          },
        },
        ...NormalColumn,
        style: {minWidth: '130px'},
      },
    }
  }, []);
  
  
  const masterEntityDetailDialog: RenderInfoDetailDialog = useMemo((): RenderInfoDetailDialog => [
    {
      header: 'AGENCY.DETAIL_DIALOG.SHIPPING.SUBTITLE',
      className: 'col-7',
      data: {
        code: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.CODE'},
        name: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.NAME'},
        address: {
          title: 'AGENCY.DETAIL_DIALOG.SHIPPING.ADDRESS',
          formatter: (address: any, row: any, rowIndex: number) => {
            const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
            return (<>{addressString}</>);
          }
        },
      },
    }, {
      header: 'EMPTY',
      className: 'col-5 pl-xl-15 pl-md-10 pl-5',
      data: {
        phone: {title: 'AGENCY.DETAIL_DIALOG.SHIPPING.PHONE_NUMBER'},
        status: {
          title: 'AGENCY.DETAIL_DIALOG.SHIPPING.STATUS',
          formatter: TickColumnFormatter
        },
      },
    },
    {
      header: 'AGENCY.DETAIL_DIALOG.OWNER.SUBTITLE',
      className: 'col-12',
      dataClassName: 'col-9',
      titleClassName: 'col-3',
      data: {
        fullName: {
          title: 'AGENCY.DETAIL_DIALOG.OWNER.FULL_NAME',
          keyField: 'owner.fullName'
        }, email: {
          title: 'AGENCY.DETAIL_DIALOG.OWNER.EMAIL',
          keyField: 'owner.email'
        }, phone: {
          title: 'AGENCY.DETAIL_DIALOG.OWNER.PHONE_NUMBER',
          keyField: 'owner.phone'
        },
      },
    }, {
      header: 'AGENCY.DETAIL_DIALOG.SHIPPING_ADDRESS',
      className: 'col-12',
      dataClassName: 'col-12',
      data: {
        shippingAddress: {
          keyField: 'shippingAddress',
          formatter: (addresses: any[], row: any, rowIndex: number) => {
            let address = addresses.find(address => address.isDefault);
            address = address ?? addresses[0]
            const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
            return (<>{addressString}<span style={{color: '#B5B5C3'}} className={'ml-5'}>
                                [{intl.formatMessage({id: 'AGENCY.VIEW.LABEL.DEFAULT_SHIPPING_ADDRESS'})}]
                              </span></>);
          },
        }
      },
    }
  ], []);
  
  
  const modifyModel = [
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.AGENCY_INFO'}).toUpperCase(),
      data: {
        code: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_CODE'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_CODE'}),
          // disabled: editEntity,
          disabled: true
        },
        name: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_NAME'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_NAME'}),
        },
        // storeLevel: {
        //   type: 'search-select',
        //   placeholder: intl.formatMessage({ id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL' }),
        //   label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL' }), 
        //   service: StoreLevelService,
        //   keyField: 'name'
        // },
        storeLevel: {
          type: 'tree-select',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.SELL_GOOD_LEVEL'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.SELL_GOOD_LEVEL'}),
          service: StoreLevelService,
          keyField: 'name',
          required: true,
        },
        state: {
          type: 'stateSelect',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.STATE'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.STATE'}),
          required: true,
        },
        city: {
          type: 'citySelect',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.CITY'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.CITY'}),
          required: true,
        },
        district: {
          type: 'districtSelect',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.DISTRICT'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.DISTRICT'}),
          required: true,
        },
        detailAddress: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.AGENCY_ADDRESS'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AGENCY_ADDRESS'}),
        },
        status: {
          type: 'boolean',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.STATUS'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.STATUS'}),
        },
        phoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
          label: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
        },
        taxId: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.TAX_ID'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.TAX_ID'}),
        },
        image: {
          type: 'image',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.IMAGE'}),
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
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.USERNAME'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.USERNAME'}),
          disabled: !!editEntity,
        },
        ownerName: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.NAME'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.NAME'}),
        },
        ownerPhoneNumber: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.OWNER_PHONE'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.OWNER_PHONE'}),
        },
        email: {
          type: 'string',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.EMAIL'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.EMAIL'}),
        },
        gender: {
          type: 'option',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.GENDER'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.GENDER'}),
          required: true,
        },
        birthDay: {
          type: 'date-time',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.BIRTH_DAY'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.BIRTH_DAY'}),
          required: true,
        },
        roleName: {
          type: 'search-select',
          placeholder: 'AGENCY.EDIT.PLACEHOLDER.ROLE_NAME',
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.ROLE_NAME'}),
          service: RoleService,
          keyField: 'name',
          required: true,
        },
        avatar: {
          type: 'image',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.AVATAR'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.AVATAR'}),
        },
      },
    },
    {
      title: intl.formatMessage({id: 'AGENCY.EDIT.HEADER.SHIPPING_ADDRESS'}).toUpperCase(),
      data: {
        shippingAddress: {
          type: 'radioGroup', // type: 'array',
          placeholder: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
          label: intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'}),
        },
        defaultShippingAddress: {
          type: 'display',
          placeholder: intl.formatMessage({id: 'AGENCY.EDIT.PLACEHOLDER.DEFAULT_SHIPPING_ADDRESS'}),
          label: intl.formatMessage({id: 'AGENCY.EDIT.LABEL.DEFAULT_SHIPPING_ADDRESS'}),
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
  //
  // const crudSuccess = () => {
  //   refreshData();
  //   notifySuccess();
  //   history.push(GetHomePage(window.location.pathname));
  //   history.push('/agency')
  //   // history.goBack()
  //
  // }
  //
  // const crudFail = (error: any) => {
  //   setError(error.response.entity || error.message || JSON.stringify(error))
  //   notify(intl.formatMessage({id: error.response.entity || error.message || JSON.stringify(error)}));
  // }
  
  const [treeData, setTreeData] = useState<any>();
  
  const treeLoadOptions = async (getAll: (t: any) => any) => {
    const queryProps: any = {};
    // queryProps[keyField] = search;
    // queryProps =
    
    const entities = await getAll({});
    return entities.entity;
  };
  
  // useEffect(() => {
  //   treeLoadOptions(StoreLevelService.GetAll) // treeLoadOptions(modifyModel.data['storeLevel'].service)
  //     .then((res: any) => {
  //       // console.log(res);
  //       // console.log(DataExample)
  //       const treeData = ConvertToTreeNode(res);
  //       setTreeData(treeData);
  //     });
  // }, []);
  //
  
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
            searchModel={agencySearchModel}
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
        {/*<Route path="/agency/new">*/}
        {/*  {({ history, match }) => (*/}
        {/*    <EntityCrudPageAgency*/}
        {/*      entity={createEntity}*/}
        {/*      onModify={add}*/}
        {/*      onClickReturn={refreshData}*/}
        {/*      // title={updateTitle}*/}
        {/*      //  modifyModel={modifyModel}*/}
        {/*      // reduxModel="purchaseOrder"*/}
        {/*      code={match && match.params.id}*/}
        {/*      get={AgencyService.GetById}*/}
        {/*      formPart={formPart}*/}
        {/*      allFormField={allFormField}*/}
        {/*      allFormButton={allFormButton}*/}
        {/*      validation={agencySchema}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Route>*/}
        {/*<Route path="/agency/:code">*/}
        {/*  {({ history, match }) => (*/}
        {/*    <EntityCrudPageAgency*/}
        {/*      entity={editEntity}*/}
        {/*      onModify={update}*/}
        {/*      onClickReturn={refreshData}*/}
        {/*      code={match && match.params.code}*/}
        {/*      get={AgencyService.GetById}*/}
        {/*      formPart={formPart}*/}
        {/*      allFormField={allFormField}*/}
        {/*      allFormButton={allFormButton}*/}
        {/*      validation={agencySchema}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Route>*/}
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
    </Fragment>
  );
}

export default AgencyPage;