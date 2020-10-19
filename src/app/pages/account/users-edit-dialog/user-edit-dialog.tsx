import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as actions from '../_redux/user-action';
import {useUsersUIContext} from '../users-ui-context';
import {UserEditDialogHeader} from './user-edit-dialog-header';
import {UserEditForm} from './user-edit-form';

export function UserEditDialog({id, show, onHide}: any) {
    // console.log('entering edit dialog');
    // Customers UI Context
    const usersUIContext: any = useUsersUIContext();
    const usersUIProps = useMemo(() => {
        return {
            initUser: usersUIContext.initUser,
        };
    }, [usersUIContext]);

    // Customers Redux state
    const dispatch = useDispatch();
    const {actionsLoading, userForEdit} = useSelector(
        (state: any) => ({
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
    const saveUser = (user: any) => {
        // const stringifyUser = JSON.stringify(user);
        // const sign = signTransaction(stringifyUser);
        // const {
        //   auth: { publicKey },
        // } = store.getState();
        // const transactionWithSign = { publicKey, sign, user };
        if (!id) {
            (dispatch(actions.createUser(user)) as any).then(() => onHide());

        } else {
            // server request for updating customer
            (dispatch(actions.updateUser(user)) as any).then(() => onHide());
        }
    };

    return (
        <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
            <UserEditDialogHeader id={id}/>
            <UserEditForm
                saveUser={saveUser}
                actionsLoading={actionsLoading}
                user={userForEdit || usersUIProps.initUser}
                onHide={onHide}
            />
        </Modal>
    );
}
