import { formatRFC3339 } from 'date-fns';

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AgencyShippingDetail from './AgencyShippingDetail';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import './AgencyTypeDetailDialog.scss';

export function AgencyShippingDetailDialog({ show, openModal, hideModal, rowShippingData }) {
  return (
    <Modal
      // size="lg"
      show={show}
      onHide={hideModal}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <AgencyShippingDetail rowShippingData={rowShippingData} />
      <Modal.Footer>
        <button type="button" onClick={hideModal} className="btn btn-outline-danger">
          <CancelOutlinedIcon /> Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}
