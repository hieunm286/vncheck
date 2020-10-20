import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {ModalProgressBar} from '../../../../_metronic/_partials/controls';

export function UserEditDialogHeader({id}: any) {
  // Customers Redux state
  const {userForEdit, actionsLoading} = useSelector(
    (state: any) => ({
      userForEdit: state.users.userForEdit,
      actionsLoading: state.users.actionsLoading,
    }),
    shallowEqual,
  );
  
  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : 'New User';
    if (userForEdit && id) {
      _title = `Edit user '${userForEdit.email}'`;
    }
    
    setTitle(_title);
    // eslint-disable-next-line
  }, [userForEdit, actionsLoading]);
  
  return (
    <>
      {actionsLoading && <ModalProgressBar/>}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
