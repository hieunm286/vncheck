import React from 'react';
import { Modal } from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useIntl } from 'react-intl';

interface ModalProp {
  title?: string;
  body: string;
  show: boolean;
  mode: 'notice' | 'confirm';
  onConfirm?: () => void;
  onClose?: () => void;
}

function ProductionPlanModal({ show, title, body, mode, onConfirm, onClose }: ModalProp) {
  const intl = useIntl();

  return (
    <Modal
      // size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      {mode === 'confirm' && (
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
            {intl.formatMessage({ id: title }).toUpperCase()}
          </Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl.formatMessage({ id: body }).toUpperCase()}
        </Modal.Title>
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        {mode === 'confirm' && (
          <button type="button" onClick={onConfirm} className="btn btn-outline-primary">
            {intl.formatMessage({ id: 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN' })}
          </button>
        )}
        <button type="button" onClick={onClose} className="btn btn-outline-primary">
          <CancelOutlinedIcon style={{ fontSize: 14 }} />
          {intl.formatMessage({ id: 'COMMON_COMPONENT.DELETE_DIALOG.DELETE_BTN' })}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductionPlanModal;
