import React from 'react';
import {Modal} from 'react-bootstrap';
import AgencyShippingDetail from './agency-shipping-detail';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import './agency-type-detail-dialog.scss';

export function AgencyShippingDetailDialog({show, openModal, hideModal, rowShippingData}: any) {
  return (
    <Modal
      // size="lg"
      show={show}
      onHide={hideModal}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <AgencyShippingDetail rowShippingData={rowShippingData}/>
      <Modal.Footer>
        <button type="button" onClick={hideModal} className="btn btn-outline-danger">
          <CancelOutlinedIcon/> Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}
