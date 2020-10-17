import { GenerateKeyPairAndEncrypt } from '../../../auth/service/auth-cryptography';
import * as requestFromServer from './agency-crud';
import { agencySlice, callTypes } from './agency-slice';

const { actions } = agencySlice;

export const fetchAllAgency = (queryParams: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllAgencys(queryParams)
    .then(response => {
      const agency = response.data;
      dispatch(actions.agencysFetched(agency));
    })
    .catch(error => {
      error.clientMessage = "Can't find agency";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const fetchAgencyById = (id: string) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  console.log(id);
  if (!id) {
    return dispatch(actions.agencyFetched({ agencyForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAgencyById(id)
    .then(response => {
      const agencyForEdit = {
        ...response.data,
      };
      console.log(agencyForEdit);
      dispatch(actions.agencyFetched({ agencyForEdit }));
    })
    .catch(error => {
      error.clientMessage = "Can't find agency";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const updateAgency = (agency: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  console.log(agency);
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .updateAgency(agency)
    .then(() => {
      // agency.dateofbirth = new Date(agency.dateofbirth).toLocaleDateString('vi-VN', {
      //   timeZone: 'Asia/Bangkok',
      // });

      dispatch(actions.agencyUpdated({ agency }));
    })
    .catch(error => {
      error.clientMessage = "Can't update agency";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const deleteAgency = (agencyId: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .deleteAgency(agencyId)
    .then(response => {
      dispatch(
        actions.agencyDeleted({
          id: agencyId,
        }),
      );
    })
    .catch(error => {
      error.clientMessage = "Can't delete agency";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const deleteManyAgency = (arr: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .deleteManyAgency(arr)
    .then(response => {
      dispatch(actions.agencyDeleteMany({ arr }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete agency";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const createAgency = (transactionWithSign: { password: string }) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  // const { publicKey, sign, agency } = transactionWithSign;
  const { publicKey, encryptedPrivateKey } = GenerateKeyPairAndEncrypt(
    transactionWithSign.password ? transactionWithSign.password : '',
  );
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  // const dataSign = { publicKey, sign };
  // dispatch(actions.transactionCreated({ dataSign }));
  const agency = {
    ...transactionWithSign,
    publicKey,
    encryptedPrivateKey,
  };
  return requestFromServer
    .createAgency(agency)
    .then(response => {
      // const { id, ordinal } = response.data;
      // agency.id = id;
      // agency.ordinal = ordinal;
      // agency.dateofbirth = new Date(agency.dateofbirth).toLocaleDateString('vi-VN', {
      //   timeZone: 'Asia/Bangkok',
      // });
      dispatch(
        actions.agencyCreated({
          agency,
        }),
      );
      // let agencyname = agency.agencyname;
      // let { publicKey, e_private_key } = GenerateKeyPairAndEncrypt(agency.password);
      // // sendEmail(agency.email, agency.agencyname, agency.password);
      // saveIdentity(agencyname, 1, '', e_private_key, publicKey);
    })
    .catch(error => {
      error.clientMessage = "Can't create agency";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};
