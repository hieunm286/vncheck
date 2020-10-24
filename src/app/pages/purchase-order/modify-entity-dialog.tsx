import React from 'react';
import {Modal} from 'react-bootstrap';
import ModifyEntityDialogForm from './modify-entity-dialog-form';
import {useIntl} from "react-intl";

function ModifyEntityDialog({isShow, onHide, entity, error, onEdit, onCreate}: any) {
  const initForm = {
    code: '',
    agencyAddress: '',
    phoneNumber: '',
    // status: 1,
  };
  
  const handleActionPurchaseOrder = (values: any) => {
    if (entity && entity.length > 0) {
      onEdit(values);
      return;
    } else {
      onCreate(values);
    }
  };
  
  return (
    <Modal show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <ModifyEntityDialogHeader unitForEdit={entity}/>
      <ModifyEntityDialogForm
        unitForEdit={entity || initForm}
        onHide={onHide}
        handleActionPurchaseOrder={handleActionPurchaseOrder}
        error={error}
      />
    </Modal>
  );
}

function ModifyEntityDialogHeader({unitForEdit}: { unitForEdit: any }) {
  const intl = useIntl();
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title" className="text-danger">
          {unitForEdit ? (
            <span>{intl.formatMessage({id: 'BASIC_UNIT.CARD.EDIT_DIALOG.TITLE'})}</span>
          ) : (
            <span>Thêm mới</span>
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}

export default ModifyEntityDialog;
