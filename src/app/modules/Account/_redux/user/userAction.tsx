import { saveIdentity } from '../../../Auth/_redux/auth.service';
import * as requestFromServer from './userCrud';
import { usersSlice, callTypes } from './userSlice';
import { GenerateKeyPairAndEncrypt } from '../../../Auth/service/AuthCryptography';

const { actions } = usersSlice;

export const fetchAllUser = (queryParams: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllUsers(queryParams)
    .then(response => {
      const user = response.data;
      dispatch(actions.usersFetched({ data: user }));
    })
    .catch(error => {
      error.clientMessage = "Can't find user";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const fetchUserById = (id: string) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  // console.log(id);
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserById(id)
    .then(response => {
      const userForEdit = {
        ...response.data,
      };
      // console.log(userForEdit);
      dispatch(actions.userFetched({ userForEdit }));
    })
    .catch(error => {
      error.clientMessage = "Can't find user";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const updateUser = (user: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  // console.log(user);
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .updateUser(user)
    .then(() => {
      // user.dateofbirth = new Date(user.dateofbirth).toLocaleDateString('vi-VN', {
      //   timeZone: 'Asia/Bangkok',
      // });

      dispatch(actions.userUpdated({ user }));
    })
    .catch(error => {
      error.clientMessage = "Can't update user";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const deleteUser = (userId: any) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .deleteUser(userId)
    .then(response => {
      dispatch(
        actions.userDeleted({
          id: userId,
        }),
      );
    })
    .catch(error => {
      error.clientMessage = "Can't delete user";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};

export const createUser = (transactionWithSign: { password: string }) => (
  dispatch: (arg0: { payload: any; type: string }) => void,
) => {
  // const { publicKey, sign, user } = transactionWithSign;
  const { publicKey, encryptedPrivateKey } = GenerateKeyPairAndEncrypt(
    transactionWithSign.password,
  );
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  // const dataSign = { publicKey, sign };
  // dispatch(actions.transactionCreated({ dataSign }));
  const user = {
    ...transactionWithSign,
    publicKey,
    encryptedPrivateKey,
  };
  return requestFromServer
    .createUser(user)
    .then(response => {
      // const { id, ordinal } = response.data;
      // user.id = id;
      // user.ordinal = ordinal;
      // user.dateofbirth = new Date(user.dateofbirth).toLocaleDateString('vi-VN', {
      //   timeZone: 'Asia/Bangkok',
      // });
      dispatch(
        actions.userCreated({
          user,
        }),
      );
      // let username = user.username;
      // let { publicKey, e_private_key } = GenerateKeyPairAndEncrypt(user.password);
      // // sendEmail(user.email, user.username, user.password);
      // saveIdentity(username, 1, '', e_private_key, publicKey);
    })
    .catch(error => {
      error.clientMessage = "Can't create user";
      dispatch(
        actions.catchError({
          error,
          callType: callTypes.action,
        }),
      );
    });
};
