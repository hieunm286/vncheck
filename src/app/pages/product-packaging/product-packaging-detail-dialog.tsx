import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';

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
  
  const getValue = (data: any, dataKey: any, value: any) => {
    if (value.data[dataKey].refField) {
      if (data[dataKey] && data[dataKey][value.data[dataKey].refField]) {
        return <strong>{data[dataKey][value.data[dataKey].refField]}</strong>;
      } else {
        return <strong>Không có thông tin nha</strong>;
      }
    }
    
    return <strong>{data[dataKey]}</strong>;
  };
  
  return data ? (
    <Modal.Body>
      {renderInfo.map((value: any, key: any) => (
        <div key={key} className="mt-5">
          {Object.keys(value.data).map((dataKey: any) => (
            <div key={dataKey} className="row mt-5">
              <div className="col-3">{intl.formatMessage({id: value.data[dataKey].title})}:</div>
              <div className="col-9">
                
                {getValue(data, dataKey, value)}
              
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
      // size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      
      <MasterEntityDetail data={entity} renderInfo={renderInfo}/>
      <Modal.Footer>
        <button type="button" onClick={onClose} className="btn btn-outline-primary">
          <CancelOutlinedIcon style={{fontSize: 14}}/>{' '}
          {intl.formatMessage({id: 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductPackagingDetailDialog;
