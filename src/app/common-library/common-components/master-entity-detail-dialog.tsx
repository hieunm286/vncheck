import React from 'react';
import {Modal} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useIntl} from 'react-intl';
import {iconStyle} from "../common-consts/const";
import {getField} from "../helpers/common-function";
import {RenderInfoDetail} from "../common-types/common-type";

export function MasterEntityDetailDialog({
                                           title = 'COMMON_COMPONENT.DETAIL_DIALOG.HEADER_TITLE',
                                           moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
                                           show,
                                           entity,
                                           onHide,
                                           renderInfo,
                                           size = 'sm'
                                         }: {
  title?: string;
  moduleName?: string;
  show: boolean;
  entity: any;
  renderInfo: RenderInfoDetail;
  onHide: () => void;
  size?: 'sm' | 'lg' | 'xl';
}) {
  const intl = useIntl();
  return (
    <Modal
      size={size}
      show={show}
      onHide={onHide}
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
      
      <MasterEntityDetail entity={entity} renderInfo={renderInfo}/>
      <Modal.Footer className="border-top-0">
        <button type="button" onClick={onHide} className="btn btn-outline-primary fixed-btn-width">
          <CancelOutlinedIcon style={iconStyle}/>
          {intl.formatMessage({id: 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export function MasterEntityDetail({
                                     entity,
                                     renderInfo,
                                     convertFunctions = {},
                                   }: {
  renderInfo: RenderInfoDetail;
  entity: any;
  convertFunctions?: { [V: string]: (input: any) => string };
}) {
  const intl = useIntl();
  return entity ? (
    <Modal.Body>
      <div className={`row`}>
        {renderInfo.map((value: any, key: any) => (
          <div key={key} className={`${value.className ?? 'col-12'}`}>
            {value.header && value.header !== '' && <p className="text-primary detail-dialog-subtitle">
              {intl.formatMessage({id: value.header})}
            </p>}
            {Object.keys(value.data).map((dataKey: any) => (
              <div className={`detail-dialog-row-info row`} key={dataKey}>
                {value.data[dataKey].title && value.data[dataKey].title !== '' &&
                <div className={`${value.titleClassName ?? 'col-4'}`}>
                  {intl.formatMessage({id: value.data[dataKey].title})}:
                </div>}
                <div className={`${value.dataClassName ?? 'col-8'}`}>
                  {(() => {
                    const displayData = value.data[dataKey].keyField ? getField(entity, value.data[dataKey].keyField) : entity[dataKey];
                    return value.data[dataKey].formatter ?
                      (<>{value.data[dataKey].formatter(displayData, entity)}</>)
                      : (<>{displayData}</>)
                  })()
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
