import React from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import store from '../../../../../../redux/store';

// import * as actions from '../../_redux/agencyTypeAction';
import { AgencyShippingEditDialogHeader } from './AgencyShippingEditDialogHeader';
import { AgencyShippingEditForm } from './AgencyShippingEditForm';
import * as actions from '../../../../_redux/agencyAction';

export function AgencyShippingEditDialog({
  show,
  openModal,
  hideModal,
  rowShippingData,
  saveNewData,
  shippingArr,
}) {
  const dispatch = useDispatch();
  const { actionsLoading, agencyForEdit } = useSelector(
    state => ({
      actionsLoading: state.agency.actionsLoading,
      agencyForEdit: state.agency.agencyForEdit,
    }),
    shallowEqual,
  );

  console.log(rowShippingData);

  const saveAgency = (shippingAddress, rowIndex) => {
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
    dispatch(actions.updateAgency(updateAgency)).then(() => {
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
      <AgencyShippingEditDialogHeader rowShippingData={rowShippingData} />
      <AgencyShippingEditForm
        saveAgency={saveAgency}
        actionsLoading={actionsLoading}
        agency={rowShippingData || initAgency}
        onHide={hideModal}
      />
    </Modal>
  );
}
