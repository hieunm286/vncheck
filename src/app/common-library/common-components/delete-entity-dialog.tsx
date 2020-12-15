import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {useIntl} from 'react-intl';
import {DeleteDialogProps} from '../common-types/common-type';
import {iconStyle} from '../common-consts/const';
import {ModalProgressBar} from '../modal-progress-bar';
import {CapitalizeFirstLetter} from '../helpers/common-function';

export function   DeleteEntityDialog<T>({
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
      dialogClassName="modal-delete">
      {loading && <ModalProgressBar/>}
      
      <Modal.Header className="border-bottom-0" closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loading && error === '' && (
          <>
            {CapitalizeFirstLetter(
              intl.formatMessage(
                {id: bodyTitle},
                {moduleName: intl.formatMessage({id: moduleName})},
              ),
            )}
            {' ' + intl.formatMessage(
              {id: confirmMessage},
              {moduleName: intl.formatMessage({id: moduleName})},
            )}
          </>
        )}
        {loading && <span className={'ml-1'}>{intl.formatMessage({id: deletingMessage})}</span>}
        {!loading && error !== '' && (
          <>
            {typeof error === 'string' ? (<p className='text-danger'>{intl.formatMessage({id: error})}</p>) : error}
          </>
        )}
      </Modal.Body>
      
      <Modal.Footer className="border-top-0">
        <button type="button" className="btn btn-primary mr-lg-8 fixed-btn-width" onClick={e => onDelete(entity)}>
          {/*<DeleteIcon style={iconStyle}/>*/}
          {intl.formatMessage({id: deleteBtn})}
        </button>
        
        <button type="button" onClick={onHide} className="btn btn-outline-primary fixed-btn-width">
          <CancelOutlinedIcon style={iconStyle}/>
          {intl.formatMessage({id: cancelBtn})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
