import * as requestFromServer from './userCrud';
import { usersSlice, callTypes } from './userSlice';

const { actions } = usersSlice;

export const fetchAllUser = queryParams => dispatch => {
  dispatch(
    actions.startCall({
      callType: callTypes.list,
    }),
  );

  return requestFromServer
    .getAllUsers(queryParams)
    .then(response => {
      const user = response.data;
      user.data.forEach(
        value =>
          (value.dateofbirth = new Date(value.dateofbirth).toLocaleDateString('vi-VN', {
            timeZone: 'Asia/Bangkok',
          })),
      );
      console.log(user);

      dispatch(actions.usersFetched(user));
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

export const fetchUserById = userId => dispatch => {
  if (!userId) {
    return dispatch(
      actions.userFetched({
        userForEdit: undefined,
      }),
    );
  }
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .getUserById(userId)
    .then(response => {
      const user = response.data;
      dispatch(
        actions.userFetched({
          userForEdit: user,
        }),
      );
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

export const updateUser = user => dispatch => {
  console.log(user);
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .updateUser(user)
    .then(() => {
      user.dateofbirth = new Date(user.dateofbirth).toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Bangkok',
      });

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

export const deleteUser = userId => dispatch => {
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

export const createUser = user => dispatch => {
  console.log(user);
  dispatch(
    actions.startCall({
      callType: callTypes.action,
    }),
  );
  return requestFromServer
    .createUser(user)
    .then(response => {
      dispatch(
        actions.userCreated({
          user,
        }),
      );
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
