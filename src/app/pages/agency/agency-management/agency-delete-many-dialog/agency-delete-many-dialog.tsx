import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {ModalProgressBar} from '../../../../../_metronic/_partials/controls/index';
import * as actions from '../_redux/agency-action';
import {useAgencyUIContext} from '../agency-ui-context';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

export function AgencyDeleteManyDialog({show, onHide}: any) {
  // agency UI Context
  const agencyUIContext: any = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      ids: agencyUIContext.ids,
      setIds: agencyUIContext.setIds,
      queryParams: agencyUIContext.queryParams,
    };
  }, [agencyUIContext]);
  
  // agency Redux state
  const dispatch = useDispatch();
  const {isLoading} = useSelector(
    (state: any) => ({isLoading: state.agency.actionsLoading}),
    shallowEqual,
  );
  
  console.log(agencyUIProps.ids.length);
  
  useEffect(() => {
    if (!agencyUIProps.ids || agencyUIProps.ids.length === 0) {
      console.log('yes');
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyUIProps.ids]);
  
  // looking for loading/dispatch
  useEffect(() => {
  }, [isLoading, dispatch]);
  
  const deleteManyAgency = () => {
    // server request for deleting customer by id
    (dispatch(actions.deleteManyAgency(agencyUIProps.ids)) as any).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAllAgency(agencyUIProps.queryParams));
      // clear selections list
      agencyUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };
  
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar/>}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Xóa đại lý</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {agencyUIProps.ids && agencyUIProps.ids.length > 0 ? (
          !isLoading && (
            <div>
              <p>Các đại lý được chọn sẽ bị xóa vĩnh viễn và không thể khôi phục. </p>
              
              <p className="mt-3">Tiếp tục xóa?</p>
            </div>
          )
        ) : (
          <div>
            <p>Bạn chưa chọn bất kỳ đại lý nào! </p>
          </div>
        )}
        {isLoading && <span>Đang xóa...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          {agencyUIProps.ids && agencyUIProps.ids.length > 0 && (
            <button type="button" onClick={deleteManyAgency} className="btn btn-danger mr-3">
              <DeleteIcon/> Xóa
            </button>
          )}
          <button type="button" onClick={onHide} className="btn btn-outline-danger">
            <CancelOutlinedIcon/> Hủy bỏ
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
