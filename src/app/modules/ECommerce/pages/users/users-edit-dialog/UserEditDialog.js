import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/user/userAction';
import { useUsersUIContext } from '../UsersUIContext';
import { UserEditDialogHeader } from './UserEditDialogHeader';
import { UserEditForm } from './UserEditForm';

export function UserEditDialog({ id, show, onHide }) {
  // Customers UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
    };
  }, [usersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, userForEdit } = useSelector(
    state => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
    }),
    shallowEqual,
  );

  useEffect(() => {
    // server call for getting Customer by id
    dispatch(actions.fetchUserById(id));
  }, [id, dispatch]);

  // server request for saving user
  const saveUser = user => {
    if (!id) {
      // server request for creating customer
      dispatch(actions.createUser(user)).then(() => onHide());
      return;
    } else {
      // server request for updating customer
      dispatch(actions.updateUser(user)).then(() => onHide());
    }
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <UserEditDialogHeader id={id} />
      <UserEditForm
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
      />
    </Modal>
  );
}
