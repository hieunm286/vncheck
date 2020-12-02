import React from 'react';
import { Modal } from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { useIntl } from 'react-intl';
import { DeleteDialogProps } from '../common-types/common-type';
import { iconStyle } from '../common-consts/const';
import { ModalProgressBar } from '../modal-progress-bar';
import { CapitalizeFirstLetter } from '../helpers/common-function';

export function DeleteEntityDialog<T>({
  isShow,
  entity,
  onHide,
  onDelete,
  title = 'COMMON_COMPONENT.DELETE_DIALOG.TITLE',
  bodyTitle = 'COMMON_COMPONENT.DELETE_DIALOG.BODY_TITLE',
  confirmMessage = 'COMMON_COMPONENT.DELETE_DIALOG.CONFIRM',
  deleteBtn = 'COMMON_COMPONENT.DELETE_DIALOG.DELETE_BTN',
  deletingMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.DELETING',
  cancelBtn = 'COMMON_COMPONENT.DELETE_DIALOG.CANCEL_BTN',
  moduleName = 'COMMON_COMPONENT.DELETE_DIALOG.MODULE_NAME',
  loading,
  error,
}: DeleteDialogProps<T>) {
  const intl = useIntl();

  return (
    <Modal
      show={isShow}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      {loading && <ModalProgressBar />}

      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({ id: title }, { moduleName: intl.formatMessage({ id: moduleName }) })
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!loading && error === '' && (
          <>
            <p>
              {CapitalizeFirstLetter(
                intl.formatMessage(
                  { id: bodyTitle },
                  { moduleName: intl.formatMessage({ id: moduleName }) },
                ),
              )}
            </p>

            <p className="mt-5">
              {intl.formatMessage(
                { id: confirmMessage },
                { moduleName: intl.formatMessage({ id: moduleName }) },
              )}
            </p>
          </>
        )}
        {loading && <span>{intl.formatMessage({ id: deletingMessage })}</span>}
        {!loading && error !== '' && (
          <>
            <p>{error}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={e => onDelete(entity)}>
          <DeleteIcon style={iconStyle} />
          {'\u00A0'}
          {intl.formatMessage({ id: deleteBtn })}
        </button>

        <button type="button" onClick={onHide} className="btn btn-outline-primary">
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          <CancelOutlinedIcon style={iconStyle} />
          {'\u00A0'}
          {intl.formatMessage({ id: cancelBtn })}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
