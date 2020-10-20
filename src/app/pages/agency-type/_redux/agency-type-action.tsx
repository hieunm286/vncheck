import { GenerateKeyPairAndEncrypt } from '../../auth/service/auth-cryptography';
import * as requestFromServer from './agency-type-crud';
import {agencyTypeSlice, callTypes} from './agency-type-slice';
import {AgencyType} from "../../../models/agency-type.model";

const {actions} = agencyTypeSlice;

export const fetchAllAgencyType = (queryParams: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(actions.startCall({callType: callTypes.list}));
  
  return requestFromServer
    .getAllAgencyTypes(queryParams)
    .then(response => {
      const agencyType = response.data;
      dispatch(actions.agencyTypesFetched(agencyType));
    })
    .catch(error => {
      error.clientMessage = "Can't find agencyType";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const fetchAgencyTypeById = (id: string) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  console.log(id);
  if (!id) {
    return dispatch(actions.agencyTypeFetched({agencyTypeForEdit: undefined}));
  }
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getAgencyTypeById(id)
    .then(response => {
      const agencyTypeForEdit = {
        ...response.data,
      };
      console.log(agencyTypeForEdit);
      dispatch(actions.agencyTypeFetched({agencyTypeForEdit}));
    })
    .catch(error => {
      error.clientMessage = "Can't find agencyType";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const fetchAgencyTypeViewById = (id: string) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  console.log(id);
  if (!id) {
    return dispatch(actions.agencyTypeViewFetched({agenctTypeForView: undefined}));
  }
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getAgencyTypeById(id)
    .then(response => {
      const agenctTypeForView = {
        ...response.data,
      };
      dispatch(actions.agencyTypeViewFetched({agenctTypeForView}));
    })
    .catch(error => {
      error.clientMessage = "Can't find agencyType";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const updateAgencyType = (agencyType: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  console.log(agencyType);
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .updateAgencyType(agencyType)
    .then(() => {
      // agencyType.dateofbirth = new Date(agencyType.dateofbirth).toLocaleDateString('vi-VN', {
      //   timeZone: 'Asia/Bangkok',
      // });
      
      dispatch(actions.agencyTypeUpdated({agencyType}));
    })
    .catch(error => {
      error.clientMessage = "Can't update agencyType";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const deleteAgencyType = (agencyTypeId: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .deleteAgencyType(agencyTypeId)
    .then(response => {
      dispatch(
        actions.agencyTypeDeleted({
          id: agencyTypeId,
        }),
      );
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch(
        actions.catchError({
          error: error.response.data,
          callType: callTypes.action,
        }),
      );
    });
};

export const createAgencyType = (agencyType: AgencyType) => (dispatch: (arg0: { payload: any; type: string }) => void) => {
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .createAgencyType(agencyType)
    .then(response => {
      dispatch(
        actions.agencyTypeCreated({
          agencyType,
        }),
      );
    })
    .catch(error => {
      error.clientMessage = "Can't create agencyType";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};
