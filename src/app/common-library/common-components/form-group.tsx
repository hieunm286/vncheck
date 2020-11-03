import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';

export function FormGroup({
                                           title = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
                                           moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
                                           show,
                                           entity,
                                           onClose,
                                           renderInfo,
                                         }: {
  title?: string;
  moduleName?: string;
  show: boolean;
  entity: any;
  renderInfo: any;
  onClose: () => void;
}) {
  const intl = useIntl();
  console.log(entity);
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
          {intl.formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})}).toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      
      <MasterEntityDetail data={entity} renderInfo={renderInfo}/>
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
                                     data,
                                     renderInfo,
                                     convertFunctions = {},
                                   }: {
  renderInfo: any[];
  data: any;
  convertFunctions?: { [V: string]: (input: any) => string };
}) {
  const intl = useIntl();
  const  getPropByString = (obj: any, propString: any) => {
    if (!propString)
        return obj;

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}
  return (
    data ? <Modal.Body>
      {renderInfo.map((value, key) => {
        return (
          <p key={key}>
            {intl.formatMessage({id: value.title})}: <strong>{getPropByString(data, value.keyField)}</strong>
          </p>
        )
      }
      )}
    </Modal.Body> : <></>
  );
}
