import React from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// import store from '../../../../../../redux/store';

// import * as actions from '../../_redux/agencyTypeAction';
import {AgencyShippingEditDialogHeader} from './agency-shipping-edit-dialog-header';
import {AgencyShippingEditForm} from './agency-shipping-edit-form';
import * as actions from '../../../_redux/agency-action';
import {any} from "prop-types";

export function AgencyShippingEditDialog({
                                             show,
                                             openModal,
                                             hideModal,
                                             rowShippingData,
                                             saveNewData,
                                             shippingArr,
                                         }: any) {
    const dispatch = useDispatch();
    const {actionsLoading, agencyForEdit} = useSelector(
        (state: any) => ({
            actionsLoading: state.agency.actionsLoading,
            agencyForEdit: state.agency.agencyForEdit,
        }),
        shallowEqual,
    );

    console.log(rowShippingData);

    const saveAgency = (shippingAddress: any, rowIndex: any) => {
        const shippingAdressArr =
            agencyForEdit && agencyForEdit.shipping_address
                ? JSON.parse(agencyForEdit.shipping_address)
                : [];

        if (rowShippingData.rowIndex === -1) {
            shippingAddress.id = agencyForEdit ? '' + shippingAdressArr.length : '' + shippingArr.length;
            shippingAdressArr.push(shippingAddress);
            saveNewData(shippingAddress, -1);
        } else {
            shippingAdressArr[rowIndex] = shippingAddress;
            saveNewData(shippingAddress, rowIndex);
        }
        const updateAgency = {
            ...agencyForEdit,
            shipping_address: JSON.stringify(shippingAdressArr),
        };
        (dispatch(actions.updateAgency(updateAgency)) as any).then(() => {
            if (agencyForEdit) {
                dispatch(actions.fetchAgencyById(agencyForEdit.agency_id));
            }
            hideModal();
        });
    };

    const initAgency = {
        id: '',
        state: '',
        district: '',
        city: '',
        address: '',
    };

    return (
        <Modal show={show} onHide={hideModal} aria-labelledby="example-modal-sizes-title-lg">
            <AgencyShippingEditDialogHeader rowShippingData={rowShippingData}/>
            <AgencyShippingEditForm
                saveAgency={saveAgency}
                actionsLoading={actionsLoading}
                agency={rowShippingData || initAgency}
                onHide={hideModal}
            />
        </Modal>
    );
}
