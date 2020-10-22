import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';

export function MasterEntityDetailDialog({titles, show, unitForEdit, hideModal,}: { titles: any, show: any, unitForEdit: any, hideModal: any, }) {
  const initUnit = {code: '', name: '', status: 0,};
  const intl = useIntl();
  return (
    <Modal
      size="lg"
      show={show.detail}
      onHide={() => hideModal('detail')}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DETAIL_DIALOG.TITLE'})}
        </Modal.Title>
      </Modal.Header>
      
      <MasterEntityDetail data={unitForEdit || initUnit} titles={titles}/>
      <Modal.Footer>
        <button
          type="button"
          onClick={() => hideModal('detail')}
          className="btn btn-outline-danger">
          <CancelOutlinedIcon style={{fontSize: 14}}/>{' '}
          {intl.formatMessage({id: 'BASIC_UNIT.CARD.DIALOG.BUTTON.CLOSE'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export function MasterEntityDetail({titles, data, convertFunctions = {}}: {
  titles: { [V: string]: string }, data: any, convertFunctions?: { [V: string]: (input: any) => string }
}) {
  const intl = useIntl();
  return (
    <Modal.Body>
      {Object.keys(titles).map(titleKey => {
        return (<div className="row mt-5">
          <div className="col-7">
            {intl.formatMessage({id: titles[titleKey]})}:
          </div>
          <div
            className="col-5">{convertFunctions[titleKey] ? convertFunctions[titleKey](data[titleKey]) : data[titleKey]}</div>
        </div>)
      })}
    </Modal.Body>
  );
}
