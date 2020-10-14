import { formatRFC3339 } from 'date-fns';

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import store from '../../../../../../redux/store';

import * as actions from '../../_redux/agencyTypeAction';
import { useAgencyTypeUIContext } from '../AgencyTypeUIContext';
import AgencyTypeDetail from './AgencyTypeDetail';
import './AgencyTypeDetailDialog.scss';

function AgencyTypeDetailDialog({ id, show, onHide }) {
  const agencyTypeUIContext = useAgencyTypeUIContext();
  const agencyTypeUIProps = useMemo(() => {
    return {
      initAgencyType: agencyTypeUIContext.initAgencyType,
    };
  }, [agencyTypeUIContext]);

  const dispatch = useDispatch();
  const { actionsLoading, agencyTypeForEdit } = useSelector(
    state => ({
      actionsLoading: state.agencyType.actionsLoading,
      agencyTypeForEdit: state.agencyType.agencyTypeForEdit,
    }),
    shallowEqual,
  );

  console.log(agencyTypeForEdit);

  useEffect(() => {
    dispatch(actions.fetchAgencyTypeById(id));
  }, [id, dispatch]);
  return (
    <Modal
      // size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <AgencyTypeDetail agencyType={agencyTypeForEdit || agencyTypeUIProps.initAgencyType} />
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-outline-danger">
          Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AgencyTypeDetailDialog;
