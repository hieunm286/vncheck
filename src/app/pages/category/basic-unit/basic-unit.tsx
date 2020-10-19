import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import BasicUnitCard from './basic-unit-card';
import BasicUnitCardHeader from './basic-unit-card-header';
import BasicUnitDeleteDialog from './basic-unit-delete/basic-unit-delete-dialog';
import BasicUnitDetailDialog from './basic-unit-detail/basic-unit-detail-dialog';
import BasicUnitDialog from './basic-unit-dialog/basic-unit-dialog';
import { BasicUnitUIProvider } from './basic-unit-ui-context';

// const basicUnitArray = [
//   {
//     basicUnitCode: 'Bo',
//     basicUnitName: 'Bó',
//     status: 0,
//   },
//   {
//     basicUnitCode: 'Qua',
//     basicUnitName: 'Quả',
//     status: 0,
//   },
//   {
//     basicUnitCode: 'Nai',
//     basicUnitName: 'Nải',
//     status: 0,
//   },
// ];

function BasicUnitManagement({ history }: { history: any }) {
  const basicUnitUIEvents = {};
  const [show, setShow] = useState({
    edit: false,
    delete: false,
    detail: false,
  });

  const [basicUnitArray, setBasicUnitArray] = useState([
    {
      basicUnitCode: 'Bo',
      basicUnitName: 'Bó',
      status: 0,
    },
    {
      basicUnitCode: 'Qua',
      basicUnitName: 'Quả',
      status: 0,
    },
    {
      basicUnitCode: 'Nai',
      basicUnitName: 'Nải',
      status: 0,
    },
  ]);

  const [unitForEdit, setUnitForEdit] = useState(null);
  const [error, setError] = useState('');

  const showModal = (data: any, action: string): void => {
    setShow({ ...show, [action]: true });
    setUnitForEdit(data);
  };

  const hideModal = (action: string): void => {
    setShow({ ...show, [action]: false });
  };

  const editBasicUnit = (values: any): void => {
    const updateUnit = [...basicUnitArray];
    updateUnit.forEach(el => {
      if (el.basicUnitCode === values.basicUnitCode) {
        el.basicUnitCode = values.basicUnitCode;
        el.basicUnitName = values.basicUnitName;
        el.status = values.status;
      }
    });
    setBasicUnitArray(updateUnit);

    setShow({ edit: false, delete: false, detail: false });
  };

  const addBasicUnit = (values: any): void => {
    const updateUnit = [...basicUnitArray];
    const index = updateUnit.findIndex(el => el.basicUnitCode === values.basicUnitCode);
    if (index !== -1) {
      setError('Mã đơn vị đã tồn tại!');
      return;
    }
    updateUnit.push(values);
    setBasicUnitArray(updateUnit);
    setError('');
    setShow({ edit: false, delete: false, detail: false });
  };

  const deleteBasicUnit = (basicUnitCode: string) => {
    const updateUnit = basicUnitArray.filter(el => el.basicUnitCode !== basicUnitCode);
    setBasicUnitArray(updateUnit);
    setShow({ edit: false, delete: false, detail: false });
  };

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
      <BasicUnitDetailDialog show={show} hideModal={hideModal} unitForEdit={unitForEdit} />
      <BasicUnitDeleteDialog
        show={show}
        hideModal={hideModal}
        unitForEdit={unitForEdit}
        deleteBasicUnit={deleteBasicUnit}
      />
      <BasicUnitCardHeader />
      <BasicUnitCard
        showModal={showModal}
        hideModal={hideModal}
        show={show}
        basicUnitArray={basicUnitArray}
      />
    </BasicUnitUIProvider>
  );
}

export default BasicUnitManagement;
