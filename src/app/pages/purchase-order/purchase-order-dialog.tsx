import React from 'react';
import { Modal } from 'react-bootstrap';
import PurchaseOrderDialogHeader from './purchase-order-dialog-header';
import PurchaseOrderForm from './purchase-order-form';

function PurchaseOrderDialog({ isShow, onHide, entity, error, onEdit, onCreate }: any) {
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
      <PurchaseOrderDialogHeader unitForEdit={entity} />
      <PurchaseOrderForm
        unitForEdit={entity || initForm}
        onHide={onHide}
        handleActionPurchaseOrder={handleActionPurchaseOrder}
        error={error}
      />
    </Modal>
  );
}

export default PurchaseOrderDialog;
