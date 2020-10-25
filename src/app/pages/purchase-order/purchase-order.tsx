import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './purchase-order.service';
import {PurchaseOrderModel} from './purchase-order.model';
import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterEntityDetailDialog} from '../../common-library/common-components/master-entity-detail-dialog';
import {MasterBody} from '../../common-library/common-components/master-body';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {DeleteDialog} from '../../common-library/common-components/delete-dialog';
import DeleteManyDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from './modify-entity-dialog';
import {SearchModel} from "../../common-library/common-types/common-type";

function PurchaseOrder() {
  const intl = useIntl();
  const [entities, setEntities] = useState<PurchaseOrderModel[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<PurchaseOrderModel>(null as any);
  const [editEntity, setEditEntity] = useState<PurchaseOrderModel | null>(null as any);
  const [selectedEntities, setSelectedEntities] = useState<PurchaseOrderModel[]>([]);
  const [detailEntity, setDetailEntity] = useState<PurchaseOrderModel>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [paginationProps, setPaginationProps] = useState(DefaultPagination);
  const [filterProps, setFilterProps] = useState({name: '', code: ''});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  
  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'PURCHASE_ORDER.MASTER.HEADER.TITLE';
  const getAll = useCallback((filterProps?) => {
    setLoading(true);
    GetAll({paginationProps, queryProps: filterProps})
      .then(getAllResponse => {
        Count(paginationProps).then(countResponse => {
          setEntities(getAllResponse.data);
          setLoading(false);
          setTotal(countResponse.data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [paginationProps]);
  
  useEffect(() => {
    getAll(filterProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationProps, trigger, filterProps]);
  const refreshData = () => {
    setPaginationProps({...paginationProps, page: 1});
    setTrigger(!trigger);
    setShowDelete(false);
    setShowDetail(false);
    setShowEdit(false);
    setShowDeleteMany(false);
  }
  const deleteFn = (entity: PurchaseOrderModel) => {
    Delete(entity).then(refreshData);
  };
  
  const deleteMany = () => {
    setLoading(true);
    DeleteMany(selectedEntities)
      .then(refreshData)
      .catch(error => {
        console.log(error);
      });
  };
  
  const get = (entity: PurchaseOrderModel) => {
    Get(entity.code)
      .then(res => {
        setDetailEntity(res.data.results);
        setEditEntity(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const update = (entity: PurchaseOrderModel) => {
    Update(entity)
      .then(refreshData)
      .catch(error => {
        console.log(error);
      });
  };
  
  const add = (entity: PurchaseOrderModel) => {
    Create(entity)
      .then(refreshData)
      .catch(error => {
        console.log(error);
      });
  };
  
  const columns = [
    {
      dataField: 'ordinal',
      text: '#',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationProps.page ?? 0) - 1) * (paginationProps.limit ?? 0)}</p>
      ),
      style: {paddingTop: 20},
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'})}`,
      ...SortColumn
    },
    
    {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'})}`,
      ...SortColumn
    },
    {
      dataField: 'status',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.STATUS_COLUMN'})}`,
      ...SortColumn,
      formatter: (cell: any, row: any) => row.status === 1 ?
        (<CheckCircleIcon style={{color: '#1DBE2D'}}/>) : (<IndeterminateCheckBoxIcon/>),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: PurchaseOrderModel) => {
          get(entity);
          setShowDetail(true);
        },
        onDelete: (entity: PurchaseOrderModel) => {
          setShowDelete(true);
          setDeleteEntity(entity);
        },
        onEdit: (entity: PurchaseOrderModel) => {
          get(entity);
          setShowEdit(true);
        }
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  ];
  const masterEntityDetailDialog = [
    {keyField: 'code', title: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN'},
    {keyField: 'agencyAddress', title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS_COLUMN'},
    {keyField: 'phoneNumber', title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN'},
  ];
  const purchaseOrderSearchModel: SearchModel = {
    code: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL'
    }, name: {
      type: 'string',
      placeholder: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER',
      label: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL'
    }
  }
  return (
    <Fragment>
      <MasterEntityDetailDialog show={showDetail} entity={detailEntity} renderInfo={masterEntityDetailDialog}
                                onClose={() => {
                                  setShowDetail(false);
                                }}/>
      <DeleteDialog moduleName={moduleName} entity={deleteEntity} onDelete={deleteFn} isShow={showDelete}
                    onHide={() => {
                      setShowDelete(false);
                    }}/>
      <DeleteManyDialog moduleName={moduleName} selectedEntities={selectedEntities} loading={loading}
                        isShow={showDeleteMany} onDelete={deleteMany}
                        onHide={() => {
                          setShowDeleteMany(false);
                        }}/>
      <ModifyEntityDialog isShow={showEdit} entity={editEntity} onEdit={update} onCreate={add}
                          onHide={() => {
                            setShowEdit(false);
                          }}/>
      <ModifyEntityDialog isShow={showEdit} entity={editEntity} onEdit={update} onCreate={add}
                          onHide={() => {
                            setShowEdit(false);
                          }}/>
      <MasterHeader title={headerTitle} onSearch={setFilterProps} searchModel={purchaseOrderSearchModel} initValue={filterProps}/>
      <MasterBody
        onShowDetail={entity => {
          get(entity);
          setShowDetail(true);
        }}
        onEdit={entity => {
          setEditEntity(entity);
          setShowEdit(true);
        }}
        onDelete={entity => {
          setDeleteEntity(entity);
          setShowDelete(true);
        }}
        onCreate={() => {
          setEditEntity(null);
          setShowEdit(true);
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
    </Fragment>
  );
}

export default PurchaseOrder;
