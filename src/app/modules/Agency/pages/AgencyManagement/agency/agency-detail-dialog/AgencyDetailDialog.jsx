import { formatRFC3339 } from 'date-fns';

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import store from '../../../../../../redux/store';

import * as actions from '../../_redux/agencyAction';
import { useAgencyUIContext } from '../AgencyUIContext';
import AgencyDetail from './AgencyDetail';
import './AgencyDetailDialog.scss';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

function AgencyDetailDialog({ id, show, onHide }) {
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      initAgency: agencyUIContext.initAgency,
    };
  }, [agencyUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, agencyForEdit } = useSelector(
    state => ({
      actionsLoading: state.agency.actionsLoading,
      agencyForEdit: state.agency.agencyForEdit,
    }),
    shallowEqual,
  );

  console.log(agencyForEdit);

  useEffect(() => {
    // server call for getting Customer by id
    dispatch(actions.fetchAgencyById(id));
  }, [id, dispatch]);
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <AgencyDetail agency={agencyForEdit || agencyUIProps.initAgency} />
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-outline-danger">
          <CancelOutlinedIcon /> Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AgencyDetailDialog;
