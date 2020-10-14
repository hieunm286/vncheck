import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../../_metronic/_partials/controls';
import * as actions from '../../_redux/agencyTypeAction';
import { useAgencyUIContext } from '../AgencyUIContext';

export function AgencyDeleteDialog({ id, show, onHide }) {
  // Agency UI Context
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      setIds: agencyUIContext.setIds,
      queryParams: agencyUIContext.queryParams,
    };
  }, [agencyUIContext]);

  // Agency Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    state => ({ isLoading: state.agency.actionsLoading }),
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
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAgency = () => {
    // server request for deleting customer by id
    dispatch(actions.deleteAgencyType(id)).then(() => {
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
      {isLoading && <ModalProgressBar />}
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
