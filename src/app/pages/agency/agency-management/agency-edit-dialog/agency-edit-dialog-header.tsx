import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {ModalProgressBar} from "../../../../components/modal-progress-bar";

export function AgencyEditDialogHeader({id}: any) {
  // Customers Redux state
  const {agencyForEdit, actionsLoading} = useSelector(
    (state: any) => ({
      agencyForEdit: state.agency.agencyForEdit,
      actionsLoading: state.agency.actionsLoading,
    }),
    shallowEqual,
  );
  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : 'New agency';
    if (agencyForEdit && id) {
      _title = `Edit agency '${agencyForEdit.email}'`;
    }
    
    setTitle(_title);
    // eslint-disable-next-line
  }, [agencyForEdit, actionsLoading]);
  
  return (
    <>
      {actionsLoading && <ModalProgressBar/>}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
