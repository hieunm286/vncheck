import React, {useEffect, useMemo} from 'react';
import {RootStateOrAny, shallowEqual, useDispatch, useSelector} from 'react-redux';
// import store from '../../../../../../redux/store';
import * as actions from '../_redux/agency-action';

import '../agency.css';
import { Card } from '@material-ui/core';
import { fetchAllAgencyType } from '../../agency-type/_redux/agency-type-action';
import { useAgencyUIContext } from '../agency-ui-context';
import { AgencyEditForm } from './agency-edit-form';
import { CardBody } from '../../../components/card';

export function AgencyEditDialog({id, show, onHide}: { id: any; show: any; onHide: any }) {
  // Customers UI Context
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      initAgency: agencyUIContext.initAgency,
    };
  }, [agencyUIContext]);
  
  // Customers Redux state
  const dispatch = useDispatch<any>();
  const {actionsLoading, agencyForEdit, agencyType} = useSelector(
    (state: RootStateOrAny) => ({
      actionsLoading: state.agency.actionsLoading,
      agencyForEdit: state.agency.agencyForEdit,
      agencyType: state.agencyType.entities,
    }),
    shallowEqual,
  );
  
  useEffect(() => {
    // server call for getting Customer by id
    dispatch(actions.fetchAgencyById(id));
    const queryParams = {
      pageNumber: 1,
      sortField: '',
      sortOrder: 'asc',
    };
    dispatch(fetchAllAgencyType(queryParams));
  }, [id, dispatch]);
  
  // server request for saving agency
  const saveAgency = (agency: any, imageArray: any) => {
    // const stringifyAgency = JSON.stringify(agency);
    // const sign = signTransaction(stringifyAgency);
    // const {
    //   auth: { publicKey },
    // } = store.getState();
    // const transactionWithSign = { publicKey, sign, agency };
    console.log('---agencyyyyyyyyy');
    console.log(agency);
    console.log(imageArray);
    if (!id) {
      dispatch(actions.createAgency(agency, imageArray)).then(() => onHide());
      return;
    } else {
      // server request for updating customer
      console.log('-----------run edit------------');
      dispatch(actions.updateAgency(agency, imageArray)).then(() => onHide());
    }
  };
  
  return (
    <Card>
      <CardBody>
        <AgencyEditForm
          saveAgency={saveAgency}
          actionsLoading={actionsLoading}
          agency={agencyForEdit || agencyUIProps.initAgency}
          agencyType={agencyType || []}
          onHide={onHide}
        />
      </CardBody>
    </Card>
  );
}
