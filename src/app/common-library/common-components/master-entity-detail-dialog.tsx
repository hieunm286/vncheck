import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';

export function MasterEntityDetailDialog({
                                           // titles,
                                           show,
                                           entity,
                                           onClose,
                                           renderInfo,
                                         }: {
  // titles: any;
  show: boolean;
  entity: any;
  renderInfo: any;
  onClose: () => void;
}) {
  const initUnit = {code: '', name: '', status: 0};
  const intl = useIntl();
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE'})}
        </Modal.Title>
      </Modal.Header>
      
      <MasterEntityDetail data={entity || initUnit} renderInfo={renderInfo}/>
      <Modal.Footer>
        <button type="button" onClick={onClose} className="btn btn-outline-danger">
          <CancelOutlinedIcon style={{fontSize: 14}}/>{' '}
          {intl.formatMessage({id: 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export function MasterEntityDetail({
                                     // titles,
                                     data,
                                     renderInfo,
                                     convertFunctions = {},
                                   }: {
  // titles: { [V: string]: string };
  renderInfo: any[];
  data: any;
  convertFunctions?: { [V: string]: (input: any) => string };
}) {
  const intl = useIntl();
  return (
    <Modal.Body>
      {renderInfo.map((value, key) => (
        <p key={key}>
          {intl.formatMessage({id: value.title})}: <strong>{data[value.keyField]}</strong>
        </p>
      ))}
    </Modal.Body>
  );
}
