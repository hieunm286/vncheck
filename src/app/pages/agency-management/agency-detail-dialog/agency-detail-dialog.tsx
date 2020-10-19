import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// import store from '../../../../../../redux/store';

import * as actions from '../_redux/agency-action';
import {useAgencyUIContext} from '../agency-ui-context';
import AgencyDetail from './agency-detail';
import './agency-detail-dialog.scss';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

function AgencyDetailDialog({id, show, onHide}: any) {
    const agencyUIContext: any = useAgencyUIContext();
    const agencyUIProps: any = useMemo(() => {
        return {
            initAgency: agencyUIContext.initAgency,
        };
    }, [agencyUIContext]);

    // Customers Redux state
    const dispatch = useDispatch();
    const {actionsLoading, agencyForEdit} = useSelector(
        (state: any) => ({
            actionsLoading: state.agency.actionsLoading,
            agencyForEdit: state.agency.agencyForEdit,
        }),
        shallowEqual,
    );

    console.log(agencyForEdit);

    useEffect(() => {
        // server call for getting Customer by id
        dispatch(actions.fetchAgencyById(id));
    }, [id, dispatch]);
    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
            dialogClassName="modal-detail">
            <AgencyDetail agency={agencyForEdit || agencyUIProps.initAgency}/>
            <Modal.Footer>
                <button type="button" onClick={onHide} className="btn btn-outline-danger">
                    <CancelOutlinedIcon/> Đóng
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default AgencyDetailDialog;
