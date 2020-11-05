import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as actions from '../_redux/agency-type-action';
import {useAgencyUIContext} from '../agency-ui-context';
import {ModalProgressBar} from "../../../common-library/modal-progress-bar";

export function AgencyDeleteDialog({id, show, onHide}: any) {
  // agency UI Context
  const agencyUIContext: any = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      setIds: agencyUIContext.setIds,
      queryParams: agencyUIContext.queryParams,
    };
  }, [agencyUIContext]);
  
  // agency Redux state
  const dispatch = useDispatch();
  const {isLoading} = useSelector(
    (state: any) => ({isLoading: state.agency.actionsLoading}),
    shallowEqual,
  );
  
  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  // looking for loading/dispatch
  useEffect(() => {
  }, [isLoading, dispatch]);
  
  const deleteAgency = () => {
    // server request for deleting customer by id
    (dispatch(actions.deleteAgencyType(id)) as any).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAllAgencyType(agencyUIProps.queryParams));
      // clear selections list
      agencyUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };
  
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar/>}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Xóa đại lý</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Are you sure to permanently delete this user?</span>}
        {isLoading && <span>Agency is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
            Cancel
          </button>
          <> </>
          <button type="button" onClick={deleteAgency} className="btn btn-danger btn-elevate">
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
