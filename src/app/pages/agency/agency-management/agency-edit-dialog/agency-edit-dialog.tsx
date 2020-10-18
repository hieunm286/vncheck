import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// import store from '../../../../../../redux/store';

import * as actions from '../_redux/agency-action';
import {useAgencyUIContext} from '../agency-ui-context';
import {AgencyEditDialogHeader} from './agency-edit-dialog-header';
import {AgencyEditForm} from './agency-edit-form';
import '../agency.css';
import {Card} from '@material-ui/core';
import {CardBody} from "../../../../components/card";

export function AgencyEditDialog({id, show, onHide}: any) {
    console.log('entering edit dialog');
    // Customers UI Context
    const agencyUIContext = useAgencyUIContext();
    const agencyUIProps = useMemo(() => {
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

    // server request for saving agency
    const saveAgency = (agency:any) => {
        // const stringifyAgency = JSON.stringify(agency);
        // const sign = signTransaction(stringifyAgency);
        // const {
        //   auth: { publicKey },
        // } = store.getState();
        // const transactionWithSign = { publicKey, sign, agency };
        console.log(id);
        if (!id) {
            (dispatch(actions.createAgency(agency))as any).then(() => onHide());
            return;
        } else {
            // server request for updating customer
            console.log('-----------run edit------------');
            (dispatch(actions.updateAgency(agency))as any).then(() => onHide());
        }
    };

    return (
        <Card>
            <CardBody>
                <AgencyEditForm
                    saveAgency={saveAgency}
                    actionsLoading={actionsLoading}
                    agency={agencyForEdit || agencyUIProps.initAgency}
                    onHide={onHide}
                />
            </CardBody>
        </Card>
    );
}
