import React from 'react';
import { Modal } from 'react-bootstrap';
import ModifyEntityDialogForm from './modify-entity-dialog-form';
import { useIntl } from 'react-intl';
import { ModifyModel } from '../common-types/common-type';
import { generateInitForm } from '../helpers/common-function';

function ModifyEntityDialog<T>({
  isShow,
  onHide,
  entity,
  onModify,
  title,
  modifyModel,
  formPart,
  allFormField,
  allFormButton,
  validation
}: {
  modifyModel?: any;
  title: string;
  isShow: boolean;
  onHide: () => void;
  entity: T;
  onModify: (values: any) => void;
  formPart: any;
  allFormField: any;
  allFormButton: any;
  validation?: any
}) {
  const intl = useIntl();
  const initForm = generateInitForm(allFormField);
  return (
    <Modal show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title" className="text-primary">
          <span>{intl.formatMessage({ id: title })}</span>
        </Modal.Title>
      </Modal.Header>
      
      <ModifyEntityDialogForm
        modifyModel={modifyModel}
        formPart={formPart}
        validation={validation}
        entity={entity || initForm}
        onHide={onHide}
        onModify={onModify}
      />
    </Modal>
  );
}

export default ModifyEntityDialog;
