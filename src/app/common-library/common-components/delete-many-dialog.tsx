import React from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {Modal} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import {ModalProgressBar} from '../modal-progress-bar';
import {DeleteManyDialogProps} from '../common-types/common-type';

interface DeleteMany {
  ids: string[];
  show: any;
  hideModal: any;
  unitForEdit: any;
  loading: boolean;
  deleteManyBasicUnit: any;
}

function DeleteManyDialog<T>({
                               selectedEntities,
                               isShow,
                               onHide,
                               onDelete,
                               title = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.TITLE',
                               bodyTitle = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.BODY_TITLE',
                               confirmMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.CONFIRM',
                               noSelectedEntityMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.NO_SELECTED_ENTITY',
                               deletingMessage = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.DELETING',
                               deleteBtn = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.DELETE_BTN',
                               cancelBtn = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.CANCEL_BTN',
                               moduleName = 'COMMON_COMPONENT.DELETE_MANY_DIALOG.MODULE_NAME',
                               loading,
                             }: DeleteManyDialogProps<T>) {
  const intl = useIntl();
  
  return (
    <Modal show={isShow} onHide={() => onHide()} aria-labelledby="example-modal-sizes-title-lg">
      {/*begin::Loading*/}
      {loading && <ModalProgressBar/>}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})}).toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedEntities && selectedEntities.length > 0 ? (
          !loading && (
            <div>
              <p>
                {intl.formatMessage({id: bodyTitle}, {moduleName: intl.formatMessage({id: moduleName})})}
              </p>
              
              <p className="mt-5">
                {intl.formatMessage(
                  {id: confirmMessage},
                  {moduleName: intl.formatMessage({id: moduleName})},
                )}
              </p>
            </div>
          )
        ) : (
          <div>
            <p>{intl.formatMessage({id: noSelectedEntityMessage}, {moduleName: intl.formatMessage({id: moduleName})})}</p>
          </div>
        )}
        {loading && <span>{intl.formatMessage({id: deletingMessage})}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          {selectedEntities && selectedEntities.length > 0 && (
            <button type="button" onClick={() => onDelete()} className="btn btn-danger mr-3">
              <DeleteIcon/> {intl.formatMessage({id: deleteBtn})}
            </button>
          )}
          <button type="button" onClick={() => onHide()} className="btn btn-outline-danger">
            <CancelOutlinedIcon/>
            {intl.formatMessage({id: cancelBtn})}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteManyDialog;
