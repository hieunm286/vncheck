import React, {Fragment, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Count, Create, Delete, DeleteMany, Get, GetAll, Update } from './purchase-order.service';
import { PurchaseOrderModel } from './purchase-order.model';
import { DefaultPagination, SortDefault } from '../../common-library/common-consts/const';
import { MasterHeader } from '../../common-library/common-components/master-header';
import { MasterEntityDetailDialog } from '../../common-library/common-components/master-entity-detail-dialog';
import { MasterBody } from '../../common-library/common-components/master-body';
import {
  HeaderSortingClasses,
  SortCaret,
} from '../../common-library/helpers/table-sorting-helpers';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { ActionsColumnFormatter } from '../../common-library/common-components/actions-column-formatter';
import { DeleteDialog } from '../../common-library/common-components/delete-dialog';
import isEqual from 'react-fast-compare';
import DeleteManyDialog from '../../common-library/common-components/delete-many-dialog';
import ModifyEntityDialog from './modify-entity-dialog';

function PurchaseOrder() {
  const intl = useIntl();
  const events = {};
  const [entities, setEntities] = useState<PurchaseOrderModel[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<PurchaseOrderModel>(null as any);
  const [editEntity, setEditEntity] = useState<PurchaseOrderModel | null>(null as any);
  const [selectedEntities, setSelectedEntities] = useState<PurchaseOrderModel[]>([]);
  const [detailEntity, setDetailEntity] = useState<PurchaseOrderModel>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);

  const [error, setError] = useState('');
  const [ids, setIds] = useState([]);
  // const { queryParams, setQueryParams, setQueryParamsBase } = InitQueryParams(initialFilter);
  // const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [paginationParams, setPaginationParams] = useState(DefaultPagination);
  // const setQueryParams = InitQueryParams(setQueryParamsBase)
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const moduleName = 'PURCHASE_ORDER.CUSTOM.MODULE_NAME';
  const headerTitle = 'PURCHASE_ORDER.MASTER.HEADER.TITLE';
  const getAll = useCallback(() => {
    setLoading(true);
    GetAll(paginationParams)
      .then(res => {
        Count(paginationParams).then(ress => {
          setIds([]);
          setEntities(res.data);
          setLoading(false);
          setTotal(ress.data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [paginationParams]);

  useEffect(() => {
    setIds([]);
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationParams]);

  const deleteFn = (entity: PurchaseOrderModel) => {
    Delete(entity).then(res => {
      GetAll(paginationParams)
        .then(res => {
          Count(paginationParams).then(ress => {
            setSelectedEntities([]);
            setEntities(res.data);
            setLoading(false);
            setTotal(ress.data);
            setShowDelete(false);
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  const deleteMany = () => {
    setLoading(true);
    DeleteMany(selectedEntities)
      .then(res => {
        GetAll(paginationParams)
          .then(res => {
            Count(paginationParams).then(ress => {
              setSelectedEntities([]);
              setEntities(res.data);
              setLoading(false);
              setTotal(ress.data);
              setShowDeleteMany(false);
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPurchaseOrder = (entity: PurchaseOrderModel) => {
    Get(entity.code)
      .then(res => {
        setDetailEntity(res.data.results);
        setEditEntity(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updatePurchaseOrder = (entity: PurchaseOrderModel) => {
    Update(entity)
      .then(res => {
        GetAll(paginationParams)
          .then(res => {
            Count(paginationParams).then(ress => {
              setSelectedEntities([]);
              setEntities(res.data);
              setLoading(false);
              setTotal(ress.data);
              setShowEdit(false);
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const addPurchaseOrder = (entity: PurchaseOrderModel) => {
    Create(entity)
      .then(res => {
        GetAll(paginationParams)
          .then(res => {
            Count(paginationParams).then(ress => {
              setSelectedEntities([]);
              setEntities(res.data);
              setLoading(false);
              setTotal(ress.data);
              setShowEdit(false);
            });
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

  const columns = [
    {
      dataField: 'ordinal',
      text: 'STT',
      formatter: (cell: any, row: any, rowIndex: number) => (
        <p>{rowIndex + 1 + ((paginationParams.page as any) - 1) * (paginationParams.limit as any)}</p>
      ),
      style: { paddingTop: 20 },
    },
    {
      dataField: 'code',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },
    {
      dataField: 'agencyAddress',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS' })}`,
      sort: true,
      sortCaret: SortCaret,
      headerSortingClasses: HeaderSortingClasses,
    },

    {
      dataField: 'phoneNumber',
      text: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER' })}`,
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
          <CheckCircleIcon style={{ color: '#1DBE2D' }} />
        ) : (
          <IndeterminateCheckBoxIcon />
        ),
    },
    {
      dataField: 'action',
      text: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.ACTION' })}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: PurchaseOrderModel) => {
          getPurchaseOrder(entity);
          setShowDetail(true);
        },
        onDelete: (entity: PurchaseOrderModel) => {
          setShowDelete(true);
          setDeleteEntity(entity);
        },
        onEdit: (entity: PurchaseOrderModel) => {
          getPurchaseOrder(entity);
          setShowEdit(true);
        },
        // openDeleteDialog: showModal,
        // openDetailDialog: showModal,
        // show: show,
        detailTitle: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.ACTION.DETAIL.TITLE' })}`,
        editTitle: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.ACTION.EDIT.TITLE' })}`,
        deleteTitle: `${intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.ACTION.DELETE.TITLE' })}`,
      },
      classes: 'text-center pr-0',
      headerClasses: 'text-center',
      style: {
        minWidth: '130px',
      },
    },
  ];
  const masterEntityDetailDialog = [
    {
      keyField: 'code',
      title: `${intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' })}`,
    },
    {
      keyField: 'agencyAddress',
      title: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS',
    },

    {
      keyField: 'phoneNumber',
      title: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER',
    },
  ];
  return (
    <Fragment>
      <MasterEntityDetailDialog
        // {...masterEntityDetailDialog}
        show={showDetail}
        onClose={() => {
          setShowDetail(false);
        }}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
      />
      <DeleteDialog moduleName={moduleName}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
        entity={deleteEntity}
        onDelete={deleteFn}
      />
      <DeleteManyDialog
        moduleName={moduleName}
        ids={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
        onDelete={deleteMany}
      />
      <ModifyEntityDialog
        isShow={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
        entity={editEntity}
        onEdit={updatePurchaseOrder}
        onCreate={addPurchaseOrder}
      />
      <ModifyEntityDialog
        isShow={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
        entity={editEntity}
        onEdit={updatePurchaseOrder}
        onCreate={addPurchaseOrder}
      />
      <MasterHeader title={headerTitle} onSearch={search} />
      <MasterBody
        onShowDetail={entity => {
          getPurchaseOrder(entity);
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
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        ids={ids}
        setIds={setIds}
      />
    </Fragment>
  );
}

export default PurchaseOrder;
