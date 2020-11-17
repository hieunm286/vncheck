import React from 'react';
import { Modal } from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useIntl } from 'react-intl';

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
  return data ? (
    <Modal.Body>
      {renderInfo.map((value: any, key: any) => (
        <div key={key} className="mt-5 d-flex justify-content-between">
          {Object.keys(value.data).map((dataKey: any) => (
            <div key={dataKey} className="d-flex">
              <div className="">{intl.formatMessage({ id: value.data[dataKey].title })}:</div>
              <div className="ml-2">
                <strong>{data[dataKey]}</strong>
              </div>
            </div>
          ))}
        </div>
      ))}
    </Modal.Body>
  ) : (
    <></>
  );
}

function ProductPackagingDetailDialog({
  title = 'PRODUCT_PACKAGING.MASTER.DETAIL_DIALOG.TITLE',
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
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({ id: title }, { moduleName: intl.formatMessage({ id: moduleName }) })
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>

      <MasterEntityDetail data={entity} renderInfo={renderInfo} />
      <Modal.Footer>
        <button type="button" onClick={onClose} className="btn btn-outline-primary">
          <CancelOutlinedIcon style={{ fontSize: 14 }} />{' '}
          {intl.formatMessage({ id: 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN' })}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductPackagingDetailDialog;
