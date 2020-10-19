import React from 'react';
import { Modal } from 'react-bootstrap';
import { AnyAction } from 'redux';
import { useIntl } from 'react-intl';

function BasicUnitDetail({ unitForEdit }: { unitForEdit: AnyAction }) {
  const intl = useIntl();

  return (
    <>
      <Modal.Body>
        <div className="row">
          <div className="col-7">
            {intl.formatMessage({ id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.CODE' })}:
          </div>
          <div className="col-5">{unitForEdit.basicUnitCode}</div>
        </div>
        <div className="row mt-5">
          <div className="col-7">
            {intl.formatMessage({ id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.NAME' })}:
          </div>
          <div className="col-5">{unitForEdit.basicUnitName}</div>
        </div>
        <div className="row mt-5">
          <div className="col-7">
            {intl.formatMessage({ id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.STATUS' })}:
          </div>
          <div className="col-5">{unitForEdit.status == 0 ? 'Hoạt động' : 'Không hoạt động'}</div>
        </div>
      </Modal.Body>
    </>
  );
}

export default BasicUnitDetail;
