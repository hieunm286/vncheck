import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useSelector} from 'react-redux';
import {useUsersUIContext} from "../users-ui-context";
import {UserStatusCssClasses} from "../users-ui-helpers";

const selectedCustomers = (entities: any, ids: any) => {
    const _users: any[] = [];
    ids.forEach((id: any) => {
        const user = entities.find((el: any) => el.id === id);
        if (user) {
            _users.push(user);
        }
    });
    return _users;
};

export function CustomersFetchDialog({show, onHide}: any) {
    // Customers UI Context
    const usersUIContext: any = useUsersUIContext();
    const usersUIProps = useMemo(() => {
        return {
            ids: usersUIContext.ids,
        };
    }, [usersUIContext]);

    // Customers Redux state
    const {users} = useSelector(
        (state: any) => ({
            users: selectedCustomers(state.users.entities, usersUIProps.ids),
        }),
        shallowEqual,
    );

    // if users weren't selected we should close modal
    useEffect(() => {
        if (!usersUIProps.ids || usersUIProps.ids.length === 0) {
            onHide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersUIProps.ids]);

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Fetch selected elements</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="timeline timeline-5 mt-3">
                    {users.map(user => (
                        <div className="timeline-item align-items-start" key={`id${user.id}`}>
                            <div
                                className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3"/>
                            <div className="timeline-badge">
                                <i
                                    className={`fa fa-genderless text-${UserStatusCssClasses[user.phone]} icon-xxl`}
                                />
                            </div>
                            <div className="timeline-content text-dark-50 mr-5">
                <span
                    className={`label label-lg label-light-${
                        UserStatusCssClasses[user.paid]
                    } label-inline`}>
                  ID: {user.id}
                </span>
                                <span className="ml-3">{user.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
                        Cancel
                    </button>
                    <> </>
                    <button type="button" onClick={onHide} className="btn btn-danger btn-elevate">
                        Ok
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
