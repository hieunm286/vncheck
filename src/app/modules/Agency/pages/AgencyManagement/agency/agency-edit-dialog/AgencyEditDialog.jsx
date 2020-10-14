import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import store from '../../../../../../redux/store';

import * as actions from '../../_redux/agencyAction';
import { useAgencyUIContext } from '../AgencyUIContext';
import { AgencyEditDialogHeader } from './AgencyEditDialogHeader';
import { AgencyEditForm } from './AgencyEditForm';
import '../Agency.css';
import { Card } from '@material-ui/core';
import { CardBody } from '../../../../../../../_metronic/_partials/controls';

export function AgencyEditDialog({ id, show, onHide }) {
  // Customers UI Context
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      initAgency: agencyUIContext.initAgency,
    };
  }, [agencyUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, agencyForEdit } = useSelector(
    state => ({
      actionsLoading: state.agency.actionsLoading,
      agencyForEdit: state.agency.agencyForEdit,
    }),
    shallowEqual,
  );

  useEffect(() => {
    // server call for getting Customer by id
    dispatch(actions.fetchAgencyById(id));
  }, [id, dispatch]);

  // server request for saving agency
  const saveAgency = agency => {
    // const stringifyAgency = JSON.stringify(agency);
    // const sign = signTransaction(stringifyAgency);
    // const {
    //   auth: { publicKey },
    // } = store.getState();
    // const transactionWithSign = { publicKey, sign, agency };
    console.log('---agencyyyyyyyyy');
    console.log(agency);
    if (!id) {
      dispatch(actions.createAgency(agency)).then(() => onHide());
      return;
    } else {
      // server request for updating customer
      console.log('-----------run edit------------');
      dispatch(actions.updateAgency(agency)).then(() => onHide());
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
