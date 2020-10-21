import React, {useEffect, useState} from 'react';
import BasicUnitCard from './basic-unit-card';
import BasicUnitDeleteDialog from './basic-unit-delete/basic-unit-delete-dialog';
import BasicUnitDetailDialog from './basic-unit-detail/basic-unit-detail-dialog';
import BasicUnitDialog from './basic-unit-dialog/basic-unit-dialog';
import {BasicUnitUIProvider} from './basic-unit-ui-context';
import {useIntl} from 'react-intl';
import BasicUnitDeleteManyDialog from './basic-unit-delete/basic-unit-delete-many-dialog';
import {InitQueryParams} from "../../common-function";
import {initialFilter} from "./basic-unit-ui-helpers";
import {Create, Delete, DeleteMany, GetAll, Update} from "./pruchase-order.service";

function PurchaseOrder() {
  const basicUnitUIEvents = {};
  const [show, setShow] = useState({
    edit: false,
    delete: false,
    detail: false,
    deleteMany: false,
  });
  const intl = useIntl();
  const [basicUnitArray, setBasicUnitArray] = useState<any[]>([]);
  const [unitForEdit, setUnitForEdit] = useState(null);
  const [error, setError] = useState('');
  const [ids, setIds] = useState([]);
  const {queryParams, setQueryParams, setQueryParamsBase} = InitQueryParams(initialFilter);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAllBasicUnit = () => {
      setLoading(true);
      GetAll(queryParams)
        .then(res => {
          console.log(res.data.total);
          setIds([]);
          setTotal(res.data.total);
          setBasicUnitArray(res.data.result);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    setIds([]);
    fetchAllBasicUnit();
  }, [queryParams]);
  
  const showModal = (data: any, action: string) => {
    setError('');
    setShow({...show, [action]: true});
    setUnitForEdit(data);
  };
  
  const hideModal = (action: string) => {
    setError('');
    setShow({...show, [action]: false});
  };
  
  const editBasicUnit = (value: any) => {
    const updateUnit: any = [...basicUnitArray];
    updateUnit.forEach((el: { code: any; name: any; status: any }) => {
      if (el.code === value.code) {
        el.code = value.code;
        el.name = value.name;
        el.status = value.status;
      }
    });
    setBasicUnitArray(updateUnit);
    
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
    const updateUnit = [...basicUnitArray];
    const index = updateUnit.findIndex(el => el.code === values.code);
    if (index !== -1) {
      setError(intl.formatMessage({id: 'BASIC_UNIT.ERROR.CODE.EXISTS'}));
      return;
    }
    updateUnit.push(values);
    setBasicUnitArray(updateUnit);
    
    Create(values)
      .then(res => {
        setError('');
        setShow({edit: false, delete: false, detail: false, deleteMany: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const deleteBasicUnit = (code: string) => {
    const updateUnit = basicUnitArray.filter((el: { code: string }) => el.code !== code);
    setBasicUnitArray(updateUnit);
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
            setBasicUnitArray(res.data.result);
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
  //
  // const basicUnitSearch = (data: { code: string; name: string }) => {
  //   setLoading(true);
  //   requestFromServer
  //     .searchBasicUnit(data)
  //     .then(res => {
  //       setIds([]);
  //       setTotal(res.data.total);
  //       setBasicUnitArray(res.data.result);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  
  return (
    <BasicUnitUIProvider basicUnitUIEvents={basicUnitUIEvents}>
      <BasicUnitDialog
        show={show}
        hideModal={hideModal}
        unitForEdit={unitForEdit}
        editBasicUnit={editBasicUnit}
        addBasicUnit={addBasicUnit}
        error={error}
      />
      <BasicUnitDetailDialog show={show} hideModal={hideModal} unitForEdit={unitForEdit}/>
      <BasicUnitDeleteDialog
        show={show}
        hideModal={hideModal}
        unitForEdit={unitForEdit}
        deleteBasicUnit={deleteBasicUnit}
      />
      <BasicUnitDeleteManyDialog
        ids={ids}
        show={show}
        hideModal={hideModal}
        unitForEdit={unitForEdit}
        loading={loading}
        deleteManyBasicUnit={deleteManyBasicUnit}
      />
      {/*<BasicUnitCardHeader basicUnitSearch={basicUnitSearch}/>*/}
      {/*<BasicUnitCard*/}
      {/*  showModal={showModal}*/}
      {/*  hideModal={hideModal}*/}
      {/*  show={show}*/}
      {/*  basicUnitArray={basicUnitArray}*/}
      {/*  total={total}*/}
      {/*  loading={loading}*/}
      {/*  queryParams={queryParams}*/}
      {/*  setQueryParamsBase={setQueryParamsBase}*/}
      {/*  ids={ids}*/}
      {/*  setIds={setIds}*/}
      {/*  setQueryParams={setQueryParams}*/}
      {/*/>*/}
    </BasicUnitUIProvider>
  );
}

export default PurchaseOrder;