import React from 'react';
import { Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';

function BasicUnitDialogHeader({ unitForEdit }: { unitForEdit: any }) {
  const intl = useIntl();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {unitForEdit ? (
            <p>{intl.formatMessage({ id: 'BASIC_UNIT.CARD.EDIT_DIALOG.TITLE' })}</p>
          ) : (
            <p>Thêm mới</p>
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}

export default BasicUnitDialogHeader;
