import React from 'react';
import {Route} from 'react-router-dom';
import {UsersUIProvider} from './users-ui-context';
import {UserEditDialog} from "./users-edit-dialog/user-edit-dialog";
import {UsersCard} from "./users-card";

export function UsersPage({history}: any) {
    const usersUIEvents = {
        // newCustomerButtonClick: () => {
        //   history.push("/e-commerce/customers/new");
        // },
        openEditUserDialog: (id: string) => {
            history.push(`/account/user/${id}/edit`);
        },
        // openDeleteCustomerDialog: (id) => {
        //   history.push(`/e-commerce/customers/${id}/delete`);
        // },
        // openDeleteCustomersDialog: () => {
        //   history.push(`/e-commerce/customers/deleteCustomers`);
        // },
        // openFetchCustomersDialog: () => {
        //   history.push(`/e-commerce/customers/fetch`);
        // },
        // openUpdateCustomersStatusDialog: () => {
        //   history.push("/e-commerce/customers/updateStatus");
        // }
    };

    return (
        <UsersUIProvider usersUIEvents={usersUIEvents}>
            <Route path="/e-commerce/users/:id/edit">
                {({history, match}) => (
                    <UserEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push('/e-commerce/users');
                        }}
                    />
                )}
            </Route>
            <UsersCard/>
        </UsersUIProvider>
    );
}
