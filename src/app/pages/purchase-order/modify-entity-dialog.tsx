import React from 'react';
import {Modal} from 'react-bootstrap';
import ModifyEntityDialogForm from './modify-entity-dialog-form';
import {useIntl} from "react-intl";

function ModifyEntityDialog<T>({isShow, onHide, entity, error, onModify}: { isShow: boolean, onHide: () => void, entity: T, error: string, onModify: (values: any) => void }) {
  const initForm = {
    code: '',
    agencyAddress: '',
    phoneNumber: '',
    // status: 1,
  };
  
  
  return (
    <Modal show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <ModifyEntityDialogHeader entity={entity}/>
      <ModifyEntityDialogForm
        entity={entity || initForm}
        onHide={onHide}
        handleActionPurchaseOrder={onModify}
        error={error}
      />
    </Modal>
  );
}

function ModifyEntityDialogHeader<T>({entity}: { entity: T }) {
  const intl = useIntl();
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title" className="text-danger">
          {entity ? (
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
