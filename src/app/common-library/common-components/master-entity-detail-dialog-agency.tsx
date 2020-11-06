import React from 'react';
import {Modal, Table} from 'react-bootstrap';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {FormattedMessage, useIntl} from 'react-intl';
import ModifyEntityDialog from './modify-entity-dialog';
import './master-entity-detail-dialog-agency.scss'
// import { ThemeProvider } from 'styled-components';

export function MasterEntityDetailAgency({
                                           title,
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
  console.log(title);
  console.log(moduleName);
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl.formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})}).toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          renderInfo ?
          (
            <>
            <FormGroup data={entity} renderInfo={renderInfo[0].data} title={intl.formatMessage({id: renderInfo[0].header})}/>
            {/* <FormGroup data={entity} renderInfo={renderInfo[1].data} title={intl.formatMessage({id: renderInfo[1].header})}/> */}
            </>
          ) : <></>
          // renderInfo.map((renderInfoFrag: any, key: any) => {
          //   return (<FormGroup key={key} data={entity} renderInfo={renderInfoFrag.data} title={intl.formatMessage({id: renderInfoFrag.header})}/>);
          // }) : <></>
        }
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onClose} className="btn btn-outline-danger">
          <CancelOutlinedIcon style={{fontSize: 14}}/>{' '}
          {intl.formatMessage({id: 'COMMON_COMPONENT.DETAIL_DIALOG.CLOSE_BTN'})}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export function FormGroup({
                                     data,
                                     title,
                                     renderInfo,
                                     convertFunctions = {},
                                   }: {
  renderInfo: any[];
  data: any;
  title: string;
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
    data ? 
    <>
      <Table>
        <thead>
          <tr>
            <td>
              <h3 className="text-primary">{title}</h3>
            </td>
          </tr>
        </thead>
        <tbody>
      {
        renderInfo.map((formField, key) => {
          return (
            <>
            {
            // formField.keyField: (3) ["address.district", "address.city", "address.state"]
            Array.isArray(formField.keyField) ?
              <tr key={key}>
                <td>
                  {intl.formatMessage({id: formField.title})}:{'\u00A0'} 
                </td>
                <td>
                  <strong>
                    {
                      formField.keyField.map((el: any) => {
                        return getPropByString(data, el);
                      }).join(", ")
                    }
                  </strong>
                </td>
              </tr>
              :
              // formField.keyField: "shippingAddress"
              Array.isArray(getPropByString(data, formField.keyField)) ?
                  getPropByString(data, formField.keyField).map((el: any, key: any) => {
                    // only display title for the first shippingAddress
                    if(key === 0) {
                      return (
                        <tr key={key}>
                          <td>
                            {intl.formatMessage({id: formField.title})}:{'\u00A0'}
                          </td>
                          <td>
                            <strong>
                              {el.district}, {el.city}, {el.state}
                            </strong>
                          </td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={key}>
                          <td>
                            
                          </td>
                          <td>
                            <strong>
                              {el.district}, {el.city}, {el.state}
                            </strong>
                          </td>
                        </tr>
                      )
                    }
                    
                  })
                  :
                  <tr key={key}>
                    <td>
                      {intl.formatMessage({id: formField.title})}:{'\u00A0'} 
                    </td>
                    <td>
                      <strong>
                      {   
                        getPropByString(data, formField.keyField)
                      }
                      </strong>
                    </td>
                  </tr>
              }
              
              </>
          );
        })
      }
      </tbody>
      
      </Table>
    </> : <></>
  );
}
