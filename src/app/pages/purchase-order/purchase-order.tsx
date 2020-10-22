import React, {useEffect, useState} from 'react';
import  {DeleteDialog} from '../../common-library/common-components/delete-dialog';
import BasicUnitDetailDialog from './basic-unit-detail/basic-unit-detail-dialog';
import BasicUnitDialog from './basic-unit-dialog/basic-unit-dialog';
import {BasicUnitUIProvider} from './basic-unit-ui-context';
import {useIntl} from 'react-intl';
import DeleteManyDialog from '../../common-library/common-components/delete-many-dialog';
import {InitQueryParams, InitShow} from "../../common-library/helpers/common-function";
import {Create, Delete, DeleteMany, GetAll, Update} from "./purchase-order.service";
import {PurchaseOrderModel} from "./purchase-order.model";
import {FilterDefault, SortDefault} from "../../common-library/common-const/const";
import BasicUnitCard from "./basic-unit-card";
import {MasterHeader} from "./master-header";

function PurchaseOrder() {
  const intl = useIntl();
  const events = {};
  const [show, setShow] = InitShow();
  const defaultSorted = [...SortDefault];
  const initialFilter = {...FilterDefault}
  const [list, setList] = useState<PurchaseOrderModel[]>([]);
  const [modifyEntity, setModifyEntity] = useState(null);
  const [error, setError] = useState('');
  const [ids, setIds] = useState([]);
  const {queryParams, setQueryParams, setQueryParamsBase} = InitQueryParams(initialFilter);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getAll = () => {
      setLoading(true);
      GetAll(queryParams)
        .then(res => {
          setIds([]);
          setTotal(5);
          setList(res.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    setIds([]);
    getAll();
  }, [queryParams]);
  
  const showModal = (data: any, action: string) => {
    setError('');
    setShow({...show, [action]: true});
    setModifyEntity(data);
  };
  
  const hideModal = (action: string) => {
    setError('');
    setShow({...show, [action]: false});
  };
  
  const editBasicUnit = (value: any) => {
    const updateUnit: any = [...list];
    updateUnit.forEach((el: { code: any; name: any; status: any }) => {
      if (el.code === value.code) {
        el.code = value.code;
        el.name = value.name;
        el.status = value.status;
      }
    });
    setList(updateUnit);
    
    console.log(value);
    
    Update(value)
      .then(res => {
        setShow({edit: false, delete: false, detail: false, deleteMany: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const addBasicUnit = (values: any) => {
    const updateUnit = [...list];
    const index = updateUnit.findIndex(el => el.code === values.code);
    if (index !== -1) {
      setError(intl.formatMessage({id: 'BASIC_UNIT.ERROR.CODE.EXISTS'}));
      return;
    }
    updateUnit.push(values);
    setList(updateUnit);
    
    Create(values)
      .then(res => {
        setError('');
        setShow({edit: false, delete: false, detail: false, deleteMany: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const deleteFn = (code: string) => {
    const updateUnit = list.filter((el: { code: string }) => el.code !== code);
    setList(updateUnit);
    Delete(code).then(res => {
      setShow({edit: false, delete: false, detail: false, deleteMany: false});
    });
  };
  
  const deleteManyBasicUnit = () => {
    setLoading(true);
    DeleteMany(ids)
      .then(res => {
        console.log(res);
        setError('');
        setShow({edit: false, delete: false, detail: false, deleteMany: false});
        GetAll(queryParams)
          .then(res => {
            setIds([]);
            setTotal(res.data.total);
            setList(res.data.result);
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
        setList(res.data.result);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <BasicUnitUIProvider basicUnitUIEvents={events}>
      <BasicUnitDialog
        show={show}
        hideModal={hideModal}
        unitForEdit={modifyEntity}
        editBasicUnit={editBasicUnit}
        addBasicUnit={addBasicUnit}
        error={error}
      />
      <BasicUnitDetailDialog show={show} hideModal={hideModal} unitForEdit={modifyEntity}/>
      <DeleteDialog
        show={show}
        hideModal={hideModal}
        entity={modifyEntity}
        deleteFn={deleteFn}/>
      <DeleteManyDialog
        ids={ids}
        show={show}
        hideModal={hideModal}
        unitForEdit={modifyEntity}
        loading={loading}
        deleteManyBasicUnit={deleteManyBasicUnit}
      />
      <MasterHeader title={'PURCHASE_ORDER.MASTER.HEADER.TITLE'} onSearch={search}/>
      <BasicUnitCard
        showModal={showModal}
        hideModal={hideModal}
        show={show}
        list={list}
        total={total}
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