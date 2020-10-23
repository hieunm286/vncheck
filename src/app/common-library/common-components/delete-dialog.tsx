import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {useIntl} from 'react-intl';
import {DeleteDialogProps} from "../common-types/common-type";
import {iconStyle} from "../common-const/const";


export function DeleteDialog<T> ({
                               isShow,
                               entity,
                               onHide,
                               onDelete,
                               title = 'COMMON_COMPONENT.DELETE_DIALOG.TITLE',
                               bodyTitle = 'COMMON_COMPONENT.DELETE_DIALOG.BODY_TITLE',
                               confirmMessage = 'COMMON_COMPONENT.DELETE_DIALOG.CONFIRM',
                               deleteBtn = 'COMMON_COMPONENT.DELETE_DIALOG.DELETE_BTN',
                               cancelBtn = 'COMMON_COMPONENT.DELETE_DIALOG.CANCEL_BTN',
                               moduleName = 'COMMON_COMPONENT.DELETE_DIALOG.MODULE_NAME'
                             }: DeleteDialogProps<T>)  {
  const intl = useIntl();
  return (
    <Modal
      show={isShow}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})}).toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{intl.formatMessage({id: bodyTitle}, {moduleName: intl.formatMessage({id: moduleName})})}</p>
        <p className="mt-5">
          {intl.formatMessage({id: confirmMessage}, {moduleName: intl.formatMessage({id: moduleName})})}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-danger"
          onClick={e => onDelete(entity)}>
          <DeleteIcon style={iconStyle}/>
          {intl.formatMessage({id: deleteBtn})}
        </button>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-outline-danger">
          <CancelOutlinedIcon style={iconStyle}/>
          {intl.formatMessage({id: cancelBtn})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
