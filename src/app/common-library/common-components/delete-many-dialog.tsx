import React from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { ModalProgressBar } from '../modal-progress-bar';
import { DeleteManyDialogProps } from '../common-types/common-type';

interface DeleteMany {
  ids: string[];
  show: any;
  hideModal: any;
  unitForEdit: any;
  loading: boolean;
  deleteManyBasicUnit: any;
}

function DeleteManyDialog<T>({
  ids,
  isShow,
  onHide,
  onDelete,
  title = 'COMMON_COMPONENT.DELETE_DIALOG.TITLE',
  bodyTitle = 'COMMON_COMPONENT.DELETE_DIALOG.BODY_TITLE',
  confirmMessage = 'COMMON_COMPONENT.DELETE_DIALOG.CONFIRM',
  deleteBtn = 'COMMON_COMPONENT.DELETE_DIALOG.DELETE_BTN',
  cancelBtn = 'COMMON_COMPONENT.DELETE_DIALOG.CANCEL_BTN',
  moduleName = 'COMMON_COMPONENT.DELETE_DIALOG.MODULE_NAME',
  loading,
}: DeleteManyDialogProps<T>) {
  const intl = useIntl();

  return (
    <Modal show={isShow} onHide={() => onHide()} aria-labelledby="example-modal-sizes-title-lg">
      {/*begin::Loading*/}
      {loading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({ id: 'BASIC_UNIT.CARD.DELETE_DIALOG.TITLE' })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ids && ids.length > 0 ? (
          !loading && (
            <div>
              <p>{intl.formatMessage({ id: 'BASIC_UNIT.CARD.DELETE_DIALOG.CONTENT_NOTICE' })}</p>

              <p className="mt-3">
                {intl.formatMessage({ id: 'BASIC_UNIT.CARD.DELETE_DIALOG.CONFIRM' })}
              </p>
            </div>
          )
        ) : (
          <div>
            <p>{intl.formatMessage({ id: 'BASIC_UNIT.CARD.HEADER.NO_CHOOSEN' })}</p>
          </div>
        )}
        {loading && <span>{intl.formatMessage({ id: 'BASIC_UNIT.CARD.HEADER.DELETING' })}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          {ids && ids.length > 0 && (
            <button type="button" onClick={() => onDelete()} className="btn btn-danger mr-3">
              <DeleteIcon /> {intl.formatMessage({ id: 'BASIC_UNIT.CARD.HEADER.BUTTON.DELETE' })}
            </button>
          )}
          <button type="button" onClick={() => onHide()} className="btn btn-outline-danger">
            <CancelOutlinedIcon />
            {intl.formatMessage({ id: 'BASIC_UNIT.CARD.DIALOG.BUTTON.CANCEL' })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteManyDialog;
