import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../../_metronic/_partials/controls';
import * as actions from '../../_redux/agencyAction';
import { useAgencyUIContext } from '../AgencyUIContext';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

export function AgencyDeleteDialog({ id, show, onHide }) {
  // Agency UI Context
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      ids: agencyUIContext.ids,
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
    dispatch(actions.deleteAgency(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAllAgency(agencyUIProps.queryParams));
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
        {!isLoading && (
          <div>
            <p>Đại lý được chọn sẽ bị xóa vĩnh viễn và không thể khôi phục. </p>

            <p className="mt-3">Tiếp tục xóa?</p>
          </div>
        )}
        {isLoading && <span>Đang xóa...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button type="button" onClick={deleteAgency} className="btn btn-danger">
            <DeleteIcon /> Xóa
          </button>
          <button type="button" onClick={onHide} className="btn btn-outline-danger ">
            <CancelOutlinedIcon /> Hủy bỏ
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
