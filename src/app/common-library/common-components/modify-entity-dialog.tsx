import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import ModifyEntityDialogForm from './modify-entity-dialog-form';
import {useIntl} from 'react-intl';
import {ModifyForm} from "../common-types/common-type";
import _ from "lodash";
function ModifyEntityDialog<T>({
                                 show,
                                 onHide,
                                 entity,
                                 onModify,
                                 size = 'sm',
                                 moduleName = 'COMMON_COMPONENT.DETAIL_DIALOG.MODULE_NAME',
                                 formModel,
                                 validation,
                                 allFormField
                               }: {
  show: boolean;
  onHide: () => void;
  entity: T;
  moduleName?: string;
  onModify: (values: any) => void;
  code?: string | null;
  get?: (code: string) => any | null;
  formModel: ModifyForm;
  allFormField?: any;
  size?: 'sm' | 'lg';
  allFormButton?: any;
  validation?: any;
  homePage?: string;
  error?: { error: string };
}) {
  const intl = useIntl();
  const {_header, ...panels} = formModel;
  return (
    <Modal
      size={size}
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-modify"
      // style={{width}}
    >
      {}
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title id="example-modal-sizes-title-lg" className="text-primary">
          {intl
            .formatMessage({id: _header}, {moduleName: intl.formatMessage({id: moduleName})})
            .toUpperCase()}
        </Modal.Title>
      </Modal.Header>
      {Object.values(panels).map((panel, index) => {
        if(_.isString(panel)) throw new Error('Sử dụng sai cách ' + panel);
        return (<ModifyEntityDialogForm
          modifyPanel={panel}
          validation={validation}
          entity={entity}
          onHide={onHide}
          onModify={onModify}
          key={`tttttttt${index}`}
        />)
      })}
      {/*<MasterEntityDetail data={entity} renderInfo={renderInfo}/>*/}
     
    </Modal>
  );
}

export default ModifyEntityDialog;
