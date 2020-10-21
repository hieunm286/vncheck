import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {ModalProgressBar} from "../../../common-library/modal-progress-bar";

export function AgencyTypeEditDialogHeader({id}: any) {
  // Customers Redux state
  const {agencyTypeForEdit, actionsLoading} = useSelector(
    (state: any) => ({
      agencyTypeForEdit: state.agencyType.agencyTypeForEdit,
      actionsLoading: state.agencyType.actionsLoading,
    }),
    shallowEqual,
  );
  
  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : 'Thêm mới loại đại lý';
    if (agencyTypeForEdit && id) {
      _title = `Chỉnh sửa loại đại lý`;
    }
    
    setTitle(_title);
    // eslint-disable-next-line
  }, [agencyTypeForEdit, actionsLoading]);
  
  return (
    <>
      {actionsLoading && <ModalProgressBar/>}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {title}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
