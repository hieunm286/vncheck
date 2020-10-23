import React, {useCallback, useEffect, useState} from 'react';
import {BasicUnitUIProvider} from './basic-unit-ui-context';
import {useIntl} from 'react-intl';
import {InitQueryParams} from "../../common-library/helpers/common-function";
import {Count, Create, Delete, DeleteMany, GetAll, Update} from "./purchase-order.service";
import {PurchaseOrderModel} from "./purchase-order.model";
import {FilterDefault, SortDefault} from "../../common-library/common-const/const";
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterEntityDetailDialog} from '../../common-library/common-components/master-entity-detail-dialog';
import {MasterBody} from "../../common-library/common-components/master-body";
import {HeaderSortingClasses, SortCaret} from "../../common-library/helpers/table-sorting-helpers";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import {ActionsColumnFormatter} from "../../common-library/common-components/actions-column-formatter";

function PurchaseOrder() {
  const intl = useIntl();
  const events = {};
  const defaultSorted = [...SortDefault];
  const initialFilter = {...FilterDefault}
  const [entities, setEntities] = useState<PurchaseOrderModel[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<PurchaseOrderModel>(null as any);
  const [editEntity, setEditEntity] = useState<PurchaseOrderModel>(null as any);
  const [selectedEntities, setSelectedEntities] = useState<PurchaseOrderModel[]>([]);
  const [detailEntity, setDetailEntity] = useState<PurchaseOrderModel>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  
  const [error, setError] = useState('');
  const [ids, setIds] = useState([]);
  const {queryParams, setQueryParams, setQueryParamsBase} = InitQueryParams(initialFilter);
  // const [queryParams, setQueryParamsBase] = useState(initialFilter);
  // const setQueryParams = InitQueryParams(setQueryParamsBase)
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const getAll = useCallback(() => {
    setLoading(true);
    GetAll(queryParams)
      .then(res => {
        Count(queryParams).then(ress => {
          setIds([]);
          setEntities(res.data);
          setLoading(false);
          setTotal(ress.data)
        })
      })
      .catch(error => {
        console.log(error);
      });
  }, [queryParams]);
  
  useEffect(() => {
    setIds([]);
    getAll();
  }, [queryParams]);
  //
  // const showModal = (data: any, action: string) => {
  //   setError('');
  //   setShow({...show, [action]: true});
  //   setModifyEntity(data);
  // };
  //
  // const hideModal = (action: string) => {
  //   setError('');
  //   setShow({...show, [action]: false});
  // };
  
  const editBasicUnit = (value: any) => {
    const updateUnit: any = [...entities];
    updateUnit.forEach((el: { code: any; name: any; status: any }) => {
      if (el.code === value.code) {
        el.code = value.code;
        el.name = value.name;
        el.status = value.status;
      }
    });
    setEntities(updateUnit);
    
    console.log(value);
    
    Update(value)
      .then(res => {
        // setShow({edit: false, delete: false, detail: false, deleteMany: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const addBasicUnit = (values: any) => {
    const updateUnit = [...entities];
    const index = updateUnit.findIndex(el => el.code === values.code);
    if (index !== -1) {
      setError(intl.formatMessage({id: 'BASIC_UNIT.ERROR.CODE.EXISTS'}));
      return;
    }
    updateUnit.push(values);
    setEntities(updateUnit);
    
    Create(values)
      .then(res => {
        setError('');
        // setShow({edit: false, delete: false, detail: false, deleteMany: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const deleteFn = (code: string) => {
    const updateUnit = entities.filter((el: { code: string }) => el.code !== code);
    setEntities(updateUnit);
    Delete(code).then(res => {
      // setShow({edit: false, delete: false, detail: false, deleteMany: false});
    });
  };
  
  const deleteManyBasicUnit = () => {
    setLoading(true);
    DeleteMany(ids)
      .then(res => {
        console.log(res);
        setError('');
        // setShow({edit: false, delete: false, detail: false, deleteMany: false});
        GetAll(queryParams)
          .then(res => {
            setIds([]);
            setTotal(res.data.total);
            setEntities(res.data.result);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const search = (data: { code: string; name: string }) => {
    setLoading(true);
    GetAll(data)
      .then(res => {
        setIds([]);
        setTotal(res.data.total);
        setEntities(res.data.result);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  console.log(queryParams)
  const columns = [
    {
      dataField: 'ordinal',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + (queryParams.page as any - 1) * (queryParams.limit as any)}</p>),
      style: {paddingTop: 20},
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'})}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS'})}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    
    {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER',})}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
      headerClasses: 'text-center',
      classes: 'text-center pr-0',
      
    },
    {
      dataField: 'status',
      text: `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${intl.formatMessage({
        id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS',
      })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
      headerClasses: 'text-center',
      classes: 'text-center pr-0',
      formatter: (cell: any, row: any) =>
        row.status === 1 ? (
          <CheckCircleIcon style={{color: '#1DBE2D'}}/>
        ) : (
          <IndeterminateCheckBoxIcon/>
        ),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        onShowDetail: setShowDetail,
        // onDelete: setShowDelete,
        // onEdit: setShowEdit,
        // openDeleteDialog: showModal,
        // openDetailDialog: showModal,
        // show: show,
        detailTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.DETAIL.TITLE'})}`,
        editTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.EDIT.TITLE'})}`,
        deleteTitle: `${intl.formatMessage({id: 'BASIC_UNIT.CARD.TABLE.ACTION.DELETE.TITLE'})}`,
      },
      classes: 'text-center pr-0',
      headerClasses: 'text-center',
      style: {
        minWidth: '130px',
      },
    },
  ];
  
  
  const masterEntityDetailDialog = {
    titles: {
      code: 'BASIC_UNIT.CARD.DETAIL_DIALOG.CODE',
      name: 'BASIC_UNIT.CARD.DETAIL_DIALOG.NAME',
      status: 'BASIC_UNIT.CARD.DETAIL_DIALOG.NAME',
    }
  }
  return (
    <BasicUnitUIProvider basicUnitUIEvents={events}>
      {/*<BasicUnitDialog*/}
      {/*  show={show}*/}
      {/*  hideModal={hideModal}*/}
      {/*  unitForEdit={modifyEntity}*/}
      {/*  editBasicUnit={editBasicUnit}*/}
      {/*  addBasicUnit={addBasicUnit}*/}
      {/*  error={error}*/}
      {/*/>*/}
      <MasterEntityDetailDialog {...masterEntityDetailDialog} show={showDetail}
                                onClose={() => {
                                  setShowDetail(false)
                                }}
                                entity={detailEntity}/>
      {/*<DeleteDialog*/}
      {/*  show={show}*/}
      {/*  hideModal={hideModal}*/}
      {/*  entity={modifyEntity}*/}
      {/*  deleteFn={deleteFn}/>*/}
      {/*<DeleteManyDialog*/}
      {/*  ids={ids}*/}
      {/*  show={show}*/}
      {/*  hideModal={hideModal}*/}
      {/*  unitForEdit={modifyEntity}*/}
      {/*  loading={loading}*/}
      {/*  deleteManyBasicUnit={deleteManyBasicUnit}*/}
      {/*/>*/}
      <MasterHeader title={'PURCHASE_ORDER.MASTER.HEADER.TITLE'} onSearch={search}/>
      <MasterBody
        onShowDetail={(entity) => {
          setDetailEntity(entity);
          setShowDetail(true)
        }}
        onEdit={(entity) => {
          setEditEntity(entity);
          setShowEdit(true)
        }}
        onDelete={(entity) => {
          setDeleteEntity(entity);
          setShowDelete(true)
        }}
        selectedEntities={selectedEntities}
        onSelectMany={setSelectedEntities}
        entities={entities}
        total={total}
        columns={columns}
        loading={loading}
        queryParams={queryParams}
        setQueryParamsBase={setQueryParamsBase}
        ids={ids}
        setIds={setIds}
        setQueryParams={setQueryParams}
      />
    </BasicUnitUIProvider>
  );
}

export default PurchaseOrder;