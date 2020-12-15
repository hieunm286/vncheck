import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';
import {iconStyle} from "../common-consts/const";

export function MasterEntityDetailDialog({
                                           title = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
                                           moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
                                           show,
                                           entity,
                                           onClose,
                                           renderInfo,
                                           size = 'sm'
                                         }: {
  title?: string;
  moduleName?: string;
  show: boolean;
  entity: any;
  renderInfo: any;
  onClose: () => void;
  size?: 'sm' | 'lg';
}) {
  const intl = useIntl();
  return (
    <Modal
      size={size}
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail"
      // style={{width}}
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      
      <MasterEntityDetail data={entity} renderInfo={renderInfo}/>
      <Modal.Footer className="border-top-0">
        <button type="button" onClick={onClose} className="btn btn-outline-primary">
          <CancelOutlinedIcon style={iconStyle}/>
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
  return data ? (
    <Modal.Body>
      <div className={`row`}>
        {renderInfo.map((value: any, key: any) => (
          <div key={key} className={`${value.className ?? 'col-12'}`}>
            {value.header && <p className="text-primary font-weight-bold detail-dialog-subtitle">
              {intl.formatMessage({id: value.header})}
            </p>}
            {Object.keys(value.data).map((dataKey: any) => (
              <div className={`detail-dialog-row-info row`} key={dataKey}>
                <div className="col-4">
                  {intl.formatMessage({id: value.data[dataKey].title})}:
                </div>
                <div className="col-8">
                  {
                    value.data[dataKey].formatter ?
                      <strong>{value.data[dataKey].formatter(data)}</strong>
                      :
                      <strong>{data[dataKey]}</strong>
                  }
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Modal.Body>
  ) : (
    <></>
  );
}
