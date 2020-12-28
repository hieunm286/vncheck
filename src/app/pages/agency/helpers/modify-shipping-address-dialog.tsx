import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import {generateInitForm} from '../../../common-library/helpers/common-function';
import ModifyShippingAddressDialogForm from './modify-shipping-address-dialog-form';

function ModifyShippingAddressDialog<T>({
                                          isShow,
                                          onHide,
                                          entity,
                                          onModify,
                                          title,
                                          modifyModel,
                                          code,
                                          get,
                                          formPart,
                                          allFormField,
                                          allFormButton,
                                          validation,
                                          autoFill,
                                          homePage,
                                        }: {
  modifyModel: any;
  title: string;
  isShow: boolean;
  onHide: () => void;
  entity: T;
  onModify: (values: any) => void;
  code?: string | null;
  get?: (code: string) => any | null;
  formPart?: any;
  allFormField: any;
  allFormButton?: any;
  validation?: any;
  autoFill?: any;
  homePage?: string;
}) {
  const intl = useIntl();
  const initForm = autoFill
    ? generateInitForm(allFormField, autoFill.field, autoFill.entity)
    : generateInitForm(allFormField);
  const [search, onChange] = useState<any>(initForm);
  
  
  return (
    <Modal show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title id="example-modal-sizes-title" className="text-primary">
          <span>{intl.formatMessage({id: title}).toUpperCase()}</span>
        </Modal.Title>
      </Modal.Header>
      
      <ModifyShippingAddressDialogForm
        
        modifyModel={modifyModel}
        formPart={formPart}
        validation={validation}
        entity={entity}
        onHide={onHide}
        onModify={onModify}
      />
    </Modal>
  );
}

export default ModifyShippingAddressDialog;
