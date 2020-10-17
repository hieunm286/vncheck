import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// import store from '../../../../../../redux/store';

import * as actions from '../../_redux/agency-type-action';
import {useAgencyTypeUIContext} from '../agency-type-ui-context';
import {AgencyTypeEditDialogHeader} from './agency-type-edit-dialog-header';
import {AgencyTypeEditForm} from './agency-type-edit-form';

export function AgencyTypeEditDialog({id, show, onHide}: any) {
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

    useEffect(() => {
        dispatch(actions.fetchAgencyTypeById(id));
    }, [id, dispatch]);

    // server request for saving agencyType
    const saveAgencyType = (agencyType: any) => {
        if (!id) {
            (dispatch(actions.createAgencyType(agencyType)) as any).then(() => onHide());
            return;
        } else {
            // server request for updating customer
            (dispatch(actions.updateAgencyType(agencyType)) as any).then(() => onHide());
        }
    };

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
            <AgencyTypeEditDialogHeader id={id}/>
            <AgencyTypeEditForm
                saveAgencyType={saveAgencyType}
                actionsLoading={actionsLoading}
                agencyType={agencyTypeForEdit || agencyTypeUIProps.initAgencyType}
                onHide={onHide}
            />
        </Modal>
    );
}
