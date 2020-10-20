import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// import store from '../../../../../../redux/store';
import * as actions from '../../_redux/agency-type-action';
import {useAgencyTypeUIContext} from '../agency-type-ui-context';
import './agency-type-detail-dialog.scss';
import {AgencyTypeDetail} from "./agency-type-detail";

function AgencyTypeDetailDialog({id, show, onHide}: any) {
  const agencyTypeUIContext: any = useAgencyTypeUIContext();
  const agencyTypeUIProps = useMemo(() => {
    return {
      initAgencyType: agencyTypeUIContext.initAgencyType,
    };
  }, [agencyTypeUIContext]);
  
  const dispatch = useDispatch();
  const {actionsLoading, agencyTypeForEdit} = useSelector(
    (state: any) => ({
      actionsLoading: state.agencyType.actionsLoading,
      agencyTypeForEdit: state.agencyType.agencyTypeForEdit,
    }),
    shallowEqual,
  );
  
  console.log(agencyTypeForEdit);
  
  useEffect(() => {
    dispatch(actions.fetchAgencyTypeById(id));
  }, [id, dispatch]);
  return (
    <Modal
      // size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      dialogClassName="modal-detail">
      <AgencyTypeDetail agencyType={agencyTypeForEdit || agencyTypeUIProps.initAgencyType}/>
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-outline-danger">
          Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AgencyTypeDetailDialog;
