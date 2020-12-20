import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import ModifyEntityDialogForm from './modify-entity-dialog-form';
import {useIntl} from 'react-intl';
import { generateInitForm } from '../helpers/common-function';
function ModifyEntityDialog<T>({
                                 show,
                                 onHide,
                                 entity,
                                 onModify,
                                 title,
                                 size = 'sm',
                                 moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
                                 formPart,
                                 validation,
                                 allFormField
                               }: {
  title: string;
  show: boolean;
  onHide: () => void;
  entity: T;
  moduleName?: string;
  onModify: (values: any) => void;
  code?: string | null;
  get?: (code: string) => any | null;
  formPart?: any;
  allFormField: any;
  size?: 'sm' | 'lg';
  allFormButton?: any;
  validation?: any;
  homePage?: string;
  error?: { error: string };
}) {
  const intl = useIntl();
  return (
    <Modal
      size={size}
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-modify"
      // style={{width}}
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: title}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      <ModifyEntityDialogForm
        modifyForm={formPart}
        validation={validation}
        entity={entity}
        onHide={onHide}
        onModify={onModify}
      />
      {/*<MasterEntityDetail data={entity} renderInfo={renderInfo}/>*/}
     
    </Modal>
  );
}

export default ModifyEntityDialog;
